import { ArrowUpDown, Search } from "lucide-react";
import DashBoard from "../components/DashBoard";
import axiosConfig from "../util/axiosConfig.jsx";
import { useState } from "react";
import { API_ENDPOINTS } from "../util/apiEndPoints";
import toast from "react-hot-toast";
import moment from "moment";
import TransactionCard from "../components/TransactionCard.jsx";

const Filter = () => {

    const [type, settype] = useState("income");
    const [startDate, setstartDate] = useState("");
    const [endDate, setendDate] = useState("");
    const [keyword, setkeyword] = useState("");
    const [sortOrder, setsortOrder] = useState("asc");
    const [sortField, setsortField] = useState("date");
    const [transaction, settransaction] = useState([]);
    const [loading, setloading] = useState(false);


    const handleSearch = async (e) => {
        e.preventDefault();

        setloading(true);
        settransaction([]);

        try {

            const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
                type,
                startDate,
                endDate,
                keyword,
                sortField,
                sortOrder
            });

            settransaction(response.data);
           


        } catch (error) {
            toast.error(error.message || "Failed to fetch transactions. Please try again.");
        } finally {
            setloading(false);
        }


    }

    return (
        <div>
            <DashBoard activeMenu="Filters">
                <div className="w-full">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-green-700 tracking-tight">
                            Filter Transactions
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Narrow down your income and expenses effortlessly
                        </p>
                    </div>

                    <div className="card bg-white rounded-2xl border border-slate-200/70 shadow-sm p-6 hover:shadow-[0_18px_40px_-15px_rgba(99,102,241,0.35)] transition-all duration-300">
                        <div className="mb-5">
                            <h5 className="text-sm font-semibold text-indigo-700 tracking-wide uppercase">
                                Select the filters
                            </h5>
                        </div>

                        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="type" className="text-xs font-medium text-slate-600">
                                    Type
                                </label>
                                <select
                                    id="type"
                                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                    value={type}
                                    onChange={(e) => settype(e.target.value)}

                                >
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="startdate" className="text-xs font-medium text-slate-600">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    id="startdate"
                                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                    value={startDate}
                                    onChange={(e) => setstartDate(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="enddate" className="text-xs font-medium text-slate-600">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    id="enddate"
                                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                    value={endDate}
                                    onChange={(e) => setendDate(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="sortfield" className="text-xs font-medium text-slate-600">Sort Field</label>
                                <select
                                    value={sortField}
                                    id="sortfield"
                                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                    onChange={e => setsortField(e.target.value)}>
                                    <option value="date">Date</option>
                                    <option value="amount">Amount</option>
                                    <option value="category">Category</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="sortorder" className="text-xs font-medium text-slate-600">
                                    Sort Order
                                </label>

                                <div className="relative">
                                    <select
                                        id="sortorder"
                                        className="
                w-full
                appearance-none
                rounded-xl
                border border-slate-300
                px-4 py-2 pr-10
                text-sm
                focus:outline-none
                focus:ring-2 focus:ring-indigo-500/50
                focus:border-indigo-500
                transition-all
                bg-white
            "
                                        value={sortOrder}
                                        onChange={(e) => setsortOrder(e.target.value)}
                                    >
                                        <option value="" disabled>
                                            Select order
                                        </option>
                                        <option value="asc">Ascending</option>
                                        <option value="desc">Descending</option>
                                    </select>

                                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                                        <ArrowUpDown className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>


                            <div className="md:col-span-2 lg:col-span-3 flex items-end gap-3">
                                <div className="flex-1 flex flex-col gap-1">
                                    <label htmlFor="keyword" className="text-xs font-medium text-slate-600">
                                        Search
                                    </label>
                                    <input
                                        type="text"
                                        id="keyword"
                                        placeholder="Search..."
                                        className="rounded-xl border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 transition-all"
                                        value={keyword}
                                        onChange={(e) => setkeyword(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="h-[42px] px-5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-[0_0_18px_rgba(139,92,246,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center"
                                    onClick={handleSearch}
                                >
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8">
                        <h5 className="text-lg font-semibold text-slate-900 tracking-tight mb-3">
                            Your Transactions
                        </h5>

                        {transaction.length === 0 && !loading && (
                            <div
                                className="
                w-full
                py-10
                rounded-2xl
                border border-dashed border-indigo-300
                bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50
                text-center
                shadow-inner
            "
                            >
                                <p className="text-base font-semibold text-indigo-700">
                                    Apply filters to see result 🔍
                                </p>
                                <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
                                    Select filters and click apply to view matching income or expense records.
                                </p>
                            </div>
                        )}

                        {loading && (
                            <div className="flex items-center justify-center py-10">
                                <p className="text-sm font-medium text-indigo-500 animate-pulse">
                                    Loading transactions…
                                </p>
                            </div>
                        )}

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
                            {transaction.map((t) => (
                                <div
                                    key={t.id}
                                    className="
                w-full
                flex
                transition-all duration-300
                hover:-translate-y-[2px]
                hover:shadow-[0_16px_35px_-12px_rgba(99,102,241,0.35)]
            "
                                >
                                    <div className="w-full">
                                        <TransactionCard
                                            title={t.name}
                                            icon={t.icon}
                                            date={moment(t.date).format('Do MMM YYYY')}
                                            amount={t.amount}
                                            type={type}
                                            hideDeleteBtn
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>

            </DashBoard>
        </div>
    )
}


export default Filter;
