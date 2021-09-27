import { PRODUCT_CATEGORY_LIST_FAIL, PRODUCT_CATEGORY_LIST_REQUEST, PRODUCT_CATEGORY_LIST_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_RESET, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_SUCCESS,CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_CREATE_RESET,
  CATEGORY_UPDATE_RESET,
  CATEGORY_DELETE_RESET,
  } from "../constants/ProductConstants";



export const productDetailsRducer =(state={ product:{} ,loading:true},action)=>{
  switch(action.type){
      case PRODUCT_DETAIL_REQUEST:
          return {loading:true}
      case PRODUCT_DETAIL_SUCCESS:
          return {loading:false,product:action.payload}
      case PRODUCT_DETAIL_FAIL:
          return {loading:false,error:action.payload}
      default:
          return state
  }
  
}

export const productListRducer=(state ={ loading:true, products:[]},action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return{
                loading:true
            };
        case PRODUCT_LIST_SUCCESS:
            return{
                loading : false ,products: action.payload
            }
        case PRODUCT_LIST_FAIL:
            return{
                loading: false,error:action.payload
            }
        default:
            return state;
        }
    }


  export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_CREATE_REQUEST:
        return { loading: true };
      case PRODUCT_CREATE_SUCCESS:
        return { loading: false, success: true, product: action.payload };
      case PRODUCT_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const productUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_UPDATE_REQUEST:
        return { loading: true };
      case PRODUCT_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case PRODUCT_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_DELETE_REQUEST:
        return { loading: true };
      case PRODUCT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case PRODUCT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const productCategoryListReducer = (
    state = { loading: true, categories: [] },
    action
  ) => {
    switch (action.type) {
      case PRODUCT_CATEGORY_LIST_REQUEST:
        return { loading: true };
      case PRODUCT_CATEGORY_LIST_SUCCESS:
        return { loading: false, categories:action.payload };
      case PRODUCT_CATEGORY_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };export const categoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case CATEGORY_CREATE_REQUEST:
        return { loading: true };
      case CATEGORY_CREATE_SUCCESS:
        return { loading: false, success: true, category: action.payload };
      case CATEGORY_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case CATEGORY_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const categoryUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case CATEGORY_UPDATE_REQUEST:
        return { loading: true };
      case CATEGORY_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case CATEGORY_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case CATEGORY_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const categoryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case CATEGORY_DELETE_REQUEST:
        return { loading: true };
      case CATEGORY_DELETE_SUCCESS:
        return { loading: false, success: true };
      case CATEGORY_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case CATEGORY_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };