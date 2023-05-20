import { useRouter } from "next/router";
import { useMovies } from "../../providers/movies";
import { IMovie } from "../../providers/movies/context";

const Movie: React.FC = () => {
  const { MovieFetched, MoviesGotten } = useMovies();
  const router = useRouter();
  const { id } = router.query;

  console.log("MyID::", id);


   const foundMovie = MoviesGotten.find((movie) => movie.id === id);
   

  const handleMovieClick = (movie: IMovie) => {
    router.push(`/playmovie/${movie.id}`);
  };

  return (
    <>
        <button onClick={() => handleMovieClick(foundMovie)}>
          View Movie
        </button>
        <h1 style={{ color: "white", textAlign: "center" }}>
          {foundMovie?.title}
        </h1>
        <div id="divLeft">
          <div id="movie">
            <img src={foundMovie?.link} alt="Movie Image" />
            <p>
              <b>Category: </b>
              {foundMovie?.category}
            </p>
            <p>
              {" "}
              <b>Description: </b>
              {foundMovie?.description}
            </p>
            <p>
              <b>Duration: </b>
              {foundMovie?.duration}Hours
            </p>
          </div>
        </div>
    </>
  );
};

export default Movie;
