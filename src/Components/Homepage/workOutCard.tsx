"use client";

import { useEffect, useState } from "react";
import { Clock, Flame, Star } from "lucide-react";
import Link from "next/link";
import { Workout } from "@/types/workout";

const WorkOutCard = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
        method: "GET",
      });
      const data = await res.json();
      setWorkouts(data);
    };

    getData();
  }, []);

  return (
    <section className="min-h-screen bg-[#0b0c0f] px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5">
          <h2 className="text-2xl font-extrabold">THE LIBRARY</h2>
          <p className="mt-1 text-[9px] text-gray-500">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <Link
              href={`/workouts/${workout.id}`}
              key={workout.id}
              className="overflow-hidden rounded-xl border border-[#24272d] bg-[#15171c] transition hover:border-[#b8ff00]"
            >
              <div className="h-[95px] w-full overflow-hidden">
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-3">
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {workout.muscleGroups.map((muscle) => (
                    <span
                      key={muscle}
                      className="rounded-full bg-[#b8ff00] px-2 py-1 text-[7px] font-bold uppercase text-black"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>

                <h3 className="text-[11px] font-extrabold uppercase">
                  {workout.name}
                </h3>

                <p className="mt-1 text-[8px] text-gray-500">
                  {workout.equipment}
                </p>

                <div className="my-2.5 h-px bg-[#24272d]" />

                <div className="flex items-center gap-3 text-[8px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {workout.duration} min
                  </span>

                  <span className="flex items-center gap-1">
                    <Flame size={10} />
                    {workout.caloriesBurned} kcal
                  </span>

                  <span className="flex items-center gap-1">
                    <Star size={10} />
                    {workout.rating}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkOutCard;