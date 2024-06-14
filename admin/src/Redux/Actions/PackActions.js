import axios from "axios";
import {
  PACK_LIST_FAIL,
  PACK_LIST_REQUEST,
  PACK_LIST_SUCCESS,
  PACK_UPDATE_FAIL,
  PACK_UPDATE_REQUEST,
  PACK_UPDATE_SUCCESS,
} from "../Constants/PackConstants";
import { logout } from "./UserActions";
import { toast } from "react-toastify";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
export const listPack = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PACK_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    };
    const { data } = await axios.get(
      `https://danielaws.tk/group4/package`,
      config
    );
    console.log(data);

    dispatch({ type: PACK_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.messagae
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: PACK_LIST_FAIL,
      payload: message,
    });
  }
};

// UPDATE PACK
export const updatePack = (pack) => async (dispatch, getState) => {
  try {
    dispatch({ type: PACK_UPDATE_REQUEST });
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
      `https://danielaws.tk/group4/package/${pack.id}`,
      pack,
      config
    );
    // console.log(genre.id);
    dispatch({ type: PACK_UPDATE_SUCCESS, payload: data });
    toast.success("Success updated");
    // dispatch({ type: PACK_LOGIN_SUCCESS, payload: data });

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
      type: PACK_UPDATE_FAIL,
      payload: message,
    });
  }
};
