import { useRouter } from "next/router";
import { useMovies } from "../../providers/movies";
import style from "./style.module.css";
import Layout from "../../components/Layout";
import {
  PlayCircleOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { IMovie } from "../../providers/movies/context";
import { notification } from "antd";

const Movie: React.FC = () => {
  const { MovieFetched, MoviesGotten, rateMovie } = useMovies();
  const [movieState, setMoviesState] = useState({} as IMovie);
  const router = useRouter();
  const { id } = router.query;
  const [rate, setRating] = useState(0);
  const [rated, setRated] = useState(false);
  const [thumbsUpRated, setThumbsUpRated] = useState(false);
  const [thumbsDownRated, setThumbsDownRated] = useState(false);

  const foundMovie = MoviesGotten.find((movie) => movie.id === id);

  console.log("MyID::", id);

  const handleMovieClick = (movieid) => {
    router.push(`/play_movie/${movieid}`);
  };

  const handleNewRating = (newRating) => {
    if (rated) {
      return;
    }
    setRating(newRating);
    setRated(true);

    const x: IMovie = {
      id: foundMovie.id,
      title: "",
      duration: "",
      category: "",
      starring: "",
      description: "",
      image: "",
      link: "",
      trailer: " ",
      rating: newRating,
    };
    rateMovie(x);
    console.log(`${foundMovie.title} rated:::`, newRating);
    notification.success({
      message: "Success",
      description: `You have rated "${foundMovie.title}" ${
        newRating === 1 ? "thumbs up" : "thumbs down"
      }.`,
    });

    if (newRating === 1) {
      setThumbsUpRated(true);
    } else if (newRating === -1) {
      setThumbsDownRated(true);
    }
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
                  color: thumbsUpRated ? "green" : "white",
                }}
                onClick={() => handleNewRating(1)}
              />
              <DislikeOutlined
                style={{
                  paddingRight: "20px",
                  color: thumbsDownRated ? "red" : "white",
                }}
                onClick={() => handleNewRating(-1)}
              />
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
