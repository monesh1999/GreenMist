import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { fetchProductList } from "../service/productService";

export const  StoreContext =createContext(null);

export const StoreContextProvider =(props) =>{

    const [productList,setProductList] = useState([]);

    

    const contextValue ={
        productList
        
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