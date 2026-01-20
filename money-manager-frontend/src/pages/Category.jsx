import { useContext, useEffect, useState } from "react";
import DashBoard from "../components/DashBoard";
import { AppContext } from "../context/AppContext";
import { Plus } from "lucide-react";
import CategoryList from "../components/CategoryList";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndPoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal.jsx";
import AddCategoryForm from "../components/AddCategoryForm.jsx";


const Category = () => {

    const { user } = useContext(AppContext);

    const [loading, setloading] = useState(false);
    const [categoryData, setcategoryData] = useState([]);
    const [openAddCategoryModal, setopenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setopenEditCategoryModal] = useState(false);
    const [selectedCategory, setselectedCategory] = useState(null);


    //handle click on square pen icon 
    const handleEditCategory = (categoryToEdit) =>{
        setselectedCategory(categoryToEdit);
        setopenEditCategoryModal(true);
    
    }


    //handle update category

    const handleUpdateCategory = async (updatedCategory) =>{ 
        const {id,name,type,icon}=updatedCategory;

        if(!name.trim()){
            toast.error("Category name is required");
            return;
        }

        if(!id){
            toast.error("Category ID is missing for update");
            return;
        }

        try{
            await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id),{name,type,icon});

            setopenEditCategoryModal(false);
            setselectedCategory(null);

            toast.success("Category updated successfully");
            fetchCategoryDetails();

        }catch(error){
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to update category");
        }

    }


    //adding category
    const handleAddCategory = async (category) => {
        const { name, type, icon } = category;

        //validation

        if (!name.trim()) {
            toast.error("Category name is required");
            return;
        }

        //checking if category already exists

        const isDuplicate = categoryData.some((category) => {
            return category.name.toLowerCase() === name.trim().toLowerCase();
        });

        if (isDuplicate) {
            toast.error("Category name already exists");
            return;
        }


        try {

            const resposnse = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORIES, { name, type, icon });

            if (resposnse.status === 201) {
                toast.success("Category added successfully");
                setopenAddCategoryModal(false);
                fetchCategoryDetails();
            }

        } catch (error) {

            console.log("Error adding category");
            toast.error(error.response?.data?.message || "Failed to add category");

        }

    }

    const fetchCategoryDetails = async () => {
        if (loading) {
            return;
        }

        setloading(true);

        try {

            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);

            if (response.status === 200) {
                console.log("Categories: ", response.data);

                setcategoryData(response.data);
            }

        } catch (error) {
            console.error("Something went wrong");
            toast.error(error.message);

        } finally {
            setloading(false);
        }

    }

    useEffect(
        () => {
            fetchCategoryDetails();
        }, []
    );

    return (
        <div>
            <DashBoard activeMenu="Category">
                <div className="w-full">
                    {/* Add button to add categories */}

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="
      text-xl font-semibold
      text-cyan-700
      tracking-tight
    ">
                            All Categories
                        </h2>

                        <button
                            className="
        flex items-center gap-2
        px-4 py-2.5
        rounded-xl
        text-sm font-medium
        text-white
        bg-gradient-to-r from-purple-500 to-indigo-800
        shadow-md
        transition-all duration-300
        hover:shadow-[0_0_14px_rgba(99,102,241,0.45)]
        hover:scale-[1.02]
        active:scale-[0.96]
        
        
      "

                            onClick={() => setopenAddCategoryModal(true)}
                        >
                            <Plus className="w-4 h-4" />
                            Add Category
                        </button>
                    </div>

                    {/* Category List*/}
                    <CategoryList categories={categoryData} onEditCategory={handleEditCategory}/>

                    {/* Add category modal */}
                    <Modal title="Add Category"
                        isOpen={openAddCategoryModal}
                        onClose={() => setopenAddCategoryModal(false)}>
                        <AddCategoryForm onAddCategory={handleAddCategory} />
                    </Modal>

                    {/* Update category modal */}

                    <Modal
                        isOpen={openEditCategoryModal}
                        onClose={() => {
                            setopenEditCategoryModal(false);
                            setselectedCategory(null);
                        }}
                        title="Update Category"
                    >
                        <AddCategoryForm
                            onAddCategory={handleUpdateCategory} 
                            isEditing={true}
                            intitalCategoryData={selectedCategory} 
                        />
                    </Modal>
                </div>

            </DashBoard>
        </div>
    )
}


export default Category;
