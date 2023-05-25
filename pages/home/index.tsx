import React, { useState, useEffect } from "react";
import { useMovies } from "../../providers/movies";
import Layout from "../../components/Layout";
import styles from "./style.module.css";
import router from "next/router";
import { IMovie } from "../../providers/movies/context";
import MyCarousel from "../../components/Carousel";
import { Button } from "antd";
import { StarOutlined, DeleteOutlined, HeartOutlined } from "@ant-design/icons";
export const HomeMovies = () => {
  const {
    getMovies,
    MoviesGotten,
    fetchMovie,
    searchMovie,
    isDefault,
    WatchList,
    removeFromList,
    addToList,
  } = useMovies();

  const [movieState, setMoviesState] = useState({} as IMovie);
  const [watchlist, setWatchlist] = useState<IMovie[]>([]);

  const topMovies = MoviesGotten.sort((a, b) => b.rating - a.rating);

  getMovies();

  const addToWatchlist = (movie: IMovie) => {
    addToList({ ...movie });
      if (!watchlist.includes(movie)) {
        setWatchlist((prevWatchlist) => {
          const newWatchlist = [...prevWatchlist, movie];
          localStorage.setItem("watchlist", JSON.stringify(newWatchlist));      
          return newWatchlist;
        });

  }};

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
                    {WatchList.some((p) => p.id === movie.id) ? (
                      <Button
                        className={styles.watchlist}
                        danger
                        onClick={() => removeFromList(movie)}
                      >
                        <DeleteOutlined />
                      </Button>
                    ) : (
                      <HeartOutlined  style={{ fontSize: '25px' }} className={styles.watchlist}
                        onClick={() => addToWatchlist(movie)} />
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

export default HomeMovies;
