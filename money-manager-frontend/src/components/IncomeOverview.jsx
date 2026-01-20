import React, { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/util";
import CustomLineChart from "./CustomLineChart";

const IncomeOverview = ({ transactions }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        setChartData(result);
    }, [transactions]);

    return (
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 w-full">

            {/* Header */}
            <div className="mb-6">
                <h5 className="text-lg font-semibold text-slate-900 tracking-tight">
                    Income Overview
                </h5>
                <p className="mt-1 text-sm text-slate-500">
                    Track your earnings over time.
                </p>
            </div>

            {/* Chart */}
            <div
                className="
          w-full
          h-72
          rounded-xl
          bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50
          border border-slate-200
          overflow-hidden
        "
            >
                {transactions.length === 0 ? (
                    <div className="
            w-full h-full
            flex flex-col items-center justify-center
            text-center
            px-4
          ">
                        <p className="
              text-base md:text-lg
              font-semibold
              text-purple-700
            ">
                            No income added yet 💸
                        </p>

                        <p className="
              mt-2
              text-sm md:text-base
              text-slate-500
              max-w-sm
            ">
                            Start adding income sources to visualize your financial growth.
                        </p>
                    </div>
                ) : (
                    <CustomLineChart data={chartData} />
                )}
            </div>
        </div>
    );
};

export default IncomeOverview;
