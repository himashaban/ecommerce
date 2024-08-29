import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the Wishlist context
export const wishlistContext = createContext();

export default function WishlistContextProvider(props) {
  const headers = {
    token: localStorage.getItem('userToken'),
  };

  const [wishlist, setWishlist] = useState(null);

  async function getUserWishlist() {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function AddProductToWishlist(productId) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function deleteProductWishlist(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function GetWishlist() {
    const response = await getUserWishlist();
    setWishlist(response.data);
  }

  useEffect(() => {
    GetWishlist();
  }, []);

  return (
    <wishlistContext.Provider value={{ AddProductToWishlist, setWishlist, deleteProductWishlist, getUserWishlist }}>
      {props.children}
    </wishlistContext.Provider>
  );
}
