"use client";

import React from "react";
import {
  Calculator, BookOpen, Clock, Globe, Languages, PenTool, 
  Atom, FlaskConical, Dna, BrainCircuit, Palette, Feather, 
  ChevronRight, SearchX
} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

// --- DADOS DAS MATÉRIAS ---
const SUBJECTS = [
  { 
    name: "Matemática", 
    icon: Calculator, 
    progress: 0, 
    color: "from-blue-600 to-cyan-500", 
    lessons: 42,
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop" 
  },
  { 
    name: "Português", 
    icon: BookOpen, 
    progress: 0, 
    color: "from-blue-700 to-indigo-600", 
    lessons: 38,
    imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2073&auto=format&fit=crop" 
  },
  { 
    name: "História", 
    icon: Clock, 
    progress: 0, 
    color: "from-indigo-600 to-purple-600", 
    lessons: 25,
    imageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2074&auto=format&fit=crop" 
  },
  { 
    name: "Geografia", 
    icon: Globe, 
    progress: 0, 
    color: "from-cyan-600 to-teal-500", 
    lessons: 30,
    imageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" 
  },
  { 
    name: "Inglês", 
    icon: Languages, 
    progress: 0, 
    color: "from-sky-600 to-blue-500", 
    lessons: 45,
    imageUrl: "https://images.unsplash.com/photo-1513957723230-c330c6152342?q=80&w=2071&auto=format&fit=crop" 
  },
  { 
    name: "Redação", 
    icon: PenTool, 
    progress: 0, 
    color: "from-blue-800 to-cyan-600", 
    lessons: 15,
    imageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop" 
  },
  { 
    name: "Física", 
    icon: Atom, 
    progress: 0, 
    color: "from-violet-600 to-fuchsia-600", 
    lessons: 50,
    imageUrl: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=2070&auto=format&fit=crop" 
  },
  { 
    name: "Química", 
    icon: FlaskConical, 
    progress: 0, 
    color: "from-teal-500 to-emerald-500", 
    lessons: 48,
    imageUrl: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=2070&auto=format&fit=crop" 
  },
  { 
    name: "Biologia", 
    icon: Dna, 
    progress: 0, 
    color: "from-emerald-600 to-green-500", 
    lessons: 40,
    imageUrl: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=2070&auto=format&fit=crop" 
  },
  { 
    name: "Filosofia", 
    icon: BrainCircuit, 
    progress: 0, 
    color: "from-purple-500 to-pink-500", 
    lessons: 20,
    imageUrl: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070&auto=format&fit=crop" 
  },
  { 
    name: "Artes", 
    icon: Palette, 
    progress: 0, 
    color: "from-pink-500 to-rose-500", 
    lessons: 18,
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop" 
  },
  { 
    name: "Literatura", 
    icon: Feather, 
    progress: 0, 
    color: "from-amber-500 to-orange-500", 
    lessons: 22,
    imageUrl: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?q=80&w=2070&auto=format&fit=crop" 
  },
];

interface SubjectsCarouselProps {
  searchTerm?: string;
}

export const SubjectsCarousel = ({ searchTerm = "" }: SubjectsCarouselProps) => {
  
  // --- FUNÇÃO DE LIMPEZA DE TEXTO ---
  // Essa função remove acentos (á -> a) e transforma em minúsculo
  const normalizeText = (text: string) => {
    return text
      .normalize("NFD") // Separa o acento da letra (ex: 'á' vira 'a' + '´')
      .replace(/[\u0300-\u036f]/g, "") // Remove os acentos soltos
      .toLowerCase(); // Deixa tudo minúsculo
  };

  // Lógica de filtro atualizada: Compara os textos "limpos"
  const filteredSubjects = SUBJECTS.filter((subject) => 
    normalizeText(subject.name).includes(normalizeText(searchTerm))
  );

  return (
    <section className="w-full py-4">
      <Carousel
        opts={{ align: "start", loop: false }}
        className="w-full"
      >
        <div className="flex justify-between items-end mb-8 px-1">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Disciplinas</h2>
            <p className="text-sm text-slate-500 mt-1">Navegue pelo seu plano de estudos completo</p>
          </div>
          {/* Só mostra as setas se tiver conteúdo */}
          {filteredSubjects.length > 0 && (
            <div className="flex gap-3">
              <CarouselPrevious className="static translate-y-0 h-10 w-10 rounded-full border-slate-200 text-slate-600 hover:bg-white hover:border-blue-500 hover:text-blue-600" variant="outline" />
              <CarouselNext className="static translate-y-0 h-10 w-10 rounded-full border-slate-200 text-slate-600 hover:bg-white hover:border-blue-500 hover:text-blue-600" variant="outline" />
            </div>
          )}
        </div>

        <CarouselContent className="-ml-6 pb-10">
          {/* MENSAGEM DE "NADA ENCONTRADO" */}
          {filteredSubjects.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center py-12 pl-6 text-slate-400 col-span-full">
               <SearchX size={48} className="mb-4 opacity-50" />
               <p className="text-lg font-medium">Nenhuma disciplina encontrada para "{searchTerm}"</p>
            </div>
          ) : (
            filteredSubjects.map((subject, index) => (
              <CarouselItem key={index} className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="w-full h-[360px] relative rounded-[32px] overflow-hidden cursor-pointer group/card transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-900/20 bg-slate-900">
                  
                  {/* 1. CAMADA BASE: COR */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-100`}></div>

                  {/* 2. CAMADA TOPO: IMAGEM (com tratamento de erro) */}
                  {subject.imageUrl && (
                    <img 
                      src={subject.imageUrl} 
                      alt={subject.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                      onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                  )}

                  {/* Camada escura para texto */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60 opacity-60 transition-opacity group-hover/card:opacity-80"></div>
                  <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                  {/* Conteúdo do Card */}
                  <div className="absolute inset-0 p-7 flex flex-col justify-between z-10">
                    
                    <div className="flex justify-between items-start">
                      <div className="bg-white/20 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 shadow-lg group-hover/card:scale-110 group-hover/card:rotate-3 transition-all duration-300">
                        <subject.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-sm">
                        <span className="text-xs font-bold text-white tracking-wide">{subject.progress}%</span>
                      </div>
                    </div>

                    <div className="transform transition-all duration-300 translate-y-2 group-hover/card:translate-y-0">
                      <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{subject.name}</h3>
                      <p className="text-blue-100 text-xs font-medium opacity-80 mb-6 flex items-center gap-1">
                        <BookOpen size={12} /> {subject.lessons} Aulas disponíveis
                      </p>
                      
                      <div className="relative h-12 flex flex-col justify-end">
                        <button className="absolute bottom-0 w-full py-3 bg-white text-blue-900 rounded-xl font-bold text-sm shadow-lg opacity-0 translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 z-20">
                          Acessar Matéria <ChevronRight size={16} className="text-blue-600" />
                        </button>
                        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-2 group-hover/card:opacity-0 transition-opacity duration-200">
                          <div 
                            style={{ width: `${subject.progress}%` }} 
                            className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-1000 ease-out"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
      </Carousel>
    </section>
  );
};