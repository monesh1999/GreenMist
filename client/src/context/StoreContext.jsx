import { createContext, useState } from "react";

export const  StoreContext =createContext(null);

export const StoreContextProvider =(props) =>{

    const [productList,setProductList] = useState([]);

    const contextValue ={
        
    };


    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}