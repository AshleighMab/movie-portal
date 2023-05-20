import { useRouter } from "next/router";
import { useMovies } from "../../providers/movies";
import { IMovie } from "../../providers/movies/context";
import style from './style.module.css'

const Movie: React.FC = () => {
  const { MovieFetched, MoviesGotten } = useMovies();
  const router = useRouter();
  const { id } = router.query;

  console.log("MyID::", id);


   const foundMovie = MoviesGotten.find((movie) => movie.id === id);
   

   const handleMovieClick = (movieid) => {
    router.push(`/users/${movieid}`);
  };


  return (
    <>
   
  
  <h1 style={{ color: "white", textAlign: "center" }}>
    {foundMovie?.title}
  </h1>
  <div className={style.container} style={{ display: "flex" }}>
    <div id="divLeft">
      <div id="movie">
      <img
                  src={foundMovie?.image}
                  alt=""
                  className={style.image}
                  width={200}
                  height={200}
                />
      </div>
      <div>
 <button onClick={() => handleMovieClick(foundMovie.id)}>
   View Movie
  </button>
      </div>
     
  
    </div>
    <div id="divRight">
      <p>
        <b>Category: </b>
        {foundMovie?.category}
      </p>
      <p>
        <b>Description: </b>
        {foundMovie?.description}
      </p>
      <p>
        <b>Duration: </b>
        {foundMovie?.duration} Hours
      </p>
    </div>
  </div>
    </>
  );
};

export default Movie;
