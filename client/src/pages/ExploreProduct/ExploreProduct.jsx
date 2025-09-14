import React, { useState } from 'react';
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay';

const ExploreProduct = () => {
  const [category,setCategory] = useState('All');
  const [searchText,setSearchText] = useState('');
  return (
    <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form action="" onSubmit={(e)=> e.preventDefault()}>
            <div className="input-group mb-3">
              <select className='form-select mt-2' style={{'maxWidth':'150px'}} onChange={(e)=> setCategory(e.target.value)}>
                <option value="Ice-cream">Ice-cream</option>
                    <option value="oil">Oil</option>
                    <option value="Vegetable">Vegetable</option>
                    <option value="Fruite">Fruite</option>
              </select>
              <input type="text" className='form-control mt-2' placeholder='Search a product...' onChange={(e)=> setSearchText(e.target.value)} value={searchText}/>
              <button className='btn btn-primary mt-2' type='submit'>
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <ProductDisplay category={category} searchText={searchText}/>
    </>
    
  )
}

export default ExploreProduct