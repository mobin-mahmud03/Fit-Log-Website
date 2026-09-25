"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import logo from '@/assets/logo.png'

const Navbar = () => {
  const [activeTab, setActiveTab] = useState<'workouts' | 'myPlan'>('workouts');
  const planCount = 0;
  const savedCount = 0;

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
              <a
                onClick={() => setActiveTab('workouts')}
                className={activeTab === 'workouts' ? 'text-[#a8f000] font-semibold' : ''}
              >
                Workouts
              </a>
            </li>
            <li>
              <a
                onClick={() => setActiveTab('myPlan')}
                className={activeTab === 'myPlan' ? 'text-[#a8f000] font-semibold' : ''}
              >
                My Plan
              </a>
            </li>
          </ul>
        </div>
 
        
        <a className="btn btn-ghost text-xl normal-case flex items-center gap-2 hover:bg-transparent text-white">
          <Image src={logo}/>
          <span className="font-extrabold tracking-wider uppercase">FITLOG</span>
        </a>
      </div>

     
      <div className="navbar-center hidden lg:flex">
        <div className="flex items-center gap-1 p-1 rounded-full border border-gray-800">
          <button
            onClick={() => setActiveTab('workouts')}
            className={`btn btn-sm rounded-full border-none font-semibold text-xs px-5 ${
              activeTab === 'workouts'
                ? 'bg-[#1e2904] text-[#a8f000] '
                : 'btn-ghost text-gray-400 '
            }`}
          >
            Workouts
          </button>
          <button
            onClick={() => setActiveTab('myPlan')}
            className={`btn btn-sm rounded-full border-none font-semibold text-xs px-5 ${
              activeTab === 'myPlan'
                ? 'bg-[#1e2904] text-[#a8f000]'
                : 'btn-ghost text-gray-400'
            }`}
          >
            My Plan
          </button>
        </div>
      </div>

     
      <div className="navbar-end gap-5">
        <div className="flex items-center gap-2 cursor-pointer text-sm hover:opacity-80 transition-opacity">
          <span className="text-gray-300">Plan</span>
          <span className="badge badge-sm bg-[#a8f000] text-black border-none font-bold p-2.5">
            {planCount}
          </span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer text-sm hover:opacity-80 transition-opacity">
          <span className="text-gray-300">Saved</span>
          <span className="badge badge-sm badge-outline text-gray-300 border-gray-600 font-bold p-2.5">
            {savedCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;