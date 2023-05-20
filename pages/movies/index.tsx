import React, {useState } from "react";
import { useMovies } from "../../providers/movies";
import Layout from "../../components/Layout";
import styles from "./style.module.css";
import router from "next/router";
import { Card, Col, Row } from "antd";
import { IMovie } from "../../providers/movies/context";


export const HomeMovies=() => {

  const { getMovies, MoviesGotten, fetchedMovie,  searchMovie } = useMovies();
  const[movieState, setMoviesState] = useState({} as IMovie);
 
  getMovies();

console.log("MovieState::", movieState)

  const handleMovieClick = (movieid) => { 
    router.push(`/movie/${movieid.id}`);
  };


  console.log("This is movies::", MoviesGotten);
  return (
    <Layout>
    
        <Row gutter={24}>
        {MoviesGotten?.map((movie, index) => (
          <Col span={4}>
          
              <Card title={movie.title} bordered={false}>
                <div
                  className={styles.item}
                  key={index}
                  onClick={() => handleMovieClick(movie)}
                >
                  <div className={styles.details} key={movie.id}>
                    <img src={movie.image} className={styles.image} />
                  </div>
                  <button onClick={() => handleMovieClick(movie)}>
                    View Movie
                  </button>
                </div>
              </Card>
         
          </Col>
             ))}
        </Row>
   
    </Layout>
  );
}


export default HomeMovies;
