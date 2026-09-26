"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Workout } from "@/types/workout";

interface PlanContextType {
  planItems: Workout[];
  savedItems: Workout[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
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
    setPlanItems((prev) => [...prev, workout]);
  };

  const addToSaved = (workout: Workout) => {
    setSavedItems((prev) => [...prev, workout]);
  };

  const removeFromPlan = (id: number) => {
    setPlanItems((prev) => prev.filter((item) => item.id !== id));
  };

  const removeFromSaved = (id: number) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isInPlan = (id: number) => planItems.some((item) => item.id === id);
  const isSaved = (id: number) => savedItems.some((item) => item.id === id);

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