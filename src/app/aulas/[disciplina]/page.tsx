"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { AULAS_DATA, Aula } from "@/data/aulasData";
import { useProgress } from "@/hooks/useProgress";
import { 
  ArrowLeft, CheckCircle2, Clock, FileText, Share2, Bookmark, Trash2
} from "lucide-react";

export default function AulaPage() {
  const params = useParams();
  const router = useRouter();
  const disciplinaSlug = params.disciplina as string; 
  const materia = AULAS_DATA[disciplinaSlug];

  const { markAsCompleted, unmarkAsCompleted, isLessonCompleted, isLoaded, saveLastAccess } = useProgress();

  const [currentLesson, setCurrentLesson] = useState<Aula | null>(null);

  useEffect(() => {
    if (materia && materia.lessons.length > 0) {
      const primeiraAula = materia.lessons[0];
      setCurrentLesson(primeiraAula);
      saveLastAccess(disciplinaSlug, primeiraAula.id);
    }
  }, [materia, disciplinaSlug]);

  const handleChangeLesson = (aula: Aula) => {
    setCurrentLesson(aula);
    saveLastAccess(disciplinaSlug, aula.id);
  };

  if (!materia) return <div>Matéria não encontrada</div>;

  const isCompleted = currentLesson && isLoaded ? isLessonCompleted(disciplinaSlug, currentLesson.id) : false;

  const handleToggleComplete = () => {
    if (!currentLesson) return;
    if (isCompleted) {
      unmarkAsCompleted(disciplinaSlug, currentLesson.id);
    } else {
      markAsCompleted(disciplinaSlug, currentLesson.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-none">{materia.title}</h1>
              <p className="text-xs text-slate-500 mt-1">Módulo 01 • Introdução</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"><Share2 size={20} /></button>
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"><Bookmark size={20} /></button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          {/* AQUI ESTÁ A ALTERAÇÃO: bg-slate-900 no lugar de bg-black */}
          <div className="w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-lg relative group">
            {currentLesson ? (
              <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${currentLesson.videoId}`} title={currentLesson.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
            ) : (<div className="flex items-center justify-center h-full text-white">Carregando player...</div>)}
          </div>

          {currentLesson && (
            <div>
              <div className="flex items-start justify-between mb-4 gap-4">
                <h2 className="text-2xl font-bold text-slate-900">{currentLesson.title}</h2>
                
                <button 
                  onClick={handleToggleComplete}
                  className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm whitespace-nowrap ${isCompleted ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200" : "bg-green-600 text-white hover:bg-green-700 hover:shadow-md"}`}
                >
                  {isCompleted ? <><Trash2 size={16} /> Desmarcar Aula</> : <><CheckCircle2 size={16} /> Marcar como vista</>}
                </button>
              </div>
              <p className="text-slate-600 leading-relaxed">{currentLesson.description}</p>
              
              <div className="mt-8 pt-8 border-t border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><FileText size={18} className="text-blue-600"/> Materiais de Apoio</h3>
                <div className="flex gap-4">
                    <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md cursor-pointer transition-all">
                        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-500 font-bold text-xs">PDF</div>
                        <div><p className="text-sm font-bold text-slate-700">Slides da Aula</p><p className="text-xs text-slate-400">2.4 MB</p></div>
                    </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden sticky top-24">
            <div className="p-4 bg-slate-50 border-b border-slate-200"><h3 className="font-bold text-slate-800">Conteúdo do Módulo</h3><p className="text-xs text-slate-500 mt-1">{materia.lessons.length} aulas</p></div>
            <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
              {materia.lessons.map((aula, index) => {
                const isThisLessonActive = currentLesson?.id === aula.id;
                const isThisLessonCompleted = isLessonCompleted(disciplinaSlug, aula.id);
                return (
                  <div key={aula.id} onClick={() => handleChangeLesson(aula)} className={`p-4 flex gap-3 cursor-pointer transition-colors border-b border-slate-50 last:border-none hover:bg-slate-50 ${isThisLessonActive ? "bg-blue-50/60" : "bg-white"}`}>
                    <div className="mt-1">
                        {isThisLessonCompleted ? <CheckCircle2 size={20} className="text-green-500 fill-green-100" /> : <span className="w-5 h-5 flex items-center justify-center text-xs font-bold text-slate-400">{index + 1}</span>}
                    </div>
                    <div>
                        <h4 className={`text-sm font-medium ${isThisLessonActive ? "text-blue-700 font-bold" : "text-slate-700"} ${isThisLessonCompleted ? "text-slate-400 line-through" : ""}`}>
                            {aula.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1.5"><span className="flex items-center gap-1 text-[10px] text-slate-400 font-medium bg-slate-100 px-1.5 py-0.5 rounded"><Clock size={10} /> {aula.duration}</span></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}