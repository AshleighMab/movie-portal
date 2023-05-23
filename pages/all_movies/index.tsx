import React, { useState, useEffect, ChangeEvent } from "react";
import { useMovies } from "../../providers/movies";
import Layout from "../../components/Layout";
import styles from "./style.module.css";
import router from "next/router";
import { IMovie } from "../../providers/movies/context";


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

    getMovies();
  
  const addToWatchlist = (movie: IMovie) => {
    addToList({ ...movie });
  };

  console.log("MovieState::", movieState);

  const handleMovieClick = (movieid) => {
    router.push(`/movie/${movieid.id}`);
  };
  const searchMovieHandle = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    if (search) {
      searchMovie(search);
    }
  };

  const searchFilterHandle = (event: ChangeEvent<HTMLSelectElement>) => {
    const search = event.target.value;
    if (search) {
      searchMovie(search);
    }
  };
  console.log("This is my WL",WatchList)
  return (
    <Layout>
      <div className={styles.maincontainer}>
<div className={styles.filters}>
      <input
            className={styles.search}
            type="text"
            id="search"
            placeholder="    Search for movies"
            name="search"
            prefix="{<SearchOutlined />}"
            onChange={searchMovieHandle}
          />
          <select
            className={styles.filter}
            id="filter"
            name="category"
            onChange={searchFilterHandle}
          >
            <option value=" ">Filter</option>
            <option value="action">Action</option>
            <option value="romance">Romance</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
            <option value="musical">Musical</option>
            <option value="thriller">Thriller</option>
          </select>
          </div>
        <div className={styles.container}>
            
          {MoviesGotten?.map((movie) => (
            <>
              <div
                title={movie.title}
                key={movie.id}
                className={styles.homecard}
              >
                <h3 className={styles.title}>{movie.title}</h3>
                <div
                  className={styles.pic}
                  onClick={() => handleMovieClick(movie)}
                >
                  <img src={movie.image} alt="" className={styles.image} />
                </div>
                <div className={styles.cardinfo}>
                  <h5>{movie.duration}</h5>

                  {/* {WatchList.some((p) => p.id === movie.id) ? (
                    <Button danger onClick={() => removeFromList(movie)}>
                      Remove from Watchlist
                    </Button>
                  ) : (
                    <Button
                      className={styles.addbtn}
                      onClick={() => addToWatchlist(movie)}
                    >
                      Add To Watchlist
                    </Button>
                  )} */}
                </div>
              </div>
            </>
          ))}
        </div>

        {/* <h1 className={styles.headingcontainer}>Recommended</h1>
        <div className={styles.container}>
          {MoviesGotten?.map(
            (movie, index) =>
              index < 5 && (
                <>
                  <div
                    title={movie.title}
                    key={movie.id}
                    className={styles.homecard}
                  >
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
              )
          )} */}
        {/* </div> */}
      </div>
    </Layout>
  );

};

export default HomeMovies;
