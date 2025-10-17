import {
  Search,
  Rss,
  X,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  TrendingUp,
  User,
  PlusCircle,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserButton, useClerk } from "@clerk/clerk-react";
import { LogOut } from "lucide-react";


const Header = () => {
      const navigate = useNavigate();
      const { signOut } = useClerk();
    const tabs = [
        {name:"All" , path:"/"},
        {name:"News" , path:"/News"},
        {name:"Sports" , path:"/Sports"},
        {name:"Politics" , path:"/Politics"},
    ]
    const activeTab = tabs.find((tab) => tab.path === location.pathname)?.name || "All"
  return (
    <header className="w-full bg-[#1f1f23] text-[#e0e0e0]">
        <div className="border-b border-gray-700">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
                <div className="text-sm font-semibold tracking-wide text-[#ffcc00]">
                    Newsly Blog

                </div>
                <div className="flex items-center gap-3">
                    <button className="text-sm hover:text-[3ffcc00] transition-colors hidden sm:block">
                        Topics

                    </button>
                    <button className="p-1.5 hover:bg-gray-700 rounded transition-colors">
                        <Search size={18} />

                    </button>
                    <button className="p-1.5 hover:bg-gray-700 rounded transition-colors">
                        <Rss size={18} />

                    </button>

                </div>

            </div>

        </div>
        <div className="border-t border-gray-700">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative">
                <nav className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide items-center">
                    {
                        tabs.map((tab)=>(
                            <button key={tab.name} onClick={()=> navigate(tab.path)}
                            className={`py-4 px-2 text-sm font-medium 
                                whitespace-nowrap flex shrink-0 border-b-0 transition-all
                           duration-300 ${activeTab === tab.name
                            ? "border-[#ffcc00] text-[#ffcc00] "
                            : " border-transparent text-gray-400 hover:text-[#ffcc00] hover:border-gray-600 "
                           } `}>
                    {tab.name}

                            </button>
                        ))
                    }
                    <div onClick={()=> navigate("/create-article")} 
                    className="absolute right-2 mx-auto cursor-pointer group">
                        <div className="bg-[#ffcc00] hover:bg-[#ffb300] transition-all
                        p-3 rounded-full shadow-[0_0_25px_#ffcc00] group-hover:shadow-[0_0_35px_#ffd633] " >
                            <PlusCircle size={20} className="text-black" />

                        </div>

                    </div>

                </nav>
                <div className="hidden sm:hidden md:flex lg:flex flex-col items-center gap-4 absolute right-60
                top-3">
                    <div className="flex items-center gap-3">
                        <div  onClick={()=> navigate("/profile")} >

                               <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "w-11 h-11 rounded-full border border-green-500 shadow-[0_0_8px_#00ffb3]",
                    },
                  }}
                />
             

                        </div>
                        <LogOut onClick={signOut} className="mb-1 w-7 h-7 text-gray-300 hover:text-white
                        transition cursor-pointer hover:shadow-[0_0_25px_#ff66ff] rounded-full p-1"/>

                    </div>

                </div>

            </div>

        </div>

        {/* Social Media Bar */}

        <div className="bg-[#f5f5f5] text-black">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6  py-3 flex justify-between items-center
            ">
                <span className="text-sm font-medium">Follow Newsly</span>
                <div className="flex items-center gap-2 md:gap-3">
                    <button className="p-1.5 hover:bg-gray-300 rounded transition-colors" 
                    aria-label="X (Twitter)">
                        <X size={16} />

                    </button>
                       <button className="p-1.5 hover:bg-gray-300 rounded transition-colors" 
                    aria-label="Facebook">
                        <Facebook size={16} />

                    </button>
                       <button className="p-1.5 hover:bg-gray-300 rounded transition-colors" 
                    aria-label="Instagram">
                        <Instagram size={16} />

                    </button>
                     <button className="p-1.5 hover:bg-gray-300 rounded transition-colors" 
                    aria-label="Linkedin">
                        <Linkedin size={16} />

                    </button>
                      <button className="p-1.5 hover:bg-gray-300 rounded transition-colors" 
                    aria-label="Youtube">
                        <Youtube size={16} />

                    </button>
                     <button
              className="p-1.5 hover:bg-gray-300 rounded transition-colors"
              aria-label="RSS"
            >
              <Globe size={16} />
            </button>
            <button
              className="p-1.5 hover:bg-gray-300 rounded transition-colors"
              aria-label="TikTok"
            >
              <TrendingUp size={16} />
            </button>

                </div>

            </div>

        </div>

    </header>
  )
};

export default Header;