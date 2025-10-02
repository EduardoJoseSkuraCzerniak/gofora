# ------------------------------------------------------------------ 
# Arquivo: backend/app/main.py
# Descrição: Ponto de entrada da aplicação FastAPI
# Data: 28.09.2025 
# Última modificação: 28.09.2025 
# -------------------------------------------------------------------

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from backend.app.supabase_client import supabase
from backend.app import auth
from backend.app import etapas 

# -------------------------------------------------------------------

app = FastAPI()

# -------------------------------------------------------------------

# Libera requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, substitua por ["https://seusite.com"]
    allow_methods=["*"],
    allow_headers=["*"]
)

# Rota de autenticação (registro/login)

app.include_router(auth.router)

app.include_router(etapas.router)

@app.get("/")
def read_root():
    return {"message": "API rodando com sucesso!"}

@app.get("/cegs")
def listar_cegs():
    res = supabase.table("cegs").select("*").execute()
    return res.data

@app.get("/cegs/mine")
def listar_grupos_do_organizador(usuario_id: str = Query(...)):
    if not usuario_id:
        raise HTTPException(status_code=400, detail="ID do usuário é obrigatório")
    grupos = supabase.table("cegs").select("*").eq("organizador_id", usuario_id).execute()
    return grupos.data

@app.post("/cegs")
def criar_ceg(payload: dict):
    ceg_data = {
        "nome": payload.get("nome"),
        "loja": payload.get("loja"),
        "pais": payload.get("pais"),
        "status": payload.get("status", "Aberta"),
        "organizador_id": payload.get("organizador_id")
    }
    ceg = supabase.table("cegs").insert(ceg_data).execute().data[0]
    ceg_id = ceg["id"]

    produtos = payload.get("produtos", [])
    for p in produtos:
        supabase.table("produtos").insert({
            "nome": p["nome"],
            "preco": float(p["preco"]),
            "ceg_id": ceg_id
        }).execute()

    return ceg

@app.get("/cegs/{id}/participantes")
def listar_participantes(id: str):
    participantes = supabase.table("participantes").select("*").eq("ceg_id", id).execute()
    return participantes.data

@app.post("/participantes")
def adicionar_participante(payload: dict):
    nome = payload.get("nome")
    ceg_id = payload.get("ceg_id")
    produtos = payload.get("produtos", [])  # lista: [{ produto_id, quantidade }]

    if not nome or not produtos:
        raise HTTPException(status_code=400, detail="Nome e produtos são obrigatórios")

    # Cria o participante
    participante = supabase.table("participantes").insert({
        "nome": nome,
        "ceg_id": ceg_id,
        "total": 0  # atualizado depois
    }).execute().data[0]

    participante_id = participante["id"]
    total_geral = 0

    for item in produtos:
        produto_id = item.get("produto_id")
        quantidade = item.get("quantidade", 1)

        if not produto_id or quantidade <= 0:
            continue

        # Busca preço do produto
        produto = supabase.table("produtos").select("preco").eq("id", produto_id).execute().data
        if not produto:
            continue

        preco_unitario = float(produto[0]["preco"])
        total_item = preco_unitario * quantidade
        total_geral += total_item

        # Salva relação na participante_produtos
        supabase.table("participante_produtos").insert({
            "participante_id": participante_id,
            "produto_id": produto_id,
            "quantidade": quantidade,
            "valor_unitario": preco_unitario
        }).execute()

    # Atualiza total final no participante
    supabase.table("participantes").update({"total": total_geral}).eq("id", participante_id).execute()

    return {"message": "Participante adicionado com sucesso"}

