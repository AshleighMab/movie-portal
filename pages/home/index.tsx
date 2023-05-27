import React, { useState, useEffect } from "react";
import { useMovies } from "../../providers/movies";
import Layout from "../../components/Layout";
import styles from "./style.module.css";
import router from "next/router";
import { IMovie, IMovieIdDto } from "../../providers/movies/context";
import MyCarousel from "../../components/Carousel";
import { HeartOutlined, DeleteFilled } from "@ant-design/icons";
import TokenAuth from "../../components/Hoc";
export const HomeMovies = () => {
  const {
    getMovies,
    MoviesGotten,
    MoviesFromWatchList,
    removeFromList,
    addToList,
    getAllFromList,
    MovieDeletedFromWatchList,
    MovieAddedToWatchList,
  } = useMovies();

  const [movieState, setMoviesState] = useState({} as IMovie);


  
  useEffect(() => {
    getMovies();
    getAllFromList();    
    console.log('triggered::')
    console.log('MovieDeletedFromWatchList::', MovieDeletedFromWatchList)
    console.log('MovieAddedToWatchList', MovieAddedToWatchList)
  }, [MovieAddedToWatchList,MovieDeletedFromWatchList]);

  if (!MoviesGotten ) {
    return null;
  }
  if ( !MoviesFromWatchList) {
    return null;
  }

  

  const topMovies = MoviesGotten.sort((a, b) => b.rating - a.rating);

  const removeFromListClick = (movieid: string) => {
    removeFromList(movieid);
  };

  const addToWatchlistClick = (movie: IMovie) => {
    const x: IMovieIdDto = {
      movieId: movie.id,
    };

    addToList(x);
  };

  console.log("MovieState::", movieState);

  const handleMovieClick = (movieid) => {
    router.push(`/movie/${movieid.id}`);
  };

  return (
    <Layout>
      <MyCarousel />

      <div>
        <h1 className={styles.heading}>TOP RATED MOVIES</h1>
        <div className={styles.container}>
          {topMovies.slice(0, 5).map((movie) => (
            <>
              <div
                title={movie.title}
                key={movie.id}
                className={styles.homecard}
              >
                <h3 className={styles.title}>{movie.title} </h3>

                <div
                  className={styles.pic}
                  onClick={() => handleMovieClick(movie)}
                >
                  <img src={movie.image} alt="" className={styles.image} />
                </div>
                <div className={styles.cardinfo}>
                  <h5>
                    {movie.duration}
                    {MoviesFromWatchList.some((p) => p.id === movie.id) ? (
                      <DeleteFilled
                        className={styles.watchlist}
                        onClick={() => removeFromListClick(movie.id)}
                      />
                    ) : (
                      <HeartOutlined
                        className={styles.watchlist}
                        onClick={() => addToWatchlistClick(movie)}
                      />
                    )}
                  </h5>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TokenAuth(HomeMovies);
