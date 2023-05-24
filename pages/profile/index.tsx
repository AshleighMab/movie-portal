import React, { useEffect, useState } from "react";
import style from '../../pages/profile/style.module.css';
import Layout  from '../../components/Layout';


const UserInf = () => {
  const [person, setPerson] = useState(null)
 
 
  useEffect(() => {
    const userDetails = typeof window !== 'undefined' && localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : null; 
    setPerson(userDetails)
    console.log("MY USER is::", userDetails) 

  }, []);

  if (!person) {
    return null
  }
  
  return (
    <Layout>
    <div className={style.container}>
    <div className={style.profileinfo}>
      {/* <h1>MY PROFILE  </h1> */}
      <h2>Full Name:{person ? person.name: null} {person ? person.surname: null}</h2>
      <p>Gender: {person ? person.genderName: null}</p>
      <p>Cellphone: {person ? person.phoneNumber: null}</p>
      <p>Email: {person ? person.emailAddress: null}</p>
      
    </div>
  </div>
  </Layout>
  );
};

export default UserInf;


  