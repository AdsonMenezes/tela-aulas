"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, Play, Calendar, Bell, ChevronRight, MoreHorizontal, 
  AlertCircle, CheckCircle2, CalendarDays,
  // Importando todos os ícones das matérias
  Calculator, BookOpen, Clock, Globe, Languages, PenTool, 
  Atom, FlaskConical, Dna, BrainCircuit, Palette, Feather
} from "lucide-react";

import { SubjectsCarousel } from "@/components/ui/aulas/SubjectsCarousel";
import { useProgress } from "@/hooks/useProgress"; 
import { AULAS_DATA } from "@/data/aulasData"; 

// --- MAPA DE ÍCONES ---
const SUBJECT_ICONS: Record<string, React.ElementType> = {
  "matematica": Calculator,
  "portugues": BookOpen,
  "historia": Clock,
  "geografia": Globe,
  "ingles": Languages,
  "redacao": PenTool,
  "fisica": Atom,
  "quimica": FlaskConical,
  "biologia": Dna,
  "filosofia": BrainCircuit,
  "artes": Palette,
  "literatura": Feather
};

// --- COMPONENTE HEADER ---
interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header = ({ searchTerm, setSearchTerm }: HeaderProps) => (
  <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
    <div>
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Minhas Aulas</h1>
      <p className="text-slate-500 text-sm mt-1">Continue sua jornada de aprendizado hoje.</p>
    </div>
    
    <div className="relative w-full md:w-96 group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
      </div>
      <input
        type="text"
        placeholder="Buscar por matéria, aula ou professor..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full pl-11 pr-4 py-3 bg-white border-none rounded-2xl text-slate-700 shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
      />
    </div>
  </header>
);

// --- CARD CONTINUE ASSISTINDO (ATUALIZADO: ÍCONE + NOME DENTRO DA CAIXA) ---
const ContinueWatchingCard = () => {
  const { lastLesson, isLoaded, getSubjectProgress } = useProgress();
  
  const [cardData, setCardData] = useState({
    title: "Nenhuma aula em andamento",
    subjectName: "Geral", // Nome padrão
    progress: 0,
    link: "/aulas/matematica",
    Icon: Play
  });

  useEffect(() => {
    if (isLoaded && lastLesson) {
      const slug = lastLesson.subjectSlug;
      const materia = AULAS_DATA[slug];
      
      if (materia) {
        const aula = materia.lessons.find(l => l.id === lastLesson.lessonId);
        const totalLessons = materia.lessons.length || 1;
        const realProgress = getSubjectProgress(slug, totalLessons);
        const MatIcon = SUBJECT_ICONS[slug] || Play;

        if (aula) {
          setCardData({
            title: aula.title,
            subjectName: materia.title, // Nome da matéria para o card cinza
            progress: realProgress,
            link: `/aulas/${slug}`,
            Icon: MatIcon
          });
        }
      }
    }
  }, [lastLesson, isLoaded, getSubjectProgress]);

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
      
      {/* Header do Card */}
      <div className="flex justify-between items-start mb-4 z-10 relative">
        <div>
          <span className="inline-block px-2 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-md mb-2 uppercase tracking-wide">
            {cardData.progress > 0 ? "Em andamento" : "Início"}
          </span>
          <h3 className="text-lg font-bold text-slate-800 leading-tight line-clamp-1">{cardData.title}</h3>
        </div>
        <button className="bg-slate-50 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      {/* CAIXA CINZA ESTILIZADA */}
      <div className="relative w-full h-32 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-start pl-6 gap-4 overflow-hidden mb-5 group cursor-pointer mt-auto border border-slate-200/50">
          
          <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          {/* 1. Ícone à Esquerda */}
          <div className="z-10 bg-white shadow-sm p-3 rounded-xl border border-slate-100 group-hover:scale-110 transition-transform duration-300 text-slate-700">
              <cardData.Icon className="w-6 h-6" />
          </div>

          {/* 2. Nome da Matéria ao lado */}
          <div className="z-10">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Disciplina</p>
            <h4 className="text-xl font-bold text-slate-700 tracking-tight">{cardData.subjectName}</h4>
          </div>

          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-slate-300/20 rounded-full blur-2xl"></div>
      </div>

      {/* Barra de Progresso */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium text-slate-500">
          <span>Progresso da aula</span>
          <span className="text-blue-600 font-bold">{cardData.progress}%</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-1000 ease-out" 
            style={{ width: `${cardData.progress}%` }}
          ></div>
        </div>
      </div>
      
      <Link href={cardData.link} className="w-full mt-5">
        <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-200 active:scale-95">
          {cardData.progress > 0 ? "Continuar Assistindo" : "Começar Nova Aula"}
        </button>
      </Link>
    </div>
  );
};

// --- CARD PRÓXIMOS SIMULADOS ---
const UpcomingExamsCard = () => {
  const [exams, setExams] = useState<{ title: string; date: string; subject: string }[]>([]);

  useEffect(() => {
    const savedExams = localStorage.getItem("conectaedu-exams");
    if (savedExams) {
      setExams(JSON.parse(savedExams));
    }
  }, []);

  const handleAddSimulation = () => {
    const newExam = {
      title: "Prova de História",
      date: "20 Out",
      subject: "Humanas"
    };
    const updatedList = [...exams, newExam];
    setExams(updatedList);
    localStorage.setItem("conectaedu-exams", JSON.stringify(updatedList));
  };

  const handleClear = () => {
    setExams([]);
    localStorage.removeItem("conectaedu-exams");
  };

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-lg transition-all duration-300 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-lg font-bold text-slate-800">Próximos Simulados</h3>
        <div className="bg-orange-50 p-2 rounded-xl text-orange-500">
          <Calendar className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex-1 relative z-10 overflow-y-auto custom-scrollbar">
        {exams.length > 0 ? (
          <div className="space-y-3">
            {exams.map((exam, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 text-slate-700 flex flex-col items-center justify-center shadow-sm group-hover:border-blue-200 group-hover:shadow-md transition-all">
                    <span className="text-[10px] uppercase font-bold text-slate-400">DATA</span>
                    <span className="text-lg font-bold text-blue-600 leading-none">{exam.date.split(' ')[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{exam.title}</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">{exam.subject}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center py-2 opacity-80">
              <div className="bg-slate-50 p-4 rounded-full mb-3">
                  <CalendarDays className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-600 font-bold text-sm">Agenda Livre</p>
              <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
                  Você não tem simulados agendados.
              </p>
              <button 
                onClick={handleAddSimulation}
                className="mt-4 text-xs text-blue-600 font-bold hover:underline"
              >
                + Simular Agendamento
              </button>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex justify-between items-center gap-2">
        <button className="flex-1 py-2.5 text-xs font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors flex items-center justify-center gap-2">
           Calendário <ChevronRight className="w-3 h-3" />
        </button>
        {exams.length > 0 && (
             <button onClick={handleClear} className="text-[10px] text-red-400 hover:text-red-600 px-2">
               Limpar
             </button>
        )}
      </div>
    </div>
  );
};

// --- CARD AVISOS ---
const NoticesCard = () => (
  <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-[24px] p-6 shadow-lg h-full relative overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/30 transition-all"></div>
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -ml-10 -mb-10 group-hover:bg-purple-500/30 transition-all"></div>
    
    <div className="flex items-center justify-between mb-6 relative z-10 shrink-0">
      <h3 className="text-lg font-bold text-white">Quadro de Avisos</h3>
      <div className="relative">
        <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/10">
            <Bell className="w-5 h-5 text-white" />
        </div>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900"></span>
      </div>
    </div>

    <div className="space-y-3 relative z-10 flex-1">
        <div className="bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
                <div className="bg-yellow-500/20 p-1.5 rounded-lg text-yellow-400 shrink-0 mt-0.5">
                    <AlertCircle size={16} />
                </div>
                <div>
                    <p className="text-sm font-bold text-white">Manutenção Programada</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Domingo, 02:00 - Atualização de sistema.
                    </p>
                </div>
            </div>
        </div>

        <div className="bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
                <div className="bg-green-500/20 p-1.5 rounded-lg text-green-400 shrink-0 mt-0.5">
                    <CheckCircle2 size={16} />
                </div>
                <div>
                    <p className="text-sm font-bold text-white">Nova Aula: Genética</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Módulo de Biologia atualizado.
                    </p>
                </div>
            </div>
        </div>
    </div>
  </div>
);

// --- PÁGINA PRINCIPAL ---
export default function AulasPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-20">
      <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          <div className="lg:col-span-5 h-[320px]">
            <ContinueWatchingCard />
          </div>
          <div className="lg:col-span-4 h-[320px]">
            <UpcomingExamsCard />
          </div>
          <div className="lg:col-span-3 h-[320px]">
            <NoticesCard />
          </div>
        </div>

        <SubjectsCarousel searchTerm={searchTerm} />

      </div>
    </div>
  );
}