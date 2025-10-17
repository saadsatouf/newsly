import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, BadgeCheck, PenTool } from "lucide-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
const Pcard = ({post}) => {
    const navigate = useNavigate();
      const currentUser = useSelector((state) => state.user.value);
      const {getToken} = useAuth()
      

  return (
  <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from[#3e4c59] via-[#1c1e3d]
  to-[#684a61] text-white max-w-4xl mx-auto my-10 border-pink-500/2 shadow-[0_0_60px_rgba(0,255,183,0.5)]
  transition-all  duration-700 hover:scale-[1.02] hover:shadow-[0_0_100px_rgba(138,43,226,0.7)]" >
    {
      Array.isArray(post?.image_urls) && post.image_urls.length > 0 ? (
        <div className="relative">
          <img src={post.image_urls[0]} className="w-full h-72 object-cover opacity-90 hover:opacity-100
          transition-all duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000]/70 to-transparent">

          </div>
          <div className="absolute bottom-4 left-6 text-gray-200 text-sm flex items-center gap-2">
            <PenTool className="w-4 h-4 text-green-400" />
            <span>{post?.createdAt ? moment(post.createdAt).format("MMMM D , YYYY") : ""}</span>

          </div>

        </div>
      ) : (
        <div className="bg-gradient-to-r from-[#3e4c59] via-[#684a6a] to-[#1c1e3d] h-48 flex 
        items-center justify-center text-gray-400 italic">
          {post?.user?.profile_picture && <img src={post.user.profile_picture} className="
          w-[100vw] h-full object-cover" />}

        </div>
      )
    }
    <div className="p-8 space-y-4">
      {
        post?.user ? (
          <div  className="flex items-center gap-3 cursor-pointer
          ">
            <img src={post.user.profile_picture} className="w-12 h-12 rounded-full border
            border-green-400 shadow-[0_0_25px_rgba(0,255,183,0.6)]" />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-lg text-green-300">{post.user.full_name }</span>
                <BadgeCheck  className="w-4 h-4 text-cyan-400"/>

              </div>
              <p className="text-gray-400 text-sm">@{post.user.username}</p>
              </div>
            </div>
        ) : null
      }

      <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r
      from-green-400 via-purple-500 to-cyan-400 drop-shadow-[0_0_20px_rgba(0,255,183,0.8)] mt-2
      ">
            {post?.content || "عنوان مقال فضائي أسطوري"}

      </h1>
      {post?.content && (
        <div className="text-gray-200 leading-relaxed tracking-wide whitespace-pre-line text-[15px]
        mt-3">
          </div>
      )}

      {Array.isArray(post?.image_urls) && post.image_urls.length > 1 && (
        <div className={`grid gap-3 mt-5 
          ${post.image_urls.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
            {post.image_urls.slice(1).map((img,i)=>(
              <img key={i} src={img} className="w-full h-40 object-cover rounded-xl
              shadow-[0_0_25px_rgba(0,255,183,0.8)] hover:scale-[1.02] transition-all duration-500" />
            ))}

        </div>
      )}
      <footer className="border-t border-pink-500/20 mt-6 pt-4 flex items-center justify-between
      text-sm text-gray-400 ">
        <div className="flex items-center gap-6">
          <button disabled={!currentUser?._id} className="flex items-center gap-2
          hover:text-pink-400 transition-all disabled:opacity-50">
               <Heart className={`w-5 h-5
                 transition-all `} />
              <span> إعجاب</span>

          </button>

          <button onClick={()=> post?._id && navigate(`/post/${post._id}`)} className="flex items-center
          gap-2 hover:text-cyan-400 transition-all">
            <MessageCircle className="w-5 h-5" />
             <span>{post?.comments?.length || 0} تعليق</span>

          </button>

          <button className="flex items-center gap-2 hover:text-purple-400 transition-all">
            <Share2 className="w-5 h-5" />
              <span>مشاركة</span>

          </button>
        </div>
        <span className="italic text-gray-500">🪐 Newsly Blog</span>

      </footer>

    </div>

  </article>
  )
};

export default Pcard;