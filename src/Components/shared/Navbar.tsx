"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from '@/assets/logo.png';
import { usePlan } from '@/context/PlanContext';

const Navbar = () => {
  const pathname = usePathname();
  const { planItems = [], savedItems = [] } = usePlan();

  const planCount = planItems.length;
  const savedCount = savedItems.length;

  const isWorkouts = pathname === '/';
  const isMyPlan = pathname === '/my-plan';

  return (
    <div className="navbar bg-[#0d0d0e] text-white px-4 border-b border-gray-800">

      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-[#121314] rounded-box z-10 mt-3 w-52 p-2 shadow border border-gray-800 text-white"
          >
            <li>
              <Link
                href="/"
                className={isWorkouts ? 'text-[#a8f000] font-semibold' : ''}
              >
                Workouts
              </Link>
            </li>
            <li>
              <Link
                href="/my-plan"
                className={isMyPlan ? 'text-[#a8f000] font-semibold' : ''}
              >
                My Plan
              </Link>
            </li>
          </ul>
        </div>

        <Link href="/" className="btn btn-ghost text-xl normal-case flex items-center gap-2 hover:bg-transparent text-white">
          <Image src={logo} alt="FitLog logo" />
          <span className="font-extrabold tracking-wider uppercase">FITLOG</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <div className="flex items-center gap-1 p-1 rounded-full">
          <Link
            href="/"
            className={`btn btn-sm rounded-full border-none font-semibold text-xs px-5 ${
              isWorkouts
                ? 'bg-[#1e2904] text-[#a8f000]'
                : 'btn-ghost text-gray-400'
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`btn btn-sm rounded-full border-none font-semibold text-xs px-5 ${
              isMyPlan
                ? 'bg-[#1e2904] text-[#a8f000]'
                : 'btn-ghost text-gray-400'
            }`}
          >
            My Plan
          </Link>
        </div>
      </div>

      <div className="navbar-end gap-5">
        <Link href="/my-plan" className="flex items-center gap-2 cursor-pointer text-sm hover:opacity-80 transition-opacity">
          <span className="text-gray-300">Plan</span>
          <span 
            suppressHydrationWarning 
            className="badge badge-sm bg-[#a8f000] text-black border-none font-bold p-2.5"
          >
            {planCount}
          </span>
        </Link>

        <Link href="/my-plan" className="flex items-center gap-2 cursor-pointer text-sm hover:opacity-80 transition-opacity">
          <span className="text-gray-300">Saved</span>
          <span 
            suppressHydrationWarning 
            className="badge badge-sm badge-outline text-gray-300 border-gray-600 font-bold p-2.5"
          >
            {savedCount}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;