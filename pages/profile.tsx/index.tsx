import React from "react";
import { useGet } from "restful-react";


const People = () => {
    
  const { data:Mypeople} = useGet({
        path: "/Person/GetAll",
      });
      

    if(!Mypeople){
      return <h1>Loading</h1>
    } 
    const person = {
      Mypeople
    }
  
    console.log('Person::', person.Mypeople.result)
  
    return (
      <div>
              <h1>Person Name:  {person.Mypeople.result[2].name}</h1>
      </div>
    );
  };
  
  export default People;
  