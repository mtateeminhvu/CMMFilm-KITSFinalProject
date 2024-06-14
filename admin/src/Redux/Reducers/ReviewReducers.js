import {
  REVIEW_DELETE_FAIL,
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_RESET,
  REVIEW_LIST_SUCCESS,
  REVIEW_UPDATE_FAIL,
  REVIEW_UPDATE_REQUEST,
  REVIEW_UPDATE_SUCCESS,
} from "Redux/Constants/ReviewConstants";

export const reviewListReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case REVIEW_LIST_REQUEST:
      return { loading: true };
    case REVIEW_LIST_SUCCESS:
      return { loading: false, reviews: action.payload };
    case REVIEW_LIST_FAIL:
      return { loading: false, error: action.payload };
    case REVIEW_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

//Detete Review
export const reviewDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_DELETE_REQUEST:
      return { loading: true };
    case REVIEW_DELETE_SUCCESS:
      return { loading: false, success: true };
    case REVIEW_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
//UPDATE PRODUCT
export const reviewUpdateReducer = (state = { reviews: {} }, action) => {
  switch (action.type) {
    case REVIEW_UPDATE_REQUEST:
      return { loading: true };
    case REVIEW_UPDATE_SUCCESS:
      return { loading: false, success: true, reviews: action.payload };
    case REVIEW_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case REVIEW_LIST_RESET:
      return { reviews: {} };
    default:
      return state;
  }
};
