import React,{useEffect,useState} from 'react'
import style from './Notfound.module.css'
import { Link } from 'react-router-dom'

export default function Notfound() {

useEffect(() => {}, [])
const [first, setfirst] = useState(0)
let color=style.com;

  return <>
  <div className="flex items-center justify-center h-screen bg-gray-100">  
      <div className="text-center">  
        <h1 className="text-6xl font-bold text-red-500">404</h1>  
        <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>  
        <p className="mt-2 text-gray-600">Sorry, the page you are looking for does not exist.</p>  
        <Link to={''}>
          <button  
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"  
        >  
          Go to Home  
        </button>
        </Link>
      </div>  
    </div>  
  </>
}