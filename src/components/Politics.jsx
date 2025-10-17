import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import BlogCard from '../components/BlogCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUser, useAuth } from "@clerk/clerk-react";
import api from '../api/axios';
import "./App.css";
import toast from 'react-hot-toast';

const Politics = () => {
    const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();


  const fetchFeeds = async()=>{
   try{
      setLoading(true)
      const token = await getToken()
      const {data} = await api.get("/api/post/feed" , {
         headers:{
            Authorization:` Bearer ${token}`,
         },
      })
      if(data.success){
         const filteredFeeds = data.posts.filter(post => post.articleType === "politics")
         setFeeds(filteredFeeds)
      }else{
         toast.error(data.message)
      }
   }catch(err){
      console.log(err)
        toast.error(err.message)

   }
   setLoading(false)
  }


  useEffect(()=>{
   if(user) fetchFeeds()
  },[user])






  if (!user) return <p>يجب تسجيل الدخول لعرض البوستات</p>;
  return (
     <div className="w-full min-h-[120vh] bg-[#fafafa]">
        <Header/>
        <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">

         <div className="mb-6 sm:mb-8">
            {
               loading ? (
                  <p>Loading...</p>
               ) : feeds.length > 0 ? (
                  <div onClick={()=> navigate(`/post/${feeds[0]._id}`)} className="cursor-pointer">
                     <BlogCard 
                     title={feeds[0].content}
                      discription={feeds[0].content}
                       author={feeds[0].user.full_name}
                        date={feeds[0].createdAt}
                        image={feeds[0].image_urls[0]}
                           gradient="linear-gradient(135deg, #d946ef 0%, #7c3aed 100%)"
                           tag="New Post"
                  
                     
                     />

                  </div>
               ) : (
                  <p>لا يوجد بوستات حالياً</p>
               )
            }

         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {
               loading ? (
                     <p>Loading...</p>
               ) : feeds.slice(1,20).map(post => (
                  <div key={post._id} onClick={()=> navigate(`/post/${post._id}`)}  
                  className="cursor-pointer">
                        <BlogCard 
                     title={post.content}
                      discription={post.content}
                       author={post.user.full_name}
                        date={post.createdAt}
                        image={post.image_urls[0]}
                             gradient="linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)"
                           tag="Trending"
                  
                     
                     />
                     </div>
               ))
            }

         </div>

        </main>



         <Footer loading={loading} hasPosts={feeds.length > 0} />
     </div>
  )
};

export default Politics;