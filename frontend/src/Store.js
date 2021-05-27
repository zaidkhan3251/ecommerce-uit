import { applyMiddleware, combineReducers, compose, createStore } from "redux";
// import data from "./data";
import thunk from 'redux-thunk'; 
import { cartReducers } from "./reducers/cartReducers";
import {productDetailsRducer, productListRducer} from './reducers/productReducers'
import { userSigninReducer } from "./reducers/userReducers";

const initialState={
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
          ? JSON.parse(localStorage.getItem('userInfo'))
          : null,
      },
    cart: {
        cartItems:localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    }
}
const reducer=combineReducers({
    productList: productListRducer,
    productDetails:productDetailsRducer,
    cart:cartReducers,
    userSignin:userSigninReducer,
}
)
const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store =createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)))
export default store;