// ------------------------------------------------------------------
// Arquivo: cegs-app/src/pages/Login.jsx
// Descrição: Página de login para autenticação de usuários
// Data: 28.09.2025 
// Última modificação: 28.09.2025 
// ------------------------------------------------------------------

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [form, setForm] = useState({ email: '', senha: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8001/auth/login', form);
            localStorage.setItem('usuario', JSON.stringify(res.data.usuario));
            alert('Login realizado com sucesso!');
            navigate('/cegs');
        } catch (err) {
            alert(err.response?.data?.detail || 'Erro ao fazer login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('/src/assets/wallpaper.png')" }}>
            <div className="max-w-sm mx-auto p-6 bg-white bg-opacity-75 rounded-lg shadow-md mt-24">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
                    <input className="border p-2 w-full mb-2" placeholder="Email" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                    <input className="border p-2 w-full mb-4" type="password" placeholder="Senha" value={form.senha}
                        onChange={(e) => setForm({ ...form, senha: e.target.value })} required />
                    <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}
