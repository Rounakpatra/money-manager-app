const InfoCard = ({ icon, label, value, color }) => {
    return (
        <div className="
            group
            flex gap-6
            bg-white
            p-6
            rounded-2xl
            border border-slate-200/70
            shadow-sm
            transition-all duration-300
            hover:-translate-y-[3px]
            hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.35)]
        ">
            <div
                className={`
                    w-14 h-14
                    flex items-center justify-center
                    text-[26px] text-white
                    ${color}
                    rounded-full
                    shadow-lg
                    transition-all duration-300
                    group-hover:scale-110
                    group-hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]
                `}
            >
                {icon}
            </div>

            <div className="flex flex-col justify-center">
                <h6 className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    {label}
                </h6>
                <span className="text-[22px] font-semibold text-slate-900">
                    ₹{value}
                </span>
            </div>
        </div>
    )
}

export default InfoCard
