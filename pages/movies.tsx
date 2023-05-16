import React from "react";
import { useGet } from "restful-react";

const Movies = () => {
  const { data: MyMovies} = useGet({
    path: "/Movie/GetAll",
  });
  if(!MyMovies){
    return <h1>Loading</h1>
  }
  const movies = {
    MyMovies
  }
  
console.log('movies::', movies.MyMovies.result)

  return (
    <div>
        <h1>Movie Title:  {movies.MyMovies.result[3].title}</h1>
    </div>
  );
};

export default Movies;
