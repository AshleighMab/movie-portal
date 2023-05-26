import React, { useContext, useEffect, useState } from "react";
import { useMovies } from "../../providers/movies";
import Layout from "../../components/Layout";
import styles from "./style.module.css";
import router, { useRouter } from "next/router";
import { IMovie, MovieContext } from "../../providers/movies/context";
import Link from "next/link";
import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const HomeMovies = () => {
  //const { currentUser } = useUser();
  const { push } = useRouter();
  const [watchlist, setWatchlist] = useState([]);
  const {getAllFromList, MoviesFromWatchList, removeFromList, MovieDeletedFromWatchList} = useMovies();

  const [remove, setRemove] = useState('');

  useEffect(() => {
    getAllFromList();
  }, [MoviesFromWatchList])

  const removeFromListClick =(movieid: string) => {

    removeFromList(movieid);
  
  }


  const handleClear = (movie: IMovie) => {
    push("/home");
  };


  const handleMovieClick = (movieid) => {
    router.push(`/movie/${movieid.id}`);
  };

  return (
    <Layout>
      <div className={styles.noList}>
        {MoviesFromWatchList?.length === 0 ? (
          <div className={styles.noMovies}>
            <p>Your watchlist is currently empty</p>

            <button>
              <a href="/all_movies" className={styles.view}>
                {" "}
              </a>
              See available movies
            </button>
          </div>
        ) : (
          <>
            <h2 className={styles.heading}>
              Watch List{" "}
              <DeleteOutlined
                onClick={() => handleClear(MoviesFromWatchList)}
                style={{ fontSize: "25px", marginLeft: "40px", color: "red" }}
              />
            </h2>

            <div className={styles.container}>
              {MoviesFromWatchList?.map((movie) => (
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
                    <h5>{movie.duration} <Button
                        className={styles.watchlist}
                        danger
                        onClick={() => removeFromListClick(movie.id)}
                      >
                        <DeleteOutlined />
                      </Button></h5>
                   
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default HomeMovies;
