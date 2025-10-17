import { Outlet } from "react-router-dom";
import { Menu , X } from "lucide-react";
import { useState } from "react";
import Loading from "./Loading";
import { useUser, useAuth } from "@clerk/clerk-react";
const Layout = () => {

  const { user } = true;
 const [sidebarOpen , setSideBarOpen] = useState(false)
  return user ? (
    <div className="w-full flex h-screen">
      <div className="flex-1 bg-slate-50">
        <Outlet />

      </div>
      
    </div>
  ) : (
    <Loading />
  )
};

export default Layout;