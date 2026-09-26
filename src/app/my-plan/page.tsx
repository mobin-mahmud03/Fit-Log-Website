"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, Flame, Star } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function Page() {
  const { planItems = [], savedItems = [], removeFromPlan, removeFromSaved } = usePlan();
  const [tab, setTab] = useState("plan");

  let list = planItems;
  if (tab === "saved") {
    list = savedItems;
  }

  let totalMin = 0;
  let totalCal = 0;

  for (let i = 0; i < list.length; i++) {
    totalMin = totalMin + (list[i].duration || 10);
    totalCal = totalCal + 95;
  }

  function handleRemove(id: number) {
    if (tab === "plan") {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }
  }

  return (
    <div className="container mx-auto p-6 text-white">
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
          <div className="text-3xl font-black">{list.length}</div>
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
          <button className="bg-[#14161d] border border-[#1a1d24] px-3 py-1.5 rounded-md text-white flex items-center gap-1">
            Duration <ChevronDown className="w-3 h-3" />
          </button>
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
            href="/workouts"
            className="bg-[#ccff00] text-black font-extrabold text-xs px-6 py-2.5 rounded-full inline-block"
          >
            Browse workouts
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {list.map((item) => (
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
                  <h3 className="font-extrabold text-sm uppercase">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400">{item.equipment}</p>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-2">
                    <span className="flex items-center gap-1">
                      ⏱ {item.duration || 10} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                      95 kcal
                    </span>
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
                  <button className="bg-[#ccff00] text-black font-extrabold text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                    ✓ Mark as Done
                  </button>
                )}

                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}