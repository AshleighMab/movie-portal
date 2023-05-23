import React, { useEffect } from "react";
import { useGet } from "restful-react";
import { useUsers } from "../../providers/users";


const UserInf = () => {
  const { getUserInfo } = useUsers();

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails'); 
   
console.log("MY USER::", userDetails) 
  }, []);

  return (
    <div>
      <h1>This is the profile page</h1>
    </div>
  );
};

export default UserInf;

function getUserIdFromToken(token: string) {
  throw new Error("Function not implemented.");
}
  