import React, {  useContext } from "react";
import { useMovies } from "../../providers/movies";
import Layout from "../../components/Layout";
import styles from "./style.module.css";
import router, { useRouter } from "next/router";
import { MovieContext } from "../../providers/movies/context";
import Link from "next/link";

export const HomeMovies = () => {
  const { WatchList } = useContext(MovieContext);
  const { clearList } = useMovies();
  //const { currentUser } = useUser();
  const { push } = useRouter();

  const handleClear = () => {
    clearList();
  };

  const { MoviesGotten } = useMovies();

  console.log("watchlist", WatchList);

  const handleMovieClick = (movieid) => {
    router.push(`/movie/${movieid.id}`);
  };

  console.log("This is movies::", MoviesGotten);

  return (
    <Layout>
      <div className={styles.noList}>
        {WatchList?.length === 0 ? (
          <div className={styles.noList}>
            <p>Your watchlist is currently empty</p>

            <Link href="/movies">
              <button className={styles.startShopping}>
                See available movies
              </button>
            </Link>
          </div>
        ) : (
          <>
            <h2>Watch List</h2>

            <div className={styles.container}>
              {WatchList?.map((movie) => (
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
                  </div>
                </div>
              ))}

              <div className={styles.container}>
                <button
                  className={styles.clearBtn}
                  onClick={() => handleClear()}
                >
                  Clear List
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default HomeMovies;
