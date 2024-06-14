import {
  PACK_CREATE_REQUEST,
  PACK_CREATE_FAIL,
  PACK_CREATE_SUCCESS,
  PACK_LIST_FAIL,
  PACK_LIST_REQUEST,
  PACK_LIST_SUCCESS,
  PACK_DELETE_FAIL,
  PACK_DELETE_REQUEST,
  PACK_DELETE_SUCCESS,
  PACK_CREATE_RESET,
  PACK_UPDATE_REQUEST,
  PACK_UPDATE_SUCCESS,
  PACK_UPDATE_FAIL,
} from "../Constants/PackConstants";

// PACK LIST
export const packListReducer = (state = { packs: [] }, action) => {
  switch (action.type) {
    case PACK_LIST_REQUEST:
      return { loading: true, packs: [] };
    case PACK_LIST_SUCCESS:
      return {
        loading: false,
        packs: action.payload,
      };
    case PACK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE PACK
export const packUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PACK_UPDATE_REQUEST:
      return { loading: true };
    case PACK_UPDATE_SUCCESS:
      return { loading: false, success: true, pack: action.payload };
    case PACK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
