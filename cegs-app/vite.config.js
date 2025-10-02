// ------------------------------------------------------------------
// Arquivo: cegs-app/vite.config.js
// Descrição: Configuração do Vite para o projeto
// Data: 28.09.2025 
// Última modificação: 28.09.2025 
// ------------------------------------------------------------------

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwind()],
})