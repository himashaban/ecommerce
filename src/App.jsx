import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {  createHashRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import Layout from './components/Layout/Layout'
import Login from './components/Login/Login'
import Cart from  './components/Cart/Cart'
import Brands from  './components/Brands/Brands'
import '@fortawesome/fontawesome-free/css/all.min.css'
import UserContextProvider from './context/UserContext'
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Notfound from './components/Notfound/Notfound'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './components/CartContext/CartContext'
import   { Toaster } from 'react-hot-toast';
import CheckOut from './components/CheckOut/CheckOut'
import Orders from './components/Orders/Orders'
import Wishlist from './components/Wishlist/Wishlist'
import WishlistContextProvider from './components/WishlistContext/WishlistContext'
import SelectedDetails from './components/SelectedDetails/SelectedDetails'



let query=new QueryClient();




let router = createHashRouter([
  {path: '',element: <Layout />,
    children: [
      { index:true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: '/register', element: <Register /> },
      { path: '/products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: '/login', element: <Login /> },
      { path: '/cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: '/categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: '/brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: '/checkout/:cartId', element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
      { path: '/allorders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: '/wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: '/productdetails/:id/:category', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: '/selecteddetails/:selectedid', element: <ProtectedRoute><SelectedDetails /></ProtectedRoute> },
      { path: '*', element:<Notfound /> }
    ]
  }
]);
 


function App() {
  

  
  
  return<QueryClientProvider client={query}>
    <UserContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
    <RouterProvider router={router}></RouterProvider>
     <ReactQueryDevtools/>
     <Toaster/>
     </WishlistContextProvider>
       </CartContextProvider>
  </UserContextProvider>
  </QueryClientProvider>
  
  
  
   
}

export default App
