// ------------------------------------------------------------------------------------------
// Arquivo: gofora/cegs-app/src/utils/auth.js
// Descrição: Funções Utilitárias para Autenticação e Gerenciamento de Usuários
// Data: 28.09.2025 
// Última modificação: 28.09.2025 
// ------------------------------------------------------------------------------------------

export function getUsuarioLogado() {
    const usuario = localStorage.getItem('usuario')
    return usuario ? JSON.parse(usuario) : null
}
