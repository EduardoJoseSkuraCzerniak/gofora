# -------------------------------------------------------------------
# Arquivo: gofora/backend/app/supabase_client.py
# Descrição: Configura o Cliente Supabase
# Data: 28.09.2025 
# Última modificação: 28.09.2025 
# -------------------------------------------------------------------

from supabase import create_client
import os
from dotenv import load_dotenv

# -------------------------------------------------------------------

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
