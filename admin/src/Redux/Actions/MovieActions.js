import axios from "axios";
import {
  MOVIE_LIST_FAIL,
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_CREATE_FAIL,
  MOVIE_CREATE_REQUEST,
  MOVIE_CREATE_SUCCESS,
  MOVIE_DELETE_REQUEST,
  MOVIE_DELETE_SUCCESS,
  MOVIE_DELETE_FAIL,
  MOVIE_UPDATE_SUCCESS,
  MOVIE_UPDATE_REQUEST,
  MOVIE_UPDATE_FAIL,
} from "../Constants/MovieConstants";
import { logout } from "./UserActions";
import { toast } from "react-toastify";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
export const listMovie = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MOVIE_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    };
    const { data } = await axios.get(
      `https://danielaws.tk/group4/movies`,
      config
    );
    // console.log(data);
    dispatch({ type: MOVIE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.messagae
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: MOVIE_LIST_FAIL,
      payload: message,
    });
  }
};

//create movie
export const createMovie = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: MOVIE_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    };

    const { data } = await axios.post(
      `https://danielaws.tk/group4/movies/create`,
      formData,
      config
    );

    dispatch({ type: MOVIE_CREATE_SUCCESS, payload: data });
    toast.success("Movie created successfully", ToastObjects);
  } catch (error) {
    const message =
      error.response && error.response.data.data
        ? error.response.data.data
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: MOVIE_CREATE_FAIL,
      payload: message,
    });
  }
};
//delete product
export const deleteMovie = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MOVIE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    };

    await axios.delete(`https://danielaws.tk/group4/movies/${id}`, config);
    toast.success("Delete Movie Successfully", ToastObjects);
    dispatch({ type: MOVIE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.data
        ? error.response.data.data
        : error.message;
    toast.error(message, ToastObjects);
    if (message === "Not authorized, token failed") {
      dispatch(logout());
      return;
    }
    if (message === "Not permit delete because this have data linked in page") {
      toast.error(message, ToastObjects);
      dispatch({
        type: MOVIE_DELETE_FAIL,
        payload: message,
      });
    }
  }
};
// UPDATE movie
export const updateMovie = (movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: MOVIE_UPDATE_REQUEST });
    // console.log(user);
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };

    const { data } = await axios.put(
      `https://danielaws.tk/group4/movies/${movie.id}`,
      movie,
      config
    );
    // console.log(genre.id);

    dispatch({ type: MOVIE_UPDATE_SUCCESS, payload: data });
    toast.success("Movie updated successfully");
    // dispatch({ type: GENRE_LOGIN_SUCCESS, payload: data });

    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.data
        ? error.response.data.data
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: MOVIE_UPDATE_FAIL,
      payload: message,
    });
  }
};
