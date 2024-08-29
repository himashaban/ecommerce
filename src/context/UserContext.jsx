import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [userLogin, setuserLogin] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
//   let navigate=useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('userToken')!==null){
        setuserLogin(localStorage.getItem('userToken'))
    }
  },[])

  function showLoading() {
    setLoading(true);
  }

  function hideLoading() {
    setLoading(false);
  }

  return (
    <UserContext.Provider value={{ userLogin, setuserLogin, loading, showLoading, hideLoading }}>
      {loading && <div className="loader"></div>} {/* Display loader when loading */}
      {props.children}
    </UserContext.Provider>
  );
}
