import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SIDE_BAR_DATA } from '../assets/assets';

const Sidebar = ({ activeMenu }) => {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();

    return (

        <div className="flex items-center justify-center flex-col">
            <div className="
    w-20 h-20
    rounded-full
    overflow-hidden
    bg-slate-100
    flex items-center justify-center
    cursor-pointer
    transition-all duration-300
    hover:scale-105
    hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]
  ">
                {user?.profileImageUrl ? (
                    <img
                        src={user.profileImageUrl}
                        alt="profile image"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <User className="w-6 h-6 text-slate-500" />
                )}



            </div>
            <h5 className="text-purple-700 font-medium leading-6 mt-2">{user?.fullName || ""}</h5>

            <div className="flex flex-col w-full gap-2 mt-2">
                {SIDE_BAR_DATA.map((item, index) => (
                    <button
                        key={`menu_${index}`}
                        onClick={() => {
                            navigate(item.path);

                        }}
                        className={`
  flex items-center gap-4 w-full
  px-6 py-3 rounded-xl
  text-[15px] font-medium
  cursor-pointer transition-all duration-300
  ${activeMenu === item.label
                                ? "bg-gradient-to-r from-teal-500 to-purple-600 text-white shadow-lg"
                                : "bg-white text-teal-600 hover:text-purple-700 hover:shadow-[0_0_10px_rgba(72,187,120,0.4)] hover:outline hover:outline-1 hover:outline-teal-300"
                            }
`}

                    >
                        <item.icon
                            className={`
                w-5 h-5
                transition-colors duration-300
                ${activeMenu === item.label ? "text-white" : "text-purple-500"}
              `}
                        />
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>




        </div>

    )
}

export default Sidebar