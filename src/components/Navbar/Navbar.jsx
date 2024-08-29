import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../context/UserContext';
import { cartContext } from '../CartContext/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let { userLogin, setuserLogin } = useContext(UserContext);
  let{Cart}=useContext(cartContext);
  
  let navigate = useNavigate();

  function Logout() {
    localStorage.removeItem('userToken');
    setuserLogin(null);
    navigate('/login');
  }

  return (
    <> 
      <nav className="navbar bg-gray-500 w-full m-0 dark:bg-gray-800 dark:border-gray-700 z-50">
        <div className="bg-slate-100 fixed top-0 right-0 left-0 flex flex-wrap items-center justify-between w-full p-4">
          <a href="#" className="flex items-center space-x-4">
            <FontAwesomeIcon className="text-green-600 h-[2rem] relative" icon={faCartShopping} />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FreshCart</span>
            <ul className=" flex-wrap items-center space-x-4 hidden md:flex ml-6 ">
              {userLogin !== null && (
                <>
                  <li><NavLink to="/">Home</NavLink></li>
                  <li><NavLink to="products">Products</NavLink></li>
                  <li><NavLink to="categories">Categories</NavLink></li>
                  <li><NavLink to="wishlist">wishlist</NavLink></li>
                  <li><NavLink to="cart">Cart</NavLink></li>
                  <li><NavLink to="brands">Brands</NavLink></li>
                </>
              )}
            </ul>
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-solid-bg"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

          <div className="thirdSec flex items-center space-x-2">
            <div className="relative">
              <NavLink to="cart">
                              <FontAwesomeIcon className="text-slate-700 h-[2rem]" icon={faCartShopping} />

              </NavLink>
              <span className="absolute top-0 right-0 translate-x-1/2 translate-y-[-50%] bg-green-500 text-white text-xs px-1 rounded-full">
                {Cart?.numOfCartItems}
              </span>
            </div>
            
            <ul className="flex gap-3 items-center justify-center">
              {userLogin === null ? (
                <>
                  <li><NavLink to="login">Login</NavLink></li>
                  <li><NavLink to="register">Register</NavLink></li>
                </>
              ) : (
                <li onClick={Logout}><span className="py-1 cursor-pointer">Logout</span></li>
              )}
             <ul className="md:flex gap-3 items-center justify-center hidden">
               <li><NavLink to="#"><i className="fa-brands fa-facebook-f"></i></NavLink></li>
              <li><NavLink to="#"><i className="fa-brands fa-twitter"></i></NavLink></li>
              <li><NavLink to="#"><i className="fa-brands fa-tiktok"></i></NavLink></li>
              <li><NavLink to="#"><i className="fa-brands fa-instagram"></i></NavLink></li>
              <li><NavLink to="#"><i className="fa-brands fa-linkedin"></i></NavLink></li>
              <li><NavLink to="#"><i className="fa-brands fa-youtube"></i></NavLink></li>
             </ul>
            </ul>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu mt-9 md:hidden ${isOpen ? 'max-h-screen opacity-100 ease-out' : 'max-h-0 opacity-0 ease-in'} transition-all duration-700`}>
        <ul className="flex flex-col gap-7 justify-start space-x-4 me-auto">
            {userLogin !== null && (
                <>
                  <li><NavLink to="/">Home</NavLink></li>
                  <li><NavLink to="products">Products</NavLink></li>
                  <li><NavLink to="categories">Categories</NavLink></li>
                  <li><NavLink to="cart">Cart</NavLink></li>
                  <li><NavLink to="wishlist">wishlist</NavLink></li>
                  <li><NavLink to="brands">Brands</NavLink></li>
                </>
              )}
        </ul>
      </div>
    </>
  );
}
