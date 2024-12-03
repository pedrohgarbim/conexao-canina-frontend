import React, { useState } from "react";
import {useAdicionarCao} from "../../hooks/useCao";
import { useAuthValue } from "../../context/AuthContext";

// Definições dos enums
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
    tamanho: TamanhoCao.Pequeno, // Valor inicial como número
    genero: GeneroCao.Masculino, // Valor inicial como número
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
    <div>
      <h2>Adicionar Cão</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Raca</label>
          <select
            name="raca"
            value={formData.raca}
            onChange={handleChange}
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
        <div>
          <label>Cidade:</label>
          <input
            type="text"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Estado:</label>
          <input
            type="text"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Tamanho:</label>
          <select
            name="tamanho"
            value={formData.tamanho}
            onChange={handleChange}
          >
            <option value={TamanhoCao.Pequeno}>Pequeno</option>
            <option value={TamanhoCao.Medio}>Médio</option>
            <option value={TamanhoCao.Grande}>Grande</option>
          </select>
        </div>
        <div>
          <label>Gênero:</label>
          <select
            name="genero"
            value={formData.genero}
            onChange={handleChange}
          >
            <option value={GeneroCao.Masculino}>Masculino</option>
            <option value={GeneroCao.Feminino}>Feminino</option>
          </select>
        </div>
        <div>
          <label>Idade:</label>
          <input
            type="number"
            name="idade"
            value={formData.idade}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Características Únicas:</label>
          <textarea
            name="caracteristicasUnicas"
            value={formData.caracteristicasUnicas}
            onChange={handleChange}
          />
        </div>
        <div>
          <ul>
            {formData.fotos.map((foto, index) => (
              <li key={index}>
                {foto.descricao} - {foto.caminhoArquivo}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Adicionando..." : "Adicionar Cão"}
        </button>
      </form>
    </div>
  );
};

export default DogProfileForm;
