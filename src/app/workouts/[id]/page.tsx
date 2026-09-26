"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/types/workout";
import toast from "react-hot-toast";
import { usePlan } from "@/context/PlanContext";

const Page = () => {
    const { id } = useParams();

    const [workout, setWorkout] = useState<Workout | null>(null);
    const { addToPlan, addToSaved, isInPlan, isSaved } = usePlan();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, { method: "GET" });
            const data = await res.json();
            setWorkout(data);
            setLoading(false);
        };

        getData();
    }, [id]);

    if (loading) {
        return (
            <section className="min-h-screen bg-[#0b0c0f] px-4 py-8 text-white">
                <p className="text-gray-400">Loading...</p>
            </section>
        );
    }

    if (error || !workout) {
        return (
            <section className="min-h-screen bg-[#0b0c0f] px-4 py-8 text-white">
                <p className="text-gray-400">Workout not found.</p>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-[#0b0c0f] px-4 py-8 text-white">
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="overflow-hidden rounded-xl border border-[#24272d]">
                    <img
                        src={workout.image}
                        alt={workout.name}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div>
                    <div className="mb-3 flex flex-wrap gap-1.5">
                        {workout.muscleGroups.map((muscle) => (
                            <span
                                key={muscle}
                                className="rounded-full bg-[#b8ff00] px-2 py-1 text-[10px] font-bold uppercase text-black"
                            >
                                {muscle}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-2xl font-extrabold uppercase">{workout.name}</h1>

                    <p className="mt-3 text-sm text-gray-400">{workout.description}</p>

                    <div className="my-4 h-px bg-[#24272d]" />

                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="rounded-lg border border-[#24272d] bg-[#15171c] p-3">
                            <p className="text-gray-500">Equipment</p>
                            <p className="font-semibold">{workout.equipment}</p>
                        </div>
                        <div className="rounded-lg border border-[#24272d] bg-[#15171c] p-3">
                            <p className="text-gray-500">Difficulty</p>
                            <p className="font-semibold">{workout.difficulty}</p>
                        </div>
                        <div className="rounded-lg border border-[#24272d] bg-[#15171c] p-3">
                            <p className="text-gray-500">Sets x Reps</p>
                            <p className="font-semibold">
                                {workout.sets} x {workout.reps}
                            </p>
                        </div>
                        <div className="rounded-lg border border-[#24272d] bg-[#15171c] p-3">
                            <p className="text-gray-500">Rating</p>
                            <p className="flex items-center gap-1 font-semibold">
                                <Star size={12} />
                                {workout.rating}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {workout.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                            <Flame size={12} />
                            {workout.caloriesBurned} kcal
                        </span>
                    </div>

                    <h2 className="mt-6 mb-2 text-sm font-extrabold uppercase">
                        Instructions
                    </h2>
                    <ol className="list-decimal space-y-2 pl-4 text-sm text-gray-400">
                        {workout.instructions.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>

                    <div className="mt-6 flex gap-3">
                        <button
                            disabled={isInPlan(workout.id)}
                            onClick={() => {
                                addToPlan(workout);
                                toast.success("Added to today's plan!");
                            }}
                            className="btn rounded-full border-none bg-[#a8f000] px-6 text-black hover:bg-[#a8f000]/90 disabled:opacity-40"
                        >
                            {isInPlan(workout.id) ? "Added to Plan" : "Add to Plan"}
                        </button>
                        <button
                            disabled={isSaved(workout.id)}
                            onClick={() => {
                                addToSaved(workout);
                                toast.success("Saved for later!");
                            }}
                            className="btn btn-outline rounded-full border-gray-600 px-6 text-gray-300 disabled:opacity-40"
                        >
                            {isSaved(workout.id) ? "Saved" : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;