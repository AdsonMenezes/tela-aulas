"use client";

import React from "react";
import { Search } from "lucide-react";

export const Header = () => (
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
        className="block w-full pl-11 pr-4 py-3 bg-white border-none rounded-2xl text-slate-700 shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
      />
    </div>
  </header>
);