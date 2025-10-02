// ------------------------------------------------------------------------------------------
// Arquivo: cegs-app/src/utils/auth.js
// Descrição: Funções utilitárias para autenticação e gerenciamento de usuários
// Data: 28.09.2025 
// Última modificação: 28.09.2025 
// ------------------------------------------------------------------------------------------

export function getUsuarioLogado() {
    const usuario = localStorage.getItem('usuario')
    return usuario ? JSON.parse(usuario) : null
}
