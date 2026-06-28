import React, { useContext } from 'react'
import style from './AllOrders.module.css'
import { jwtDecode } from "jwt-decode";
import { UserContext } from '../../Context/UserContext'


export default function AllOrders() {

  const { userToken } = useContext(UserContext);

  let decoded = null;

  if (userToken) {
    decoded = jwtDecode(userToken);
    console.log(decoded);
  }

  return <>
    <h2>AllOrders</h2>
  </>
}
