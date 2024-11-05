// src/Acompanhamento.jsx
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Acompanhamento.module.css';

const Acompanhamento = () => {
    const [sugestoes, setSugestoes] = useState([]);

    useEffect(() => {
        // Simulação de chamada a API para buscar sugestões
        const fetchSugestoes = async () => {
            const resposta = await fetch('/api/sugestoes'); // Substitua pela sua API real
            const data = await resposta.json();
            setSugestoes(data);
        };

        fetchSugestoes();
    }, []);

    const notify = (mensagem) => {
        toast.success(mensagem);
    };

    // Simular a atualização do status de uma sugestão
    const atualizarStatus = (id) => {
        // Aqui você deve implementar a lógica de atualização do status
        // Simulando uma atualização com um timeout
        setTimeout(() => {
            notify(`Sugestão ${id} foi implementada!`);
            setSugestoes((prev) =>
                prev.map((sugestao) =>
                    sugestao.id === id ? { ...sugestao, status: 'Implementada' } : sugestao
                )
            );
        }, 1000);
    };

    return (
        <div className={styles.container}>
            <h1>Acompanhamento de Sugestões</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Data de Envio</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {sugestoes.map((sugestao) => (
                        <tr key={sugestao.id}>
                            <td>{sugestao.descricao}</td>
                            <td>{new Date(sugestao.dataEnvio).toLocaleDateString()}</td>
                            <td>{sugestao.status}</td>
                            <td>
                                {sugestao.status !== 'Implementada' && (
                                    <button onClick={() => atualizarStatus(sugestao.id)}>Atualizar Status</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default Acompanhamento;
