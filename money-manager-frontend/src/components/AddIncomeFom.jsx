import EmojiPicker from 'emoji-picker-react'
import React, { useEffect, useState } from 'react'
import InputField from "./InputField.jsx";
import EmoiPickerPopUp from './EmoiPickerPopUp.jsx';
import { Loader2 } from 'lucide-react';

const AddIncomeFom = ({ onAddIncome, categories }) => {

    const [loading, setLoading] = useState(false);

    const [income, setIncome] = useState({
        name: '',
        amount: '',
        date: '',
        icon: '',
        categoryId: ''
    })

    const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name
    }))

    const handleChange = (key, value) => {
        setIncome({ ...income, [key]: value });
    }

    const handleAddIncome = async () => {
        setLoading(true);

        try {
            await onAddIncome(income)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (categories.length > 0 && !income.categoryId) {
            setIncome((prev) => ({ ...prev, categoryId: categories[0].id }))
        }
    }, [categories, income.categoryId]);

    return (
        <div>
            <EmoiPickerPopUp
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />

            <InputField
                value={income.name}
                label="Income Source"
                placeholder="e.g., Salary, Freelance, Bonus"
                type="text"
                onchange={(e) => handleChange('name', e.target.value)}
            />
            <InputField
                label="Category"
                value={income.categoryId}
                onchange={(e) => handleChange('categoryId', e.target.value)}
                isSelect={true}
                options={categoryOptions}
            />

            <InputField
                value={income.amount}
                onchange={(e) => handleChange('amount', e.target.value)}
                label="Amount"
                placeholder="e.g., 500.00"
                type="number"
            />

            <InputField
                value={income.date}
                onchange={(e) => handleChange('date', e.target.value)}
                label="Date"
                placeholder=""
                type="date"
            />


            <div>
                <button
                    type="button"
                    onClick={handleAddIncome}
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
                            <span>Adding…</span>
                        </span>
                    ) : (
                        <span>Add Income</span>
                    )}
                </button>
            </div>
        </div>


    )
}

export default AddIncomeFom