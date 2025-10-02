# -----------------------------------------------------------------------
# Arquivo: backend/app/etapas.py
# Descrição: Implementa endpoints para atualização de etapas dos CEGs
# Data: 28.09.2025 
# Última modificação: 28.09.2025 
# -----------------------------------------------------------------------

from fastapi import APIRouter, HTTPException
from backend.app.supabase_client import supabase
from datetime import date

# -------------------------------------------------------------------

# ➤ Definição do Router
# ⟶ Define Grupo de Rotas para Etapas
router = APIRouter()

# -------------------------------------------------------------------

@router.patch("/cegs/{id}/etapa")
def atualizar_etapa(id: str, payload: dict):
    nova_etapa = payload.get("etapa_atual")

    if not nova_etapa:
        raise HTTPException(status_code=400, detail=" 『⚠️』— Nova etapa não informada")

    campos_data = {
        "Pagamento do Envio Internacional": "data_envio_internacional",
        "Divisão de Tributos e Taxas": "data_divisao_tributos",
        "Pagamento de Frete Nacional": "data_frete_nacional",
        "Entrega Concluída": "data_entrega_concluida"
    }

    update_data = {"etapa_atual": nova_etapa}

    if nova_etapa in campos_data:
        update_data[campos_data[nova_etapa]] = str(date.today())

    result = supabase.table("cegs").update(update_data).eq("id", id).execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="『❌』 — Grupo não encontrado")

    return {"message": "Etapa atualizada com sucesso"}
