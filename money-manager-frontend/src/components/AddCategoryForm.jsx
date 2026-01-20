import React, { useEffect, useState } from 'react'
import InputField from "./InputField.jsx";
import EmoiPickerPopUp from './EmoiPickerPopUp.jsx';
import { Loader2 } from "lucide-react";


const AddCategoryForm = ({ onAddCategory, isEditing, intitalCategoryData }) => {

    const [category, setcategory] = useState({
        name: "",
        type: "income",
        icon: ""
    });

    const [loading, setloading] = useState(false);

    const categoryTypeOptions = [
        { value: "income", label: "Income" },
        { value: "expense", label: "Expense" },
    ];

    const handleChange = (key, value) => {
        setcategory({ ...category, [key]: value });
    }

    const handleSubmit = async () => {


        setloading(true);

        try {

            await onAddCategory(category);

        } finally {
            setloading(false);
        }
    }

    useEffect(() => {
        if (isEditing && intitalCategoryData) {
            setcategory(intitalCategoryData);
        } else {
            setcategory({ name: "", type: "income", icon: "" });
        }


    }, [isEditing, intitalCategoryData]
    )


    return (
        <div>

            <EmoiPickerPopUp
                icon={category.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            <InputField
                value={category.name}
                onchange={(e) => handleChange("name", e.target.value)}
                label="Category Name"
                placeholder="e.g., Freelance, Salary, Groceries"
                type="text"
            />

            <InputField
                label="Category Type"
                value={category.type}
                onchange={(e) => handleChange("type", e.target.value)}
                isSelect={true}
                options={categoryTypeOptions}
            />

            <div>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="
      w-full
      py-3
      px-6
      bg-cyan-600
      text-white
      font-semibold
      rounded-2xl
      shadow-md
      hover:bg-indigo-700
      hover:shadow-lg
      active:scale-[0.97]
      transition-all
      duration-200
      focus:outline-none
    "
                    disabled={loading}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin text-white/90" />
                            <span>{isEditing ? "Updating…" : "Adding…"}</span>
                        </span>
                    ) : (
                        <span>{isEditing ? "Update Category" : "Add Category"}</span>
                    )}
                </button>
            </div>


        </div>
    )
}

export default AddCategoryForm