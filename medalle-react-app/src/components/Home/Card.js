import React from "react";

// Card component that displays information about a movie
const Card=(movie)=>{
    // Log the movie info to the console (optional for debugging)
   console.log(movie.info);
   // Base URL for movie poster images from the TMDB API
   let img_path="https://image.tmdb.org/t/p/w500";
   return(
       <>
           <div className="movie">
                {/* Display the movie poster */}
               <img src={img_path+movie.info.poster_path} className="poster"></img> {/*complete path sa image poster nga atong i fetch sa kini nga website with the information of image*/}
               <div className="movie-details">
                   <div className="box">
                       {/* Display the movie title */}
                       <h4 className="title">{movie.info.title}</h4>
                       {/* Display the movie rating */}
                       <p className="rating">{movie.info.vote_average}</p>
                   </div>
                   <div className="overview">
                       {/* Heading for the movie overview */}
                       <h1>overview</h1>
                       {/* Display the movie overview/description */}
                       {movie.info.overview}
                   </div>
               </div>
           </div>
       </>
   )
}
export default Card;