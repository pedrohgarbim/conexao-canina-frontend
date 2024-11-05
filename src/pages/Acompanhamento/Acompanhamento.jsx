// src/Acompanhamento.jsx
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Acompanhamento.module.css';

const Acompanhamento = () => {
    const [sugestoes, setSugestoes] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [respostas, setRespostas] = useState({});
    
    useEffect(() => {
        // Simulação de chamada a API para buscar sugestões
        const fetchSugestoes = async () => {
            const resposta = await fetch('/api/sugestoes'); // Substitua pela sua API real
            const data = await resposta.json();
            setSugestoes(data);
        };

        // Simulação de chamada a API para buscar feedbacks
        const fetchFeedbacks = async () => {
            const resposta = await fetch('/api/feedbacks'); // Substitua pela sua API real
            const data = await resposta.json();
            setFeedbacks(data);
        };

        fetchSugestoes();
        fetchFeedbacks();
    }, []);

    const notify = (mensagem) => {
        toast.success(mensagem);
    };

    const atualizarStatus = (id) => {
        setTimeout(() => {
            notify(`Sugestão ${id} foi implementada!`);
            setSugestoes((prev) =>
                prev.map((sugestao) =>
                    sugestao.id === id ? { ...sugestao, status: 'Implementada' } : sugestao
                )
            );
        }, 1000);
    };

    const handleRespostaChange = (id, value) => {
        setRespostas({ ...respostas, [id]: value });
    };

    const enviarResposta = (id) => {
        notify(`Resposta enviada para o feedback ${id}!`);
        // Aqui você pode implementar a lógica para enviar a resposta para a API
        setRespostas({ ...respostas, [id]: '' }); // Limpar campo após envio
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

            <h2>Feedbacks Recebidos</h2>
            {feedbacks.length === 0 ? (
                <p>Não há feedbacks disponíveis.</p>
            ) : (
                feedbacks.map((feedback) => (
                    <div key={feedback.id} className={styles.feedback}>
                        <p><strong>Feedback:</strong> {feedback.mensagem}</p>
                        <p><strong>Data:</strong> {new Date(feedback.data).toLocaleDateString()}</p>
                        <textarea
                            placeholder="Sua resposta..."
                            value={respostas[feedback.id] || ''}
                            onChange={(e) => handleRespostaChange(feedback.id, e.target.value)}
                        />
                        <button onClick={() => enviarResposta(feedback.id)}>Enviar Resposta</button>
                    </div>
                ))
            )}

            <ToastContainer />
        </div>
    );
};

export default Acompanhamento;
