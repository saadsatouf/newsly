import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Adetails from './components/Adetails';
import Feed from './components/Feed';
import Profile from './components/Profile';
import CreateArticle from './components/CreateArticle';
import News from './components/News';
import Sports from './components/Sports';
import Politics from './components/Politics';
import { useUser } from "@clerk/clerk-react";
import Login from './components/Login';
import { Toaster } from "react-hot-toast";
function App() {
 const {user} = useUser()
 if(!user) return <Login />

  return (
    <>
    <Toaster/>
    <Routes>
      <Route path="/" element={<Navigate to="/feed" replace />} />
      <Route path="/feed" element={<Feed />} />
         <Route path="/post/:postId" element={<Adetails />} />
            <Route path="*" element={<Navigate to="/feed" replace />}  />
            <Route path="profile" element={<Profile />} />
            <Route path="create-article" element={<CreateArticle />} />
            <Route path="News" element={<News />} />
               <Route path="Sports" element={<Sports />} />
                  <Route path="Politics" element={<Politics />} />
    </Routes>
    
    </>
  )
}

export default App
