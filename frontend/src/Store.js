import { applyMiddleware, combineReducers, compose, createStore } from "redux";
// import data from "./data";
import thunk from 'redux-thunk'; 
import { cartReducers } from "./reducers/cartReducers";
import {productDetailsRducer, productListRducer} from './reducers/productReducers'

const initialState={
    cart: {
        cartItems:localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    }
}
const reducer=combineReducers({
    productList: productListRducer,
    productDetails:productDetailsRducer,
    cart:cartReducers
}
)
const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store =createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)))
export default store;