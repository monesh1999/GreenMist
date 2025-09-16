import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const {productList,quantities,setQuantities} = useContext(StoreContext);

  //cart items
    const cartItems = productList.filter(product => quantities[product.id] > 0);
    // calculating
    const subtotal = cartItems.reduce((acc,product) => acc + product.price * quantities[product.id],0);
    const shipping = subtotal === 0 ? 0.0 : 10;
    const Tax = subtotal * 0.1; //10% tax
    const total = subtotal + shipping + Tax;

  return (
     <div className="container mt-3">
        <div className="py-5 text-center">
        <img className="d-block mx-auto "
           src={assets.logo}
           alt="Bootstrap Logo"
           width="220"
           height="98"/>
       </div> 
      <div className="div container mt-4">
        <main>
            <div className="row g-5">
      {/* Cart Section */}
      <div className="col-md-5 col-lg-4 order-md-last">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-primary">Your cart</span>
          <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
        </h4>

        <ul className="list-group mb-3">
          {cartItems.map(item => (
            <li className="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 className="my-0">{item.name}</h6>
              <small className="text-body-secondary">Qty : {quantities[item.id]}</small>
            </div>
            <span className="text-body-secondary">&#8377;{item.price * quantities[item.id]}</span>
          </li>
          ))}
          <li className="list-group-item d-flex justify-content-between lh-sm">
            <div>
              
              <span >Shipping</span>
            </div>
            <span className="text-body-secondary">&#8377;{subtotal===0?0.0:shipping.toFixed(2)}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between lh-sm">
            <div>
             
              <span className="text-body-secondary">Tax (10%)</span>
            </div>
            <span className="text-body-secondary">&#8377;{Tax.toFixed(2)}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Total (INR)</span>
            <strong>&#8377;{total.toFixed(2)}</strong>
          </li>
        </ul>

        
      </div>

      {/* Billing Form */}
      <div className="col-md-7 col-lg-8">
        <h4 className="mb-3">Billing address</h4>
        <form className="needs-validation" noValidate>
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="firstName" className="form-label">
                First name
              </label>
              <input type="text" className="form-control" id="firstName" required />
             
            </div>

            <div className="col-sm-6">
              <label htmlFor="lastName" className="form-label">
                Last name
              </label>
              <input type="text" className="form-control" id="lastName" required />
             
            </div>

            <div className="col-12">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-group has-validation">
                <span className="input-group-text">@</span>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                  required
                />
                
              </div>
            </div>


            <div className="col-12">
              <label htmlFor="phone" className="form-label">Phone:</label>
              <input type="number" className="form-control" id="phone" placeholder="1234567890" required />
             
            </div>

            <div className="col-12">
              <label htmlFor="address2" className="form-label">
                Address 
              </label>
              <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
            </div>

            <div className="col-md-5">
              <label htmlFor="country" className="form-label">Country</label>
              <select className="form-select" id="country" required>
                <option value="">Choose...</option>
                <option>India</option>
              </select>
             
            </div>

            <div className="col-md-4">
              <label htmlFor="state" className="form-label">State</label>
              <select className="form-select" id="state" required>
                <option value="">Choose...</option>
                <option>Chennai</option>
              </select>
              
            </div>

            <div className="col-md-3">
              <label htmlFor="zip" className="form-label">Zip</label>
              <input type="number"
               className="form-control" id="zip" 
              placeholder="600007"
              required />
              
            </div>
          </div>

          <hr className="my-4" />

          <button className="w-100 btn btn-primary btn-lg" type="submit" disabled={ cartItems.length===0}>
            Continue to checkout
          </button>
        </form>
      </div>
    </div>
        </main>
    </div>
    </div>
  );
};

export default PlaceOrder;
