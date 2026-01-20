import { useContext, useEffect, useState } from "react";
import DashBoard from "../components/DashBoard";
import { AppContext } from "../context/AppContext";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndPoints";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList.jsx";
import { Plus } from "lucide-react";
import Modal from "../components/Modal.jsx";
import AddIncomeFom from "../components/AddIncomeFom.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import IncomeOverview from "../components/IncomeOverview.jsx";

const Income = () => {

    const { user } = useContext(AppContext);

    const [incomeData, setincomeData] = useState([]);
    const [category, setcategory] = useState([]);
    const [loading, setloading] = useState(false);

    const [openAddIncomeModal, setopenAddIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });


    //fetching income details
    const fetchIncomeDetails = async () => {
        if (loading) {
            return;
        }

        setloading(true);

        try {

            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);

            if (response.status === 200) {
                setincomeData(response.data);
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fecth income details");
        }finally{
            setloading(false);
        }

    }

    //fetching categories for income

    const fetchIncomeCategories = async () => {

        try {

            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));

            if (response.status === 200) {
                // console.log("Income Categories: ",response.data);
                setcategory(response.data);
            }

        }
        catch (error) {
            console.error("Failed to fetch income categories: ", error);
            toast.error(error.data?.message || "Failed to fetch income categories");
        }

    }

    // adding income

    const handleAddIncome = async (addedIncome) => {
        const { name, amount, date, icon, categoryId } = addedIncome;

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

        try{

            const response =await axiosConfig.post(API_ENDPOINTS.ADD_INCOME,{
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId,
            });

            if(response.status === 201){
                await fetchIncomeCategories();
                await fetchIncomeDetails();
                toast.success("Income added successfully");
                setopenAddIncomeModal(false);
            }
            
        }catch(error){

            toast.error(error.response?.data?.message || "Failed to add income");

        }
    }

    //deleting income details

    const deleteIncome = async (id) =>{
        try{
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            toast.success("Income details deleted successfully");
            setOpenDeleteAlert({show: false, data: null});
            fetchIncomeDetails();

        }catch(error){
            console.log("Error: ",error);
            toast.error(error.response?.data?.message || "Failed to delete the income");
        }
    }


    useEffect(() => {
        fetchIncomeDetails();
        fetchIncomeCategories();
    }, []
    )

    return (
        <div>
            <DashBoard activeMenu="Income">
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
                            onClick={() => setopenAddIncomeModal(true)}
                        >
                            <Plus size={18} className="stroke-[2.5]" />
                            Add Income
                        </button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-rows-3 gap-6">
                        {/* Income Overview Card */}
                        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-md border border-slate-100 relative overflow-hidden">

                            {/* Gradient Accent */}
                            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400" />

                            <div className="flex items-center justify-between mb-4">
                                <IncomeOverview transactions={incomeData}/>
                            </div>

                            
                        </div>

                        {/* Income List  */}
                        <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-100">
                            <div className="max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                                <IncomeList
                                    transactions={incomeData}
                                    onDelete={(id) => setOpenDeleteAlert({show:true,data:id})}
                                />
                            </div>
                        </div>

                        {/* Add Income Modal */}
                        <Modal

                            isOpen={openAddIncomeModal}
                            onClose={() => setopenAddIncomeModal(false)}
                            title="Add Income"
                        >
                            <AddIncomeFom
                                onAddIncome={(addedIncome) => handleAddIncome(addedIncome)}
                                categories={category}
                            />
                        </Modal>

                        {/* Delete Income Modal */}
                        <Modal
                            isOpen={openDeleteAlert.show}
                            onClose={() => setOpenDeleteAlert({show:false,data:null})}
                            title="Delete Income"
                        >
                            <DeleteAlert
                                content="Are you sure to delete the income details?"
                                onDelete={() => deleteIncome(openDeleteAlert.data)}
                            />
                        </Modal>

                    </div>
                </div>

            </DashBoard>
        </div>
    )
}

export default Income;
