import React from 'react'
import { Layers2, Pencil, SquarePen } from "lucide-react";

const CategoryList = ({ categories , onEditCategory}) => {


    return (
        <div className="w-full">
            <div className="mb-5">
                <h4 className="text-lg font-semibold text-slate-900 tracking-tight">
                    Category Sources
                </h4>
            </div>

            {/* Category List */}
            {categories.length === 0 ? (
                <p className="
  text-sm font-medium
  text-slate-600
  bg-gradient-to-r from-purple-50 to-indigo-50
  border border-purple-200/60
  rounded-2xl
  p-5
  text-center
  shadow-sm
  italic
">
                    <span className='block mt-4 text-blue-700 font-normal not-italic text-lg'>✨ No categories yet.</span>
                    <span className="block mt-1 text-green-700 font-normal not-italic text-base">
                        Add your first category to start organizing your finances.
                    </span>
                </p>

            ) : (
                <div className="
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
        gap-4
      ">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="
              group relative
              flex items-center gap-4
              p-4
              rounded-2xl
              bg-white
              border border-slate-200/70
              transition-all duration-300
              hover:-translate-y-[2px]
              hover:shadow-[0_10px_25px_rgba(139,92,246,0.25)]
              hover:border-cyan-500
            "
                        >
                            {/* Icon / Emoji */}
                            <div className="
              w-12 h-12
              flex items-center justify-center
              rounded-xl
              bg-purple-50
              text-indigo-600
              transition-colors duration-300
              group-hover:bg-indigo-600
              group-hover:text-white
            ">
                                {category.icon ? (
                                    <img
                                        src={category.icon}
                                        alt={category.name}
                                        className="h-6 w-6"
                                    />
                                ) : (
                                    <Layers2 size={22} />
                                )}
                            </div>

                            {/* Category Details */}
                            <div className="flex-1">
                                <p className="
                text-sm font-semibold
                text-slate-800
                group-hover:text-indigo-700
                transition-colors
              ">
                                    {category.name}
                                </p>

                                <p className="text-xs text-slate-400 mt-1 capitalize group-hover:text-indigo-500">
                                    {category.type}
                                </p>
                            </div>

                            {/* Action */}
                            <button
                                className="
                opacity-0
                group-hover:opacity-100
                transition-opacity duration-200
                text-slate-400
                hover:text-green-900
              "
              onClick={() => onEditCategory(category)}
                            >
                                <SquarePen size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

}

export default CategoryList