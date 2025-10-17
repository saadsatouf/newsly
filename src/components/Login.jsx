 import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { SignIn } from "@clerk/clerk-react";


const Login = () => {
  return (
    <div style={{background: "linear-gradient(to right, rgba(7, 23, 90, 0.9), rgba(26, 94, 73, 0.8))",}}
    className="absolute w-full min-h-screen flex flex-col md:flex-row overflow-hidden">

      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full top-[-200px]
        left-[-100px] blur-3xl animate-pulse-slow">

        </div>
         <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full 
         bottom-0 right-0 blur-3xl animate-pulse-slow">

        </div>
        <img scr={assets.bgImage}  className="w-full h-full object-cover opacity-20"/>
        


      </div>

      <div className="flex-1 flex flex-col items-center md:items-start justify-between px-4 sm:px-6 md:px-10
      lg:pl-40 z-10 text-center md:text-left mb-20">
        <motion.h1 className="text-5xl md:text-6xl font-extrabold tracking-wide mb-6
        bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600 bg-clip-text
        text-transparent drop-shadow-[0_0_20px_rgba(255,0,255,0.5)] mt-4"
        initial={{opacity:0 , y:-50}}
        animate={{opacity:1 , y:0}}
        transition={{duration:1}}>
           Newsly

        </motion.h1>

        <div>
          <div className="flex items-center gap-3 mb-6 max-md:mt-10 justify-center md:justify-start">
            <img src={assets.group_users} className="h-8 md:h-10" />
            <div>
              <div className="flex gap-1 justify-center md:justify-start">
                {Array(5).fill(0).map((_,i)=>(
                  <Star key={i} className="w-5 h-5 text-transparent
                    fill-amber-400 drop-shadow-lg animate-pulse" />
                ))}

              </div>
              <p className="text-gray-300 text-sm mt-1"> Trusted by 170,000+ passionate writers</p>
            </div>

          </div>

          <motion.h1 className="font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600
          bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,0,255,0.7)]
          text-[clamp(1.5rem,5vw,3rem)] leading-snug max-w-[90%] sm:max-w-2xl mx-auto md:mx-0 text-center
          md:text-left "   initial={{opacity:0 }}
        animate={{opacity:1 }}
        transition={{duration:1 , delay:1}}>
           Where stories find their voice and ideas come alive

          </motion.h1>

          <motion.h2 className="text-gray-400 mt-4 md:mt-6  text-[clamp(1.5rem,5vw,1.5rem)]
          leading-relaxed max-w-[90%] sm:max-w-md md:max-w-lg mx-auto md:mx-0 text-center md:text-left
           " initial={{opacity:0 }}
        animate={{opacity:1 }}
        transition={{duration:1 , delay:1}}>
             Join a world of storytellers and thinkers.  
            Write articles, share your insights, and inspire readers across the globe.  
            Every word you write builds the future of thought.
          </motion.h2>
        </div>

      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 z-10
      ">
        <motion.div className="w-full max-w-md p-8 rounded-xl flex-1 flex items-center justify-center"
        initial={{opacity:0 , scale:0.8 }}
        animate={{opacity:1 , scale:1}}
        transition={{duration:1 }}>
          <SignIn  appearance={{
              baseTheme: "dark",
              variables: {
                colorPrimary: "#a78bfa",
                colorText: "#e5e7eb",
                colorBackground: "transparent",
                colorInputBackground: "rgba(15, 23, 42, 0.6)",
                colorCardBackground: "rgba(24,32,52,0.6)",
              },
              elements: {
                card: "rounded-3xl shadow-[0_0_25px_rgba(168,85,247,0.5)] border border-purple-500/20 backdrop-blur-xl",
                headerTitle:
                  "text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-2xl font-bold",
                headerSubtitle: "text-gray-400",
                socialButtonsBlockButton:
                  "bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl hover:scale-105 transition-all",
                formFieldInput:
                  "bg-[#1f264f]/60 border border-purple-500/30 rounded-xl text-white focus:ring-2 focus:ring-purple-500",
                formButtonPrimary:
 "bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold py-2 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.6)] hover:scale-105 transition-all",
                footerActionLink: "text-purple-400 hover:text-pink-400",
                footer: "hidden",
              },
            }} />
          
        </motion.div>

      </div>

      {
        Array(15).fill(0).map((_,i)=>(
          <div key={i} className="absolute w-2 h-2 bg-white rounded-full opacity-50 animate-spin"
          style={{top:`${Math.random() * 100}%`,
                  left:`${Math.random() * 100}%` , 
                 animationDelay:`${Math.random() * 2}s`,}}></div>
        ))
      }

    </div>
  )
};

export default Login;