# -------------------------------------------------------------------
# Arquivo: backend/app/auth.py
# Descrição: Implementa Endpoints de Autenticação
# Autor: Eduardo José
# Data: 28.09.2025 
# Última modificação: 01.10.2025 
# -------------------------------------------------------------------

# ➤ Importações e Routers
# ✦ APIRouter     ⟶ Cria Grupo de Rotas de API
# ✦ HTTPException ⟶ Retorno de Erros HTTP
from fastapi import APIRouter, HTTPException 

# ➤ Importações de Instâncias de Cliente
# ✦ Supabase ⟶ Operações como Selecionar, Inserir, Atualizar, Deletar
from backend.app.supabase_client import  supabase

# -------------------------------------------------------------------

# ➤ Definição do Router
# ⟶ Define Grupo de Rotas para Autenticação
router = APIRouter()

# -------------------------------------------------------------------

# ➤ Endpoint REGISTRO de Usuário (Rota POST)

@router.post("/auth/register")

# ✦ Função register_user ⟶ Dicionário com Chaves (email, senha, etc.)
# ✦ Payload ⟶ Formato JSON com Dados do Usuário de Registro

def register_user(payload: dict):               # Registro de Usuário:
    email = payload.get("email")                # Email do Usuário (text)
    senha = payload.get("senha")                # Senha do Usuário (text)
    nome  = payload.get("nome")                 # Nome do Usuário (text)
    role  = payload.get("role",                 # Role/Tipo de Usuário (text)
                        "participante")         # ⤷ Valor Padrão Participante

# ⚠︎ ⟶ Se Email ou Senha for Vazio (400 Bad Request)
    if not email or not senha:
        raise HTTPException(status_code=400, detail="『⚠️』 — Email e Senha são OBRIGATÓRIOS!")

# ⚠︎ ⟶ Verifica se o Email já Existe
    existing = supabase.table("usuarios").select("id").eq("email", email).execute().data
    if existing:
        raise HTTPException(status_code=400, detail="『⚠️』 — Email JÁ Cadastrado!")

# ★ ⟶ Insere Novo Usuário no Banco de Dados
    supabase.table("usuarios").insert({
        "email": email,  # E-Mail Único
        "senha": senha,  # Recomendado: Hash de Senha 
        "nome": nome,    # Nome Completo do Usuário
        "role": role     # Participante ou Organizador  
    }).execute()

# ⟶ Retorno de Mensagem em JSON
    return {"message": "『👤』 — Usuário cadastrado com sucesso"}

# -------------------------------------------------------------------

# ➤ Endpoint LOGIN de Usuário (Rota POST)

@router.post("/auth/login")

# ✦ Função register_user ⟶ Dicionário com Chaves (email, senha, etc.)
# ✦ Payload ⟶ Formato JSON com Dados do Usuário de Registro

def login_user(payload: dict):             # Login de Usuário
    email = payload.get("email")           # Email do Usuário (text)
    senha = payload.get("senha")           # Senha do Usuário (text)

# ⚠︎ ⟶ Se E-Mail ou Senha for Vazio (400 Bad Request)
    if not email or not senha:
        raise HTTPException(status_code=400, detail="『⚠️』 — Email e senha são obrigatórios")

# ★ ⟶ Busca Usuário com Email e Senha
    result = supabase.table("usuarios").select("*").eq("email", email).eq("senha", senha).execute().data

# ⚠︎ ⟶ Se a Busca for Incorreta:
    if not result:
        raise HTTPException(status_code=401, detail="『⚠️』 — Credenciais inválidas")

    user = result[0]

# ★ ⟶
    return {
        "message": "『👤』 — Login realizado com sucesso",
        "usuario": {
            "id": user["id"],
            "nome": user["nome"],
            "email": user["email"],
            "role": user["role"]
        }
    }
