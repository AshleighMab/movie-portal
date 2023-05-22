import { useRouter } from "next/router";
import { useMovies } from "../../providers/movies";
import style from './style.module.css'
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
      const trailerId = url.replace('https://youtu.be/', '');
      return trailerId;
    }
    return null;
  };
  
const trailerId = extractYouTubeVideoId(foundMovie.link);

  return (
    <Layout>
    <>
     
    <div className={style.container}>
    <h1 >{foundMovie.title}</h1>
    </div>
  
   <div className={style.mainContainer}>

   <iframe     
   src={trailerId}
   allowFullScreen 
   width={900}
   height={400}  
 ></iframe>

</div>

    </>
    </Layout>
  );
};

export default PlayMovie;
