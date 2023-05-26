import React, { useContext, useEffect, useState } from "react";
import { useMovies } from "../../providers/movies";
import Layout from "../../components/Layout";
import styles from "./style.module.css";
import router, { useRouter } from "next/router";
import { IMovie, MovieContext } from "../../providers/movies/context";
import Link from "next/link";
import { DeleteOutlined,DeleteFilled } from "@ant-design/icons";
import { Button } from "antd";

export const HomeMovies = () => {
  //const { currentUser } = useUser();
  const { push } = useRouter();
  const {getAllFromList, MoviesFromWatchList, removeFromList, MovieDeletedFromWatchList} = useMovies();


  useEffect(() => {
    getAllFromList();
  }, [MovieDeletedFromWatchList])

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
              {/* <DeleteFilled
                onClick={() => handleClear(MoviesFromWatchList)}
                style={{ fontSize: "25px", marginLeft: "40px", color: "red" }}
              /> */}
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
                    <h5>{movie.duration} 
                         <DeleteFilled
                         className={styles.watchlist}
                         onClick={() => removeFromListClick(movie.id)}
                       />
                        </h5>
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
