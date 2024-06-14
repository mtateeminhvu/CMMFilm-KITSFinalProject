import {
  MOVIE_CREATE_REQUEST,
  MOVIE_CREATE_FAIL,
  MOVIE_CREATE_SUCCESS,
  MOVIE_LIST_FAIL,
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_DELETE_FAIL,
  MOVIE_DELETE_REQUEST,
  MOVIE_DELETE_SUCCESS,
} from "../Constants/MovieConstants";

// MOVIE LIST
export const movieListReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case MOVIE_LIST_REQUEST:
      return { loading: true, movies: [] };
    case MOVIE_LIST_SUCCESS:
      return {
        loading: false,
        movies: action.payload,
      };
    case MOVIE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//Create MOVIE
export const movieCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_CREATE_REQUEST:
      return { loading: true };
    case MOVIE_CREATE_SUCCESS:
      return { loading: false, success: true, movie: action.payload };
    case MOVIE_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//Detete MOVIE
export const movieDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_DELETE_REQUEST:
      return { loading: true };
    case MOVIE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case MOVIE_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
