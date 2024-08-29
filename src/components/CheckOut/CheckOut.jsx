import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { cartContext } from '../CartContext/CartContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function CheckOut() {
  let {cartId}=useParams(); 
  const { CheckOut } = useContext(cartContext);


  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: () => handelCheckout(cartId, 'http://localhost:5173'),
  });

  async function handelCheckout(cartId, url) {
    let response = await CheckOut(cartId, url, formik.values);
   if (response.status === 'success') {
    window.location.href = response.session.url;
    } else {
      alert("Payment Failed");
    }
    
  }

  return (
    <>
      <div className="py-6 max-w-xl mx-auto relative">
        <h2 className="text-4xl flex text-green-700 font-mono font-bold mb-6">Login Now</h2>
        
        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.details}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id="details"
              type="text"
              name="details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              htmlFor="details"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
            >
              Enter your details:
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id="phone"
              type="tel"
              name="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              htmlFor="phone"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
            >
              Enter your phone:
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.city}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id="city"
              type="text"
              name="city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              htmlFor="city"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
            >
              Enter your city:
            </label>
          </div>

          <div className="flex justify-center gap-4 items-center">
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
