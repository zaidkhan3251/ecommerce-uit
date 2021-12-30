import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, listProductCategories } from '../actions/ProductActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {storage} from '../firebase'
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
export default function ProductCreateScreen(props) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('SELECT CATEGORY');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [purl, setPurl] = useState("");
    const [file,setFile]= useState()

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
      if(!file){
        return
      }
      const filereader= new FileReader();
      filereader.onload=()=>{
        setPurl(filereader.result)
      }
      filereader.readAsDataURL(file)
      
    }, [dispatch,successCreate, props.history,file]);



    const submitHandler =(e) =>{
      e.preventDefault();
      
      const sotrageRef = ref(storage, `productImages/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        

      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          
    dispatch(
      createProduct({
        name,
        price,
        category,
        brand,
        countInStock,
        description,
        image:downloadURL,
      })
    );

        });
      }
     
      
    );
    
    };

    function pickedHandler(e){
      const Pickedfile = e.target.files[0];
      setFile(Pickedfile)}   
    

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');
  
    
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;


    

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
                onChange={pickedHandler}
              ></input>
              {purl?(<img src={purl} alt="product_image"/>):(<></>)}
          
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
