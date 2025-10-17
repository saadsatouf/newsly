import { X, Facebook, Linkedin, Instagram, Youtube, Rss, Globe } from "lucide-react";

const Footer = ({ loading, hasPosts }) => {
  
  const dynamicMarginTop = loading || !hasPosts ? "bottom-0" : "";

  return (
    <footer className={`bg-[#27282c] text-white absolute w-full ${dynamicMarginTop}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">

        <div className="flex flex-wrap gap-4 sm:gap-6 text-sm mb-8">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy & Security</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Use</a>
           <a href="#" className="text-gray-400 hover:text-white transition-colors"> Legal</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Genuine tools</a>

        </div>

        <div className="flex items-center gap-3 sm:gap-4 mb-8 flex-wrap">
          <button className="text-gray-400 hover:text-white transition-colors" aria-label="X(Twitter)">
            <X size={20} />

          </button>
          <button className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
            <Facebook size={20} />

          </button>
           <button className="text-gray-400 hover:text-white transition-colors" aria-label="Linkedin">
            <Linkedin size={20} />

          </button>
               <button className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
            <Instagram size={20} />

          </button>
            <button className="text-gray-400 hover:text-white transition-colors" aria-label="Youtube">
            <Youtube size={20} />

          </button>
          <button className="text-gray-400 hover:text-white transition-colors" aria-label="RSS">
            <Rss size={20} />

          </button>
           <button className="text-gray-400 hover:text-white transition-colors" aria-label="Globe">
            <Globe size={20} />

          </button>


        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center
        gap-4 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-400">
               Copyright © 2000 Newsly s.r.o.

          </p>
          <button className="text-sm text-gray-400 hover:text-white transition-colors
          flex items-center gap-2">
            <Globe size={16} />
            S store

          </button>

        </div>

      </div>

    </footer>
  )
};

export default Footer;