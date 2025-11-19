"use client";

import React from "react";
import { BookOpen, ChevronRight } from "lucide-react";

interface SubjectCardProps {
  subject: {
    name: string;
    icon: React.ElementType;
    progress: number;
    color: string;
    lessons: number;
  };
}

export const SubjectCard = ({ subject }: SubjectCardProps) => {
  const Icon = subject.icon;

  return (
    <div className="snap-start shrink-0 w-[280px] h-[360px] relative rounded-[32px] overflow-hidden cursor-pointer group/card transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-900/20">
      <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-100`}></div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover/card:bg-white/30 transition-all"></div>

      <div className="absolute inset-0 p-7 flex flex-col justify-between z-10">
          <div className="flex justify-between items-start">
              <div className="bg-white/20 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 shadow-lg group-hover/card:scale-110 group-hover/card:rotate-3 transition-all duration-300">
                  <Icon className="w-7 h-7 text-white" />
              </div>
              {subject.progress > 0 && (
                  <div className="bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                       <span className="text-xs font-bold text-white tracking-wide">{subject.progress}%</span>
                  </div>
              )}
          </div>

          <div className="transform transition-all duration-300 translate-y-2 group-hover/card:translate-y-0">
              <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{subject.name}</h3>
              <p className="text-blue-100 text-xs font-medium opacity-80 mb-6 flex items-center gap-1">
                  <BookOpen size={12} /> {subject.lessons} Aulas disponíveis
              </p>
              
              <div className="relative h-12">
                  <button className="absolute inset-0 w-full h-full bg-white text-blue-900 rounded-xl font-bold text-sm shadow-lg opacity-0 translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 z-20">
                      Acessar Matéria
                      <ChevronRight size={16} className="text-blue-600"/>
                  </button>
                  
                  <div className="absolute bottom-4 w-full h-1.5 bg-white/20 rounded-full overflow-hidden group-hover/card:opacity-0 transition-opacity duration-200">
                      <div 
                          style={{ width: `${subject.progress}%` }} 
                          className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                      ></div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};