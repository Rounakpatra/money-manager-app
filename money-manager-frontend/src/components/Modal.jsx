import React from 'react'
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="
  fixed inset-0 z-50
  flex items-center justify-center
   bg-black/70 backdrop-blur-sm
">
            <div className="
    w-full max-w-md
    bg-white
    rounded-3xl
    shadow-[0_30px_80px_rgba(0,0,0,0.25)]
    overflow-hidden
    animate-fadeIn
  ">
                {/* Modal header */}
                <div className="
      px-6 py-5
      border-b border-slate-200
      bg-gradient-to-r from-purple-50 to-indigo-50
      
    ">
                    {/* Modal Content */}
                    <div className=' flex items-center justify-between'>
                        <h3 className="
          text-lg font-semibold
          text-green-900
          tracking-tight
          
        ">
                            {title}
                        </h3>

                        <button
                            type="button"
                            onClick={onClose}
                            className="
    w-9 h-9
    flex items-center justify-center
    rounded-xl
    bg-white/70
    text-slate-500
    shadow-sm
    transition-all duration-300
    hover:bg-purple-50
    hover:text-purple-700
    hover:shadow-[0_0_10px_rgba(139,92,246,0.35)]
    active:scale-95
    focus:outline-none
  "
                        >
                            <X className="w-4 h-4" />
                        </button>

                    </div>

                    {/*Modal Content*/}
                    <div className="
  px-6 py-5
  bg-white
  rounded-b-3xl
  max-h-[70vh]
  overflow-y-auto
  scrollbar-thin
  scrollbar-thumb-purple-300
  scrollbar-track-transparent
  mt-1
">
                        {children}
                    </div>


                </div>
            </div>
        </div>

    )
}

export default Modal