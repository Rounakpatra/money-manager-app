export const BASE_URL=import.meta.env.VITE_BACKEND_BASE_URL;

const CLOUDINARY_CLOUD_NAME=import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const API_ENDPOINTS={
    LOGIN:"/login",
    REGISTER:"/register",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    GET_ALL_CATEGORIES:"/categories",
    ADD_CATEGORIES:"/categories",
    UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
    GET_ALL_INCOMES:"/incomes",
    CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
    ADD_INCOME:"/incomes",
    DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
    GET_ALL_EXPENSE: "/expenses",
    ADD_EXPENSE: "/expenses",
    DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
    APPLY_FILTERS: "/filter",
    DASHBOARD_DATA: "/dashboard"
}
