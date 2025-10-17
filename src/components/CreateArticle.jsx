import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth, useUser } from "@clerk/clerk-react";
import api from "../api/axios";
import { ImagePlus, Type, FileText, Upload, XCircle } from "lucide-react";

const CreateArticle = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [articleType, setArticleType] = useState("news");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user: clerkUser, isLoaded } = useUser();

  // ✅ اجلب بيانات المستخدم عند تحميل الصفحة
  useEffect(() => {
    if (isLoaded && clerkUser) {
      setUser({
        full_name: clerkUser.fullName || clerkUser.firstName || "مستخدم مجهول",
        username: clerkUser.username || clerkUser.primaryEmailAddress?.emailAddress?.split("@")[0] || "user",
        profile_picture:
          clerkUser.imageUrl ||
          "https://cdn-icons-png.flaticon.com/512/847/847969.png", // صورة افتراضية
      });
    }
  }, [isLoaded, clerkUser]);

  const handleSubmit = async () => {
    if (!images.length && !content) {
      return toast.error("الرجاء إضافة نص أو صورة واحدة على الأقل 🌙");
    }

    setLoading(true);
    const postType = images.length && content ? "text_with_image" : images.length ? "image" : "text";

    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("post_type", postType);
      formData.append("title", title);
      formData.append("summary", summary);
      formData.append("articleType", articleType);
      images.forEach((img) => formData.append("images", img));

      const token = await getToken();
      const { data } = await api.post("/api/post/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success("تم النشر بنجاح 🌟");
        navigate("/");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("فشل في إضافة المقال 🚫");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, #020617 0%, #0b1747 30%, #16213e 60%, #0f3d3e 85%, #052915 100%)",
      }}
      className="absolute w-full min-h-screen text-white py-14 px-3 md:px-6"
    >
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* العنوان */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-fuchsia-400
           via-pink-400 to-indigo-300 bg-clip-text text-transparent">
            🪶 إنشاء مقالة خرافية
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            اكتب كلمات تلامس الخيال... حيث تمتزج الإلهام بالفن 💫
          </p>
        </div>

        {/* البطاقة */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border
         border-white/10 shadow-[0_0_25px_rgba(255,0,255,0.15)] p-6 md:p-7 space-y-5">
          {/* بيانات المستخدم */}
          <div className="flex items-center gap-3">
            <img
              src={user?.profile_picture}
              alt="profile"
              className="w-11 h-11 rounded-full border border-fuchsia-400 shadow-[0_0_10px_rgba(255,0,255,0.3)] object-cover"
            />
            <div>
              <h2 className="text-base font-semibold text-fuchsia-300">{user?.full_name}</h2>
              <p className="text-gray-400 text-xs">@{user?.username}</p>
            </div>
          </div>

          {/* عنوان المقال */}
          <div>
            <label className="flex items-center gap-1.5 text-fuchsia-300 mb-1.5 font-semibold text-sm">
              <Type className="w-3.5 h-3.5" /> عنوان المقال
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="اكتب عنوانًا مشوقًا..."
              className="w-full bg-white/5 text-gray-100 p-2.5 rounded-xl border border-fuchsia-500/30
              focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all text-sm"
            />
          </div>

          {/* وصف مختصر */}
          <div>
            <label className="flex items-center gap-1.5 text-fuchsia-300 mb-1.5 font-semibold text-sm">
              <FileText className="w-3.5 h-3.5" /> وصف قصير
            </label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="مقدمة قصيرة تجذب القارئ..."
              className="w-full bg-white/5 text-gray-100 p-2.5 rounded-xl border border-pink-500/30 focus:ring-1
               focus:ring-pink-500 outline-none transition-all text-sm resize-none"
              rows="2"
            />
          </div>

          {/* نص المقال */}
          <div>
            <label className="flex items-center gap-1.5 text-fuchsia-300 mb-1.5 font-semibold text-sm">
              <FileText className="w-3.5 h-3.5" /> نص المقال
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="ابدأ الكتابة هنا..."
              rows="7"
              className="w-full bg-white/5 text-gray-100 p-3 rounded-xl border border-indigo-500/30 focus:ring-1
               focus:ring-indigo-500 outline-none transition-all text-sm resize-y"
            />
          </div>





          {/* نوع المقالة */}
          <div>
            <label className="flex items-center gap-1.5 text-fuchsia-300 mb-1.5 font-semibold text-sm">
              <Type className="w-3.5 h-3.5" /> نوع المقالة
            </label>
            <select
              value={articleType}
              onChange={(e) => setArticleType(e.target.value)}
              className="w-full bg-white/5 text-gray-100 p-2.5 rounded-xl border border-fuchsia-500/30 focus:ring-1
               focus:ring-fuchsia-500 outline-none transition-all text-sm"
            >
              <option value="news">News</option>
              <option value="sports">الرياضة</option>
              <option value="politics">السياسة</option>
            </select>
          </div>

          {/* الصور */}
          <div>
            <label className="flex items-center gap-1.5 text-fuchsia-300 mb-2 font-semibold text-sm cursor-pointer
             hover:text-fuchsia-400 transition">
              <ImagePlus className="w-4 h-4" /> أضف صورًا
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={(e) => setImages([...images, ...e.target.files])}
              />
            </label>

            {images.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {images.map((img, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={URL.createObjectURL(img)}
                      alt=""
                      className="h-24 w-24 rounded-xl border border-fuchsia-400/30 shadow-[0_0_10px_rgba(255,0,255,0.25)] object-cover"
                    />
                    <div
                      onClick={() => setImages(images.filter((_, index) => index !== i))}
                      className="absolute inset-0 hidden group-hover:flex justify-center items-center bg-black/40 
                      rounded-xl cursor-pointer transition"
                    >
                      <XCircle className="w-4.5 h-4.5 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* زر النشر */}
          <div className="text-center pt-2">
            <button
              onClick={() =>
                toast.promise(handleSubmit(), {
                  loading: "جارٍ النشر...",
                  success: "تم النشر بنجاح 🌟",
                  error: "حدث خطأ أثناء النشر",
                })
              }
              disabled={loading}
              className="relative bg-gradient-to-r from-fuchsia-600 via-pink-500 to-indigo-600 
              hover:from-fuchsia-500 hover:to-indigo-500 text-white font-bold px-8 py-2.5 rounded-xl
              shadow-[0_0_20px_rgba(255,0,255,0.25)] hover:shadow-[0_0_25px_rgba(255,0,255,0.4)] 
              transition-all duration-500 text-sm active:scale-95"
            >
              <Upload className="inline-block w-4 h-4 mr-1" />
              نشر المقال
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;