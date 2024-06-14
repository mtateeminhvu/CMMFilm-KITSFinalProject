import axios from "axios";
import {
  GENRE_LIST_FAIL,
  GENRE_LIST_REQUEST,
  GENRE_LIST_SUCCESS,
  GENRE_CREATE_FAIL,
  GENRE_CREATE_REQUEST,
  GENRE_CREATE_SUCCESS,
  GENRE_DELETE_REQUEST,
  GENRE_DELETE_SUCCESS,
  GENRE_DELETE_FAIL,
  GENRE_UPDATE_REQUEST,
  GENRE_UPDATE_SUCCESS,
  GENRE_UPDATE_FAIL,
} from "../Constants/GenreConstants";
import { logout } from "./UserActions";
import { toast } from "react-toastify";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
export const listGenre = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GENRE_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    };
    const { data } = await axios.get(
      `https://danielaws.tk/group4/genres`,
      config
    );
    // console.log(data);

    dispatch({ type: GENRE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.messagae
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: GENRE_LIST_FAIL,
      payload: message,
    });
  }
};

//create product
export const createGenre = (genre) => async (dispatch, getState) => {
  try {
    dispatch({ type: GENRE_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    };

    const { data } = await axios.post(
      `https://danielaws.tk/group4/genres/add`,
      genre,
      config
    );
    toast.success("Successfully Added Genre", ToastObjects);
    dispatch({ type: GENRE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.data
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: GENRE_CREATE_FAIL,
      payload: message,
    });
  }
};
//delete genre
export const deleteGenre = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GENRE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    };

    await axios.delete(`https://danielaws.tk/group4/genres/${id}`, config);
    // toast.success("Successfully deleted genre");
    dispatch({ type: GENRE_LIST_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.data
        ? error.response.data.data
        : error.message;
    if (message === "Not authorized, token failed") {
      //   dispatch(logout());
      return;
    }
    if (message === "you just deleted data linked") {
      toast.error(message);
    }
    dispatch({
      type: GENRE_LIST_FAIL,
      payload: message,
    });
    // toast.error("Not permit delete genre");
  }
};
// UPDATE GENRE
export const updateGenre = (genre) => async (dispatch, getState) => {
  try {
    dispatch({ type: GENRE_UPDATE_REQUEST });
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
      `https://danielaws.tk/group4/genres/${genre.id}`,
      genre,
      config
    );
    // console.log(genre.id);

    dispatch({ type: GENRE_UPDATE_SUCCESS, payload: data });
    // toast.success("Genre updated successfully");
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
      type: GENRE_UPDATE_FAIL,
      payload: message,
    });
  }
};
