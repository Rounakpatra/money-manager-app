import { Coins, Wallet, WalletCards } from "lucide-react";
import DashBoard from "../components/DashBoard";
import InfoCard from "../components/InfoCard";
import { addThousandsSeparator } from "../util/util.js";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndPoints.js";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import RecentTransactions from "../components/RecentTransactions.jsx";
import Transactions from "../components/Transactions.jsx";

const Home = () => {


    const { user } = useContext(AppContext);
    const navigate = useNavigate();
    const [dashboardData, setdashboardData] = useState(null);
    const [loading, setloading] = useState(false);

    const fetchDashBoardData = async () => {
        if (loading) {
            return;
        }

        setloading(true);

        try {

            const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);

            if (response.status === 200) {
                setdashboardData(response.data);
            }

        } catch (error) {
            toast.error('Something went wrong!');
        } finally {
            setloading(false);
        }

    }

    useEffect(() => {
        fetchDashBoardData();
        return () => { };
    }, []);

    return (
        <div>
            <DashBoard activeMenu="Dashboard">
                <div className="w-full space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Display Cards */}
                        <InfoCard
                            icon={<WalletCards />}
                            label="Total Balance"
                            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                            color="bg-gradient-to-br from-purple-600 to-indigo-600"
                        />
                        <InfoCard
                            icon={<Wallet />}
                            label="Total Income"
                            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                            color="bg-gradient-to-br from-emerald-500 to-green-600"
                        />

                        <InfoCard
                            icon={<Coins />}
                            label="Total Expense"
                            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
                            color="bg-gradient-to-br from-rose-500 to-red-600"
                        />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-1 gap-8">
                        <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-6 hover:shadow-[0_18px_40px_-15px_rgba(99,102,241,0.35)] transition-all duration-300">
                            {/* Recent Trnsaction */}

                            <RecentTransactions
                                transactions={dashboardData?.recentTransactions}
                                onMore={() => navigate("/expense")}
                            />

                        </div>


                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-6 hover:shadow-[0_18px_40px_-15px_rgba(236,72,153,0.35)] transition-all duration-300">
                            <Transactions
                                title="Recent Expenses"
                                type="expense"
                                transactions={dashboardData?.recent5Expenses || []}
                                onMore={() => navigate("/expense")}
                            />
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-6 hover:shadow-[0_18px_40px_-15px_rgba(99,102,241,0.35)] transition-all duration-300">
                            <Transactions
                                title="Recent Incomes"
                                type="income"
                                transactions={dashboardData?.recent5Incomes || []}
                                onMore={() => navigate("/income")}
                            />
                        </div>
                    </div>



                </div>

            </DashBoard>
        </div>
    )
}


export default Home;
