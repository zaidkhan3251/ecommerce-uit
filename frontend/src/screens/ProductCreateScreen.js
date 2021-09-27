import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { createProduct, listProductCategories } from '../actions/ProductActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductCreateScreen(props) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('SELECT CATEGORY');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');

    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories,
      } = productCategoryList;  
      

    const productCreate = useSelector((state) => state.productCreate);
    const {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
    } = productCreate;
  
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(listProductCategories())

      if (successCreate) {
        props.history.push('/productlist');
      }
      
    }, [dispatch,successCreate, props.history]);



    const submitHandler =(e) =>{
      e.preventDefault();
      
      dispatch(
        createProduct({
          name,
          price,
          category,
          brand,
          countInStock,
          description,
          image,
        })
      );
    };

    

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');
  
    
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;


    const uploadFileHandler = async (e) => {
      const file = e.target.files[0];
      const bodyFormData = new FormData();
      bodyFormData.append('image', file);
      setLoadingUpload(true);
      try {
        const { data } = await Axios.post('/api/uploads', bodyFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setImage(data);
        console.log(data)
        setLoadingUpload(false);
      } catch (error) {
        setErrorUpload(error.message);
        setLoadingUpload(false);
      }
    };
  
  

    return (
        <div>
         
        

        
      <form className="form" onSubmit={submitHandler}>
        
        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        
          <>
            <div>
              <label htmlFor="name">Product Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            
            <div>
              <label htmlFor="imageFile">Product Image</label>
              <input
                type="file"
                id="imageFile"
                label="Choose product iamge"
                onChange={uploadFileHandler}
              ></input>
              {image?(<img src={image} alt="product_image"/>):(<></>)}
          
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <select value={category} onChange={e=>setCategory(e.target.value)}>
              {categories&& categories.map((c,index) => (<option key={index} value={c.name}> {c.name}</option>))
                            }
                          </select>
                          



              
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <input
                id="brand"
                type="text"
                placeholder="Enter brand"
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                id="countInStock"
                type="text"
                placeholder="Enter countInStock"
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Create
              </button>
            </div>
          </>
      </form>
    </div>
    )
}
