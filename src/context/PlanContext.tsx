"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Workout } from "@/types/workout";

interface PlanContextType {
  planItems: Workout[];
  savedItems: Workout[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  removeFromSaved: (id: string | number) => void;
  isInPlan: (id: string | number) => boolean;
  isSaved: (id: string | number) => boolean;
}

const PlanContext = createContext<PlanContextType | null>(null);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [planItems, setPlanItems] = useState<Workout[]>(() => {
    if (typeof window === "undefined") return [];
    const plan = localStorage.getItem("planItems");
    return plan ? JSON.parse(plan) : [];
  });

  const [savedItems, setSavedItems] = useState<Workout[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("savedItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("planItems", JSON.stringify(planItems));
  }, [planItems]);

  useEffect(() => {
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
  }, [savedItems]);

  const addToPlan = (workout: Workout) => {
    setPlanItems((prev) => {
      if (prev.some((item) => String(item.id) === String(workout.id))) return prev;
      return [...prev, workout];
    });
  };

  const addToSaved = (workout: Workout) => {
    setSavedItems((prev) => {
      if (prev.some((item) => String(item.id) === String(workout.id))) return prev;
      return [...prev, workout];
    });
  };

  const removeFromPlan = (id: string | number) => {
    setPlanItems((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  const removeFromSaved = (id: string | number) => {
    setSavedItems((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  const isInPlan = (id: string | number) =>
    planItems.some((item) => String(item.id) === String(id));

  const isSaved = (id: string | number) =>
    savedItems.some((item) => String(item.id) === String(id));

  return (
    <PlanContext.Provider
      value={{
        planItems,
        savedItems,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        isInPlan,
        isSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within PlanProvider");
  return context;
};