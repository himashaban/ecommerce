import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create the cart context
export const cartContext = createContext();

export default function CartContextProvider(props) {
  const headers = {
    token: localStorage.getItem('userToken'),
  };

let [Cart,setCart]=useState(null)



function GetLoggedUserCart() {
  return axios
    .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: headers,
    })
    .then((response) => {
      console.log('Response data:', response);
      return response.data;
    }) 
    .catch((error) => {
      console.error('Error fetching cart:', error);
      
    });
}
function AddProductToCart(productId) {
  return axios
    .post(`https://ecommerce.routemisr.com/api/v1/cart`, {
      productId: productId
    }, {
      headers: headers,
    })
    .then((response) => response.data) 
    .catch((error) => {
      console.error(error);
      throw error; 
    });
}

  function updateProductToCart(productId,count) {
    return axios
      .put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        count: count
      }, {
        headers: headers,
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw error; 
      });
  }
function deleteProductCart(productId) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      
      headers: headers,
    })
    .then((response) => response.data) 
    .catch((error) => {
      console.error(error);
       
    });
}
function CheckOut(cartId, url, values) {
  return axios
    .post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
      shippingAddress: values
    }, {
      headers: headers,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return error.response?.data || 'An error occurred'; // Return something from the catch block
    });
}
async function GetCarts(){
 let response =await GetLoggedUserCart();
 setCart(response.data)

}
useEffect(()=>{
  GetCarts()
},[])






  return (
    <cartContext.Provider value={{Cart,setCart, GetLoggedUserCart, AddProductToCart ,updateProductToCart,deleteProductCart,CheckOut}}>
      {props.children}
    </cartContext.Provider>
  );
}
