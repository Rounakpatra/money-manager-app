import React, { useState } from 'react'
import { Eye, EyeOff } from "lucide-react";

const InputField = ({ label, value, onchange, placeholder, type, isSelect, options }) => {

    const [showPassword, setshowPassword] = useState(false);

    const toggleShowPassword = () => {
        setshowPassword(!showPassword);
    }

    return (

        <div className="mb-5">
            <label className="text-[13px] text-slate-700 font-medium block mb-1.5">
                {label}
            </label>

            <div className="relative">

                {isSelect ? (
                    <select
                        className="
    w-full
    bg-white
    border border-slate-300
    rounded-xl
    px-4 py-2.5
    text-sm text-slate-700
    shadow-sm
    transition-all duration-200
    focus:outline-none
    focus:border-purple-500
    focus:ring-2 focus:ring-purple-500/30
    hover:border-purple-300
    cursor-pointer
  "
                        value={value}
                        onChange={(e) => onchange(e)}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                ) : (
                    <input
                        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onchange(e)}

                        className="
                w-full px-4 py-3
                rounded-xl
                border border-slate-300
                bg-white/80
                text-slate-900 text-sm
                placeholder:text-slate-400
                transition-all duration-200 ease-out
                hover:border-slate-400
                focus:border-emerald-600
                focus:bg-white
                focus:outline-none
                "
                    />
                )}


                {/* <input
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onchange(e)}

                    className="
        w-full px-4 py-3
        rounded-xl
        border border-slate-300
        bg-white/80
        text-slate-900 text-sm
        placeholder:text-slate-400
        transition-all duration-200 ease-out
        hover:border-slate-400
        focus:border-emerald-600
        focus:bg-white
        focus:outline-none
      "
                /> */}

                {type === 'password' && (
                    <span
                        className="
      absolute right-3 top-1/2 -translate-y-1/2
      cursor-pointer
      transition-colors duration-200
      hover:text-emerald-600
    "
                    >
                        {showPassword ? (
                            <Eye
                                size={20}
                                className="text-emerald-600 transition-colors duration-200"
                                onClick={toggleShowPassword}
                            />
                        ) : (
                            <EyeOff
                                size={20}
                                className="text-slate-400 transition-colors duration-200"
                                onClick={toggleShowPassword}
                            />
                        )}
                    </span>
                )}
            </div>
        </div>
    )
}

export default InputField