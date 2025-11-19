// src/data/aulasData.ts

export type Aula = {
  id: number;
  title: string;
  duration: string;
  videoId: string; // O código que vem DEPOIS do "v=" no Youtube
  description: string;
};

export type MateriaData = {
  title: string;
  description: string;
  lessons: Aula[];
};

// --- DADOS COM VÍDEOS REAIS QUE FUNCIONAM ---
export const AULAS_DATA: Record<string, MateriaData> = {
  "matematica": {
    title: "Matemática",
    description: "Domine a linguagem do universo, da aritmética básica ao cálculo avançado.",
    lessons: [
      { 
        id: 1, 
        title: "Trigonometria Básica", 
        duration: "22:15", 
        videoId: "ZMsieXqXwMg", // Vídeo do Ferretto
        description: "Entenda os conceitos fundamentais de seno, cosseno e tangente." 
      }, 
      { 
        id: 2, 
        title: "Função do 1º Grau", 
        duration: "18:40", 
        videoId: "H_A4vIul5pw", // Vídeo da Gis com Giz
        description: "Tudo o que você precisa saber sobre funções afins e gráficos." 
      },
      { 
        id: 3, 
        title: "Geometria Espacial", 
        duration: "15:30", 
        videoId: "De3y_8hBw68", // Vídeo do Marcos Aba
        description: "Aprenda a calcular volumes de figuras espaciais." 
      },
    ]
  },
  "portugues": {
    title: "Português",
    description: "Aprimore sua gramática, interpretação de texto e habilidades de escrita.",
    lessons: [
      { 
        id: 1, 
        title: "Uso da Crase", 
        duration: "12:00", 
        videoId: "0naVZxbVAZM", // Vídeo do Professor Noslen
        description: "Regras práticas para nunca mais errar o uso da crase." 
      },
      { 
        id: 2, 
        title: "Figuras de Linguagem", 
        duration: "14:20", 
        videoId: "1J3Pj4Wp3wE", // Vídeo do Português com Letícia
        description: "Metáfora, metonímia, eufemismo e muito mais." 
      },
    ]
  },
  "filosofia": {
    title: "Filosofia",
    description: "Explore o pensamento crítico e os grandes questionamentos da humanidade.",
    lessons: [
        { 
          id: 1, 
          title: "O Mito da Caverna", 
          duration: "08:45", 
          videoId: "8s2M-tJz_yY", // Vídeo do Canal Parabólica
          description: "A alegoria de Platão explicada de forma simples e didática." 
        },
    ]
  },
};