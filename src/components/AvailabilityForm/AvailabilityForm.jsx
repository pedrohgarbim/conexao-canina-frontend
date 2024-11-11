import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import DatePicker from "react-datepicker";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Modal from "react-modal";
import styles from "./AvailabilityForm.module.css";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";

// Definindo o modal root
Modal.setAppElement("#root");

const AvailabilityForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availabilityList, setAvailabilityList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentAvailability, setCurrentAvailability] = useState(null);
  const [calendarLink, setCalendarLink] = useState(""); // Link de compartilhamento

  useEffect(() => {
    const fetchAvailabilityList = async () => {
      try {
        const response = await axios.get("/api/availability");
        setAvailabilityList(response.data);
      } catch (error) {
        console.error("Erro ao carregar as disponibilidades:", error);
      }
    };

    fetchAvailabilityList();
  }, []);

  const validationSchema = Yup.object().shape({
    date: Yup.date().required("Data é obrigatória").min(new Date(), "A data deve ser no futuro"),
    time: Yup.string().required("Horário é obrigatório"),
    note: Yup.string().max(100, "A nota não pode ter mais de 100 caracteres")
  });

  const hasConflict = (date, time) => {
    return availabilityList.some((availability) => {
      return (
        availability.date.toDateString() === date.toDateString() &&
        availability.time === time
      );
    });
  };

  const handleSubmit = async (values, { resetForm }) => {
    const { date, time, note } = values;

    if (hasConflict(date, time)) {
      alert("Conflito: Já existe uma disponibilidade para este horário.");
      return;
    }

    try {
      const response = await axios.post("/api/availability", { date, time, note });
      setAvailabilityList([...availabilityList, response.data]);
      resetForm();
      alert("Disponibilidade adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar disponibilidade:", error);
      alert("Erro ao enviar disponibilidade.");
    }
  };

  const handleEdit = (availability) => {
    setCurrentAvailability(availability);
    setModalIsOpen(true);
  };

  const handleDelete = (availability) => {
    setAvailabilityList(availabilityList.filter(item => item !== availability));
    setModalIsOpen(false);
    axios.delete(`/api/availability/${availability.id}`)
      .catch((error) => {
        console.error("Erro ao deletar a disponibilidade", error);
        alert("Erro ao remover a disponibilidade");
      });
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const generateCalendarLink = () => {
    const link = `/calendar/view-only`;
    setCalendarLink(link);
  };

  const renderCalendarTile = ({ date, view }) => {
    const availability = availabilityList.find(
      (item) => item.date.toDateString() === date.toDateString()
    );

    const isAvailable = availability ? "available" : "unavailable";
    return (
      <div className={styles.calendarTile}>
        <div className={styles[isAvailable]}>
          {date.getDate()}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.availabilityFormContainer}>
      <h2 className={styles.availabilityFormTitle}>Adicionar Disponibilidade</h2>

      {/* Calendário com navegação */}
      <div className={styles.calendarContainer}>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          onClickDay={(date) => {
            const availability = availabilityList.find(
              (availability) => availability.date.toDateString() === date.toDateString()
            );
            if (availability) {
              handleEdit(availability);
            }
          }}
          tileContent={renderCalendarTile}
        />
      </div>

      {/* Formulário para adicionar nova disponibilidade */}
      <Formik
        initialValues={{
          date: selectedDate,
          time: "",
          note: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className={styles.availabilityForm}>
            <div className={styles.availabilityFormField}>
              <label>Data Selecionada:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setFieldValue("date", date);
                }}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
              />
              <ErrorMessage name="date" component="div" className={styles.availabilityFormError} />
            </div>

            <div className={styles.availabilityFormField}>
              <label>Horário:</label>
              <Field as="select" name="time" className={styles.availabilityFormSelect}>
                <option value="">Selecione o horário</option>
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
              <Field as="textarea" name="note" placeholder="Adicione uma nota" className={styles.availabilityFormTextarea} />
              <ErrorMessage name="note" component="div" className={styles.availabilityFormError} />
            </div>

            <button type="submit" className={styles.availabilityFormButton}>Adicionar Disponibilidade</button>
          </Form>
        )}
      </Formik>

      <h3 className={styles.availabilityFormSubtitle}>Disponibilidades Atuais</h3>
      <ul className={styles.availabilityFormList}>
        {availabilityList.map((availability, index) => (
          <li key={index} className={styles.availabilityFormListItem}>
            {availability.date.toDateString()} - {availability.time} - {availability.note}
            <button onClick={() => handleEdit(availability)}>Editar</button>
            <button onClick={() => handleDelete(availability)}>Remover</button>
          </li>
        ))}
      </ul>

      {/* Botão para compartilhar o link */}
      <div className={styles.shareContainer}>
        <button onClick={generateCalendarLink} className={styles.shareButton}>
          Gerar Link de Compartilhamento
        </button>
        {calendarLink && (
          <div className={styles.shareLink}>
            <label>Link para Compartilhar:</label>
            <input type="text" value={window.location.origin + calendarLink} readOnly />
          </div>
        )}
      </div>

      {/* Modal de edição */}
      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal} contentLabel="Editar Disponibilidade">
        <h2>Editar Disponibilidade</h2>
        {currentAvailability && (
          <Formik
            initialValues={{
              date: currentAvailability.date,
              time: currentAvailability.time,
              note: currentAvailability.note,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              const updatedAvailability = {
                ...currentAvailability,
                ...values,
              };

              setAvailabilityList(availabilityList.map(item => 
                item.id === updatedAvailability.id ? updatedAvailability : item
              ));
              setModalIsOpen(false);
              alert("Disponibilidade atualizada com sucesso!");
              resetForm();
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className={styles.availabilityFormField}>
                  <label>Data Selecionada:</label>
                  <DatePicker
                    selected={currentAvailability.date}
                    onChange={(date) => {
                      setFieldValue("date", date);
                    }}
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                  />
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
        )}
        <button onClick={handleCloseModal}>Fechar</button>
      </Modal>
    </div>
  );
};

export default AvailabilityForm;
