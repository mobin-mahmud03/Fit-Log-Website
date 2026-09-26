"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, Flame, Star, Check } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

type PlanItem = {
  id: number;
  name: string;
  image: string;
  equipment: string;
  duration?: number;
  calories?: number;
  caloriesBurned: number;
  rating?: number;
};

function Page() {
  const {
    planItems = [] as PlanItem[],
    savedItems = [] as PlanItem[],
    removeFromPlan,
    removeFromSaved,
  } = usePlan();
  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const rawList: PlanItem[] = tab === "saved" ? savedItems : planItems;

  const list: PlanItem[] = [...rawList].sort((a, b) => {
    if (sortBy === "calories") {
      return (b.calories ?? 95) - (a.calories ?? 95);
    }
    if (sortBy === "rating") {
      return (b.rating ?? 4.7) - (a.rating ?? 4.7);
    }
    return (a.duration ?? 10) - (b.duration ?? 10);
  });

  let totalMin = 0;
  let totalCal = 0;

  for (let i = 0; i < rawList.length; i++) {
    totalMin = totalMin + (rawList[i].duration ?? 10);
    totalCal = totalCal + (rawList[i].calories ?? 95);
  }

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  }

  function handleMarkDone(id: number, name: string) {
    if (!completedIds.includes(id)) {
      setCompletedIds([...completedIds, id]);
    }
    showToast(`Marked "${name}" as done!`);
  }

  function handleRemove(id: number, name: string) {
    if (tab === "plan") {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }
    showToast(`Removed "${name}" from list.`);
  }

  return (
    <div className="container mx-auto p-6 text-white relative">
      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-[#ccff00] text-black font-extrabold text-xs px-4 py-2.5 rounded-lg shadow-lg z-50 transition-all">
          {toastMessage}
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-wide uppercase">MY PLAN</h1>
        <p className="text-xs text-gray-400 mt-1">
          Cap of five fits for today. Finish them, feel best more.
        </p>
      </div>

      <div className="bg-[#14161d] border border-[#1a1d24] rounded-xl p-6 mb-6 flex justify-around text-center">
        <div>
          <div className="text-xs text-gray-400 font-bold uppercase mb-1">
            Exercises
          </div>
          <div className="text-3xl font-black">{rawList.length}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 font-bold uppercase mb-1">
            Minutes
          </div>
          <div className="text-3xl font-black">{totalMin}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 font-bold uppercase mb-1">
            Calories
          </div>
          <div className="text-3xl font-black">{totalCal}</div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="bg-[#14161d] p-1 rounded-lg border border-[#1a1d24] flex gap-1">
          <button
            onClick={() => setTab("plan")}
            className={`px-4 py-1.5 text-xs font-bold rounded-md ${
              tab === "plan" ? "bg-[#222630] text-white" : "text-gray-400"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setTab("saved")}
            className={`px-4 py-1.5 text-xs font-bold rounded-md ${
              tab === "saved" ? "bg-[#222630] text-white" : "text-gray-400"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold">
          <span>SORT BY</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#14161d] border border-[#1a1d24] pl-3 pr-8 py-1.5 rounded-md text-white appearance-none text-xs font-bold focus:outline-none cursor-pointer"
            >
              <option value="duration" className="bg-[#14161d] text-white">
                Duration
              </option>
              <option value="calories" className="bg-[#14161d] text-white">
                Calories
              </option>
              <option value="rating" className="bg-[#14161d] text-white">
                Rating
              </option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-white absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-1">
            NOTHING HERE YET
          </h2>
          <p className="text-xs text-gray-400 mb-6">
            Browse the library and add a fit to get moving.
          </p>
          <Link
            href="#library"
            className="bg-[#ccff00] text-black font-extrabold text-xs px-6 py-2.5 rounded-full inline-block"
          >
            Browse workouts
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {list.map((item: PlanItem) => {
            const isDone = completedIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="bg-[#14161d] border border-[#1a1d24] rounded-xl p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-14 object-cover rounded-lg"
                  />
                  <div>
                    <h3
                      className={`font-extrabold text-sm uppercase ${
                        isDone ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-400">{item.equipment}</p>
                    <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-2">
                      <span className="flex items-center gap-1">
                        ⏱ {item.duration || 10} min
                      </span>
                      <span>{item.caloriesBurned} kcal</span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        {item.rating || 4.7}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/workouts/${item.id}`}
                    className="border border-[#2a2e38] text-xs font-bold px-3 py-1.5 rounded-full text-gray-300"
                  >
                    View Details
                  </Link>

                  {tab === "plan" && (
                    <button
                      onClick={() => handleMarkDone(item.id, item.name)}
                      className={`font-extrabold text-xs px-3 py-1.5 rounded-full flex items-center gap-1 ${
                        isDone
                          ? "bg-gray-700 text-gray-300"
                          : "bg-[#ccff00] text-black"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      {isDone ? "Done" : "Mark as Done"}
                    </button>
                  )}

                  <button
                    onClick={() => handleRemove(item.id, item.name)}
                    className="p-1 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Page;