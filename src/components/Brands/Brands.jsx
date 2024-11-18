import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';


export default function Brands() {

  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    
    
    
  }

  let { isError, error, isLoading, data } = useQuery({
    queryKey: 'getBrands',
    queryFn: getBrands
  });

  if (isLoading) {
    return (
      <div className="loader-container">
        <CircleLoader color='green' />
      </div>
    );
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
  <>
    <div className="row">
      {data?.data?.data.map(brand => (
        <Link to={`/selecteddetails/${brand._id}`} key={brand._id}> 
          <div className="w-1/4"> 
            <img src={brand.image} alt={brand.name} />
            <h5>{brand.name}</h5>
          </div>
        </Link>
      ))}
    </div>

    
  </>
);

}
