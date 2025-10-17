// ------------------------------------------------------------------
// Arquivo: gofora/cegs-app/src/pages/Register.jsx
// Descrição: Página de registro de novos usuários
// Data: 28.09.2025 
// Última modificação: 28.09.2025 
// ------------------------------------------------------------------   

// ➤ Importações de Hooks

// ✦ useState ⟶ Estado Local do Componente
// ✦ react    ⟶ Biblioteca Principal React
import { useState } from 'react';

// ✦ useNavigate      ⟶ Navegação Programática entre Rotas
// ✦ react-router-dom ⟶ Biblioteca para Rotas React DOM (Document Object Model)
import { useNavigate } from 'react-router-dom';

// ➤ Importação de Biblioteca

// ✦ axios ⟶ Requisições HTTP (conhecido como "Digno")
import axios from 'axios';

// ➤ Register ⟶ Componente Principal
// ✦ ⟶ Função que será Exportado e Usado para Cadastro
export default function Register() {

    // ✦ form       ⟶ Valor Atual do Estado (Objeto com Campos)
    // ✦ setForm    ⟶ Função que Atualiza Estado (Muda Valores do form) 
    // ✦ useState   ⟶ Hook que Permite Adicionar ESTADO INICIAL a Componentes Funcionais
    // ✦ form.campo ⟶ Email, Senha, Nome, Papel (Default Participante)
    const [form, setForm] = useState({ email: '', senha: '', nome: '', role: 'participante' });

    // ✦ loading    ⟶ Controle de Estado Carregamento (Desabilitação de Botão e Feedback)
    // ✦ setLoading ⟶ Função que Atualiza Estado (Muda Valores do loading)
    // ✦ useState   ⟶ Hook que Permite Adicionar ESTADO INICIAL (FALSO)
    const [loading, setLoading] = useState(false);

    // ✦ navigate    ⟶ Função para Redirecionar Usuário a Outra Rota
    // ✦ useNavigate ⟶ Hook que Retorna Função para Navegação
    const navigate = useNavigate();

    // ➤ handleSubmit   ⟶ Função quando Usuário clicar em 'Cadastrar'
    // ✦ async          ⟶ Função Assíncrona (await)
    // ✦ e              ⟶ Evento do Formulário para o preventDefault (Automático do React)
    // ✦ preventDefault ⟶ Impede Comportamento Padrão do Formulário (Recarregar Página)
    // ✦ setLoading     ⟶ Estado Carregamento VERDADEIRO! [Carregando...]
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // ➤ try    ⟶ TENTA Executar Requisição do Cadastro
        // ✦ await  ⟶ AGUARDA Resposta da Requisição
        // ✦ axios  ⟶ Realiza Requisição POST HTTP 
        // ✦ form   ⟶ Objetos com Dados de Usuário (Email, Senha, Nome...)
        // ✦ /login ⟶ Após Usuário Registrar com Sucesso é Redirecionado a Tela de Login
        try {
            await axios.post('http://localhost:8001/auth/register', form);
            alert('『✅』Usuário Registrado com SUCESSO!');
            navigate('/login');
        } 

        // ➤ catch     ⟶ CAPTURA Erro caso Requisição Falhe
        // ✦ err       ⟶ Objeto Erro Retornado pela Requisição
        // ✦ response? ⟶ Resposta HTTP Backend (Detalhes do Erro)
        // ✦ data?     ⟶ Corpo da Resposta (JSON)
        // ✦ detail    ⟶ Mensagem Erro Backend
        // ✦ 1 ⟶ 『⚠️』 — Email e Senha são OBRIGATÓRIOS!
        // ✦ 2 ⟶ 『⚠️』 — Email JÁ Cadastrado!
        catch (err) {
            alert(err.response?.data?.detail || ' — Erro ao Registrar, Tente Novamente!');
        } 

        // ➤ finally    ⟶ FINALMENTE... (Com ou Sem Erro)
        // ✦ setLoading ⟶ Estado Carregamento FALSO! [Tela Carregada!]
        finally {
            setLoading(false);
        }
    };

    // ➤ return ⟶ HTTP
    return (

        <div 
        className="bg-cover bg-center min-h-screen" 
        style={{ backgroundImage: "url('/src/assets/wallpaper.png')" }}
        >

            <div 
            className="max-w-sm mx-auto p-6 bg-white bg-opacity-75 rounded-lg shadow-md mt-24"
            >

                <h1 className="text-2xl font-bold mb-4">
                    Cadastro
                </h1>

                <form 
                onSubmit={handleSubmit}
                >

                    <input 
                    className="border p-2 w-full mb-2" 
                    placeholder="Nome" 
                    value={form.nome}
                        onChange={(e) => setForm({ ...form, nome: e.target.value })} 
                        required 
                    />

                    <input 
                    className="border p-2 w-full mb-2"
                    type="email" 
                    placeholder="Email" 
                    value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })} 
                        required 
                    />

                    <input 
                    className="border p-2 w-full mb-2" 
                    type="password" 
                    placeholder="Senha" 
                    value={form.senha}
                        onChange={(e) => setForm({ ...form, senha: e.target.value })} 
                        required 
                    />

                    <select 
                    className="border p-2 w-full mb-4"
                    value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                        <option value="organizador">
                            Organizador
                        </option>

                        <option value="participante">
                            Participante
                        </option>
                    </select>

                    {/* ➤ button ⟶ Botão Cadastro */}
                    {/* ➤ type ⟶ TIPO submit / Enviar (handleSubmit) */}
                    <button 
                    type="submit" 
                    disabled={loading} 
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                    >
                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </button> {/* FIM - Botão Cadastro */}

                </form> {/* FIM - form Cadastro */}

            </div> {/* FIM - container */}

        </div> // FIM - background

    ); // FIM - return 

} // FIM - Register()
