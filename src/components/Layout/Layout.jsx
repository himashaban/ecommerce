import React,{useEffect,useState} from 'react'
import Navbar from '../Navbar/Navbar'

import  Footer  from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {

useEffect(() => {}, [])
const [first, setfirst] = useState(0)



  return<>
  
 <Navbar/>
 <div className='mt-11 m-0'>
  <Outlet></Outlet>
 </div>
 
 <Footer/>

 
  </>
}