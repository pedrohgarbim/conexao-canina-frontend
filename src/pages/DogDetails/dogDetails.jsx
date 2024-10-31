import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './dogDetails.module.css';
import trasition from '../../components/Transition/transition'
import { FaExclamationTriangle, FaPencilAlt, FaClipboard } from 'react-icons/fa';


// Importar as imagens dos ícones
import pawIcon from '../../assets/patacachorro.png';
import locationIcon from '../../assets/ELEMENTS.png';
import descriptionIcon from '../../assets/descriptionIcon.png';

// Importar as imagens dos cachorros
import Rex from '../../assets/dog1.jpg';
import Bella from '../../assets/dog2.jpg';
import Thor from '../../assets/dog3.jpg';
import Pintado from '../../assets/dog4.jpg';
import Cesar from '../../assets/dog5.jpg';
import Dorinha from '../../assets/dog6.jpg';
import Chanel from '../../assets/dog7.jpg';
import Birulinha from '../../assets/dog8.jpg';
import Max from '../../assets/dog9.jpeg';
import Luna from '../../assets/dog10.jpg';
import Buddy from '../../assets/dog11.jpg';
import Molly from '../../assets/dog12.jpg';
import Rocky from '../../assets/dog13.jpg';
import Daisy from '../../assets/dog23.jpg';
import Zeus from '../../assets/dog15.jpg';
import Lola from '../../assets/dog16.jpg';
import Toby from '../../assets/dog17.jpg';
import Bailey from '../../assets/dog14.jpg';
import Charlie from '../../assets/dog19.jpg';
import Rosie from '../../assets/dog24.jpg';
import Jack from '../../assets/dog20.jpg';
import Lucy from '../../assets/dog21.jpg';
import Duke from '../../assets/dog18.jpg';
import Maggie from '../../assets/dog22.jpg';

import { db } from '../../firebase/config';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import ShareButtons from './ShareButtons';

const dogData = {
  Rex: {
    name: 'Rex',
    breed: 'Beagle',
    city: 'São Paulo',
    state: 'SP',
    size: 'Médio',
    gender: 'Macho',
    age: '3 anos',
    description: 'Rex é um cachorro alegre e cheio de energia.',
    image: Rex,
    owner: {
      name: 'Carlos Silva',
      email: 'carlos.silva@example.com',
      phone: '(11) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-03-15',
          result: 'Normal',
          veterinarian: 'Dr. João Mendes'
        },
        {
          type: 'Exame de urina',
          date: '2023-11-10',
          result: 'Sem anomalias',
          veterinarian: 'Dra. Ana Costa'
        }
      ],
      vaccines: [
        {
          name: 'Vacina antirrábica',
          date: '2023-08-20',
          nextDose: '2024-08-20',
          veterinarian: 'Dra. Ana Costa'
        },
        {
          name: 'Vacina polivalente (V8)',
          date: '2023-09-15',
          nextDose: '2024-09-15',
          veterinarian: 'Dr. João Mendes'
        }
      ],
      conditions: [
        {
          name: 'Alergia alimentar',
          diagnosisDate: '2022-06-01',
          notes: 'Controlada com ração hipoalergênica',
          veterinarian: 'Dra. Ana Costa'
        }
      ]
    }
  },
  Bella: {
    name: 'Bella',
    breed: 'Basset Hound',
    city: 'Rio de Janeiro',
    state: 'RJ',
    size: 'Pequeno',
    gender: 'Fêmea',
    age: '2 anos',
    description: 'Bella é uma cadela carinhosa e tranquila.',
    image: Bella,
    owner: {
      name: 'Ana Souza',
      email: 'ana.souza@example.com',
      phone: '(21) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-02-10',
          result: 'Normal',
          veterinarian: 'Dr. Paulo Almeida'
        },
        {
          type: 'Exame de urina',
          date: '2023-12-05',
          result: 'Sem anomalias',
          veterinarian: 'Dra. Carla Nascimento'
        }
      ],
      vaccines: [
        {
          name: 'Vacina antirrábica',
          date: '2023-07-18',
          nextDose: '2024-07-18',
          veterinarian: 'Dra. Carla Nascimento'
        },
        {
          name: 'Vacina polivalente (V8)',
          date: '2023-08-25',
          nextDose: '2024-08-25',
          veterinarian: 'Dr. Paulo Almeida'
        }
      ],
      conditions: [
        {
          name: 'Sem condições conhecidas',
          diagnosisDate: null,
          notes: 'Saudável e ativa.',
          veterinarian: null
        }
      ]
    }
  },

  Thor: {
    name: 'Thor',
    breed: 'Pinscher',
    city: 'Belo Horizonte',
    state: 'MG',
    size: 'Pequeno',
    gender: 'Macho',
    age: '4 anos',
    description: 'Thor é um cachorro amigável e muito obediente.',
    image: Thor,
    owner: {
      name: 'Bruno Santos',
      email: 'bruno.santos@example.com',
      phone: '(31) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-01-25',
          result: 'Normal',
          veterinarian: 'Dr. Luiz Ferreira'
        },
        {
          type: 'Exame de urina',
          date: '2023-11-15',
          result: 'Leve desidratação',
          veterinarian: 'Dra. Júlia Almeida'
        }
      ],
      vaccines: [
        {
          name: 'Vacina antirrábica',
          date: '2023-09-10',
          nextDose: '2024-09-10',
          veterinarian: 'Dra. Júlia Almeida'
        },
        {
          name: 'Vacina polivalente (V8)',
          date: '2023-10-05',
          nextDose: '2024-10-05',
          veterinarian: 'Dr. Luiz Ferreira'
        }
      ],
      conditions: [
        {
          name: 'Sem condições conhecidas',
          diagnosisDate: null,
          notes: 'Saudável e ativo.',
          veterinarian: null
        }
      ]
    }
  },

  Pintado: {
    name: 'Pintado',
    breed: 'Dálmata',
    city: 'Curitiba',
    state: 'PR',
    size: 'Grande',
    gender: 'Macho',
    age: '5 anos',
    description: 'Pintado é um cachorro brincalhão e cheio de energia.',
    image: Pintado,
    owner: {
      name: 'Mariana Ferreira',
      email: 'mariana.ferreira@example.com',
      phone: '(41) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-04-20',
          result: 'Normal',
          veterinarian: 'Dr. Pedro Oliveira'
        },
        {
          type: 'Exame de urina',
          date: '2023-12-15',
          result: 'Sem anomalias',
          veterinarian: 'Dra. Sofia Martins'
        }
      ],
      vaccines: [
        {
          name: 'Vacina antirrábica',
          date: '2023-09-30',
          nextDose: '2024-09-30',
          veterinarian: 'Dra. Sofia Martins'
        },
        {
          name: 'Vacina polivalente (V10)',
          date: '2023-10-15',
          nextDose: '2024-10-15',
          veterinarian: 'Dr. Pedro Oliveira'
        }
      ],
      conditions: [
        {
          name: 'Sensibilidade a calor',
          diagnosisDate: '2022-08-01',
          notes: 'Evitar exposição prolongada ao sol.',
          veterinarian: 'Dra. Sofia Martins'
        }
      ]
    }
  },

  Cesar: {
    name: 'Cesar',
    breed: 'Labrador Retriever',
    city: 'Porto Alegre',
    state: 'RS',
    size: 'Médio',
    gender: 'Macho',
    age: '2 anos',
    description: 'Cesar é um cachorro inteligente e fácil de treinar.',
    image: Cesar,
    owner: {
      name: 'Roberto Costa',
      email: 'roberto.costa@example.com',
      phone: '(51) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-01-30',
          result: 'Normal',
          veterinarian: 'Dr. Felipe Andrade'
        },
        {
          type: 'Exame de urina',
          date: '2023-11-20',
          result: 'Leve infecção',
          veterinarian: 'Dra. Laura Silva'
        }
      ],
      vaccines: [
        {
          name: 'Vacina antirrábica',
          date: '2023-06-05',
          nextDose: '2024-06-05',
          veterinarian: 'Dra. Laura Silva'
        },
        {
          name: 'Vacina polivalente (V8)',
          date: '2023-07-10',
          nextDose: '2024-07-10',
          veterinarian: 'Dr. Felipe Andrade'
        }
      ],
      conditions: [
        {
          name: 'Sem condições conhecidas',
          diagnosisDate: null,
          notes: 'Saudável e ativo.',
          veterinarian: null
        }
      ]
    }
  },

  Dorinha: {
    name: 'Dorinha',
    breed: 'Chihuahua',
    city: 'Fortaleza',
    state: 'CE',
    size: 'Pequeno',
    gender: 'Fêmea',
    age: '3 anos',
    description: 'Dorinha é uma cadela carinhosa e muito apegada aos donos.',
    image: Dorinha,
    owner: {
      name: 'Luciana Almeida',
      email: 'luciana.almeida@example.com',
      phone: '(85) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-03-12',
          result: 'Normal',
          veterinarian: 'Dra. Fernanda Lima'
        },
        {
          type: 'Exame de urina',
          date: '2023-11-05',
          result: 'Normal',
          veterinarian: 'Dr. Carlos Almeida'
        }
      ],
      vaccines: [
        {
          name: 'Vacina antirrábica',
          date: '2023-05-15',
          nextDose: '2024-05-15',
          veterinarian: 'Dr. Carlos Almeida'
        },
        {
          name: 'Vacina polivalente (V8)',
          date: '2023-06-20',
          nextDose: '2024-06-20',
          veterinarian: 'Dra. Fernanda Lima'
        }
      ],
      conditions: [
        {
          name: 'Sem condições conhecidas',
          diagnosisDate: null,
          notes: 'Saudável e feliz.',
          veterinarian: null
        }
      ]
    }
  },

  Chanel: {
    name: 'Chanel',
    breed: 'Pinscher',
    city: 'Salvador',
    state: 'BA',
    size: 'Pequeno',
    gender: 'Fêmea',
    age: '1 ano',
    description: 'Chanel é uma cadela pequena, mas muito corajosa.',
    image: Chanel,
    owner: {
      name: 'Fernanda Oliveira',
      email: 'fernanda.oliveira@example.com',
      phone: '(71) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-02-05',
          result: 'Normal',
          veterinarian: 'Dra. Clara Lima'
        },
        {
          type: 'Exame de fezes',
          date: '2023-11-12',
          result: 'Sem parasitas',
          veterinarian: 'Dr. Lucas Almeida'
        }
      ],
      vaccines: [
        {
          name: 'Vacina antirrábica',
          date: '2023-08-10',
          nextDose: '2024-08-10',
          veterinarian: 'Dr. Lucas Almeida'
        },
        {
          name: 'Vacina polivalente (V8)',
          date: '2023-09-15',
          nextDose: '2024-09-15',
          veterinarian: 'Dra. Clara Lima'
        }
      ],
      conditions: [
        {
          name: 'Sem condições conhecidas',
          diagnosisDate: null,
          notes: 'Saudável e ativa.',
          veterinarian: null
        }
      ]
    }
  },

  Birulinha: {
    name: 'Birulinha',
    breed: 'Chihuahua',
    city: 'Recife',
    state: 'PE',
    size: 'Médio',
    gender: 'Macho',
    age: '4 anos',
    description: 'Birulinha é um cachorro calmo e muito pilantra.',
    image: Birulinha,
    owner: {
      name: 'Paulo Mendes',
      email: 'paulo.mendes@example.com',
      phone: '(81) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-03-01',
          result: 'Leve anemia',
          veterinarian: 'Dra. Ana Beatriz'
        },
        {
          type: 'Exame dermatológico',
          date: '2023-12-05',
          result: 'Sem dermatites',
          veterinarian: 'Dr. Rafael Costa'
        }
      ],
      vaccines: [
        {
          name: 'Vacina antirrábica',
          date: '2023-06-20',
          nextDose: '2024-06-20',
          veterinarian: 'Dr. Rafael Costa'
        },
        {
          name: 'Vacina polivalente (V10)',
          date: '2023-07-15',
          nextDose: '2024-07-15',
          veterinarian: 'Dra. Ana Beatriz'
        }
      ],
      conditions: [
        {
          name: 'Hipertensão leve',
          diagnosisDate: '2022-11-10',
          notes: 'Monitorar pressão regularmente.',
          veterinarian: 'Dra. Ana Beatriz'
        }
      ]
    }
  },

  Max: {
    name: 'Max',
    breed: 'Golden Retriever',
    city: 'Brasília',
    state: 'DF',
    size: 'Grande',
    gender: 'Macho',
    age: '5 anos',
    description: 'Max é um cachorro muito leal e protetor.',
    image: Max,
    owner: {
      name: 'Gustavo Moreira',
      email: 'gustavo.moreira@example.com',
      phone: '(61) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-01-15',
          result: 'Normal',
          veterinarian: 'Dra. Fernanda Lopes'
        },
        {
          type: 'Exame radiográfico',
          date: '2023-11-25',
          result: 'Sem fraturas',
          veterinarian: 'Dr. Felipe Ribeiro'
        }
      ],
      vaccines: [
        {
          name: 'Vacina antirrábica',
          date: '2023-05-10',
          nextDose: '2024-05-10',
          veterinarian: 'Dr. Felipe Ribeiro'
        },
        {
          name: 'Vacina polivalente (V8)',
          date: '2023-06-15',
          nextDose: '2024-06-15',
          veterinarian: 'Dra. Fernanda Lopes'
        }
      ],
      conditions: [
        {
          name: 'Alergia a grama',
          diagnosisDate: '2022-05-05',
          notes: 'Uso de medicação antialérgica em épocas de alergia.',
          veterinarian: 'Dra. Fernanda Lopes'
        }
      ]
    }
  },

  Luna: {
    name: 'Luna',
    breed: 'Poodle',
    city: 'Manaus',
    state: 'AM',
    size: 'Pequeno',
    gender: 'Fêmea',
    age: '3 anos',
    description: 'Luna é uma cadela ativa e muito brincalhona.',
    image: Luna,
    owner: {
      name: 'Juliana Rocha',
      email: 'juliana.rocha@example.com',
      phone: '(92) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-02-10',
          result: 'Normal',
          veterinarian: 'Dra. Fernanda Silva'
        },
        {
          type: 'Exame de urina',
          date: '2023-11-15',
          result: 'Sem anormalidades',
          veterinarian: 'Dr. Tiago Almeida'
        }
      ],
      vaccines: [
        {
          name: 'Vacina contra cinomose',
          date: '2023-09-05',
          nextDose: '2024-09-05',
          veterinarian: 'Dra. Fernanda Silva'
        },
        {
          name: 'Vacina contra parvovirose',
          date: '2023-10-10',
          nextDose: '2024-10-10',
          veterinarian: 'Dr. Tiago Almeida'
        }
      ],
      conditions: [
        {
          name: 'Sem condições conhecidas',
          diagnosisDate: null,
          notes: 'Saudável e enérgica.',
          veterinarian: null
        }
      ]
    }
  },

  Buddy: {
    name: 'Buddy',
    breed: 'Labrador Retriever',
    city: 'Belém',
    state: 'PA',
    size: 'Grande',
    gender: 'Macho',
    age: '6 anos',
    description: 'Buddy é um cachorro muito inteligente e obediente.',
    image: Buddy,
    owner: {
      name: 'Ricardo Lima',
      email: 'ricardo.lima@example.com',
      phone: '(91) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-03-03',
          result: 'Normal',
          veterinarian: 'Dr. Roberto Ferreira'
        },
        {
          type: 'Exame cardíaco',
          date: '2023-12-20',
          result: 'Saudável',
          veterinarian: 'Dra. Carla Santos'
        }
      ],
      vaccines: [
        {
          name: 'Vacina contra hepatite',
          date: '2023-06-18',
          nextDose: '2024-06-18',
          veterinarian: 'Dr. Roberto Ferreira'
        },
        {
          name: 'Vacina contra leptospirose',
          date: '2023-07-15',
          nextDose: '2024-07-15',
          veterinarian: 'Dra. Carla Santos'
        }
      ],
      conditions: [
        {
          name: 'Sem condições conhecidas',
          diagnosisDate: null,
          notes: 'Saudável e ativo.',
          veterinarian: null
        }
      ]
    }
  },

  Molly: {
    name: 'Molly',
    breed: 'Bulldog Francês',
    city: 'Natal',
    state: 'RN',
    size: 'Pequeno',
    gender: 'Fêmea',
    age: '2 anos',
    description: 'Molly é uma cadela amorosa e muito divertida.',
    image: Molly,
    owner: {
      name: 'Patrícia Barbosa',
      email: 'patricia.barbosa@example.com',
      phone: '(84) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-01-20',
          result: 'Normal',
          veterinarian: 'Dr. Lucas Costa'
        },
        {
          type: 'Exame dermatológico',
          date: '2023-11-05',
          result: 'Sem dermatites',
          veterinarian: 'Dra. Ana Clara'
        }
      ],
      vaccines: [
        {
          name: 'Vacina contra raiva',
          date: '2023-04-25',
          nextDose: '2024-04-25',
          veterinarian: 'Dr. Lucas Costa'
        },
        {
          name: 'Vacina polivalente (V10)',
          date: '2023-05-15',
          nextDose: '2024-05-15',
          veterinarian: 'Dra. Ana Clara'
        }
      ],
      conditions: [
        {
          name: 'Sem condições conhecidas',
          diagnosisDate: null,
          notes: 'Saudável e brincalhona.',
          veterinarian: null
        }
      ]
    }
  },

  Rocky: {
    name: 'Rocky',
    breed: 'Boxer',
    city: 'Florianópolis',
    state: 'SC',
    size: 'Grande',
    gender: 'Macho',
    age: '5 anos',
    description: 'Rocky é um cachorro muito protetor e leal.',
    image: Rocky,
    owner: {
      name: 'Fábio Carvalho',
      email: 'fabio.carvalho@example.com',
      phone: '(48) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-01-05',
          result: 'Leve inflamação',
          veterinarian: 'Dra. Fernanda Almeida'
        },
        {
          type: 'Exame ortopédico',
          date: '2023-12-15',
          result: 'Saudável',
          veterinarian: 'Dr. Paulo Ricardo'
        }
      ],
      vaccines: [
        {
          name: 'Vacina contra parvovirose',
          date: '2023-03-10',
          nextDose: '2024-03-10',
          veterinarian: 'Dra. Fernanda Almeida'
        },
        {
          name: 'Vacina contra giárdia',
          date: '2023-04-15',
          nextDose: '2024-04-15',
          veterinarian: 'Dr. Paulo Ricardo'
        }
      ],
      conditions: [
        {
          name: 'Sem condições conhecidas',
          diagnosisDate: null,
          notes: 'Saudável e ativo.',
          veterinarian: null
        }
      ]
    }
  },

  Daisy: {
    name: 'Daisy',
    breed: 'Cocker Spaniel',
    city: 'João Pessoa',
    state: 'PB',
    size: 'Médio',
    gender: 'Fêmea',
    age: '4 anos',
    description: 'Daisy é uma cadela muito carinhosa e dócil.',
    image: Daisy,
    owner: {
      name: 'Marina Costa',
      email: 'marina.costa@example.com',
      phone: '(83) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-02-15',
          result: 'Normal',
          veterinarian: 'Dra. Mariana Ribeiro'
        },
        {
          type: 'Exame de fezes',
          date: '2023-11-20',
          result: 'Sem parasitas',
          veterinarian: 'Dr. Felipe Souza'
        }
      ],
      vaccines: [
        {
          name: 'Vacina contra cinomose',
          date: '2023-09-10',
          nextDose: '2024-09-10',
          veterinarian: 'Dra. Mariana Ribeiro'
        },
        {
          name: 'Vacina contra leptospirose',
          date: '2023-10-05',
          nextDose: '2024-10-05',
          veterinarian: 'Dr. Felipe Souza'
        }
      ],
      conditions: [
        {
          name: 'Sem condições conhecidas',
          diagnosisDate: null,
          notes: 'Saudável e afetuosa.',
          veterinarian: null
        }
      ]
    }
  },

  Zeus: {
    name: 'Zeus',
    breed: 'Doberman',
    city: 'Teresina',
    state: 'PI',
    size: 'Grande',
    gender: 'Macho',
    age: '6 anos',
    description: 'Zeus é um cachorro imponente e muito obediente.',
    image: Zeus,
    owner: {
      name: 'Daniel Martins',
      email: 'daniel.martins@example.com',
      phone: '(86) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-01-10',
          result: 'Normal',
          veterinarian: 'Dr. Jorge Lima'
        },
        {
          type: 'Exame cardíaco',
          date: '2023-12-15',
          result: 'Saudável',
          veterinarian: 'Dra. Carla Santos'
        }
      ],
      vaccines: [
        {
          name: 'Vacina contra hepatite',
          date: '2023-06-20',
          nextDose: '2024-06-20',
          veterinarian: 'Dr. Jorge Lima'
        },
        {
          name: 'Vacina contra raiva',
          date: '2023-07-15',
          nextDose: '2024-07-15',
          veterinarian: 'Dra. Carla Santos'
        }
      ],
      conditions: [
        {
          name: 'Sem condições conhecidas',
          diagnosisDate: null,
          notes: 'Saudável e ativo.',
          veterinarian: null
        }
      ]
    }
  },

  Lola: {
    name: 'Lola',
    breed: 'Shih Tzu',
    city: 'Maceió',
    state: 'AL',
    size: 'Pequeno',
    gender: 'Fêmea',
    age: '3 anos',
    description: 'Lola é uma cadela pequena, mas cheia de energia.',
    image: Lola,
    owner: {
      name: 'Camila Azevedo',
      email: 'camila.azevedo@example.com',
      phone: '(82) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-03-05',
          result: 'Normal',
          veterinarian: 'Dra. Ana Clara'
        },
        {
          type: 'Exame dermatológico',
          date: '2023-11-10',
          result: 'Sem dermatites',
          veterinarian: 'Dr. Lucas Costa'
        }
      ],
      vaccines: [
        {
          name: 'Vacina polivalente (V10)',
          date: '2023-05-30',
          nextDose: '2024-05-30',
          veterinarian: 'Dra. Ana Clara'
        },
        {
          name: 'Vacina contra giárdia',
          date: '2023-06-25',
          nextDose: '2024-06-25',
          veterinarian: 'Dr. Lucas Costa'
        }
      ],
      conditions: [
        {
          name: 'Sem condições conhecidas',
          diagnosisDate: null,
          notes: 'Saudável e brincalhona.',
          veterinarian: null
        }
      ]
    }
  },

  Toby: {
    name: 'Toby',
    breed: 'Yorkshire Terrier',
    city: 'Aracaju',
    state: 'SE',
    size: 'Pequeno',
    gender: 'Macho',
    age: '4 anos',
    description: 'Toby é um cachorro muito esperto e cheio de energia.',
    image: Toby,
    owner: {
      name: 'Rafael Souza',
      email: 'rafael.souza@example.com',
      phone: '(79) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-02-20',
          result: 'Normal',
          veterinarian: 'Dr. Carlos Almeida'
        },
        {
          type: 'Exame dental',
          date: '2023-12-30',
          result: 'Saudável',
          veterinarian: 'Dra. Rita Mendes'
        }
      ],
      vaccines: [
        {
          name: 'Vacina contra parvovirose',
          date: '2023-04-10',
          nextDose: '2024-04-10',
          veterinarian: 'Dr. Carlos Almeida'
        },
        {
          name: 'Vacina contra raiva',
          date: '2023-05-15',
          nextDose: '2024-05-15',
          veterinarian: 'Dra. Rita Mendes'
        }
      ],
      conditions: [
        {
          name: 'Sem condições conhecidas',
          diagnosisDate: null,
          notes: 'Saudável e ativo.',
          veterinarian: null
        }
      ]
    }
  },

  Bailey: {
    name: 'Bailey',
    breed: 'Rottweiler',
    city: 'Campo Grande',
    state: 'MS',
    size: 'Grande',
    gender: 'Macho',
    age: '3 anos',
    description: 'Bailey é um cachorro protetor e carinhoso, adora brincar ao ar livre.',
    image: Bailey,
    owner: {
      name: 'Fernando Oliveira',
      email: 'fernando.oliveira@example.com',
      phone: '(67) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-01-25',
          result: 'Normal',
          veterinarian: 'Dr. Felipe Nunes'
        },
        {
          type: 'Exame ortopédico',
          date: '2023-12-10',
          result: 'Saudável',
          veterinarian: 'Dra. Mariana Lima'
        }
      ],
      vaccines: [
        {
          name: 'Vacina contra cinomose',
          date: '2023-03-15',
          nextDose: '2024-03-15',
          veterinarian: 'Dr. Felipe Nunes'
        },
        {
          name: 'Vacina contra leptospirose',
          date: '2023-04-20',
          nextDose: '2024-04-20',
          veterinarian: 'Dra. Mariana Lima'
        }
      ],
      conditions: [
        {
          name: 'Sem condições conhecidas',
          diagnosisDate: null,
          notes: 'Saudável e brincalhão.',
          veterinarian: null
        }
      ]
    }
  },


  Charlie: {
    name: 'Charlie',
    breed: 'Bulldog Inglês',
    city: 'Porto Alegre',
    state: 'RS',
    size: 'Médio',
    gender: 'Macho',
    age: '4 anos',
    description: 'Charlie é um cachorro dócil e muito amigável com crianças.',
    image: Charlie, // Certifique-se de que 'Charlie' seja uma referência de imagem válida
    owner: {
      name: 'Mariana Costa',
      email: 'mariana.costa@example.com',
      phone: '(51) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-02-10',
          result: 'Normal',
          veterinarian: 'Dr. Lucas Almeida',
        },
        {
          type: 'Exame dermatológico',
          date: '2023-11-05',
          result: 'Sem alterações',
          veterinarian: 'Dra. Ana Beatriz',
        },
      ],
      vaccines: [
        {
          name: 'Vacina contra raiva',
          date: '2023-07-15',
          nextDose: '2024-07-15',
          veterinarian: 'Dr. Lucas Almeida',
        },
        {
          name: 'Vacina polivalente',
          date: '2023-08-20',
          nextDose: '2024-08-20',
          veterinarian: 'Dra. Ana Beatriz',
        },
      ],
      conditions: [
        {
          name: 'Sem condições conhecidas',
          diagnosisDate: null,
          notes: 'Dócil e bem ajustado.',
          veterinarian: null,
        },
      ],
    },
  },

  Rosie: {
    name: 'Rosie',
    breed: 'Bichon Frisé',
    city: 'Florianópolis',
    state: 'SC',
    size: 'Pequeno',
    gender: 'Fêmea',
    age: '2 anos',
    description: 'Rosie é uma cadela alegre e brincalhona, adora estar cercada de pessoas.',
    image: Rosie, // Certifique-se de que 'Rosie' seja uma referência de imagem válida
    owner: {
      name: 'Paula Lima',
      email: 'paula.lima@example.com',
      phone: '(48) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-03-12',
          result: 'Normal',
          veterinarian: 'Dr. Felipe Nunes',
        },
        {
          type: 'Exame oftalmológico',
          date: '2023-12-15',
          result: 'Sem problemas',
          veterinarian: 'Dra. Mariana Lima',
        },
      ],
      vaccines: [
        {
          name: 'Vacina contra cinomose',
          date: '2023-09-10',
          nextDose: '2024-09-10',
          veterinarian: 'Dr. Felipe Nunes',
        },
        {
          name: 'Vacina contra parvovirose',
          date: '2023-10-05',
          nextDose: '2024-10-05',
          veterinarian: 'Dra. Mariana Lima',
        },
      ],
      conditions: [
        {
          name: 'Sem condições conhecidas',
          diagnosisDate: null,
          notes: 'Alegria constante e muito sociável.',
          veterinarian: null,
        },
      ],
    },
  },


  Jack: {
    name: 'Jack',
    breed: 'Labrador Retriever',
    city: 'São Paulo',
    state: 'SP',
    size: 'Grande',
    gender: 'Macho',
    age: '5 anos',
    description: 'Jack é um labrador energético e inteligente, adora brincar de pegar a bola.',
    image: Jack, // Certifique-se de que 'Jack' seja uma referência de imagem válida
    owner: {
      name: 'Ricardo Santos',
      email: 'ricardo.santos@example.com',
      phone: '(11) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-01-15',
          result: 'Normal',
          veterinarian: 'Dr. André Silva',
        },
        {
          type: 'Exame cardíaco',
          date: '2023-11-20',
          result: 'Sem anormalidades',
          veterinarian: 'Dra. Sofia Martins',
        },
      ],
      vaccines: [
        {
          name: 'Vacina contra raiva',
          date: '2023-06-05',
          nextDose: '2024-06-05',
          veterinarian: 'Dr. André Silva',
        },
        {
          name: 'Vacina polivalente',
          date: '2023-07-10',
          nextDose: '2024-07-10',
          veterinarian: 'Dra. Sofia Martins',
        },
      ],
      conditions: [
        {
          name: 'Sem condições conhecidas',
          diagnosisDate: null,
          notes: 'Ativo e saudável.',
          veterinarian: null,
        },
      ],
    },
  },

  Lucy: {
    name: 'Lucy',
    breed: 'Golden Retriever',
    city: 'Rio de Janeiro',
    state: 'RJ',
    size: 'Médio',
    gender: 'Fêmea',
    age: '3 anos',
    description: 'Lucy é uma golden retriever dócil e amorosa, adora fazer novos amigos.',
    image: Lucy, // Certifique-se de que 'Lucy' seja uma referência de imagem válida
    owner: {
      name: 'Camila Oliveira',
      email: 'camila.oliveira@example.com',
      phone: '(21) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-02-15',
          result: 'Normal',
          veterinarian: 'Dr. Pedro Gomes',
        },
        {
          type: 'Exame oftalmológico',
          date: '2023-12-10',
          result: 'Sem problemas',
          veterinarian: 'Dra. Juliana Almeida',
        },
      ],
      vaccines: [
        {
          name: 'Vacina contra cinomose',
          date: '2023-08-30',
          nextDose: '2024-08-30',
          veterinarian: 'Dr. Pedro Gomes',
        },
        {
          name: 'Vacina contra parvovirose',
          date: '2023-09-15',
          nextDose: '2024-09-15',
          veterinarian: 'Dra. Juliana Almeida',
        },
      ],
      conditions: [
        {
          name: 'Sem condições conhecidas',
          diagnosisDate: null,
          notes: 'Amigável e bem ajustada.',
          veterinarian: null,
        },
      ],
    },
  },

  Duke: {
    name: 'Duke',
    breed: 'Boxer',
    city: 'Belo Horizonte',
    state: 'MG',
    size: 'Grande',
    gender: 'Macho',
    age: '4 anos',
    description: 'Duke é um boxer brincalhão e cheio de energia, sempre pronto para se divertir.',
    image: Duke, // Certifique-se de que 'Duke' seja uma referência de imagem válida
    owner: {
      name: 'Roberto Silva',
      email: 'roberto.silva@example.com',
      phone: '(31) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-03-05',
          result: 'Normal',
          veterinarian: 'Dr. Lucas Almeida',
        },
        {
          type: 'Exame ortopédico',
          date: '2023-12-05',
          result: 'Saudável',
          veterinarian: 'Dra. Fernanda Costa',
        },
      ],
      vaccines: [
        {
          name: 'Vacina contra raiva',
          date: '2023-07-20',
          nextDose: '2024-07-20',
          veterinarian: 'Dr. Lucas Almeida',
        },
        {
          name: 'Vacina polivalente',
          date: '2023-08-25',
          nextDose: '2024-08-25',
          veterinarian: 'Dra. Fernanda Costa',
        },
      ],
      conditions: [
        {
          name: 'Sem condições conhecidas',
          diagnosisDate: null,
          notes: 'Brincalhão e saudável.',
          veterinarian: null,
        },
      ],
    },
  },

  Maggie: {
    name: 'Maggie',
    breed: 'Shih Tzu',
    city: 'Curitiba',
    state: 'PR',
    size: 'Pequeno',
    gender: 'Fêmea',
    age: '2 anos',
    description: 'Maggie é uma shih tzu adorável e muito companheira, gosta de carinho e colo.',
    image: Maggie, // Certifique-se de que 'Maggie' seja uma referência de imagem válida
    owner: {
      name: 'Carla Martins',
      email: 'carla.martins@example.com',
      phone: '(41) 98765-4321',
    },
    healthHistory: {
      exams: [
        {
          type: 'Exame de sangue',
          date: '2024-04-10',
          result: 'Normal',
          veterinarian: 'Dr. Rafael Mendes',
        },
        {
          type: 'Exame dermatológico',
          date: '2023-11-15',
          result: 'Sem alterações',
          veterinarian: 'Dra. Gabriela Pinto',
        },
      ],
      vaccines: [
        {
          name: 'Vacina contra cinomose',
          date: '2023-10-01',
          nextDose: '2024-10-01',
          veterinarian: 'Dr. Rafael Mendes',
        },
        {
          name: 'Vacina contra parvovirose',
          date: '2023-10-20',
          nextDose: '2024-10-20',
          veterinarian: 'Dra. Gabriela Pinto',
        },
      ],
      conditions: [
        {
          name: 'Sem condições conhecidas',
          diagnosisDate: null,
          notes: 'Muito afetuosa e saudável.',
          veterinarian: null,
        },
      ],
    },
  },
}

const Modal = ({ onClose, owner, dogId }) => {
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState(null);

  // Função para lidar com o envio da solicitação
  const handleSubmit = async () => {
    try {
      // Exemplo de uma requisição POST para enviar a solicitação
      const response = await fetch("/api/send-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerId: owner.id,
          dogId: dogId,
          message: message,
        }),
      });

      if (response.ok) {
        setFeedback("Solicitação enviada com sucesso!");
      } else {
        setFeedback("Erro ao enviar a solicitação.");
      }
    } catch (error) {
      console.error("Erro:", error);
      setFeedback("Erro ao enviar a solicitação.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContentContact}>
        <div className={styles.infos}>
          <h2 className={styles.ownerContact}>Contato do Dono</h2>
          <p className={styles.ownerName}><strong>Nome:</strong> {owner.name}</p>
          <p className={styles.ownerEmail}><strong>Email:</strong> {owner.email}</p>
          <p className={styles.ownerPhone}><strong>Telefone:</strong> {owner.phone}</p>
        </div>

        {/* Seção para enviar a solicitação de cruzamento */}
        <div className={styles.crossRequest}>
          <h3>Enviar Solicitação de Cruzamento</h3>
          <textarea
            placeholder="Adicione uma mensagem personalizada (opcional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.messageField}
          />
          <button onClick={handleSubmit} className={styles.submitButton}>
            Enviar Solicitação
          </button>

          {/* Exibir feedback ao usuário */}
          {feedback && <p className={styles.feedback}>{feedback}</p>}
        </div>

        <button onClick={onClose} className={styles.closeButton}>Fechar</button>
      </div>
    </div>
  );
};

const ReportModal = ({ onClose, onSubmit }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reason);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Denunciar Perfil</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Motivo da denúncia:
            <select className={styles.selectBox} value={reason} onChange={(e) => setReason(e.target.value)} required>
              <option value="">Selecione um motivo</option>
              <option value="Perfil Falso">Perfil Falso</option>
              <option value="Conteúdo Inapropriado">Conteúdo Inapropriado</option>
              <option value="Venda ou Adoção Ilegal">Venda ou Adoção Ilegal</option>
              <option value="Uso Indevido de Imagens">Uso Indevido de Imagens</option>
              <option value="Outro">Outro</option>
            </select>
          </label>
          <button type="submit" className={styles.submitButton}>Enviar Denúncia</button>
        </form>
        <button onClick={onClose} className={styles.closeButton}>Fechar</button>
      </div>
    </div>
  );
};

const EditDogModal = ({ onClose, dog, onSubmit }) => {
  const [formData, setFormData] = useState(dog);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [image, setImage] = useState(null); // Estado para armazenar a imagem selecionada

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Pega o arquivo selecionado
    if (file) {
      setImage(file); // Armazena o arquivo de imagem no estado
      setFormData({ ...formData, photo: file }); // Adiciona o arquivo de imagem ao formData
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedbackMessage('');

    // Simulação de atualização (substitua pela lógica real)
    await onSubmit(formData);

    setIsLoading(false);
    setFeedbackMessage('Dados atualizados com sucesso!');
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContentEdit}>
        <h2>Editar Dados do Cachorro</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <h3>Nome:</h3>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </label>
          <label>
            <h3>Raça:</h3>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </label>
          <label>
            <h3>Gênero:</h3>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </label>
          <label>
            <h3>Tamanho</h3>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </label>
          <label>
            <h3>Idade:</h3>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </label>
          <label>
            <h3>Descrição:</h3>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </label>
          <label>
            <h3>Foto do Cachorro:</h3>
            <input
              type="file"
              accept="image/*" // Aceitar apenas arquivos de imagem
              onChange={handleImageChange}
              className={styles.inputField}
            />
          </label>
          {image && <p>Arquivo selecionado: {image.name}</p>} {/* Exibir nome do arquivo selecionado */}
          <button type="submit" className={styles.submitButton}>
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
          {feedbackMessage && <p className={styles.feedbackMessage}>{feedbackMessage}</p>}
        </form>
        <button onClick={onClose} className={styles.closeButton}>Fechar</button>
      </div>
    </div>
  );
};

const DogDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dog = dogData[name];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);
  const [isEditingHealth, setIsEditingHealth] = useState(false); // Estado para alternar entre visualização e edição

  const [healthData, setHealthData] = useState(dog.healthHistory); // Para gerenciar o estado do histórico de saúde

  if (!dog) {
    return <div>Cachorro não encontrado!</div>;
  }

  const handleOpenHealthModal = () => {
    setIsHealthModalOpen(true);
  };

  const handleCloseHealthModal = () => {
    setIsHealthModalOpen(false);
    setIsEditingHealth(false); // Sempre fechar o modo de edição quando o modal for fechado
  };

  const handleContactClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenReportModal = () => {
    setIsReportModalOpen(true);
  };

  const handleCloseReportModal = () => {
    setIsReportModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleReportSubmit = async (reason) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error('Você precisa estar autenticado para enviar uma denúncia.');
      return;
    }

    const newReport = {
      dogId: name,
      userId: user.uid,
      reason,
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'dogReports'), newReport);
      console.log('Denúncia enviada com sucesso!');
    } catch (error) {
      console.error("Error adding report: ", error);
      console.error('Erro ao enviar a denúncia. Por favor, tente novamente.');
    }
  };

  const handleEditSubmit = async (updatedDogData) => {
    console.log('Dados atualizados:', updatedDogData);
  };

  const handleSaveHealthData = async (updatedHealthData) => {
    // Função para salvar os dados de saúde editados
    setHealthData(updatedHealthData); // Atualiza o estado local
    setIsEditingHealth(false); // Volta para o modo de visualização após salvar
  };

  const handleEditHealthClick = () => {
    setIsEditingHealth(true); // Ativa o modo de edição
  };

  const goToCreateAlbum = () => {
    navigate('/create-album');
  };

  const currentUrl = window.location.href;
  const shareText = "Confira este cachorrinho!";

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={dog.image} alt={dog.name} className={styles.dogImage}  />
        <h2 className={styles.CreateAlbum} onClick={goToCreateAlbum}>
        Ver álbum de fotos
        </h2>
      </div>
      <div className={styles.content}>
        <h1 className={styles.dogName}>
          {dog.name}, <span className={styles.dogBreed}>{dog.breed}</span>
          <div className={styles.reportIcon} onClick={handleOpenReportModal} title="Denunciar este cão">
            <FaExclamationTriangle className={styles.reportIconStyle} />
          </div>
          <div className={styles.editIcon} onClick={handleOpenEditModal} title="Editar este cão">
            <FaPencilAlt className={styles.editIconStyle} />
          </div>
        </h1>
        <div className={styles.details}>
          <p className={styles.detailItemPaw}>
            <img src={pawIcon} alt="Paw icon" className={styles.iconPaw} />
            {dog.gender} | {dog.size} | {dog.age}
          </p>
          <p className={styles.detailItemLocation}>
            <img src={locationIcon} alt="Location icon" className={styles.iconLocation} />
            {dog.city}, {dog.state}
          </p>
          <p className={styles.detailItemDescription}>
            <img src={descriptionIcon} alt="Description icon" className={styles.iconDescription} />
            {dog.description}
          </p>
          <div className={styles.healthHistory}>
            <FaClipboard className={styles.clipboardIcon} onClick={handleOpenHealthModal} />
            <span className={styles.healthHistoryText} onClick={handleOpenHealthModal}>
              Histórico de Saúde
            </span>
            <FaPencilAlt
              className={styles.editIcon}
              onClick={handleEditHealthClick} // Ativa a edição ao clicar no ícone
              title="Editar Histórico de Saúde"
            />
          </div>
        </div>

        {/* Modal de histórico de saúde */}
        {isHealthModalOpen && (
          <HealthHistoryModal
            onClose={handleCloseHealthModal}
            healthData={healthData}
            isEditing={isEditingHealth} // Passa o estado de edição para o modal
            onSave={handleSaveHealthData}
          />
        )}

        <button className={styles.contactButton} onClick={handleContactClick}>
          Contato
        </button>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          Voltar
        </button>
        <ShareButtons url={currentUrl} text={shareText} />
      </div>

      {/* Modais */}
      {isModalOpen && <Modal onClose={handleCloseModal} owner={dog.owner} />}
      {isReportModalOpen && <ReportModal onClose={handleCloseReportModal} onSubmit={handleReportSubmit} />}
      {isEditModalOpen && <EditDogModal onClose={handleCloseEditModal} dog={dog} onSubmit={handleEditSubmit} />}
    </div>
  );
};

// Componente para o modal de histórico de saúde com visualização/edição
const HealthHistoryModal = ({ onClose, healthData, isEditing, onSave }) => {
  const [editableHealthData, setEditableHealthData] = useState(healthData);

  const handleChange = (e, section, index, field) => {
    const updatedData = { ...editableHealthData };
    updatedData[section][index][field] = e.target.value;
    setEditableHealthData(updatedData);
  };

  const handleSave = () => {
    onSave(editableHealthData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContentHealth}>
        <h2>Histórico de Saúde</h2>

        {isEditing ? (
          <>
            <h3 className={styles.examCategory}>Exames:</h3>
            <ul>
              {editableHealthData.exams.map((exam, index) => (
                <li key={index} className={styles.examText}>
                  <input
                    type="text"
                    value={exam.type}
                    onChange={(e) => handleChange(e, "exams", index, "type")}
                  />{" "}
                  <input
                    type="date"
                    value={exam.date}
                    onChange={(e) => handleChange(e, "exams", index, "date")}
                  />{" "}
                  <input
                    type="text"
                    value={exam.result}
                    onChange={(e) => handleChange(e, "exams", index, "result")}
                  />
                  <span>Veterinário: </span>
                  <input
                    type="text"
                    value={exam.veterinarian}
                    onChange={(e) => handleChange(e, "exams", index, "veterinarian")}
                  />
                </li>
              ))}
            </ul>

            <h3 className={styles.examCategory}>Vacinas:</h3>
            <ul>
              {editableHealthData.vaccines.map((vaccine, index) => (
                <li key={index} className={styles.examText}>
                  <input
                    type="text"
                    value={vaccine.name}
                    onChange={(e) => handleChange(e, "vaccines", index, "name")}
                  />{" "}
                  <input
                    type="date"
                    value={vaccine.date}
                    onChange={(e) => handleChange(e, "vaccines", index, "date")}
                  />
                  <span>Próxima dose:</span>
                  <input
                    type="date"
                    value={vaccine.nextDose}
                    onChange={(e) => handleChange(e, "vaccines", index, "nextDose")}
                  />{" "}
                  <span>Veterinário:</span>
                  <input
                    type="text"
                    value={vaccine.veterinarian}
                    onChange={(e) => handleChange(e, "vaccines", index, "veterinarian")}
                  />
                </li>
              ))}
            </ul>

            <h3 className={styles.examCategory}>Condições de Saúde:</h3>
            <ul>
              {editableHealthData.conditions.map((condition, index) => (
                <li key={index} className={styles.examText}>
                  <input
                    type="text"
                    value={condition.name}
                    onChange={(e) => handleChange(e, "conditions", index, "name")}
                  />{" "}
                  <input
                    type="text"
                    value={condition.description}
                    onChange={(e) => handleChange(e, "conditions", index, "description")}
                  />{" "}
                  <span>Veterinário:</span>
                  <input
                    type="text"
                    value={condition.veterinarian}
                    onChange={(e) => handleChange(e, "conditions", index, "veterinarian")}
                  />
                </li>
              ))}
            </ul>

            <button className={styles.submitButton} onClick={handleSave}>
              Salvar Alterações
            </button>
          </>
        ) : (
          <>
            <h3 className={styles.examCategory}>Exames:</h3>
            <ul>
              {healthData.exams.map((exam, index) => (
                <li key={index} className={styles.examText}>
                  {exam.type} - {exam.date} - {exam.result} (Veterinário: {exam.veterinarian})
                </li>
              ))}
            </ul>

            <h3 className={styles.examCategory}>Vacinas:</h3>
            <ul>
              {healthData.vaccines.map((vaccine, index) => (
                <li key={index} className={styles.examText}>
                  {vaccine.name} - {vaccine.date} (Próxima dose: {vaccine.nextDose}, Veterinário: {vaccine.veterinarian})
                </li>
              ))}
            </ul>

            <h3 className={styles.examCategory}>Condições de Saúde:</h3>
            <ul>
              {healthData.conditions.map((condition, index) => (
                <li key={index} className={styles.examText}>
                  {condition.name} - {condition.description} (Veterinário: {condition.veterinarian})
                </li>
              ))}
            </ul>
          </>
        )}

        <button className={styles.closeButton} onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default DogDetails;
