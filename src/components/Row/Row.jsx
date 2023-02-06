import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./row.css";
import YouTube from "react-youtube";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [id, setId] = useState("");
  const [movie, setMovie] = useState({});
  const [info, setInfo] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [moviesGenres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "220",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
    loading: "Loading...",
  };

  const genres = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Horror: 27,
    Music: 10402,
    Mystery: 9648,
    Romance: 10749,
    "Science Fiction": 878,
    "TV Movie": 10770,
    Thriller: 53,
    War: 10752,
    Western: 37,
  };

  const genre18 = ["Crime", "Horror", "Thriller", "War"];

  const getKeyByValue = (value) => {
    return Object.keys(genres).find((key) => genres[key] === value);
  };

  const handleClick = (movie, movieId) => {
    setIsHovered(true);
    console.log(movie.name);
    setId(movie.id);
    setMovie(movie);
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
      // movieTrailer(null, { tmdbId: movie.id })
      //   .then((url) => {
      //     console.log("url is " + url);
      //     const urlParams = new URLSearchParams(new URL(url).search);
      //     console.log("urlParamsn" + urlParams);
      //     setTrailerUrl(urlParams.get("v"));
      //   })
      //   .catch((error) => console.log(error));
      //   const fetchDataa = async () => {
      //     const result = await fetch(
      //       `http://www.omdbapi.com/?apikey=7d869b1d&t=${movie.name}`
      //     );
      //     const moviee = await result.json();
      //     console.log(moviee);
      //     setTrailerUrl(moviee.Trailer);
      //     console.log(trailerUrl);
      //   };
      //   fetchDataa();
      // }
      let gr = [];
      movie.genre_ids?.forEach((genre) => {
        gr.push(getKeyByValue(genre));
        setGenres(gr);
      });

      setGenres(gr);
      console.log(gr);
      console.log(moviesGenres);

      const fetchData = async () => {
        console.log(movie);
        const result = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${
            movie.name || movie.title
          }+trailer&type=video&key=AIzaSyBAWuPpxtEbFnoVeob41sg-lQRsZ8pDR7s`
        );
        const json = await result.json();
        setTrailerUrl(
          `https://www.youtube.com/watch?v=${json.items[0].id.videoId}`
        );
        console.log(trailerUrl.split("=")[1]);
      };
      fetchData();
    }
  };

  useEffect(() => {
    const fetchDataa = async () => {
      const result = await fetch(
        `http://www.omdbapi.com/?apikey=7d869b1d&t=${movie.name}`
      );
      const moviee = await result.json();
      console.log(moviee);
      setInfo(moviee);
      setTrailerUrl(moviee.Trailer);
    };
    fetchDataa();
  }, [movie.name]);

  const onReady = (event) => {
    event.target.playVideo();
  };

  // const cardHover = (movie, link) => {
  //   setMovie(movie);
  //   let cards = document.querySelectorAll(".card");
  //   let iframes = document.querySelectorAll(".iframes");
  //   cards.forEach((card, index) => {
  //     card.addEventListener("mouseover", function () {
  //       let vSrc = iframes[index].dataset.video;
  //       iframes[index].src =
  //         "https://www.youtube.com/embed/" +
  //         link.split("=")[1] +
  //         "?autoplay=1&controls=0&mute=0";
  //     });
  //     card.addEventListener("mouseleave", function () {
  //       iframes[index].src = "";
  //     });
  //   });
  // };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <>
            <img
              onMouseEnter={() => {
                handleClick(movie, movie.id);
                // cardHover(movie, trailerUrl);
              }}
              // onMouseLeave={() => setIsHovered(false)}
              onClick={() => handleClick(movie, movie.id)}
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"} `}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }
              
              `}
              alt={movie.name}
            />
          </>
        ))}
      </div>

      {isHovered && movie.id === id && (
        <div
          className={`card ${isHovered && id === movie.id ? "show" : "hide"}`}
          style={{
            width: "300px",
            // height: "350px",
            zIndex: "999",
            position: "relative",
            backgroundColor: "red",
            margin: "0px",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* {isHovered && ( */}
          {/* video */}
          <YouTube
            className="youtube__video"
            opts={opts}
            // videoId={trailerUrl.split("=")[1]}
            autoPlay
            onReady={onReady}
          />
          {/* <iframe
                  data-video={`https://www.youtube.com/embed/${
                    trailerUrl.split("=")[1]
                  }?autoplay=1&controls=0&mute=0`}
                  src=""
                  frameborder="0"
                  autoPlay
                  allowFullScreen
                  className="iframe"
                ></iframe> */}
          {/* buttons */}
          <div className="card__buttons">
            <div className="card__buttons__left">
              <div className="card__button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </div>

              <div className="card__button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
              </div>

              <div className="card__button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-hand-thumbs-up"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                </svg>
              </div>
            </div>
            <div>
              <div className="card__button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-chevron-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* vote and language */}
          <div className="d-flex px-4 justify-content-between mb-1 mt-1">
            <div className="d-flex">
              <h6 className={`${movie.vote_average <= 5 ? "red" : "green"}`}>
                {movie.vote_average}
              </h6>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="white"
                className="bi bi-star-fill star "
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
              {moviesGenres.some((value) => genre18.includes(value)) && (
                <h6 className="card__18">+18</h6>
              )}
            </div>
            <div className="d-flex">
              <h6 className="h6">
                Language :{" "}
                <span>{` (${movie.original_language.toUpperCase()})`}</span>
              </h6>
            </div>
          </div>
          {/* tybe and duration */}
          <div className="d-flex px-4  mb-1 mt-1">
            <div className="d-flex">
              <h6 className="h6">
                Type :{" "}
                <span>{` ${info.Type + "  - "}${
                  info.Type === "series"
                    ? info.totalSeasons + " seasons"
                    : info.Runtime
                }`}</span>
              </h6>
            </div>
          </div>
          {/* genres */}
          {/* <div className="d-flex flex-wrap px-4">
            {moviesGenres.map((genre, index) => (
              <div className="mr-3 pr-3">
                {genre !== undefined && (
                  <div className="d-flex align-items-center">
                    <h6 className="h6">{`${genre}  `}</h6>
                    {index !== moviesGenres.length - 1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-dot"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                      </svg>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div> */}
          <div className="d-flex flex-wrap px-4">
            <div className="mr-3 pr-3">
              <div className="d-flex align-items-center">
                <h6 className="h6">
                  <span>{`${info?.Genre}  `}</span>
                </h6>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <div
        style={{
          width: "200px",
          height: "100px",
          backgroundImage: `url(../../assets/images/Netflix_Logo.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "0.3s",
          position: "relative",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!isHovered ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.7)",
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h3 style={{ color: "white", marginBottom: "10px" }}>
              {movie.title}
            </h3>
            <p style={{ color: "white" }}>{movie.description}</p>
          </div>
        ) : (
          trailerUrl && (
            <YouTube videoId={trailerUrl.split("=")[1]} opts={opts} />
          )
        )}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl.split("=")[1]} opts={opts} />} */}
    </div>
  );
};

export default Row;
