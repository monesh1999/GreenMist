import React, { useContext, useState } from 'react'
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../service/authService';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const navigate =useNavigate(); 

  const{setToken ,loadCartData}=useContext(StoreContext);
 
  const[data,setData]=useState({
   
    email:'',
    password:''
  });

  const onChangeHandler =(event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name] : value}));

  }

  const onSubmitHandler = async(event) => {
  event.preventDefault();  // <-- add ()
  
  try {
         const response = await login(data);
        if(response.status===200){
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token);
          toast.success('Login successful');
          await loadCartData(response.data.token);
          navigate('/');
        }else{
          toast.error('incorrect password ,please try again');
        }
        
      } catch (error) {
        toast.error('unable to login ,please try again');
      }
};



  return (
     <div className="container login-container" >
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
            <form onSubmit={onSubmitHandler}>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name='email' onChange={onChangeHandler} value={data.email} required/>
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' onChange={onChangeHandler} value={data.password} required/>
                <label htmlFor="floatingPassword">Password</label>
              </div>

              
              <div className="d-grid">
                <button className="btn btn-outline-primary btn-login text-uppercase " type="submit">Sign
                  in</button>
                  <button className="btn btn-outline-danger mt-3 btn-login text-uppercase " type="reset">Reset
                  </button>
              </div>
              <div className="div mt-4">
                Don't have an Account? <Link to='/register'>Sign up</Link>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login