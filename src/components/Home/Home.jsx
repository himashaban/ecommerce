import React,{useContext, useEffect,useState} from 'react'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../mainSlider/mainSlider'

export default function Home() {

useEffect(() => {}, [])
// let {Counter , ChangeCounter}=useContext(CounterContext)



  return <>
  <MainSlider/>
  <CategorySlider/>
  <RecentProducts/>
 
  </>
}