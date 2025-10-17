// ------------------------------------------------------------------   
// Arquivo: gofora/cegs-app/src/pages/Participants.jsx
// Descrição: Página para Gerenciar Participantes de um Grupo de Compra (CEG)
// Data: 28.09.2025 
// Última modificação: 28.09.2025 
// ------------------------------------------------------------------

// ➤ Importações de Hooks
// ✦ useEffect ⟶
// ✦ useState  ⟶ Estado Local do Componente
// ✦ react     ⟶ 
import { useEffect, useState } from 'react';
// ✦ useParams        ⟶ 
// ✦ react-router-dom ⟶
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://kcogilktcfzfskydwpry.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtjb2dpbGt0Y2Z6ZnNreWR3cHJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5OTMzNjMsImV4cCI6MjA2NjU2OTM2M30.nzicy5AkNm3wh80XvuxEcunu8RE-CLSEeVvQIaM6AmU'
);

export default function Participants() {
    const { id } = useParams();
    const [participantes, setParticipantes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [nome, setNome] = useState('');
    const [selecionados, setSelecionados] = useState({});

    useEffect(() => {
        const nomeSalvo = localStorage.getItem('nome_participante');
        if (nomeSalvo) setNome(nomeSalvo);
    }, []);

    useEffect(() => {
        if (nome) localStorage.setItem('nome_participante', nome);
    }, [nome]);

    useEffect(() => {
        fetchDados();
    }, [id]);

    async function fetchDados() {
        const { data: lista } = await supabase.from('participantes').select('*').eq('ceg_id', id);
        const { data: produtosLista } = await supabase.from('produtos').select('*').eq('ceg_id', id);
        setParticipantes(lista || []);
        setProdutos(produtosLista || []);
    }

    const toggleProduto = (produto_id) => {
        setSelecionados((prev) => {
            const novo = { ...prev };
            if (novo[produto_id]) delete novo[produto_id];
            else novo[produto_id] = 1;
            return novo;
        });
    };

    const alterarQuantidade = (produto_id, quantidade) => {
        setSelecionados((prev) => ({
            ...prev,
            [produto_id]: Math.max(1, Number(quantidade))
        }));
    };

    const adicionarParticipante = async () => {
        if (!nome || Object.keys(selecionados).length === 0) {
            alert('Informe seu nome e selecione ao menos um produto.');
            return;
        }

        if (participantes.find((p) => p.nome === nome)) {
            alert('Você já está participando deste grupo.');
            return;
        }

        const produtosFormatados = Object.entries(selecionados).map(([produto_id, quantidade]) => ({
            produto_id,
            quantidade
        }));

        await fetch('http://localhost:8001/participantes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, ceg_id: id, produtos: produtosFormatados })
        });

        setSelecionados({});
        fetchDados();
    };

    return (
        <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('/src/assets/wallpaper.png')" }}>
            <div className="max-w-xl mx-auto p-6 bg-white bg-opacity-75 rounded-lg shadow-md mt-10">
                <h1 className="text-3xl font-bold mb-6 text-center">Participar do Grupo</h1>
                <input className="border p-3 w-full rounded mb-4" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                <h2 className="font-semibold mb-2">Escolha seus produtos:</h2>
                {produtos.map((p) => (
                    <div key={p.id} className="flex items-center mb-3 gap-3">
                        <input type="checkbox" checked={p.id in selecionados} onChange={() => toggleProduto(p.id)} />
                        <span className="flex-1">{p.nome} - R$ {p.preco.toFixed(2)}</span>
                        {p.id in selecionados && (
                            <input type="number" min="1" className="border w-16 p-1 rounded" value={selecionados[p.id]} onChange={(e) => alterarQuantidade(p.id, e.target.value)} />
                        )}
                    </div>
                ))}
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full mt-4" onClick={adicionarParticipante}>Confirmar Participação</button>
                <h2 className="text-xl font-bold mt-8 mb-4">Participantes</h2>
                {participantes.length === 0 ? (
                    <p className="text-gray-500 text-center">Nenhum participante ainda.</p>
                ) : (
                    participantes.map((p) => (
                        <div key={p.id} className="border rounded p-4 mb-3 bg-gray-50">
                            <h3 className="font-semibold text-lg">{p.nome}</h3>
                            <p className="text-sm text-gray-700">Produtos: {p.produtos || 'N/A'}</p>
                            <p className="font-bold text-blue-700">Total: R$ {p.total?.toFixed(2)}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
