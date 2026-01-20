import { ArrowRight } from "lucide-react";
import TransactionCard from "./TransactionCard.jsx";
import moment from "moment";

const RecentTransactions = ({ transactions, onMore }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h4 className="text-lg colo text-green-600 hover:text-green-800">Recent Transactions</h4>

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
                        className="
            transition-transform duration-300
            group-hover:translate-x-1
        "
                    />
                </button>

            </div>

            <div className="mt-6">
                {transactions?.slice(0, 5)?.map(item => (
                    <TransactionCard
                        key={item.id}
                        title={item.name}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type={item.type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
}

export default RecentTransactions;