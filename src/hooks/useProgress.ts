"use client";

import { useState, useEffect } from "react";

// Tipo para salvar a última aula
type LastLesson = {
  subjectSlug: string;
  lessonId: number;
} | null;

export function useProgress() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [lastLesson, setLastLesson] = useState<LastLesson>(null); // NOVO
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Carrega aulas concluídas
    const savedProgress = localStorage.getItem("conectaedu-progress");
    if (savedProgress) {
      setCompletedLessons(JSON.parse(savedProgress));
    }

    // 2. Carrega última aula vista (NOVO)
    const savedLast = localStorage.getItem("conectaedu-last-lesson");
    if (savedLast) {
      setLastLesson(JSON.parse(savedLast));
    }

    setIsLoaded(true);
  }, []);

  // Salvar progresso
  const saveProgress = (newlist: string[]) => {
    setCompletedLessons(newlist);
    localStorage.setItem("conectaedu-progress", JSON.stringify(newlist));
  };

  // --- FUNÇÃO NOVA: SALVAR ÚLTIMA AULA ---
  const saveLastAccess = (subjectSlug: string, lessonId: number) => {
    const data = { subjectSlug, lessonId };
    setLastLesson(data);
    localStorage.setItem("conectaedu-last-lesson", JSON.stringify(data));
  };

  const markAsCompleted = (subjectSlug: string, lessonId: number) => {
    const key = `${subjectSlug}-${lessonId}`;
    if (!completedLessons.includes(key)) {
      const newList = [...completedLessons, key];
      saveProgress(newList);
    }
  };

  const unmarkAsCompleted = (subjectSlug: string, lessonId: number) => {
    const key = `${subjectSlug}-${lessonId}`;
    const newList = completedLessons.filter((item) => item !== key);
    saveProgress(newList);
  };

  const isLessonCompleted = (subjectSlug: string, lessonId: number) => {
    return completedLessons.includes(`${subjectSlug}-${lessonId}`);
  };

  const getSubjectProgress = (subjectSlug: string, totalLessons: number) => {
    if (totalLessons === 0) return 0;
    const completedCount = completedLessons.filter(k => k.startsWith(`${subjectSlug}-`)).length;
    const percentage = (completedCount / totalLessons) * 100;
    return Math.min(Math.round(percentage), 100);
  };

  return {
    completedLessons,
    lastLesson, // Exportando o estado
    saveLastAccess, // Exportando a função
    markAsCompleted,
    unmarkAsCompleted,
    isLessonCompleted,
    getSubjectProgress,
    isLoaded
  };
}