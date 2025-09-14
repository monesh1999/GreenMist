import axios from "axios";

const API_URL = 'http://localhost:8083/api/products';

export const fetchProductList = async () => {
         try {
            const response =await axios.get(API_URL);
       
            return(response.data);
       
            
        } catch (error) {
            console.log('error to fetch the product list',error);
            throw error;
        }
    }

export const fetchProductDetails = async (id) => {
    try {
        const response = await axios.get(API_URL+"/"+id);
        return response.data;
            
        } catch (error) {
            console.log('Error to fetch the product details',error);
            throw error;
        }
    }