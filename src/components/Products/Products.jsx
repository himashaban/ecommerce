import React,{useEffect,useState} from 'react'

import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {ClimbingBoxLoader} from 'react-spinners'

export default function products() {

// useEffect(() => {}, [])
// const [recentProducts,setRecentProducts] = useState([])
 function getRecent(){


    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
   
}

let {data,isLoading,isError,error}=useQuery({
  queryKey:['recentProducts'],
  queryFn:getRecent,
  refetchOnWindowFocus:true
})





console.log(data);

//  axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
//  .then(({data})=>{
// setRecentProducts(data.data)    
 
//  }).catch((error)=>{
// console.log(error);

//  })


// useEffect(() => {
//   getRecent();
// }, []);

if(isLoading){
  return <div className="flex py-8 w-full justify-center">
    <ClimbingBoxLoader color='red'/>
  </div>
}
if(isError){
  return <div className="flex py-8 w-full justify-center">
    <h3>{error}</h3>
  </div>
}


  return <>
  <div className="row">
    {data?.data.data.map((product)=><div key={product.id} className="w-1/6 px-2">
    <div className="product p-4">
     <Link to={`/productdetails/${product.id}/${product.category.name}`}>
     <img className='w-full' src={product.imageCover} alt={product.title} />
     <span className='block  text-green-600'>{product.category.name}</span>
     <h3 className='text-lg font-normal text-gray-600 mb-4'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
     <div className="flex justify-between items-center">
      <span>{product.price}EGP</span>
      <span>{product.ratingsAverage}<i className='fa fa-star text-yellow-500'></i></span>
     </div>
     <button className='btn'> add to cart</button>
     </Link>
    </div>
    
    </div>
    
   )}

 </div>
 </>
}