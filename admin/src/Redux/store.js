import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  movieCreateReducer,
  movieDeleteReducer,
  // movieCreateReviewReducer,
  // movieDetailsReducer,
  movieListReducer,
} from "./Reducers/MovieReducers";
import {
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./Reducers/UserReducers";
import {
  reviewListReducer,
  reviewDeleteReducer,
  reviewUpdateReducer,
} from "./Reducers/ReviewReducers";
import {
  genreListReducer,
  genreCreateReducer,
  genreDeleteReducer,
  genreUpdateReducer,
} from "./Reducers/GenreReducers";
import { packListReducer, packUpdateReducer } from "./Reducers/PackReducers";
const reducer = combineReducers({
  movieList: movieListReducer,
  movieCreate: movieCreateReducer,
  movieDelete: movieDeleteReducer,
  userLogin: userLoginReducer,
  userList: userListReducer,
  userRegister: userRegisterReducer,
  reviewList: reviewListReducer,
  reviewDelete: reviewDeleteReducer,
  reviewUpdate: reviewUpdateReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  genreList: genreListReducer,
  genreCreate: genreCreateReducer,
  genreUpdate: genreUpdateReducer,
  packList: packListReducer,
  packUpdate: packUpdateReducer,
  // movieDetails: movieDetailsReducer,
  // movieReviewCreate: movieCreateReviewReducer,
});

// const initialState = {
//   // userLogin: { userInfo: userInfoFromLocalStorage },
// };

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
