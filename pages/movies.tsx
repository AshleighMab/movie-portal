import React, { useEffect } from "react";
import { useMovies } from '../providers/movies';

function CarouselGrid() {
  const { getMovie, MovieGotten } = useMovies();

  getMovie();

  if (!MovieGotten) {
    return <h1>Loading</h1>;
  }
  const theMovies = {MovieGotten}

  console.log("Movie Gotten:", theMovies.MovieGotten)

  return (

    <div >
      <h1>HELLO</h1>
      <div >
        {MovieGotten.map((movie, index) => (
          <div key={index}> 
            <div >
              <h1 >{movie.title}</h1>
              <p>{movie.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}

export default CarouselGrid;