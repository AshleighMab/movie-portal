import React, { useEffect, useState } from "react";
import { useMovies } from "../../providers/movies";
import Layout from "../../components/Layout";
import styles from "./style.module.css";

function CarouselGrid() {
  const { getMovie, MovieGotten } = useMovies();
  const [mainMovie, setMainMovie] = useState(null);

    getMovie();
  

  useEffect(() => {
    if (MovieGotten && MovieGotten.length > 0) {
      const randomIndex = Math.floor(Math.random() * MovieGotten.length);
      setMainMovie(MovieGotten[randomIndex]);
    }
  }, [MovieGotten]);

  if (!MovieGotten || !mainMovie) {
    return <h1>Loading</h1>;
  }

  const otherMovies = MovieGotten.filter((movie) => movie !== mainMovie);
  console.log("Image::", MovieGotten[3].image )

  return (
    <Layout>
<div className={styles.container}>
  <div className={styles.mainMovie}>
    <h1 className={styles.title}>{mainMovie.title}</h1>
    <p className={styles.duration}>{mainMovie.duration}</p>
  </div>
  <div className={styles.scrollableContainer}>
    {otherMovies.map((movie, index) => (
      <div className={styles.item} key={index}>
        <img src={movie.image} className={styles.image} />
      
        <div className={styles.details}>
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
