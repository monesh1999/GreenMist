import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { fetchProductList } from "../service/productService";

export const  StoreContext =createContext(null);

export const StoreContextProvider =(props) =>{

    const [productList,setProductList] = useState([]);
    const [quantities,setQuantities] = useState({
    });

    const increaseQty = (productId) => {
        setQuantities((prev) => ({...prev,[productId]: (prev[productId] || 0)+1}));

    }
     const decreaseQty = (productId) => {
        setQuantities((prev)=>({...prev,[productId]:prev[productId]>0 ? prev[productId] - 1 : 0}));
    }
    const removeFromCart =(productId) =>{
        setQuantities((prevQuantities) =>{
            const updateQuantities ={...prevQuantities};
            delete updateQuantities[productId];
            return updateQuantities;
        })
    }

    

    const contextValue ={
        productList,
        increaseQty,
        decreaseQty,
        quantities,
        removeFromCart
        
    };
    useEffect(()=>{
        async function loadData() {
            
            const data = await fetchProductList();
            setProductList(data);
        }
        loadData();
    },[]);


    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}