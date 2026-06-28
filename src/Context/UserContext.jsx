// UserContext.jsx
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {

  const [userToken, setuserToken] = useState(null);
  useEffect(()=>{
    if(localStorage.getItem('usertaken')){
      setuserToken(localStorage.getItem('usertaken'))
    }
  },[])
  return (
    <UserContext.Provider value={{ userToken, setuserToken }}>
      {children}
    </UserContext.Provider>
  );
}
