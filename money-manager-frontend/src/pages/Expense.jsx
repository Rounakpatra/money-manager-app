import DashBoard from "../components/DashBoard";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndPoints";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import Modal from "../components/Modal.jsx";
import ExpenseOverview from "../components/ExpenseOverView.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import AddExpenseForm from "../components/AddExpenseForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";

const Expense = () => {

    const { user } = useContext(AppContext);

    const [expenseData, setexpenseData] = useState([]);
    const [category, setcategory] = useState([]);
    const [loading, setloading] = useState(false);

    const [openAddExpenseModal, setopenAddexpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    //fetching expense details
    const fetchExpenseDetails = async () => {
        if (loading) {
            return;
        }

        setloading(true);

        try {

            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSE);

            if (response.status === 200) {
                setexpenseData(response.data);
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fecth expense details");
        } finally {
            setloading(false);
        }

    }

    //fetching categories for expense

    const fetchExpenseCategories = async () => {

        try {

            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));

            if (response.status === 200) {
                setcategory(response.data);
            }

        }
        catch (error) {
            // console.error("Failed to fetch epense categories: ", error);
            toast.error(error.data?.message || "Failed to fetch expense categories");
        }

    }

    // adding expense

    const handleAddExpense = async (addedExpense) => {
        const { name, amount, date, icon, categoryId } = addedExpense;

        //validation
        if (!name.trim()) {
            toast.error("Please enter a name");
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be a valid number greater than 0");
            return;
        }

        if (!date) {
            toast.error("Please select a date");
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if (date > today) {
            toast.error('Date cannot be in the future');
            return;
        }

        if (!categoryId) {
            toast.error("Please select a category");
            return;
        }

        try {

            const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId,
            });

            if (response.status === 201) {
                await fetchExpenseDetails();
                await fetchExpenseCategories();
                toast.success("Expense added successfully");
                setopenAddexpenseModal(false);
            }

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to add expense");

        }
    }

    //deleting expense details

    const deleteExpense = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
            toast.success("Expense details deleted successfully");
            setOpenDeleteAlert({ show: false, data: null });
            fetchExpenseDetails();

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete the expense");
        }
    }


    useEffect(() => {
        fetchExpenseCategories();
        fetchExpenseDetails();
    }, []
    )

    return (
        <div>
            <DashBoard activeMenu="Expense">
                <div className="w-full px-6 py-5">
                    <div className="flex justify-end mb-2">
                        <button
                            className="
          flex items-center gap-2
          px-5 py-2.5
          rounded-xl
          bg-gradient-to-r from-emerald-500 to-green-600
          text-white text-sm font-semibold
          shadow-md
          transition-all duration-300
          hover:from-emerald-600 hover:to-green-700
          hover:shadow-[0_10px_25px_-8px_rgba(16,185,129,0.8)]
          hover:-translate-y-[2px]
          active:scale-95
        "
                            onClick={() => setopenAddexpenseModal(true)}
                        >
                            <Plus size={18} className="stroke-[2.5]" />
                            Add Expense
                        </button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-rows-3 gap-6">
                        {/* Expense Overview Card */}
                        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-md border border-slate-100 relative overflow-hidden">

                            {/* Gradient Accent */}
                            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400" />

                            <div className="flex items-center justify-between mb-4">
                                <ExpenseOverview transactions={expenseData} />
                            </div>


                        </div>

                        {/* Expense List  */}
                        <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-100">
                            <div className="max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                                <ExpenseList
                                    transactions={expenseData}
                                    onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                                />
                            </div>
                        </div>

                        {/* Add Expense Modal */}
                        <Modal

                            isOpen={openAddExpenseModal}
                            onClose={() => setopenAddexpenseModal(false)}
                            title="Add Expense"
                        >
                            <AddExpenseForm
                                onAddExpense={(addedExpense) => handleAddExpense(addedExpense)}
                                categories={category}
                            />
                        </Modal>

                        {/* Delete Expense Modal */}
                        <Modal
                            isOpen={openDeleteAlert.show}
                            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                            title="Delete Expense"
                        >
                            <DeleteAlert
                                content="Are you sure to delete the expense details?"
                                onDelete={() => deleteExpense(openDeleteAlert.data)}
                            />
                        </Modal>

                    </div>
                </div>

            </DashBoard>
        </div>
    )
}


export default Expense;
