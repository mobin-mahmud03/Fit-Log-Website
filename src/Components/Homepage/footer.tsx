import Image from "next/image";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-[#0d0d0e] py-6 text-white">
      <div className="container mx-auto flex items-center justify-between px-4">
   
        <div className="flex items-center gap-2">
          <Image src={logo} alt="FitLog logo" width={20} height={20} />
          <span className="font-black text-sm tracking-wider uppercase text-white">
            FITLOG
          </span>
        </div>

      
        <p className="text-xs text-gray-500 font-medium">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;