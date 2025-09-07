import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { addProduct } from '../../service/ProductService';
import { toast } from 'react-toastify';


const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'cream'
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      toast.error('Please select the image.');
      return;
    }

    try {
        await addProduct(data,image);
        toast.success('product added successfully!')
        setData({ name: '', description: '', price: '', category: 'cream' });
        setImage(null);
    } catch (error) {
        toast.error("error adding product")
    }

  
  };
    

  return (
    <div className="container">
      <div className="row justify-content mt-4 mx-2">
        <div className="card col-md-6">
          <div className="card-body">
            <h2 className="mb-4 justify-content-center">Add Product</h2>
            <form onSubmit={onSubmitHandler}>
                <div className="mb-3">
                <label htmlFor="image" className="form-label"><img src={image ? URL.createObjectURL(image): assets.upload} alt="" width={98} /></label>
                <input type="file" className="form-control" id="image"  hidden onChange={(e)=> setImage(e.target.files[0])}/>
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Product Name</label>
                <input type="text" className="form-control" id="name" required name='name' onChange={onChangeHandler} value={data.name}/>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" rows="3" required name='description' onChange={onChangeHandler} value={data.description}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select name="category" id="category" className='form-control'  onChange={onChangeHandler} value={data.category}>
                    <option value="cream">cream</option>
                    <option value="oil">Oil</option>
                    <option value="seram">seram</option>
                    <option value="powder">powder</option>
                </select>
              </div>
               <div className="mb-3">
                <label htmlFor="price" className="form-label">price</label>
                <input type="number" className="form-control" id="price" required name='price' onChange={onChangeHandler} value={data.price}/>
              </div>
              <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
