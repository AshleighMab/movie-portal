import { useRouter } from "next/router";
import { useMovies } from "../../providers/movies";
import style from "./style.module.css";
import Layout from "../../components/Layout";

const PlayMovie: React.FC = () => {
  const { MoviesGotten } = useMovies();
  const router = useRouter();
  const { id } = router.query;

  console.log("MyID::", id);

  const foundMovie = MoviesGotten.find((movie) => movie.id === id);
  console.log(foundMovie.title);
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
        }}
      >
      <div className={style.container}>
  <div className={style.titleContainer}>
    <h1>{foundMovie?.title}</h1>
  </div>
  <div className={style.movieContainer}>
    <iframe
      src={trailerId}
      allowFullScreen
      width={1000}
      height={450}
    ></iframe>
  </div>
</div>

       
      </div>
    </Layout>
  );
};

export default PlayMovie;
