// ------------------------------------------------------------------
// Arquivo: cegs-app/src/pages/Dashboard.jsx
// Descrição: Página do dashboard que lista os grupos de compra
// Data: 28.09.2025 
// Última modificação: 28.09.2025 
// ------------------------------------------------------------------

import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { Link } from 'react-router-dom';
import { getUsuarioLogado } from '../utils/auth';

export default function Dashboard() {
    const [cegs, setCegs] = useState([]);
    const usuario = getUsuarioLogado();

    useEffect(() => {
        fetchCegs();
    }, []);

    async function fetchCegs() {
        const { data, error } = await supabase.from('cegs').select('*');
        if (error) {
            console.error(error);
            return;
        }
        setCegs(data);
    }

    return (
        <div className="bg-cover bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: "url('/src/assets/wallpaper.png')" }}>
            <div className="max-w-xl mx-auto p-4 bg-white bg-opacity-75 rounded-lg shadow-md mt-10">
                <h1 className="text-2xl font-bold mb-4">Lista de Grupos de Compra</h1>
                {usuario?.role === 'organizador' && (
                    <>
                        <Link to="/cegs/create" className="bg-green-600 text-white px-4 py-2 rounded mb-2 inline-block">
                            🆕 — Criar Novo Grupo
                        </Link>
                        <Link to="/meus-grupos" className="text-blue-600 underline block mb-4">
                            🔎 — Ver meus grupos
                        </Link>
                    </>
                )}
                <div className="mt-4">
                    {cegs.length === 0 && <p className="text-gray-500">Nenhum grupo cadastrado.</p>}
                    {cegs.map(ceg => (
                        <div key={ceg.id} className="border p-3 rounded mb-3 bg-white shadow-md">
                            <h2 className="font-semibold text-xl">{ceg.nome}</h2>
                            <p className="text-sm">Loja: {ceg.loja}</p>
                            <p className="text-sm">País: {ceg.pais}</p>
                            <p className="text-sm">Status: {ceg.status}</p>
                            <Link
                                to={`/cegs/${ceg.id}/participantes`}
                                className="bg-blue-600 text-white px-3 py-1 rounded mt-2 inline-block"
                            >
                                👤 — Ver Participantes
                            </Link>
                            <Link
                                to={`/cegs/${ceg.id}/detalhes`}
                                className="text-sm text-blue-700 underline ml-3"
                            >
                                📜 — Ver Detalhes
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
