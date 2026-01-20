import React, { useState } from 'react'
import { Image, X } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const EmoiPickerPopUp = ({icon,onSelect}) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleEmojiClick = (emoji) => {
        onSelect(emoji?.imageUrl || "");
        setIsOpen(false);
    }

    return (
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">

            {/* Icon Picker Trigger */}
            <div
                onClick={() => setIsOpen(true)}
                className="
      group
      flex items-center gap-4
      cursor-pointer
      px-4 py-3
      rounded-2xl
      border border-slate-200
      bg-white
      shadow-sm
      hover:shadow-md
      hover:border-purple-300
      transition-all duration-300
    "
            >
                {/* Icon Box */}
                <div
                    className="
        w-12 h-12
        flex items-center justify-center
        rounded-xl
        bg-gradient-to-br from-purple-100 to-purple-50
        text-purple-600
        text-2xl
        group-hover:scale-105
        transition-transform duration-300
      "
                >
                    {icon ? (
                        <img
                            src={icon}
                            alt="Icon"
                            className="w-8 h-8 object-contain"
                        />
                    ) : (
                        <Image className="w-6 h-6 opacity-80" />
                    )}
                </div>

                {/* Text */}
                <div className="flex flex-col">
                    <p className="text-sm font-medium text-slate-700">
                        {icon ? "Change Icon" : "Pick an Icon"}
                    </p>
                    <span className="text-xs text-slate-400">
                        Emoji or image
                    </span>
                </div>
            </div>

            {/* Emoji Picker */}
            {isOpen && (
                <div
                    className="
        relative
        mt-2
        rounded-2xl
        border border-slate-200
        bg-white
        shadow-xl
        animate-fadeIn
      "
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="
          absolute -top-3 -right-3
          w-8 h-8
          flex items-center justify-center
          rounded-full
          bg-white
          border border-slate-200
          shadow-md
          text-slate-500
          hover:bg-purple-50
          hover:text-purple-600
          transition-all
        "
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <EmojiPicker
                        open={isOpen}
                        onEmojiClick={handleEmojiClick}
                    />
                </div>
            )}
        </div>

    )
}

export default EmoiPickerPopUp