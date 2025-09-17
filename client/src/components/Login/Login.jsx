import React from 'react'
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
     <div className="container login-container" >
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
            <form>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
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