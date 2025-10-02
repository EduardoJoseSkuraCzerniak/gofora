// ------------------------------------------------------------------
// Arquivo: cegs-app/src/pages/GroupDetails.jsx
// Descrição: Página de detalhes do grupo de compra
// Data: 28.09.2025 
// Última modificação: 28.09.2025 
// ------------------------------------------------------------------  

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { getUsuarioLogado } from '../utils/auth';

export default function GroupDetails() {
    const { id } = useParams();
    const [ceg, setCeg] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [participantes, setParticipantes] = useState([]);
    const usuario = getUsuarioLogado();

    const etapas = [
        '🔓 — Aberto para Inscrições',
        '✈️ — Pagamento do Envio Internacional',
        '💰 — Divisão de Tributos e Taxas',
        '🚚 — Pagamento de Frete Nacional',
        '📪 — Entrega Concluída'
    ];

    useEffect(() => {
        fetchDados();
    }, []);

    async function fetchDados() {
        const { data: cegInfo } = await supabase.from('cegs').select('*').eq('id', id).single();
        const { data: listaProdutos } = await supabase.from('produtos').select('*').eq('ceg_id', id);
        const { data: listaParticipantes } = await supabase.from('participantes').select('*').eq('ceg_id', id);

        setCeg(cegInfo);
        setProdutos(listaProdutos);
        setParticipantes(listaParticipantes);
    }

    function calcularProgresso(etapaAtual) {
        const index = etapas.indexOf(etapaAtual);
        if (index === -1) return 0;
        return ((index + 1) / etapas.length) * 100;
    }

    async function avancarEtapa() {
        const etapaAtual = ceg?.etapa_atual;
        const indexAtual = etapas.indexOf(etapaAtual);
        if (indexAtual === -1 || indexAtual === etapas.length - 1) {
            alert('Não é possível avançar a etapa.');
            return;
        }

        const proximaEtapa = etapas[indexAtual + 1];
        const confirm = window.confirm(`⏩ — Avançar para etapa: "${proximaEtapa}"?`);
        if (!confirm) return;

        try {
            await fetch(`http://localhost:8001/cegs/${id}/etapa`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ etapa_atual: proximaEtapa })
            });
            fetchDados();
        } catch (err) {
            alert('❌ — Erro ao atualizar etapa.');
        }
    }

    if (!ceg) return <p className="text-center mt-10">Carregando...</p>;

    return (
        <div className="bg-cover bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: "url('/src/assets/wallpaper.png')" }}>
            <div className="max-w-3xl mx-auto p-6 bg-white bg-opacity-75 rounded-lg shadow-md mt-10">
                <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-1">Etapa: {ceg.etapa_atual}</p>
                    <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                        <div
                            className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                            style={{ width: `${calcularProgresso(ceg.etapa_atual)}%` }}
                        ></div>
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-4">Detalhes do Grupo: {ceg.nome}</h1>
                <p className="mb-2">Loja: {ceg.loja}</p>
                <p className="mb-2">País: {ceg.pais}</p>
                <p className="mb-4">Status: {ceg.status}</p>

                <div className="bg-gray-100 p-4 rounded mb-6">
                    <h2 className="text-lg font-semibold mb-2">Etapas do Grupo</h2>
                    <ol className="space-y-2">
                        {etapas.map((etapa, i) => {
                            const dataCampo = `data_${etapa.toLowerCase().replaceAll(' ', '_')}`;
                            return (
                                <li key={etapa} className={`p-2 rounded ${etapa === ceg.etapa_atual ? 'bg-blue-100 font-bold' : ''}`}>
                                    {i + 1}. {etapa}
                                    {ceg[dataCampo] && (
                                        <span className="ml-2 text-sm text-gray-500">
                                            ({new Date(ceg[dataCampo]).toLocaleDateString()})
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                    {usuario?.role === 'organizador' && (
                        <button onClick={avancarEtapa} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                            Avançar para próxima etapa
                        </button>
                    )}
                </div>

                <h2 className="text-xl font-semibold mt-6 mb-2">Produtos</h2>
                {produtos.length === 0 && <p className="text-gray-500">Nenhum produto adicionado ainda.</p>}
                <ul className="mb-4">
                    {produtos.map(p => (
                        <li key={p.id} className="border p-2 rounded mb-2">{p.nome} — R$ {p.preco.toFixed(2)}</li>
                    ))}
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">Participantes</h2>
                {participantes.length === 0 && <p className="text-gray-500">Ninguém entrou ainda.</p>}
                <ul>
                    {participantes.map(p => (
                        <li key={p.id} className="border p-2 rounded mb-2 bg-gray-50">{p.nome} — Total: R$ {Number(p.total).toFixed(2)}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
