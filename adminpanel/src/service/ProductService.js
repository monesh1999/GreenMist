import axios from "axios";

const API_URL = 'http://localhost:8083/api/products';

export const addProduct = async (productData, image) => {
  const formData = new FormData();
  formData.append(
    'product',
    new Blob([JSON.stringify(productData)], { type: 'application/json' })
  );
  formData.append('file', image);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data; // return created product
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getProductList = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // return list to caller
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/${productId}`);
    return response.status === 204; // true if deleted
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};
