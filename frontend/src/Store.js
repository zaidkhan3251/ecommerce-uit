import { applyMiddleware, combineReducers, compose, createStore } from "redux";
// import data from "./data";
import thunk from "redux-thunk";
import { cartReducers } from "./reducers/cartReducers";
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryUpdateReducer,
  productCategoryListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsRducer,
  productListRducer,
  productUpdateReducer,
} from "./reducers/productReducers";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "Cash On Delivery",
  },
};
const reducer = combineReducers({
  productList: productListRducer,
  productDetails: productDetailsRducer,
  cart: cartReducers,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  categoryCreate: categoryCreateReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,
  productCategoryList: productCategoryListReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
