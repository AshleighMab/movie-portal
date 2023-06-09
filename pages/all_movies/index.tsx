import React, { useState, useEffect, ChangeEvent } from "react";
import { useMovies } from "../../providers/movies";
import Layout from "../../components/Layout";
import styles from "./style.module.css";
import router from "next/router";
import { IMovie, IMovieIdDto } from "../../providers/movies/context";
import { HeartOutlined, DeleteFilled} from "@ant-design/icons";

export const HomeMovies = () => {
  const {getMovies,MoviesGotten,searchMovie, removeFromList,
addToList,MoviesFromWatchList, getAllFromList, MovieAddedToWatchList,MovieDeletedFromWatchList
  } = useMovies();
  const [movieState, setMoviesState] = useState({} as IMovie);



  useEffect(() => {
    getMovies();
    getAllFromList()  
  }, [MovieAddedToWatchList,MovieDeletedFromWatchList])

  
  if (!MoviesFromWatchList) {
<></>
  }
  
  const removeFromListClick = (movieid: string) => {
    removeFromList(movieid);
  };

  const addToWatchlistClick = (movie: IMovie) => {
    const x : IMovieIdDto={
      movieId: movie.id
    }
    console.log('movieId::', x)
    addToList(x);

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
  // console.log("This is my WL", WatchList);
  return (
    <Layout>
      <div className={styles.maincontainer}>
        <div className={styles.filters}>
          <input
            className={`${styles.input} ${styles.search}`}
            type="text"
            id="search"
            placeholder="Search for movies"
            name="search"
            prefix="{<SearchOutlined />}"
            onChange={searchMovieHandle}
          />
          <select
            className={`${styles.input} ${styles.filter}`}
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

export default HomeMovies;
