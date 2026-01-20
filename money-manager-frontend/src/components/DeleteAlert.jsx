import React, { useState } from 'react'
import { Loader2, Trash2, AlertTriangle } from "lucide-react";



const DeleteAlert = ({ content, onDelete }) => {

    const [loading, setloading] = useState(false);


    const handleDeleteClik = async () => {
        setloading(true);

        try{
            await onDelete();
        }finally{
            setloading(false);
        }

    }

    return (
        <div
            className="
        group
        flex flex-col gap-4
        p-6 rounded-2xl
        bg-white
        border border-red-200/60
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_12px_40px_-12px_rgba(239,68,68,0.35)]
    "
        >
            <div className="flex items-start gap-3">
                <div
                    className="
                w-10 h-10
                flex items-center justify-center
                rounded-xl
                bg-red-50
                text-red-600
                shadow-inner
                transition-all duration-300
                group-hover:scale-105
            "
                >
                    <AlertTriangle className="w-5 h-5" />
                </div>

                <p className="text-medium text-slate-600 leading-relaxed">
                    {content}
                </p>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleDeleteClik}
                    type="button"
                    disabled={loading}
                    className="
                relative inline-flex items-center gap-2
                px-6 py-2.5
                rounded-xl
                text-sm font-semibold
                text-red-600
                bg-white
                border border-red-300
                transition-all duration-300
                hover:text-white
                hover:bg-red-600
                hover:border-red-600
                hover:shadow-[0_0_20px_rgba(239,68,68,0.55)]
                focus:outline-none
                focus:ring-2 focus:ring-red-500/40
                active:scale-95
                disabled:opacity-60
                disabled:cursor-not-allowed
            "
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Deleting…
                        </>
                    ) : (
                        <>
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </>
                    )}
                </button>
            </div>
        </div>


    )
}

export default DeleteAlert