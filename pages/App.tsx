import React from "react";
import { useGet } from "restful-react";

const MyComponent = () => {
  const { data: MyMovies} = useGet({
    path: "/Movie/GetAll",
  });

  const movies = {
    MyMovies
  }

console.log('movies::', movies.MyMovies.result)

const { data:Mypeople} = useGet({
      path: "/Person/GetAll",
    });
    
  const person = {
    Mypeople
  }
  
  console.log('Person::', person.Mypeople.result)

  return (
    <div>
        <h1>Movie Title:  {movies.MyMovies.result[3].title}</h1>
            <h1>Person Name:  {person.Mypeople.result[2].name}</h1>


    </div>
  );
};

export default MyComponent;
