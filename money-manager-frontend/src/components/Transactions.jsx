import { ArrowRight } from "lucide-react";
import TransactionCard from "./TransactionCard.jsx";
import moment from "moment";

const Transactions = ({ transactions, onMore, type, title }) => {
    return (
        <div className="card p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-[0_18px_40px_-15px_rgba(99,102,241,0.35)] transition-all duration-300">
            <div className="flex items-center justify-between">
                <h5 className="text-lg colo text-green-600 hover:text-green-800">{title}</h5>
                <button
                    className="
                        card-btn
                        inline-flex items-center gap-2
                        px-4 py-2
                        rounded-xl
                        text-sm font-medium
                        text-indigo-600
                        bg-indigo-50
                        border border-indigo-200
                        transition-all duration-300
                        hover:bg-indigo-600
                        hover:text-white
                        hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]
                        hover:scale-105
                        active:scale-95
                        group
                    "
                    onClick={onMore}
                >
                    More
                    <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                </button>
            </div>

            <div className="mt-6 flex flex-col gap-4">
                {transactions?.slice(0, 5)?.map(item => (
                    <TransactionCard
                        key={item.id}
                        title={item.name}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type={type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
}

export default Transactions;
