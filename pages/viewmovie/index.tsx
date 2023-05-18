

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMovies } from "../../providers/movies";

const ViewMoviePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { MovieFetched, fetchedMovie } = useMovies();

  useEffect(() => {
    if (id) {
        fetchedMovie(MovieFetched);
    }
  }, [fetchedMovie, id]);
 console.log("THIS IS THE MOVIE::",MovieFetched)
  return (
    <div>
      <h1>View Movie</h1>
      <h1>{MovieFetched.title}</h1>
      <p>Movie ID: {id}</p>
    </div>
  );
};

export default ViewMoviePage;
