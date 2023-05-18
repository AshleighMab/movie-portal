import React, { useEffect, useState } from "react";
import { useMovies } from "../../providers/movies";
import Layout from "../../components/Layout";
import styles from "./style.module.css";
import router from "next/router";

function CarouselGrid() {
  const { getMovies, MoviesGotten } = useMovies();
  const [mainMovie, setMainMovie] = useState(null);

    getMovies();
  

  useEffect(() => {
    if (MoviesGotten && MoviesGotten.length > 0) {
      const randomIndex = Math.floor(Math.random() * MoviesGotten.length);
      setMainMovie(MoviesGotten[randomIndex]);
    }
  }, [MoviesGotten]);

  if (!MoviesGotten || !mainMovie) {
    return <h1>Loading</h1>;
  }

  const handleMovieClick = (movieId) => {
    router.push(`/viewmovie?id=${movieId}`);
  };
  
  const otherMovies = MoviesGotten.filter((movie) => movie !== mainMovie);
  console.log("Image::", MoviesGotten[3].image )

  return (
    <Layout>
<div className={styles.container}>
<div className={styles.mainMovie}>

            <h1 className={styles.title}>{mainMovie.title}</h1>
            <video src={mainMovie.link} className={styles.image} controls />
            <p className={styles.duration}>{mainMovie.duration}</p>
          </div>
          <div className={styles.scrollableContainer}>
            {otherMovies.map((movie, index) => (
              <div
                className={styles.item}
                key={index}
                onClick={() => handleMovieClick(movie.id)}
              >
              {/* <video src={movie.link} className={styles.image} controls /> */}
                <div className={styles.details}>
                <img src={movie.image} className={styles.image} />
                  <h1 className={styles.title}>{movie.title}</h1>
                  <p className={styles.duration}>{movie.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
     
    </Layout>
  );
}

export default CarouselGrid;