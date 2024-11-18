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
      <div className="flex flex-wrap gap-4">
  {data?.map((product) => (
    <div key={product.id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
      <Link to={`/productdetails/${product.id}/${product.category.name}`}>
        <div className="relative">
          <img className="w-full object-cover h-48 sm:h-56" src={product.imageCover} alt={product.title} />
        </div>
        <div className="p-2">
          <span className="block text-sm text-green-600">{product.category.name}</span>
          <h3 className="text-sm font-medium text-gray-700 truncate">{product.title}</h3>
          <div className="flex justify-between items-center text-sm mt-2">
            <span>{product.price} EGP</span>
            <span>
              {product.ratingsAverage}
              <i className="fa fa-star text-yellow-500 ml-1"></i>
            </span>
          </div>
        </div>
      </Link>
      <button onClick={() => addProduct(product.id)} className="btn w-full bg-blue-500 text-white py-1 text-sm mt-2 rounded hover:bg-blue-600">
        Add to cart
      </button>
      <FontAwesomeIcon
        onClick={() => addWishlist(product.id)}
        icon={faHeart}
        className="cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-red-500"
        size="lg"
      />
    </div>
  ))}
</div>

    </>
  );
}
