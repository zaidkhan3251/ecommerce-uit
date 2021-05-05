import React, { useEffect } from 'react'
import Product from '../components/Product';
import {useDispatch, useSelector} from 'react-redux'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listProduct } from '../actions/ProductActions';
export default function HomeScreen() {
  const dispatch=useDispatch()
 const productList = useSelector(state => state.productList)
 const {loading,error,products} = productList
  useEffect(() => {
    dispatch(listProduct())

      }, [])
    return (
        <div>
          {loading? <LoadingBox></LoadingBox>
          :error? <MessageBox>{error}</MessageBox>
          :<div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
          }
          
        </div>
    )
}
