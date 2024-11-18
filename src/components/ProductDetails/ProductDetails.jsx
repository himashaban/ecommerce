import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";


export default function ProductDetails() {


let {id,category}=useParams();
 const [productDetails,setProductDetails]=useState(null);
 const [relatedProducts,setRelatedProducts]=useState([]);
 var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

function getProductDetails(id){
  



axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
.then(({data})=>{
setProductDetails(data.data);



})
.catch(()=>{

})


}



function getRelatedProducts(category){
axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
.then(({data})=>{
  let allproducts=data.data;
  let related=allproducts.filter((product)=>product.category.name==category)
  console.log(related);
  

  setRelatedProducts(related);
})
.catch((error)=>{
  console.log(error);
  
})
}
useEffect(()=>{
getProductDetails(id);
getRelatedProducts(category);
},[id,category]);

  return <>
  <div className="row">
    <div className="w-1/4">
    <Slider {...settings}>
   {productDetails?.images.map((src)=><img className='w-full' src={productDetails?.imageCover} alt={productDetails?.title} />
)}
    </Slider>
    </div>
    <div className="w-3/4 p-6"> 
    <h1 className='text-lg font-semibold text-gray-700'>{productDetails?.title}</h1>
    <p className='text-gray-600 mt-4  font-light '>{productDetails?.description}</p>
     <div className="flex my-4 justify-between items-center">
      <span>{productDetails?.price}EGP</span>
      <span>{productDetails?.ratingsAverage}<i className='fa fa-star text-yellow-500'></i></span>
     </div>
     <button className='btn'> add to cart</button>
    </div>
    </div>


    <div className="row">
      {relatedProducts.map((product)=> 
      <div key={product.id} className="w-1/6">
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