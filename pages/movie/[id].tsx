import { useRouter } from "next/router";
import { useMovies } from "../../providers/movies";
import { IMovie } from "../../providers/movies/context";
import style from "./style.module.css";
import Layout from "../../components/Layout";
import {
  PlayCircleOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";

const Movie: React.FC = () => {
  const { MovieFetched, MoviesGotten } = useMovies();
  const router = useRouter();
  const { id } = router.query;

  console.log("MyID::", id);

  const foundMovie = MoviesGotten.find((movie) => movie.id === id);

  const handleMovieClick = (movieid) => {
    router.push(`/users/${movieid}`);
  };

  const extractYouTubeVideoId = (url) => {
    if (url) {
      const trailerId = url.replace("https://youtu.be/", "");
      return trailerId;
    }
    return null;
  };

  const trailerId = extractYouTubeVideoId(foundMovie.link);

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
            <h1><img
                src={foundMovie?.image}
                alt=""
                className={style.image}
                width={100}
                height={110}
              /> {" "}{" "}
              {foundMovie?.title}
              
            </h1>
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
              width={700}
              height={400}
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Movie;
