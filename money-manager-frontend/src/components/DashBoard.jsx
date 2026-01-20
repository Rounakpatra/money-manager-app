import React, { useContext } from 'react'
import MenuBar from './MenuBar'
import { AppContext } from '../context/AppContext'
import Sidebar from './Sidebar';


const DashBoard = ({ children ,activeMenu}) => {

    const { user } = useContext(AppContext);

    return (
        <div>
            <MenuBar />


            <div className="flex min-h-screen bg-slate-100">

                {/* Sidebar Content */}
                <div className="
    w-64
    bg-white
    border-r border-slate-200
    p-4
    flex flex-col
    gap-4
  ">
                    <Sidebar activeMenu={activeMenu}/>
                </div>

                {/* Right Side Content */}
                <div className="
    flex-1
    p-6
    bg-slate-50
    overflow-auto
  ">
                    {/* <span className="text-lg font-medium text-slate-800">Right</span> */}
                    {children}
                </div>

            </div>

        </div>
    )
}

export default DashBoard