import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Cart.css';
import { Link, useNavigate } from 'react-router-dom';
import { calculateCartTotals } from '../../util/cartUtils';

const Cart = () => {

    const navigate = useNavigate();
    const{productList,increaseQty,decreaseQty,quantities,removeFromCart} = useContext(StoreContext);

    //cart items
    const cartItems = productList.filter(product => quantities[product.id] > 0);
    // calculating
    
    const { shipping, subtotal, total, Tax } = calculateCartTotals(cartItems, quantities);

  return (
    <div className="container py-5">
    <h1 className="mb-5">Your Shopping Cart</h1>
    <div className="row">
        <div className="col-lg-8">
            {
                cartItems.length === 0 ? (
                    <p> Your Cart is Empty</p>
                ):(

                    <div className="card mb-4">
                <div className="card-body">

                   {cartItems.map((product) => (
                     <div key={product.id} className="row cart-item mb-3">
                        <div className="col-md-3">
                            <img src={`http://localhost:8083${product.imageUrl}`}
                             alt={product.name} className="img-fluid rounded" width={100}/>
                        </div>
                        <div className="col-md-5">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="text-muted">Category: {product.category}</p>
                        </div>
                        <div className="col-md-2">
                            <div className="input-group"> 
                                <button className="btn btn-outline-secondary btn-sm" type="button"onClick={() => decreaseQty(product.id)} >-</button>
                                <input style={{"maxWidth":"100px"}} type="text" className="form-control  form-control-sm text-center quantity-input" value={quantities[product.id]} readOnly />
                                <button className="btn btn-outline-secondary btn-sm" type="button" onClick={() => increaseQty(product.id)}>+</button>
                            </div>
                        </div>
                        <div className="col-md-2 text-end">
                            <p className="fw-bold">&#8377;{(product.price * quantities[product.id]).toFixed(2)}</p>
                            <button className="btn btn-sm btn-outline-danger" onClick={()=> removeFromCart(product.id)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                        </div>
                        <hr/>
                    </div>
                   ))}
                    
                    
                </div>
            </div>

                )
            }
            
           
            <div className="text-start mb-4">
                <Link to={"/"}  className="btn btn-outline-primary">
                    <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                </Link>
            </div>
        </div>
        <div className="col-lg-4">
            
            <div className="card cart-summary">
                <div className="card-body">
                    <h5 className="card-title mb-4">Order Summary</h5>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Subtotal</span>
                        <span>&#8377;{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Shipping</span>
                        <span>&#8377;{subtotal === 0 ? 0.0:shipping.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Tax</span>
                        <span>&#8377;{subtotal === 0 ? 0.0:Tax.toFixed(2)}</span>
                    </div>
                    <hr/>
                    <div className="d-flex justify-content-between mb-4">
                        <strong>Total</strong>
                        <strong>&#8377;{subtotal === 0 ? 0.0:total.toFixed(2)}</strong>
                    </div>
                    <button className="btn btn-primary w-100" disabled={cartItems.length===0} onClick={()=>navigate("/order")}>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Cart