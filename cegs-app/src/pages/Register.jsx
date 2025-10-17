// ------------------------------------------------------------------
// Arquivo: gofora/cegs-app/src/pages/Register.jsx
// Descrição: Página de registro de novos usuários
// Data: 28.09.2025 
// Última modificação: 28.09.2025 
// ------------------------------------------------------------------   

// ➤ Importações de Hooks
// ✦ useState ⟶ Estado Local do Componente
// ✦ react    ⟶ 
import { useState } from 'react';
// ✦ useNavigate      ⟶ Navegação Programática entre Rotas
// ✦ react-router-dom ⟶ 
import { useNavigate } from 'react-router-dom';

// ➤ Importação de Biblioteca
// ✦ axios ⟶ Requisições HTTP 
import axios from 'axios';


export default function Register() {
    const [form, setForm] = useState({ email: '', senha: '', nome: '', role: 'participante' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:8001/auth/register', form);
            alert('Usuário registrado com sucesso!');
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.detail || 'Erro ao registrar');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('/src/assets/wallpaper.png')" }}>
            <div className="max-w-sm mx-auto p-6 bg-white bg-opacity-75 rounded-lg shadow-md mt-24">
                <h1 className="text-2xl font-bold mb-4">Cadastro</h1>
                <form onSubmit={handleSubmit}>
                    <input className="border p-2 w-full mb-2" placeholder="Nome" value={form.nome}
                        onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
                    <input className="border p-2 w-full mb-2" type="email" placeholder="Email" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                    <input className="border p-2 w-full mb-2" type="password" placeholder="Senha" value={form.senha}
                        onChange={(e) => setForm({ ...form, senha: e.target.value })} required />
                    <select className="border p-2 w-full mb-4" value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}>
                        <option value="organizador">Organizador</option>
                        <option value="participante">Participante</option>
                    </select>
                    <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}
