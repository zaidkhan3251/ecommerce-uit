import Product from '../components/Product';
import {useDispatch, useSelector} from 'react-redux'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listProduct } from '../actions/ProductActions';
import { useEffect } from 'react';
export default function SearchScreen(props) {
    const dispatch=useDispatch()
    const productList = useSelector(state => state.productList)
    const {loading,error,products} = productList
    const category= props.match.params.name? props.match.params.name:''
     useEffect(() => {
       dispatch(listProduct({
         category
       }))
   
         }, [category])
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
