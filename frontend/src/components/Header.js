import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,params } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import { signout } from "../actions/userActions";
import { listProductCategories } from "../actions/ProductActions";

export default function Header(props) {
    const cart = useSelector((state) => state.cart);
  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo}=userSignin;
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { loading, error, categories } = productCategoryList;
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  
useEffect(() => {
  dispatch(listProductCategories())
  // console.log(userInfo.isSeller)
  
  // console.log(userInfo)
  
}, [])

    return (
        <header className="row">
          <div className="header__left">
            <Link className="brand" to="/">
              E-store
            </Link>
            
              <Link to="/explore" className="explore">Explore</Link>
              
              
          </div>
          <div>
              
          </div>
          <div className="header__center">
                <input type="text"/>
                    <SearchIcon/>
                
            </div>

          <div className="header__right">
            <Link to="/cart" className="cart_icon">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            

            {
              userInfo?(
                <div className="dropdown">
                  <Link to="#" className="avatar">
                    {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">User Profile</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">Order History</Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>
                        Sign Out
                      </Link>
                    </li>
                    <li>
                    {userInfo && userInfo.isSeller&&(
              <div className="sub__dropdown">
                <Link to="#seller">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="sub__dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
            
            {userInfo && userInfo.isAdmin && (
              <div className="sub__dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="sub__dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/category">Categories</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                
                </ul>
              </div>
            )}
            <div className="sub__dropdown">
                <Link to="#">
                  Categories <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="sub__dropdown-content">
                  {categories&&
                  categories.map((c)=><li>
                    <Link to={`/search/category/${c.name}`}>{c.name}</Link>
                  </li>)}
                  
                
                </ul>
              </div>
 
                    </li>
                  </ul>
                  

                </div>
              ):
              (<Link to='/signin' className="signin">Sign In</Link>)
            }
            
                     </div>
        </header>
    )
}
