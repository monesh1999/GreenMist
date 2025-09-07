import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './ListProduct.css';
import { deleteProduct, getProductList } from '../../service/ProductService';

const ListProduct = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const data = await getProductList();
      setList(data);

    } catch (error) {
      toast.error('Error while reading product')
    }
  };

  const removeProduct =async(productId)=>{
    try {
      const success = await deleteProduct(productId);
      if(success){
        toast.success('Product removed');
        await fetchList();
      }
    } catch (error) {
      toast.error("Failed to delete product");
    }

  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="py-5 row justify-content-center">
      <div className="col-11 card">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>
                  <img src={`http://localhost:8083${item.imageUrl}`}  alt={item.name}   height={48}   width={48} />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>&#8377;{item.price}.00</td>
                <td className="text-danger">
                  <i className="bi bi-x-circle-fill"  onClick={() => removeProduct(item.id)} style={{ cursor: 'pointer' }}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProduct;
