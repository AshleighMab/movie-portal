import React, { useState } from "react";
import { useMovies } from "../../providers/movies";
import Layout from "../../components/Layout";
import styles from "./style.module.css";
import router from "next/router";
import { IMovie } from "../../providers/movies/context";
 import MyCarousel from "../../components/Carousel";


export const HomeMovies = () => {
  const { getMovies, MoviesGotten, fetchedMovie, searchMovie,isDefault } = useMovies();
  const [movieState, setMoviesState] = useState({} as IMovie);

  getMovies();

  console.log("MovieState::", movieState);

  const handleMovieClick = (movieid) => {
    router.push(`/movie/${movieid.id}`);
  };

  console.log("This is movies::", MoviesGotten);
  
  return (
    <Layout>

{isDefault && < MyCarousel/>}

    <div>

      <div className={styles.container}>
    
        {MoviesGotten?.map((movie) => (
          <>
          
            <div title={movie.title} key={movie.id} className={styles.homecard}>
            <h3 className={styles.title}>{movie.title}</h3>
              <div
                className={styles.pic}
                onClick={() => handleMovieClick(movie)}
              >
                <img
                  src={movie.image}
                  alt=""
                  className={styles.image}
                  width={110}
                  height={150}
                />
              </div>
              <div className={styles.cardinfo}>
                
                <h5>{movie.duration}</h5>
               
              </div>
            </div>
          </>
        ))}
      </div>

      <h1 className={styles.headingcontainer}>Recommended</h1>
      <div className={styles.container}>
   
      {MoviesGotten?.map((movie, index) => (
  index < 5 && (
    <>
      <div title={movie.title} key={movie.id} className={styles.homecard}>
        <h3 className={styles.title}>{movie.title}</h3>
        <div className={styles.pic} onClick={() => handleMovieClick(movie)}>
          <img
            src={movie.image}
            alt=""
            className={styles.image}
            width={110}
            height={150}
          />
        </div>
        <div className={styles.cardinfo}>
          <h5>{movie.duration}</h5>
        </div>
      </div>
    </>
  )
))}
      </div>
      
      </div>
      
    </Layout>
  );
};

export default HomeMovies;
