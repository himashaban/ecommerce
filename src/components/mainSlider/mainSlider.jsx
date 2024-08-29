import React,{useEffect,useState} from 'react'

import mainslider1 from '../../assets/images/mainSlider1.jpg'
import mainslider2 from '../../assets/images/mainSlider2.jpg'
import mainslider3 from '../../assets/images/mainSlider3.png'
import mainslider4 from '../../assets/images/mainSlider4.png'
import Slider from 'react-slick'
export default function MainSlider() {

useEffect(() => {}, [])
const [first, setfirst] = useState(0)

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false
  };

  return <>
  

<div className="row">
  <div className="w-3/4">
  <Slider {...settings}>
     <img className= 'h-[400px] w-full' src={mainslider4} alt="electric appliances" />
     <img className= 'h-[400px] w-full' src={mainslider1} alt="" />
     <img className= 'h-[400px] w-full' src={mainslider1} alt="" />
        
      </Slider>
  
  </div>
  <div className="w-1/4">
  <img className='h-[200px] ' src={mainslider2} alt="" />
  <img className='h-[200px]' src={mainslider3} alt="" />
  
  </div>
</div>
  </>
}