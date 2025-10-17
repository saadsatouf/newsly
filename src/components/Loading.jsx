const Loading = () => {
  return (
    <div style={{
 background: "linear-gradient(to right, rgba(7, 23, 90, 0.9), rgba(26, 94, 73, 0.8))",height:"100vh"
                }} className="absolute w-full flex items-center justify-center" >
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full
                    bg-gradient-to-r from-indigo-500
                    via-purple-500 to-pink-500
                    opacity-50 animate-ping blur-2xl">

                    </div>
                    <div className="w-full h-full rounded-full
                    border-4 border-transparent border-t-purple-400
                    border-b-pink-400 animate-spin">

                    </div>
                    <div className="absolute top-1/2 left-1/2 w-4 h-4
                    -translate-x-1/2 -translate-y-1/2
                    bg-gradient-to-r from-indigo-400
                    via-purple-500 to-pink-500
                    rounded-full animate-pulse shadow-[0_0_20px_rgba(131,58,180,0.7)] ">

                    </div>

                  </div>

    </div>
  )
};

export default Loading;