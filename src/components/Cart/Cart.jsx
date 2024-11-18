import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../CartContext/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  let { GetLoggedUserCart,updateProductToCart,deleteProductCart,setCart } = useContext(cartContext);

  async function getCarts() {
    let response = await GetLoggedUserCart();
    console.log(response.data);
    setCartDetails(response.data); 
  }
   async function updateCart(productId,count) {
    let response = await updateProductToCart(productId,count);
    // console.log(response.data);
    setCartDetails(response.data);
    setCart(response.data) 
  }
   async function deleteCarts(productId) {
    let response = await deleteProductCart(productId);
    console.log(response.data);
    setCartDetails(response.data); 
  }

  useEffect(() => {
    getCarts();
  }, []);



  // const handleQuantityChange = (productId, newCount) => {
  //   setCartDetails((prevCartDetails) => {
  //     return {
  //       ...prevCartDetails,
  //       products: prevCartDetails.products.map((product) =>
  //         product.product.id === productId
  //           ? { ...product, count: newCount }
  //           : product
  //       ),
  //     };
  //   });
  // };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <h2 className="text-xl font-semibold text-center text-green-700">Shopping Cart</h2>
      <h3 className="text-xl font-semibold text-center text-green-700">
        Total Price: {cartDetails?.totalCartPrice} EGP
      </h3>
      <table className="w-full my-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">Product</th>
            <th scope="col" className="px-6 py-3">Qty</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartDetails?.products?.map((product) => (
            <tr
              key={product.product.id}
              className="bg-white  dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="p-4">
                <img
                  src={product.product.imageCover}
                  className="w-16 md:w-32 max-w-full max-h-full"
                  alt={product.product.title}
                />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {product.product.title}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <button
                    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                    onClick={() => updateCart(product.product.id, product.count - 1)}
                    disabled={product.count <= 1}
                  >
                    <span className="sr-only">Decrease quantity</span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <div>
                    <span>{product.count}</span>
                  </div>
                  <button
                    className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                    onClick={() => updateCart(product.product.id, product.count + 1)}
                  >
                    <span className="sr-only">Increase quantity</span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {product.price} EGP
              </td>
              <td className="px-6 py-4">
                <span onClick={()=>deleteCarts(product.product.id)}
                   
                  className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Remove
                </span>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
      <Link to={"/CheckOut"}>
      <button  className='btn w-full bg-green-800 text-white rounded-full hover:bg-green-900'> CheckOut</button>
      </Link>
    </div>
  );
}
