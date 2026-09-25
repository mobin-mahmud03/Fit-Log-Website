import Image from 'next/image';
import React from 'react';
import banner from '@/assets/banner.png';

const Banner = () => {
  return (
    <section className="bg-[#15171d] container mx-auto grid grid-cols-1 items-center gap-8 rounded-2xl lg:grid-cols-2 mt-8 lg:mt-16 p-6 sm:p-10 text-white">
      {/* Left Content */}
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        <p className="mb-3 text-[#a8f000] font-inter text-xs font-semibold uppercase tracking-wider">
          WORKOUT LIBRARY
        </p>

        <h1 className="font-sans font-extrabold uppercase text-3xl sm:text-4xl lg:text-5xl leading-tight">
          Train with intent. <br className="hidden sm:inline" />
          Log every set.
        </h1>

        <p className="font-inter mt-4 max-w-md text-gray-400 text-sm sm:text-base">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>

        <a
          href="#library"
          className="mt-6 sm:mt-8 inline-block border border-[#a8f000] bg-[#a8f000] text-black font-inter font-semibold uppercase px-6 py-3 rounded-lg hover:bg-transparent hover:text-[#a8f000] transition-colors duration-200 text-sm"
        >
          Browse Workouts
        </a>
      </div>

      {/* Right Image */}
      <div className="flex justify-center items-center w-full mt-4 lg:mt-0">
        <div className="relative aspect-square w-full max-w-xs sm:max-w-sm lg:max-w-md">
          <Image
            src={banner}
            alt="FitLog Workout Banner"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;