import { useRouter } from "next/router";
import { useMovies } from "../../providers/movies";
import style from "./style.module.css";
import Layout from "../../components/Layout";
import {
  PlayCircleOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { IMovie } from "../../providers/movies/context";

const Movie: React.FC = () => {
  const { MovieFetched, MoviesGotten } = useMovies();
  const [movieState, setMoviesState] = useState({} as IMovie);
  const router = useRouter();
  const { id } = router.query;

  const foundMovie = MoviesGotten.find((movie) => movie.id === id);
  
  console.log("MyID::", id);

  const handleMovieClick = (movieid) => {
    router.push(`/playmovie/${movieid}`);
  };

  const extractYouTubeVideoId = (url) => {
    if (url) {
      const trailerId = url.replace("https://youtu.be/", "");
      return trailerId;
    }
    return null;
  };

  const trailerId = extractYouTubeVideoId(foundMovie.trailer);

  return (
    <Layout>
      <div
        className={style.mainContainer}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url(${foundMovie?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
        }}
      >
        <div className={style.container}>
          <div className={style.divLeft}>
            <div className={style.Imagecontainer}>
              <img
                src={foundMovie?.image}
                alt=""
                className={style.image}
                width={100}
                height={120}
              />
              <h1 className={style.title}>{foundMovie?.title}</h1>
            </div>

            <p style={{ marginBottom: "40px" }}>{foundMovie?.description}</p>
            <p>
              <b>Category: </b>
              {foundMovie?.category}
            </p>
            <p>
              <b>Duration: </b>
              {foundMovie?.duration}
            </p>
            <p>
              <b>Starring: </b>
              {foundMovie?.starring}
            </p>
            <div>
              <button
                className={style.button}
                onClick={() => handleMovieClick(foundMovie.id)}
              >
                <PlayCircleOutlined /> Watch Movie
              </button>
              <LikeOutlined
                style={{
                  paddingRight: "20px",
                  marginTop: "20px",
                  paddingLeft: "20px",
                }}
              />
              <DislikeOutlined style={{ paddingRight: "20px" }} />
            </div>
          </div>

          <div className={style.divRight}>
            <iframe
              src={trailerId}
              allowFullScreen
              width={750}
              height={400}
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Movie;
