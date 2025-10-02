// ------------------------------------------------------------------
// Arquivo: cegs-app/src/pages/CreateGroup.jsx
// Descrição: Página para criação de novos grupos
// Data: 28.09.2025 
// Última modificação: 28.09.2025 
// ------------------------------------------------------------------

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { getUsuarioLogado } from '../utils/auth';

const supabase = createClient(
    'https://kcogilktcfzfskydwpry.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtjb2dpbGt0Y2Z6ZnNreWR3cHJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5OTMzNjMsImV4cCI6MjA2NjU2OTM2M30.nzicy5AkNm3wh80XvuxEcunu8RE-CLSEeVvQIaM6AmU'
);

export default function CreateGroup() {
    const [form, setForm]
        = useState({
            nome: '',
            loja: '',
            pais: '',
            status: 'aberto'
        });

    const [produtos, setProdutos] =
        useState([{
            nome: '',
            preco: ''
        }]);

    const [loading, setLoading] =
        useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const usuario = getUsuarioLogado();

        if (!usuario || usuario.role !== 'organizador') {
            alert('⚠️ — Apenas organizadores podem criar grupos.');
            navigate('/cegs');
        }

    }, []);

    const handleAddProduto = () => {
        setProdutos([...produtos, {
            nome: '',
            preco: ''
        }]);
    };

    const handleProdutoChange = (index, field, value) => {
        const novos = [...produtos];
        novos[index][field] = value;
        setProdutos(novos);
    };

    const handleSubmit = async () => {
        if (!form.nome || !form.loja || !form.pais) {
            alert('⚠️ — Preencha todos os campos do grupo.');
            return;
        }

        const produtosValidos =
            produtos.filter(p => p.nome.trim()
                !== ''
                && !isNaN(parseFloat(p.preco))
            );

        if (produtosValidos.length === 0) {
            alert('⚠️ — Adicione ao menos um produto válido.');
            return;
        }

        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('cegs')
                .insert([form])
                .select()
                .single();

            if (error) throw error;

            const ceg_id = data.id;

            const produtosFormatados = produtosValidos.map(p => ({
                nome: p.nome,
                preco: parseFloat(p.preco),
                ceg_id,
            }));

            await supabase.from('produtos').insert(produtosFormatados);
            alert('Grupo criado com sucesso!');
            navigate('/cegs');
        } catch (err) {
            console.error(err);
            alert('❌ — Erro ao criar grupo. Verifique os dados.');
        } finally {
            setLoading(false);
        }
    };

    return (

        <div
            className="bg-cover bg-center min-h-screen flex items-center justify-center"
            style={{ backgroundImage: "url('/src/assets/wallpaper.png')" }}
        >

            <div className="max-w-xl w-full p-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">Criar Grupo</h1>

                <input
                    className="border p-2 w-full mb-3 rounded"
                    placeholder="👥 — Nome do grupo"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                />
                <input
                    className="border p-2 w-full mb-3 rounded"
                    placeholder="🏪 — Loja"
                    value={form.loja}
                    onChange={(e) => setForm({ ...form, loja: e.target.value })}
                />
                <input
                    className="border p-2 w-full mb-4 rounded"
                    placeholder="🌏 —  País de origem"
                    value={form.pais}
                    onChange={(e) => setForm({ ...form, pais: e.target.value })}
                />

                <h2 className="text-lg font-semibold mb-2">Produtos</h2>
                {produtos.map((p, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                        <input
                            className="border p-2 w-full rounded"
                            placeholder="📦 — Nome do produto"
                            value={p.nome}
                            onChange={(e) => handleProdutoChange(i, 'nome', e.target.value)}
                        />
                        <input
                            type="number"
                            step="0.01"
                            className="border p-2 w-32 rounded"
                            placeholder="Preço"
                            value={p.preco}
                            onChange={(e) => handleProdutoChange(i, 'preco', e.target.value)}
                        />
                    </div>
                ))}

                <button
                    type="button"
                    className="text-blue-600 underline text-sm mb-4"
                    onClick={handleAddProduto}
                >
                    + Adicionar Produto
                </button>

                <div className="flex gap-3 mt-2">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
                    >
                        {loading ? '💾 — Salvando...' : '💾 — Salvar Grupo'}
                    </button>
                    <button
                        onClick={() => navigate('/cegs')}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}
