import { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { User, LogOut, X, Menu } from "lucide-react";
import { assets } from "../assets/assets.js";
import Sidebar from "./Sidebar.jsx";

const MenuBar = () => {

    const [openSideMenu, setopenSideMenu] = useState(false);
    const [showDropDown, setshowDropDown] = useState(false);
    const dropdownRef = useRef(null);

    const { user,clearUserData } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogoNameClick = () => {
        navigate("/dashboard");
    }

    const handleLogOut = ()=>{
        localStorage.clear();
        clearUserData();
        setshowDropDown(false);
        navigate("/login");
    }


    return (
        <div className="
    flex items-center justify-between
    h-16
    px-4 sm:px-6
    bg-white
    border-b border-slate-200
    sticky top-0 z-30
  ">

            {/* Left side - Menu button and title */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setopenSideMenu(!openSideMenu)}
                    className="
          lg:hidden
          p-2
          rounded-lg
          bg-slate-100
          text-slate-900
          hover:bg-slate-200
          transition-all
          active:scale-95
        "
                >
                    {openSideMenu ? (
                        <X className="w-5 h-5" />
                    ) : (
                        <Menu className="w-5 h-5" />
                    )}
                </button>

                <div className="
  flex items-center gap-3
  cursor-pointer
  group
">
                    <img
                        src={assets.logo}
                        alt="logo"
                        className="
      h-10 w-10
      rounded-xl
      shadow-sm
      transition-transform duration-300
      group-hover:scale-105
    "
                        onClick={handleLogoNameClick}
                    />

                    <span className="
    text-lg font-semibold
    bg-gradient-to-r from-blue-600 to-indigo-600
    bg-clip-text text-transparent
    tracking-tight
    transition-all duration-300
    group-hover:from-indigo-600 group-hover:to-purple-600
  "
                        onClick={handleLogoNameClick}
                    >
                        Money Manager
                    </span>
                </div>

            </div>

            {/* Right side - Profile picture */}
            <div className="relative" ref={dropdownRef}>

                <button
                    className="
    relative
    p-2.5
    rounded-full
    bg-slate-100
    text-slate-700
    transition-all duration-200
    hover:bg-slate-200
    hover:text-slate-900
    active:scale-95
    focus:outline-none
    focus:ring-2 focus:ring-blue-500/30
  "
                    onClick={() => setshowDropDown(!showDropDown)}
                >
                    <User className="text-blue-700 w-5 h-5" />
                </button>

                {/* Dropdown Menu */}

                {showDropDown && (
                    <div className="
  absolute right-0 mt-3
  w-56
  rounded-2xl
  bg-white
  border border-slate-200
  shadow-xl
  overflow-hidden
  z-50
">

                        {/* User Info */}
                        <div className="
    px-4 py-3
    bg-slate-50
    border-b border-slate-200
  ">
                            <div className="flex items-center gap-3">
                                <div className="
        w-9 h-9
        rounded-full
        bg-purple-100
        flex items-center justify-center
      ">
                                    <User className="text-purple-700 w-5 h-5" />
                                </div>

                                <div className="flex-col">
                                    <p className="text-sm font-semibold text-blue-900 leading-tight">
                                        {user.fullName}
                                    </p>
                                    <p className="text-xs text-cyan-600 truncate">
                                        {user.email}
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Dropdown Options */}
                        <div className="py-2">
                            {/* options go here */}
                            <button
                                onClick={handleLogOut}
                                className="
    w-full
    flex items-center gap-3
    px-4 py-2.5
    text-sm font-medium
    text-red-600
    rounded-lg
    transition-colors duration-200
    hover:bg-red-50
    active:scale-[0.98]
  "
                            >
                                <LogOut className="w-4 h-4 text-red-500" />
                                <span>Log Out</span>
                            </button>


                        </div>

                    </div>

                )}

            </div>


            {/* Mobile Side Menu */}

            {openSideMenu && (
                <div className="fixed top-[73px] left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20">
                    <Sidebar  />
                </div>
            )}
        </div>
    );


}


export default MenuBar;
