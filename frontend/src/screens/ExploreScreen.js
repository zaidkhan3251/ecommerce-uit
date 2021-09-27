import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listProductCategories } from '../actions/ProductActions';
import {Link} from 'react-router-dom'

export default function ExploreScreen() {
    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories,
      } = productCategoryList;
      const dispatch = useDispatch();
      useEffect(() => {
        dispatch(listProductCategories())
    },[])

    return(
        <div className="row center ">
            {categories&& categories.map((c,index) => (
                <div className="container">
                <img className="img_explore" src={c.image} alt={c.name}/>
                    <Link to={`/search/category/${c.name}`} className="centered" >{c.name}</Link>
                    </div>
                  ))
                            }
        </div>
    )
}
