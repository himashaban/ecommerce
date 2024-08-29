import React, { useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CircleLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { cartContext } from '../CartContext/CartContext';
import { wishlistContext } from '../WishlistContext/WishlistContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function RecentProducts() {
  let { AddProductToCart, setCart } = useContext(cartContext);
  let { AddProductToWishlist, setWishlist } = useContext(wishlistContext);

  async function addProduct(productId) {
    let response = await AddProductToCart(productId);
    if (response.status === 'success') {
      setCart(response);
      toast.success('Product added to cart successfully!');
    } else {
      toast.error('Failed to add product to cart.');
    }
  }

  async function addWishlist(productId) {
    let response = await AddProductToWishlist(productId);
    if (response.status === 'success') {
      setWishlist(response);
      toast.success('Product added to wishlist successfully!');
    } else {
      toast.error('Failed to add product to wishlist.');
    }
  }

  function getRecent() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: getRecent,
    staleTime: 5000,
    select: (data) => data.data.data,
  });

  if (isLoading) {
    return (
      <div className="flex py-8 w-full justify-center">
        <CircleLoader color="green" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex py-8 w-full justify-center">
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        {data?.map((product) => (
          <div key={product.id} className="w-1/6 px-2">
            <div className="relative product p-4 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <div className="relative">
                  <img className="w-full" src={product.imageCover} alt={product.title} />
                </div>
                <span className="block text-green-600">{product.category.name}</span>
                <h3 className="text-lg font-normal text-gray-600 mb-4">
                  {product.title.split(' ').slice(0, 2).join(' ')}
                </h3>
                <div className="flex justify-between items-center">
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage}
                    <i className="fa fa-star text-yellow-500"></i>
                  </span>
                </div>
              </Link>
              <button onClick={() => addProduct(product.id)} className="btn">
                Add to cart
              </button>
              <FontAwesomeIcon
                    onClick={() => addWishlist(product.id)}
                    icon={faHeart}
                    className="cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-red-500"
                    size="lg"
                  />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
