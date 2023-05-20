import { useRouter } from "next/router";
import { useMovies } from "../../providers/movies";
import { IMovie } from "../../providers/movies/context";
import style from './style.module.css'

const PlayMovie: React.FC = () => {
  const { MovieFetched, MoviesGotten } = useMovies();
  const router = useRouter();
  const { id } = router.query;

  console.log("MyID::", id);


   const foundMovie = MoviesGotten.find((movie) => movie.id === id);
   
   const extractYouTubeVideoId = (url) => {
    if (url) {
      const trailerId = url.replace('https://youtu.be/', '');
      return trailerId;
    }
    return null;
  };

  
const trailerId = extractYouTubeVideoId(foundMovie.link);


  return (
    <>
   <h1> PLAY THE MOVIE</h1>
   <div>
 
 <iframe
   className={style.container}
   src={`https://www.youtube.com/embed/${trailerId}`}
   allowFullScreen
 ></iframe>

</div>
    </>
  );
};

export default PlayMovie;
