import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AdminRoute from './components/AdminRoute';
import Footer from './components/Footer';
import SellerRoute from './components/SellerRoute';
import IsSellerOrAdminRoute from './components/IsSellerOrAdminRoute';
import Header from './components/Header';
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductCreateScreen from "./screens/ProductCreateScreen";
import CategoryEditScreen from "./screens/CategoryEditScreen";
import SearchScreen from "./screens/SearchScreen";
import { BrowserRouter, Route } from "react-router-dom";
import ExploreScreen from "./screens/ExploreScreen";

function App() {
  // if(userinfo){
//   console.log("check seller value",userInfo.isSeller)}
  return (

    <BrowserRouter>
      <div className="grid-container">
         <Header/>
        <main>
          <Route path="/cart/:id?" component={CartScreen} />

          <Route path="/product/:id" exact component={ProductScreen} />
          <Route path="/explore" exact component={ExploreScreen} />
          <Route path="/category" exact component={CategoryEditScreen} />
          <Route path="/signin" exact component={SigninScreen} />
          <Route path="/register" exact component={RegisterScreen} />
          <Route path="/shipping" exact component={ShippingAddressScreen} />
          <Route path="/payment" exact component={PaymentMethodScreen} />
          <Route path="/placeorder" exact component={PlaceOrderScreen} />
          <Route path="/profile" exact component={ProfileScreen} />
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          {/* <AdminRoute path="/createproduct" component={ProductCreateScreen}></AdminRoute> */}

          {/* <SellerRoute path="/createproduct" component={ProductCreateScreen}></SellerRoute> */}
          <IsSellerOrAdminRoute path="/createproduct" component={ProductCreateScreen}></IsSellerOrAdminRoute>
          <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          ></SellerRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
             <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          
          <Route path="/" exact component={HomeScreen} />
          <Route path="/search/category/:name" exact component={SearchScreen} />
        </main>
        <footer className="row center">All right reserved</footer>
        {/* <footer ><Footer/></footer> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
