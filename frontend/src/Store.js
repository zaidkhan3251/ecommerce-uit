import { applyMiddleware, combineReducers, compose, createStore } from "redux";
// import data from "./data";
import thunk from 'redux-thunk'; 
import {productDetailsRducer, productListRducer} from './reducers/productReducers'

const initialState={}
const reducer=combineReducers({
    productList: productListRducer,
    productDetails:productDetailsRducer
}
)
const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store =createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)))
export default store;