import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { fetchProductList } from "../service/productService";

export const  StoreContext =createContext(null);

export const StoreContextProvider =(props) =>{

    const [productList,setProductList] = useState([]);
    const [quantities,setQuantities] = useState({
    });

    const[token,setToken] = useState("");

    const increaseQty = async (productId) => {
        setQuantities((prev) => ({...prev,[productId]: (prev[productId] || 0)+1}));

        axios.post('http://localhost:8083/api/cart',{productId},{headers:{"Authorization":`Bearer ${token}`}});

    }
     const decreaseQty = (productId) => {
        setQuantities((prev)=>({...prev,[productId]:prev[productId]>0 ? prev[productId] - 1 : 0}));

        axios.post('http://localhost:8083/api/cart/remove',{productId},{headers:{"Authorization":`Bearer ${token}`}});
    }
    const removeFromCart =(productId) =>{
        setQuantities((prevQuantities) =>{
            const updateQuantities ={...prevQuantities};
            delete updateQuantities[productId];
            return updateQuantities;
        })
    }

    const loadCartData =async(token) =>{
         const response =await axios.get('http://localhost:8083/api/cart',{headers:{"Authorization":`Bearer ${token}`}});
         setQuantities(response.data.items);

    }

    

    const contextValue ={
        productList,
        increaseQty,
        decreaseQty,
        quantities,
        setQuantities,
        removeFromCart,
        token,
        setToken,
        loadCartData,
        
    };
    useEffect(()=>{
        async function loadData() {
            
            const data = await fetchProductList();
            setProductList(data);
            if(localStorage.getItem('token')){
                setToken(localStorage.getItem('token'));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[]);


    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}