import {
  REVIEW_DELETE_REQUEST,
  REVIEW_LIST_FAIL,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  REVIEW_UPDATE_FAIL,
  REVIEW_UPDATE_REQUEST,
  REVIEW_UPDATE_SUCCESS,
} from "Redux/Constants/ReviewConstants";
import { toast } from "react-toastify";
import axios from "axios";
//all users
export const listReview = () => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    };

    const { data } = await axios.get(
      `https://danielaws.tk/group4/review`,
      config
    );

    dispatch({ type: REVIEW_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.messagae
        : error.message;
    if (message === "Not authorized, token failed") {
      //   dispatch(logout());
      return;
    }

    dispatch({
      type: REVIEW_LIST_FAIL,
      payload: message,
    });
  }
};

//delete review
export const deleteReview = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    };

    await axios.delete(`https://danielaws.tk/group4/review/${id}`, config);

    dispatch({ type: REVIEW_LIST_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.messagae
        : error.message;
    if (message === "Not authorized, token failed") {
      //   dispatch(logout());
      return;
    }

    dispatch({
      type: REVIEW_LIST_FAIL,
      payload: message,
    });
  }
};
//update product
export const updateReview = (review) => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_UPDATE_REQUEST });

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
      `https://danielaws.tk/group4/review/update/${review.id}`,
      review,
      config
    );

    dispatch({ type: REVIEW_UPDATE_SUCCESS, payload: data });
    // dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.messagae
        : error.message;
    if (message === "Not authorized, token failed") {
      //   dispatch(logout());
      return;
    }

    dispatch({
      type: REVIEW_UPDATE_FAIL,
      payload: message,
    });
  }
};
