"use client";

import { useState, useEffect, useCallback } from "react";

type LastLesson = {
  subjectSlug: string;
  lessonId: number;
} | null;

export function useProgress() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [lastLesson, setLastLesson] = useState<LastLesson>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedProgress = localStorage.getItem("conectaedu-progress");
    if (savedProgress) {
      setCompletedLessons(JSON.parse(savedProgress));
    }

    const savedLast = localStorage.getItem("conectaedu-last-lesson");
    if (savedLast) {
      setLastLesson(JSON.parse(savedLast));
    }

    setIsLoaded(true);
  }, []);

  const saveProgress = (newlist: string[]) => {
    setCompletedLessons(newlist);
    localStorage.setItem("conectaedu-progress", JSON.stringify(newlist));
  };

  // --- CORREÇÃO: useCallback ADICIONADO NAS FUNÇÕES ABAIXO ---
  
  const saveLastAccess = useCallback((subjectSlug: string, lessonId: number) => {
    const data = { subjectSlug, lessonId };
    setLastLesson(data);
    localStorage.setItem("conectaedu-last-lesson", JSON.stringify(data));
  }, []);

  const markAsCompleted = useCallback((subjectSlug: string, lessonId: number) => {
    const key = `${subjectSlug}-${lessonId}`;
    // Precisamos usar o estado anterior (prev) para evitar dependência cíclica
    setCompletedLessons((prev) => {
      if (!prev.includes(key)) {
        const newList = [...prev, key];
        localStorage.setItem("conectaedu-progress", JSON.stringify(newList));
        return newList;
      }
      return prev;
    });
  }, []);

  const unmarkAsCompleted = useCallback((subjectSlug: string, lessonId: number) => {
    const key = `${subjectSlug}-${lessonId}`;
    setCompletedLessons((prev) => {
      const newList = prev.filter((item) => item !== key);
      localStorage.setItem("conectaedu-progress", JSON.stringify(newList));
      return newList;
    });
  }, []);

  const isLessonCompleted = useCallback((subjectSlug: string, lessonId: number) => {
    return completedLessons.includes(`${subjectSlug}-${lessonId}`);
  }, [completedLessons]);

  const getSubjectProgress = useCallback((subjectSlug: string, totalLessons: number) => {
    if (totalLessons === 0) return 0;
    // Aqui usamos completedLessons direto da dependência
    const completedCount = completedLessons.filter(k => k.startsWith(`${subjectSlug}-`)).length;
    const percentage = (completedCount / totalLessons) * 100;
    return Math.min(Math.round(percentage), 100);
  }, [completedLessons]);

  return {
    completedLessons,
    lastLesson,
    saveLastAccess,
    markAsCompleted,
    unmarkAsCompleted,
    isLessonCompleted,
    getSubjectProgress,
    isLoaded
  };
}