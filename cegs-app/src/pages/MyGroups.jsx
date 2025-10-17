// ------------------------------------------------------------------
// Arquivo: gofora/cegs-app/src/pages/MyGroups.jsx
// Descrição: Página que Exibe os Grupos Criados pelo Usuário Logado
// Data: 28.09.2025 
// Última modificação: 28.09.2025 
// ------------------------------------------------------------------

import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUsuarioLogado } from '../utils/auth';

export default function MyGroups() {
    const [cegs, setCegs] = useState([]);
    const usuario = getUsuarioLogado();

    useEffect(() => {
        if (usuario?.id) {
            axios.get(`http://localhost:8001/cegs/mine?usuario_id=${usuario.id}`)
                .then(res => setCegs(res.data))
                .catch(err => alert('Erro ao carregar seus grupos'))
        }
    }, [usuario]);

    return (
        <div className="bg-cover bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: "url('/src/assets/wallpaper.png')" }}>
            <div className="max-w-xl mx-auto p-4 bg-white bg-opacity-75 rounded-lg shadow-md mt-10">
                <h1 className="text-2xl font-bold mb-4">Meus Grupos Criados</h1>
                {cegs.length === 0 && <p className="text-gray-500">Nenhum grupo seu ainda.</p>}
                {cegs.map((ceg) => (
                    <div key={ceg.id} className="border p-3 rounded mb-3 bg-white shadow-md">
                        <h2 className="font-semibold text-xl">{ceg.nome}</h2>
                        <p className="text-sm">Loja: {ceg.loja}</p>
                        <p className="text-sm">País: {ceg.pais}</p>
                        <p className="text-sm">Status: {ceg.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
