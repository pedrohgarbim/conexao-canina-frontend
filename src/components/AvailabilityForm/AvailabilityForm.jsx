import React, { useState, useEffect } from 'react';
import { Modal } from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styles from './AvailabilityForm.module.css';  // Estilos de CSS

const AvailabilityForm = ({ user, calendarOwnerId, sharedUsers }) => {
  // Estado para controle de autorização
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Verifica se o usuário tem permissão para visualizar o calendário
  useEffect(() => {
    if (user.id === calendarOwnerId || sharedUsers.includes(user.id)) {
      setIsAuthorized(true);
    }
  }, [user.id, calendarOwnerId, sharedUsers]);

  // Estado do modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para abrir o modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Função de envio do formulário
  const handleSubmit = (values) => {
    console.log('Valores do formulário:', values);
    handleCloseModal();
  };

  // Se o usuário não tiver permissão, exibe uma mensagem de erro
  if (!isAuthorized) {
    return <div>Você não tem permissão para visualizar ou editar este calendário.</div>;
  }

  return (
    <div className={styles.availabilityFormContainer}>
      <button onClick={handleOpenModal} className={styles.availabilityFormButton}>
        Abrir Calendário
      </button>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
          <h2>Editar Disponibilidade</h2>
          <Formik
            initialValues={{ date: '', time: '', note: '' }}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className={styles.availabilityFormField}>
                  <label>Data:</label>
                  <Field type="date" name="date" className={styles.availabilityFormInput} />
                  <ErrorMessage name="date" component="div" className={styles.availabilityFormError} />
                </div>

                <div className={styles.availabilityFormField}>
                  <label>Horário:</label>
                  <Field as="select" name="time" className={styles.availabilityFormSelect}>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                  </Field>
                  <ErrorMessage name="time" component="div" className={styles.availabilityFormError} />
                </div>

                <div className={styles.availabilityFormField}>
                  <label>Nota:</label>
                  <Field as="textarea" name="note" className={styles.availabilityFormTextarea} />
                  <ErrorMessage name="note" component="div" className={styles.availabilityFormError} />
                </div>

                <button type="submit" className={styles.availabilityFormButton}>Salvar Alterações</button>
              </Form>
            )}
          </Formik>
          <button onClick={handleCloseModal}>Fechar</button>
        </Modal>
      )}
    </div>
  );
};

export default AvailabilityForm;
