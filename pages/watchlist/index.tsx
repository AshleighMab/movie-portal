import React, {  useContext, useEffect, useState} from "react";
import { useMovies } from "../../providers/movies";
import Layout from "../../components/Layout";
import styles from "./style.module.css";
import router, { useRouter } from "next/router";
import { IMovie, MovieContext } from "../../providers/movies/context";
import Link from "next/link";
import { StarOutlined, DeleteOutlined } from "@ant-design/icons";

export const HomeMovies = () => {
  const { WatchList } = useContext(MovieContext);
  const { clearList } = useMovies();
  //const { currentUser } = useUser();
  const { push } = useRouter();
  const [watchlist, setWatchlist] = useState([]);
  
  const handleClear = () => {
    localStorage.removeItem('watchlist');
    setWatchlist([]);
    push('/home'); 
  };


  useEffect(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist)); 
      console.log('my data::',watchlist )
    }
  }, []);

  const { MoviesGotten } = useMovies();

  console.log("watchlist", WatchList);

  const handleMovieClick = (movieid) => {
    router.push(`/movie/${movieid.id}`);
  };

  console.log("This is movies::", MoviesGotten);

  return (
    <Layout>
      <div className={styles.noList}>
        {watchlist?.length === 0 ? (
          <div className={styles.noMovies} >
            <p>Your watchlist is currently empty</p>

           
              <button >
              <Link href="/home" className={styles.view}> </Link>
                See available movies
              </button>
           
          </div>
        ) : (
          <>
            <h2 className={styles.heading} >Watch List  <DeleteOutlined    onClick={() => handleClear()} style={{ fontSize: '25px' , marginLeft:"40px", color:"red"}} /></h2>

            <div className={styles.container}>
              {watchlist?.map((movie) => (
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
