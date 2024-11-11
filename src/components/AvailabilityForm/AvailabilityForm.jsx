import React, { useState } from "react";
import Calendar from "react-calendar";
import DatePicker from "react-datepicker";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "./AvailabilityForm.module.css";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";

const AvailabilityForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availabilityList, setAvailabilityList] = useState([]);

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
      const response = await axios.post("/api/availability", {
        date,
        time,
        note
      });
      setAvailabilityList([...availabilityList, response.data]);
      resetForm();
      alert("Disponibilidade adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar disponibilidade:", error);
      alert("Erro ao enviar disponibilidade.");
    }
  };

  return (
    <div className={styles.availabilityFormContainer}>
      <h2 className={styles.availabilityFormTitle}>Adicionar Disponibilidade</h2>
      <Calendar onChange={setSelectedDate} value={selectedDate} />

      <Formik
        initialValues={{ date: selectedDate, time: "", note: "" }}
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailabilityForm;
