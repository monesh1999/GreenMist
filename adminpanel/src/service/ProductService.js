import axios from "axios";

const API_URL = 'http://localhost:8083/api/products/add';

export const addProduct = async(productData,image)=>{
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
    formData.append('file', image);

    try {
           await axios.post(API_URL,formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
          );
    
          
        } catch (error) {
          console.error('Error:', error);
          alert('Failed to add product.');
        }

    
}