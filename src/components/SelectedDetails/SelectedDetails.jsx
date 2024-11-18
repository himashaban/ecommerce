import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function SelectedDetails() {
  let { selectedid } = useParams(); // Getting the 'selectedid' from the URL parameters

  const [selected, setSelected] = useState(null); // State to store selected data

  // Function to fetch the selected branch data
  function getSelectedBranch(selectedid) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${selectedid}`)
      .then(({ data }) => {
        setSelected(data.data); // Set the fetched data to state
        console.log('Selected branch fetched:', selected); // Log the fetched data for debugging purposes
      })
      .catch((error) => {
        console.error('Error fetching the selected branch:', error);
      });
  }

  // Call the function when the component mounts or when 'selectedid' changes
  useEffect(() => {
    if (selectedid) {
      getSelectedBranch(selectedid); // Fetch the selected branch when there's a valid selectedid
    }
  }, [selectedid]);

  return (
    <>
      <h1>Selected Details</h1>
      {selected ? (
        <div>
          <img src={selected.image} alt="" />
          <h2>{selected.name}</h2>
          <p>{selected.description}</p>
          {/* Display more details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
