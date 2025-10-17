import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, SendHorizonal, Loader2, Trash2 } from "lucide-react";
import moment from "moment";
import toast from "react-hot-toast";
import { useAuth, useUser } from "@clerk/clerk-react";
import api from "../api/axios";



const Adetails = () => {
  const navigate = useNavigate()
    const { postId } = useParams();
  const { getToken } = useAuth();
  const { user } = useUser();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(()=>{
    const fetchPost = async()=>{
      try{
        const token = await getToken()
        const {data} = await api.get(`/api/post/${postId}` , {
          headers:{Authorization : `Bearer ${token}`},
        });
        if(data.success){
          setPost(data.post)
        }
      }catch(err){
         toast.error("فشل تحميل المقال 😔");
      }finally{
        setLoading(false)
      }
    };
    fetchPost()
  },[postId , getToken , user?._id])

  const handleAddComment = async(e)=>{
    e.preventDefault()
    if(!commentText.trim()) return toast.error("اكتب تعليق أولاً ✍️");
    try{
      setSubmitting(true)
      const token = await getToken()
      const {data} = await api.post(`/api/post/${postId}/comment` , {text:commentText},
        {headers:{Authorization : `Bearer ${token}`}}
      );
      if(data.success){
         toast.success("تم إضافة التعليق 🎉");
        setPost(data.post)
        setCommentText("")
      }else{
        toast.error(error.message)
      }
    }catch(err){
       toast.error(err.message)

    }finally{
      setSubmitting(false)
    }
  }


  const handleDeleteComment = async(commentId) =>{
    if (!window.confirm("هل أنت متأكد من حذف هذا التعليق؟ 🗑️")) return;

    try{
      const token = await getToken()
      const {data} = await api.delete(`/api/post/${postId}/comment/${commentId}`,
        {
          headers : {Authorization : `Bearer ${token}`}
        }
      );
      if(data.success){
          toast.success("تم حذف التعليق 🗑️");
        setPost(data.post)
      }else{
        toast.error(data.message)
      }
    }catch(err){
       toast.error(err.message)

    }
  }

  if (loading) {

    return (
      <div className="flex items-center justify-center h-[100vh] overflow-hidden text-white">
        <Loader2 className="animate-spin w-6 h-6 mr-2" /> جاري تحميل المقال...
      </div>
    );
  }

  if (!post)
    return <p className="text-center text-gray-400">المقال غير موجود ❌</p>;


  return (
    <div className="absolute w-full bg-[#0f172a] min-h-screenbg-[#0f172a] text-white">
      <div className="sticky top-0 z-10 bg-[#182034] px-4 py-3 flex items-center
      gap-3 shadow-md ">
        <ArrowLeft onClick={()=> navigate(-1)}
        className="w-6 h-6 cursor-pointer hover:text-blue-400 transition" />
        <h1 className="text-lg font-semibold ml-20">🪶 تفاصيل المقال

        </h1>

      </div>
    {/* محتوى المقال */}
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="bg-[#182034] p-5 rounded-xl shadow-lg space-y-5">
        <div className="flex items-center gap-3">
        <img src={post.user?.profile_picture || "" } 
        className="w-10  h-10 rounded-full border border-gray-600"/>

        <div>
          <p className="font-semibold">{post.user?.full_name}

          </p>
         <span className="text-sm text-gray-400">
                @{post.user?.username || ""} •{" "}
                {moment(post.createdAt).fromNow()}
              </span>
        </div>

        </div>

        {
          post.title && (
            <h2 className="text-2xl md:text-3xl font-bold text-blue-300">{post.title}

            </h2>
          )
        }
        {
          post.summary && (
            <p className="text-red-500 text-base leading-relaxed bg-[#0f172a]/40 p-3 rounded-lg
            border border-gray-700/40">{post.summary}

            </p>
          )
        }
        {post.content && (
          <p className="text-gray-200 whitespace-pre-line leading-relaxed text[15px]">
            {post.content}

          </p>
        )}
        {
          post.image_urls?.length > 0 && (
            <div className={`grid gap-2 ${post.image_urls.length === 1 ? "grid-cols-1" 
            : "grid-cols-2"}`}>
              {post.image_urls.map((img,i)=>(
                <img key={i} src={img} className="w-full object-cover rounded-xl" />
              ))}

            </div>
          )
        }

      </div>
       {/* قسم التعليقات */}
       <div className="bg-[#182034] rounded-xl shadow-lg p-4">
        <h2 className="text-lg font-semibold mb-3">💬 التعليقات
          {!post.comments.length && (
            <p className="text-gray-400">
                لا يوجد تعليقات بعد، كن أول من يعلق!

            </p>
          )}
          <div className="space-y-3">
            {
              post.comments?.map((c,i)=>(
                <div key={i} className="flex items-center gap-3 bg-[#0f172a] p-2 rounded-lg relative">
                  <img src={c.user?.profile_picture || ""} className="w-8 h-8 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{c.user?.full_name || ""} {' '}
                      <span className="text-gray-400 text-xs">@{c.user?.username || ""}

                      </span>


                    </p>
                    <p className="text-gray-200 text-sm">{c.text} {' '}<span 
                    className="text-xs text-gray-500">{moment(c.createdAt).fromNow()}

                    </span>

                    </p>
                    </div>
                       {/* زر الحذف - يظهر فقط لصاحب المقال */}
                       {user?.id === post.user?._id && (
                        <button onClick={()=> handleDeleteComment(c._id)}
                         className="absolute top-2 right-2 text-red-400 hover:text-red-500">
                          <Trash2 size={16} />

                        </button>
                       )}

                  </div>
              ))
            }
            
          </div>

          <form className="mt-4 flex items-center gap-2" onSubmit={handleAddComment}>
            <input  type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl bg-[#0f172a] text-white focus:outline-none
            border border-gray-600"  placeholder="أضف تعليقك..."/>

            <button type="submit" disabled={submitting} className="bg-gradient-to-r from-blue-600
            to-purple-700 px-3 py-2 rounded-xl flex items-center gap-1 hover:opacity-90
            transition disabled:opacity-50">
              {
                submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ):(
                  <SendHorizonal className="w-5 h-5" />
                )
              }

            </button>

          </form>

        </h2>

       </div>

    </div>
      
    </div>
  )
};

export default Adetails;