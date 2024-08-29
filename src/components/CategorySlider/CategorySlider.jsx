import React, { useEffect, useState } from 'react';
import style from './CategorySlider.module.css'; 
import axios from 'axios';
import Slider from 'react-slick'; 

export default function CategorySlider() {
  const [Categorys, setCategorys] = useState([]);

  async function getCategorys() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategorys(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategorys();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay:true,
  };

  return (
    <>
    <div className="py-4 z-1">
      <h2 className='font-medium'>Shop Popular Categories</h2>
 <Slider {...settings}>
        {Categorys.map((category) => (
          <div key={category._id} className='py-5'>
           
            <img className='CategoryImage w-full' src={category.image} alt={category.name} />
            <h3 className='mt-2'>{category.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
     
    </>
  );
}
