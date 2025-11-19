"use client";

import React from "react";
import { Play, MoreHorizontal, Calendar, ChevronRight, Bell, AlertCircle, CheckCircle2 } from "lucide-react";

// Dados simulados (Mocks)
const UPCOMING_EXAMS = [
  { title: "Simulado ENEM I", date: "10 Out", subject: "Geral" },
  { title: "Prova de Redação", date: "12 Out", subject: "Português" },
  { title: "Lista de Física", date: "15 Out", subject: "Exatas" },
];

// 1. Card Continuar Assistindo
export const ContinueWatchingCard = () => (
  <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
    <div className="flex justify-between items-start mb-4 z-10 relative">
      <div>
        <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-md mb-2 uppercase tracking-wide">Em andamento</span>
        <h3 className="text-lg font-bold text-slate-800 leading-tight">Trigonometria Avançada</h3>
        <p className="text-sm text-slate-500 mt-1">Aula 04 • Prof. Carlos</p>
      </div>
      <button className="bg-blue-50 p-2 rounded-full hover:bg-blue-100 transition-colors text-blue-600">
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </div>
    
    {/* Thumbnail */}
    <div className="relative w-full h-32 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden mb-5 group cursor-pointer mt-auto">
        <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay"></div>
        <div className="absolute top-[-20%] right-[-20%] w-24 h-24 bg-blue-500/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-[-20%] left-[-20%] w-24 h-24 bg-purple-500/30 rounded-full blur-xl"></div>
        <div className="z-10 bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20 group-hover:scale-110 transition-transform duration-300">
            <Play className="w-6 h-6 text-white fill-white" />
        </div>
    </div>

    {/* Progresso */}
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-medium text-slate-500">
        <span>Progresso da aula</span>
        <span className="text-blue-600 font-bold">75%</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-[75%] rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)]"></div>
      </div>
    </div>
    
    <button className="w-full mt-5 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-200 active:scale-95">
      Continuar Assistindo
    </button>
  </div>
);

// 2. Card Próximos Simulados
export const UpcomingExamsCard = () => (
  <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-lg transition-all duration-300 relative overflow-hidden">
    <div className="flex items-center justify-between mb-6 relative z-10">
      <h3 className="text-lg font-bold text-slate-800">Próximos Simulados</h3>
      <div className="bg-orange-50 p-2 rounded-xl text-orange-500">
        <Calendar className="w-5 h-5" />
      </div>
    </div>
    
    <div className="space-y-3 flex-1 relative z-10">
      {UPCOMING_EXAMS.map((exam, i) => (
        <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer border border-transparent hover:border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 text-slate-700 flex flex-col items-center justify-center shadow-sm group-hover:border-blue-200 group-hover:shadow-md transition-all">
               <span className="text-[10px] uppercase font-bold text-slate-400">OUT</span>
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
    
    <button className="w-full mt-4 py-2.5 text-xs font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors flex items-center justify-center gap-2">
      Ver calendário completo <ChevronRight className="w-3 h-3" />
    </button>
  </div>
);

// 3. Card de Avisos
export const NoticesCard = () => (
  <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-[24px] p-6 shadow-lg h-full relative overflow-hidden hover:shadow-xl transition-all duration-300 group">
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/30 transition-all"></div>
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -ml-10 -mb-10 group-hover:bg-purple-500/30 transition-all"></div>
    
    <div className="flex items-center justify-between mb-6 relative z-10">
      <h3 className="text-lg font-bold text-white">Quadro de Avisos</h3>
      <div className="relative">
        <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/10">
            <Bell className="w-5 h-5 text-white" />
        </div>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900"></span>
      </div>
    </div>

    <div className="space-y-3 relative z-10">
        <div className="bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
                <div className="bg-yellow-500/20 p-1.5 rounded-lg text-yellow-400 shrink-0 mt-0.5">
                    <AlertCircle size={16} />
                </div>
                <div>
                    <p className="text-sm font-bold text-white">Manutenção</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Domingo, 02:00 - Atualização.
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
                    <p className="text-sm font-bold text-white">Nova Aula</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Módulo de Biologia atualizado.
                    </p>
                </div>
            </div>
        </div>
    </div>
  </div>
);