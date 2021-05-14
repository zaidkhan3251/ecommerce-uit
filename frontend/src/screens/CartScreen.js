import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCArt } from "../actions/cartAction";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCArt(productId, qty));
    }
  }, []);
  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        {" "}
        Add To Cart :ProductId : {productId} Qty: {qty}
      </p>
    </div>
  );
}
