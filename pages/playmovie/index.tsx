import { useMovies } from "../../providers/movies";
import { useParams } from "react-router-dom";
import style from './style.module.css'

const ViewMoviePage = () => {
  const { id } = useParams();
  const { MovieFetched, fetchedMovie } = useMovies();


  const extractYouTubeVideoId = (url) => {
    if (url) {
      const trailerId = url.replace('https://youtu.be/', '');
      return trailerId;
    }
    return null;
  };


const trailerId = extractYouTubeVideoId(MovieFetched.link);

  return (
    <div>
 
          <iframe
            className={style.container}
            src={`https://www.youtube.com/embed/${trailerId}`}
            allowFullScreen
          ></iframe>

    </div>
  );
};

export default ViewMoviePage;
