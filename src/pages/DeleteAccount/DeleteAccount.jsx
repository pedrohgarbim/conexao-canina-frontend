import React, { useState } from 'react';

const DeleteAccount = () => {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDelete = () => {
        // Aqui você pode adicionar a lógica para excluir o perfil
        setShowConfirmation(true);
        // Adicione lógica para deletar o perfil do backend
    };

    return (
        <div className="delete-account-container">
            <h2>Excluir Conta</h2>
            <p className="warning-message">
                Atenção: A exclusão do seu perfil é permanente e não pode ser desfeita. 
                Se você desejar retornar após a exclusão, será necessário criar um novo perfil.
            </p>
            <button onClick={handleDelete}>Excluir Meu Perfil</button>

            {showConfirmation && (
                <div className="confirmation-notification">
                    <p>
                        Sua solicitação de exclusão foi recebida. 
                        Atenção: A exclusão do seu perfil é permanente e não pode ser desfeita. 
                        Se você desejar retornar após a exclusão, será necessário criar um novo perfil.
                    </p>
                </div>
            )}
        </div>
    );
};

export default DeleteAccount;
