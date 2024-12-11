import React, { useState } from "react";
import { useAdicionarCao } from "../../hooks/useCao";
import { useAuthValue } from "../../context/AuthContext";
import styles from "./DogProfileForm.module.css";

export const TamanhoCao = {
  Pequeno: 0,
  Medio: 1,
  Grande: 2,
};

export const GeneroCao = {
  Masculino: 0,
  Feminino: 1,
};

const DogProfileForm = () => {
  const { user, userInfo } = useAuthValue();
  const { adicionarCao, isLoading, error } = useAdicionarCao();
  const [formData, setFormData] = useState({
    nome: "",
    raca: "",
    cidade: "",
    estado: "",
    descricao: "",
    tamanho: TamanhoCao.Pequeno,
    genero: GeneroCao.Masculino,
    idade: 0,
    caracteristicasUnicas: "",
    fotos: [
      {
        caminhoArquivo: "string",
        descricao: "string",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "tamanho" || name === "genero" ? parseInt(value, 10) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await adicionarCao(userInfo.usuarioId, formData);

    if (result) {
      alert("Cão adicionado com sucesso!");
      setFormData({
        nome: "",
        raca: "",
        cidade: "",
        estado: "",
        descricao: "",
        tamanho: TamanhoCao.Pequeno,
        genero: GeneroCao.Masculino,
        idade: 0,
        caracteristicasUnicas: "",
        fotos: [
          {
            caminhoArquivo: "string",
            descricao: "string",
          },
        ],
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Adicionar Cão</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fieldGroup}>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.fieldGroup}>
          <label>Raça:</label>
          <select
            name="raca"
            value={formData.raca}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="Golden Retriever">Golden Retriever</option>
            <option value="Pit Bull">Pit Bull</option>
            <option value="Labrador Retriever">Labrador Retriever</option>
            <option value="German Shepherd">Pastor Alemão</option>
            <option value="Bulldog Francês">Buldogue Francês</option>
            <option value="Beagle">Beagle</option>
            <option value="Bulldog">Buldogue Inglês</option>
            <option value="Poodle">Poodle</option>
            <option value="Boxer">Boxer</option>
            <option value="Dachshund">Dachshund (Salsicha)</option>
            <option value="Yorkshire Terrier">Yorkshire Terrier</option>
            <option value="Siberian Husky">Husky Siberiano</option>
            <option value="Chihuahua">Chihuahua</option>
            <option value="Shih Tzu">Shih Tzu</option>
            <option value="Rottweiler">Rottweiler</option>
            <option value="Pastor Alemão">Dogue Alemão</option>
            <option value="Cocker Spaniel">Cocker Spaniel</option>
            <option value="Doberman">Doberman</option>
            <option value="Shiba Inu">Shiba Inu</option>
            <option value="Border Collie">Border Collie</option>
            <option value="Pastor Australiano">Pastor Australiano</option>
            <option value="São Bernardo">São Bernardo</option>
            <option value="Basset Hound">Basset Hound</option>
            <option value="Weimaraner">Weimaraner</option>
            <option value="Maltês">Maltês</option>
            <option value="Dalmata">Dálmata</option>
            <option value="Pinscher">Pinscher</option>
          </select>
        </div>
        <div className={styles.fieldGroup}>
          <label>Cidade:</label>
          <input
            type="text"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.fieldGroup}>
          <label>Estado:</label>
          <input
            type="text"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.fieldGroup}>
          <label>Descrição:</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className={styles.textarea}
          />
        </div>
        <div className={styles.fieldGroup}>
          <label>Tamanho:</label>
          <select
            name="tamanho"
            value={formData.tamanho}
            onChange={handleChange}
            className={styles.select}
          >
            <option value={TamanhoCao.Pequeno}>Pequeno</option>
            <option value={TamanhoCao.Medio}>Médio</option>
            <option value={TamanhoCao.Grande}>Grande</option>
          </select>
        </div>
        <div className={styles.fieldGroup}>
          <label>Gênero:</label>
          <select
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            className={styles.select}
          >
            <option value={GeneroCao.Masculino}>Masculino</option>
            <option value={GeneroCao.Feminino}>Feminino</option>
          </select>
        </div>
        <div className={styles.fieldGroup}>
          <label>Idade:</label>
          <input
            type="number"
            name="idade"
            value={formData.idade}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.fieldGroup}>
          <label>Características Únicas:</label>
          <textarea
            name="caracteristicasUnicas"
            value={formData.caracteristicasUnicas}
            onChange={handleChange}
            className={styles.textarea}
          />
        </div>
        <div>
          <ul>
            {formData.fotos.map((foto, index) => (
              <li key={index}>
                Recurso "Adicionar Foto" não implementado. {/* {foto.descricao} - {foto.caminhoArquivo} */}
              </li>
            ))}
          </ul>
        </div>
        <button className={styles.button} type="submit" disabled={isLoading}>
          {isLoading ? "Adicionando..." : "Adicionar Cão"}
        </button>
      </form>
    </div>
  );
};

export default DogProfileForm;
