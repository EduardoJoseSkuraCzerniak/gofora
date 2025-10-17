# -------------------------------------------------------------------
# Arquivo: gofora/backend/app/supabase_client.py
# Descrição: Configura o Cliente Supabase
# Data: 28.09.2025 
# Última modificação: 28.09.2025 
# -------------------------------------------------------------------

# ➤ Importações de Instâncias de Cliente (create_client)
# ✦ Supabase ⟶ Operações como Selecionar, Inserir, Atualizar, Deletar
from supabase import create_client

# ➤ Biblioteca Nativa do Phyton para Acesso de Variáveis de Ambientes
# ✦ OS ⟶ Operating System / Sistema Operacional
import os

# ➤ Importações de Dot Environment (.env) Arquivo de Ambiente
# ✦ load_dotenv ⟶ Leitura do .env (Variáveis de Ambiente)
from dotenv import load_dotenv

# -------------------------------------------------------------------

# ✦ ⟶ Leitura das Váriaveis de Ambiente (.env)
load_dotenv()

# ➤ URL ⟶ Uniform Resource Locator / Localizador Uniforme de Recursos
# ✦ ⟶ Identifica o Endereço Completo do Supabase (Apontado para Recurso Web)
SUPABASE_URL = os.getenv("SUPABASE_URL")

# ➤ KEY ⟶ Chave de Acesso API KEY
# ✦ ⟶ Código de Autorização de Uso de Serviço para API/DB
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# ➤ CREATE_CLIENT ⟶ Criação de Instância Cliente Supabase 
# ✦ ⟶ Consultas, Inserções, Atualizações e Exclusões (CRUD)
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
