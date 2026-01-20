import { Download, Mail } from 'lucide-react'
import React from 'react'
import TransactionCard from './TransactionCard'
import moment from "moment";
import toast from 'react-hot-toast';


const IncomeList = ({ transactions, onDelete }) => {
    const onDownload = () => {
        toast("🚧 This feature is coming soon", {
            duration: 2500,
        });
    }

    const onEmail = () => {
        toast("🚧 This feature is coming soon", {
            duration: 2500,
        });
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg font-semibold text-slate-800 tracking-tight">
                    Income Sources
                </h5>

                <div className="flex items-center gap-2">
                    <button
                        className="w-9 h-9 flex items-center justify-center rounded-lg
                   bg-emerald-50 text-emerald-600
                   hover:bg-emerald-100 hover:scale-105
                   transition-all duration-200
                   shadow-sm hover:shadow-md"
                        onClick={onEmail}
                    >
                        <Mail className="w-4 h-4" />
                    </button>

                    <button
                        className="w-9 h-9 flex items-center justify-center rounded-lg
                   bg-indigo-50 text-indigo-600
                   hover:bg-indigo-100 hover:scale-105
                   transition-all duration-200
                   shadow-sm hover:shadow-md"
                        onClick={onDownload}
                    >
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Income List */}
            <div className="flex flex-col gap-3">
                {/* Display Incomes */}
                {transactions?.map((income) => (
                    <TransactionCard
                        key={income.id}
                        title={income.name}
                        icon={income.icon}
                        date={moment(income.date).format('Do MMM YYYY')}
                        amount={income.amount}
                        type="income"
                        onDelete={() => onDelete(income.id)}
                    />
                ))}
            </div>

        </div>

    )
}

export default IncomeList