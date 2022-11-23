import React, { useContext } from "react";
import API from "../../API";
import PropTypes from "prop-types";
// Components
import Thumb from "../Thumb";
import Rate from "../Rate";
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
// Image
import NoImage from "../../images/no_image.jpg";
// Styles
import { Wrapper, Content, Text } from "./MovieInfo.styles";
// Context
import { Context } from "../../context";

const MovieInfo = ({ movie }) => {
  const [user] = useContext(Context);

  const handleRating = async (value) => {
    const rate = await API.rateMovie(user.sessionId, movie.id, value);
    console.log(rate);
  };

  const { vote_average, backdrop_path, title, overview, poster_path } = movie;
  const rating = (Math.round(vote_average * 100) / 100).toFixed(1);
  console.log(rating);

  return (
    <Wrapper backdrop={backdrop_path}>
      <Content>
        <Thumb
          image={
            poster_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${poster_path}`
              : NoImage
          }
          clickable={false}
        />
        <Text>
          <h1>{title}</h1>
          <h3>PLOT</h3>
          <p>{overview}</p>

          <div className="rating-directors">
            <div>
              <h3>RATING</h3>
              <div className="score">{rating}</div>
            </div>
            <div className="director">
              <h3>DIRECTOR{movie.directors.length > 1 ? "S" : ""}</h3>
              {movie.directors.map((director) => (
                <p key={director.credit_id}>{director.name}</p>
              ))}
            </div>
          </div>
          {user && (
            <div>
              <p>Rate Movie</p>
              <Rate callback={handleRating} />
            </div>
          )}
        </Text>
      </Content>
    </Wrapper>
  );
};

MovieInfo.propTypes = {
  movie: PropTypes.object,
};

export default MovieInfo;
