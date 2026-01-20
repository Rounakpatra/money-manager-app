import { UtensilsCrossed, Trash2, TrendingDown, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import React from 'react'
import { addThousandsSeparator } from "../util/util.js";

const TransactionCard = ({ icon, title, date, amount, type, hideDeleteBtn, onDelete }) => {

    const getAmountStyles = () => type === 'income' ? 'bg-green-50  text-green-800' : 'bg-red-50 text-red-800';

    return (
        <div
            className="
    card group
    flex items-center gap-4
    p-4 rounded-2xl
    bg-white
    border border-slate-200/60
    shadow-sm
    transition-all duration-300
    hover:shadow-[0_12px_30px_-10px_rgba(99,102,241,0.25)]
    hover:-translate-y-[2px]
  "
        >
           
            <div className="
      w-12 h-12
      flex items-center justify-center
      rounded-xl
      bg-gradient-to-br from-indigo-50 to-purple-50
      text-indigo-600
      shadow-inner
      transition-all duration-300
      group-hover:scale-105
    ">
                {icon ? (
                    <img src={icon} alt={title} className="w-6 h-6 object-contain" />
                ) : (
                    <UtensilsCrossed className="w-5 h-5" />
                )}
            </div>

           
            <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-cyan-700 truncate">
                    {title}
                </p>
                <p className="text-xs text-pink-400 tracking-wide">
                    {date}
                </p>
            </div>

            
            <div className="flex items-center gap-3 ml-auto">
                {!hideDeleteBtn && (
                    <button
                        onClick={onDelete}
                        className="
                  p-2 rounded-full
                  text-slate-400
                  opacity-0 group-hover:opacity-100
                  transition-all duration-300
                  hover:text-red-500
                  hover:bg-red-50
                  hover:scale-110
                  active:scale-95
                  cursor-pointer
                "
                    >
                        <Trash2 size={16} />
                    </button>
                )}

                <div
                    className={`
              flex items-center gap-2
              px-3 py-1.5
              rounded-full
              text-xs font-semibold
              tracking-wide
              shadow-sm
              transition-all duration-300
              ${getAmountStyles()}
              hover:shadow-[0_0_14px_rgba(99,102,241,0.35)]
            `}
                >
                    <span>
                        {type === "income" ? "+" : "-"} ${addThousandsSeparator(amount)}
                    </span>

                    {type === "income" ? (
                        <ArrowUpRight size={14} className="opacity-80" />
                    ) : (
                        <ArrowDownRight size={14} className="opacity-80" />
                    )}
                </div>
            </div>
        </div>



    )
}

export default TransactionCard