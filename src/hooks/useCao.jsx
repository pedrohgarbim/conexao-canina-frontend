// src/hooks/useCaoApi.js
import { useState, useEffect } from 'react';
import axios from 'axios'

export const useFetchCaes = () => {
  const api = axios.create({
    baseURL: 'https://localhost:7060/api/', 
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaes = async () => {
      try {
        const response = await api.get('cao');
        console.log(response.data)
        setData(response.data);
      } catch (err) {
        console.log(err.message)
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCaes();
  }, []);

  return { data, loading, error };
};

export const useFetchCaoById = (id) => {
  const api = axios.create({
    baseURL: 'https://localhost:7060/api/', 
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect disparado com id:", id);
    const fetchCaoById = async () => {
      console.log("Dentro do fetchCaoById");
      try {
        const response = await api.get(`cao/${id}`);
        console.log("Resposta da API:", response.data);
        setData(response.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
        console.log("Finalizando fetchCaoById");
      }
    };
    
    if (id) {
      fetchCaoById();
    }
  }, [id]);

  return { data, loading, error };
};

export const useAlterarIdadeCao = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const alterarIdade = async (id, idade) => {
    try {
      setLoading(true);
      await api.patch(`/cao/${id}/idade`, { idade });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { alterarIdade, loading, error };
};

export const useAprovarCao = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const aprovarCao = async (id) => {
    try {
      setLoading(true);
      await api.post(`/cao/${id}/aprovar`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { aprovarCao, loading, error };
};

export const useReprovarCao = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reprovarCao = async (id) => {
    try {
      setLoading(true);
      await api.post(`/cao/${id}/reprovar`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { reprovarCao, loading, error };
};

export const useAdicionarCao = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const adicionarCao = async (userId, request) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `https://localhost:7060/api/usuario/${userId}/adicionarCao`,
        request,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsLoading(false);
      return response.data; 
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data || "Erro ao adicionar cão");
      console.error(err);
      return null;
    }
  };

  return { adicionarCao, isLoading, error };
};


