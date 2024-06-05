import axios from "axios";

const API_URL = "http://localhost:5000";

// Function to get product categories
export const getCategories = async () => {
    try {
        const response = await axios.get(API_URL + "/categories/product-categories");
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// If you also want a function to get supplier categories, you can add:
export const getSupplierCategories = async () => {
    try {
        const response = await axios.get(API_URL + "/categories/supplier-categories");
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
