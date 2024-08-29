import React, { useContext } from 'react';
import { wishlistContext } from '../WishlistContext/WishlistContext';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CircleLoader } from 'react-spinners';

// Function to fetch the wishlist
const fetchWishlist = async (getUserWishlist) => {
  const response = await getUserWishlist();
  return response.data;
};

export default function Wishlist() {
  const { getUserWishlist, deleteProductWishlist } = useContext(wishlistContext);
  const queryClient = useQueryClient();

  const { data: wishlistDetails, isLoading, isError, error } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => fetchWishlist(getUserWishlist),
    
  });

  const mutation = useMutation({
    mutationFn: deleteProductWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist']); // Refetch wishlist data after deletion
    },
    onError: (err) => {
      console.error('Failed to delete product:', err);
    }
  });

  const handleDelete = async (productId) => {
    mutation.mutate(productId);
  };

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
        <p>Error loading wishlist: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <h2 className="text-xl font-semibold text-center text-green-700">Shopping Wishlist</h2>

      <table className="w-full my-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-4 py-3">Product</th>
            <th scope="col" className="px-4 py-3"></th>
            <th scope="col" className="px-4 py-3">Price</th>
            <th scope="col" className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {wishlistDetails?.map((product) => (
            <tr
              key={product._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="p-4">
                <img
                  src={product.imageCover}
                  className="w-16 h-16 object-cover"
                  alt={product.title}
                />
              </td>
              <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">
                {product.title}
              </td>
              <td className="px-4 py-4"></td>
              <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">
                {product.price} EGP
              </td>
              <td className="px-4 py-4">
                <span onClick={() => handleDelete(product._id)}
                  className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Remove
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
