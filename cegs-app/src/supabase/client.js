// ------------------------------------------------------------------
// Arquivo: gofora/cegs-app/src/supabase/client.js
// Descrição: Configuração do Cliente Supabase
// Data: 28.09.2025 
// Última modificação: 28.09.2025 
// ------------------------------------------------------------------   

// ➤ Importações de Instâncias de Cliente (createClient)
// ✦ Supabase ⟶ Operações como Selecionar, Inserir, Atualizar, Deletar
import { createClient } from '@supabase/supabase-js'

// ➤ Instância de Exportação Supase
// ✦ Exportando ⟶ URL e KEY
export const supabase = createClient(
    'https://kcogilktcfzfskydwpry.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtjb2dpbGt0Y2Z6ZnNreWR3cHJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5OTMzNjMsImV4cCI6MjA2NjU2OTM2M30.nzicy5AkNm3wh80XvuxEcunu8RE-CLSEeVvQIaM6AmU'
)
