import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import HoverVideoPlayer from "react-hover-video-player";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie, movieId) => {
    console.log(movie.name);
    setId(movie.id);
    if (trailerUrl && id === movieId) {
      setTrailerUrl("");
    } else {
      // movieTrailer(movie?.name || "")
      //   .then((url) => {
      //     console.log(url);
      //     const urlParams = new URLSearchParams(new URL(url).search);
      //     setTrailerUrl(url);
      //   })
      //   .catch((err) => console.log(err));
      movieTrailer(null, { tmdbId: movie.id })
        .then((url) => {
          console.log("url is " + url);
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log("urlParamsn" + urlParams);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie, movie.id)}
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {/* <HoverVideoPlayer
        videoSrc={trailerUrl}
        pausedOverlay={
          <img
            src="thumbnail-image.jpg"
            alt=""
            style={{
              // Make the image expand to cover the video's dimensions
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        }
        loadingOverlay={
          <div className="loading-overlay">
            <div className="loading-spinner" />
          </div>
        }
      /> */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
