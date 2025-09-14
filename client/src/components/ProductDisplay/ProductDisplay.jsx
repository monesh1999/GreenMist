import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import ProductItem from '../ProductItem/ProductItem';

const ProductDisplay = ({category,searchText}) => {
  
   const {productList} = useContext(StoreContext);
   const filteredProduct =productList.filter(product => (
       (category === 'All'|| product.category === category) &&
       product.name.toLowerCase().includes(searchText.toLowerCase())
  ));

  return (
    <div className="container">
      <div className="row">
        {filteredProduct.length > 0 ?(
          filteredProduct.map((product,index) => (
            <ProductItem key={index} 
            name={product.name} 
            description={product.description}
            id={product.id}
            imageUrl={product.imageUrl}
            price={product.price} />
          ))

        ):(
          <div className="div text-center mt-4">
            <h4>No product found.</h4>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDisplay