import React, { useState } from 'react'
import AddProduct from './pages/AddProduct/AddProduct';
import ListProduct from './pages/ListProduct/ListProduct';
import Order from './pages/Orders/Order';
import Sidebar from './components/Sidebar/Sidebar';
import Menubar from './components/Menubar/Menubar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';


export const App = () => {

    const[sidebarVisible,setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    }


  return (
    <div className="d-flex" id="wrapper">
            
            <Sidebar sidebarVisible={sidebarVisible} />
            
            <div id="page-content-wrapper">
               
               <Menubar toggleSidebar={toggleSidebar} />
               <ToastContainer/>
                
                <div className="container-fluid">
                    <Routes>
                        <Route path='/add' element={<AddProduct/>}/>
                        <Route path='/list' element={<ListProduct/>}/>
                        <Route path='/orders' element={<Order/>}/>
                        <Route path='/' element={<ListProduct/>}/>
                    </Routes>
                </div>
            </div>
        </div>
  )
}
export default App;