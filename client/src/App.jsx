import React from 'react'
import Menubar from './components/Menubar/Menubar'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import ExploreProduct from './pages/ExploreProduct/ExploreProduct'
import Contact from './pages/Contact Us/Contact'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Cart from './pages/Cart/Cart'
 import PlaceOrder from './components/PlaceOrder/PlaceOrder'



const App = () => {
  return (
    <div>
      <Menubar/>
     
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/explore' element={<ExploreProduct />}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/order' element={<PlaceOrder/>}/>
      </Routes>
    </div>
  )
}

export default App
