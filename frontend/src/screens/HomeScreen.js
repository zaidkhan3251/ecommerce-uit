import React, { useEffect } from "react";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listProduct } from "../actions/ProductActions";
export default function HomeScreen(props) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const category = props.match.params.category
    ? props.match.params.category
    : "";
  useEffect(() => {
    dispatch(
      listProduct({
        category,
      })
    );
  }, []);
  return (
    <>   

      <div className="banner">
        <img src="images/Cheers.gif" alt="banner"/>
      </div>
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
