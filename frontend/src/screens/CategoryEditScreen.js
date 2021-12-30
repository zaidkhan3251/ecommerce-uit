import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import {
  createCategory,
  deleteCategory,
  updateCategory,
  listProductCategories,
} from "../actions/ProductActions";
import {storage} from '../firebase'
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";
import {
  CATEGORY_CREATE_RESET,
  CATEGORY_DELETE_RESET,
  CATEGORY_UPDATE_RESET,
} from "../constants/ProductConstants";

export default function CategoryEditScreen(props) {
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const [name, setName] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [isEdit, setIsEdit] = useState(null);
  const [purl, setPurl] = useState("");
  const [file,setFile]= useState()
  const dispatch = useDispatch();

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { loading, error, categories } = productCategoryList;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    category: createdCatgeory,
  } = categoryCreate;
  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = categoryDelete;

  useEffect(() => {
    if (successUpdate) {
        dispatch({ type: CATEGORY_UPDATE_RESET });}
        dispatch(listProductCategories())
        if(!file){
          return
        }
        const filereader= new FileReader();
        filereader.onload=()=>{
          setPurl(filereader.result)
        }
        filereader.readAsDataURL(file)
    if (successCreate) {
      dispatch({ type: CATEGORY_CREATE_RESET });
    }
    if (successDelete) {
      dispatch({ type: CATEGORY_DELETE_RESET });
    }
  }, [
    createdCatgeory,
    dispatch,
    props.history,
    // sellerMode,
    successCreate,
    successDelete,
    successUpdate,
    file,
    // userInfo._id,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    const sotrageRef = ref(storage, `categoryImages/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        

      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          
          dispatch(createCategory({ name,image:downloadURL}));
          setPurl("");
          setName("")
          setFile();

        });
      }
     
      
    );  };

    function pickedHandler(e){
      const Pickedfile = e.target.files[0];
      setFile(Pickedfile)} 
  const deleteHandler = (category) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteCategory(category._id));
    }
  };
  const onEditClick = (index) => {
    if (index !== null) {
    }
    setIsEdit(index);
  };
  const onUpdateHandler = (category) => {
    dispatch(updateCategory({ name:updateName,_id:category._id}));

    setIsEdit(null);
  };
  const onCategoryNameChange = (e) => {
    setUpdateName(e.target.value);
  };
 
  
 

  


  return (
    <div>
      <div>
        <div className="row">
          <h1>Manage Categories</h1>
        </div>

        {loadingDelete||loadingCreate && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}

      

        <form className="form" onSubmit={submitHandler}>
          {loadingCreate && <LoadingBox></LoadingBox>}
          {errorCreate && (
            <MessageBox variant="danger">{errorCreate}</MessageBox>
          )}

          <>
            <div>
              <label htmlFor="category">Create Category</label>
              <input
                id="category"
                type="text"
                placeholder="Create Category"
                onChange={(e) => setName(e.target.value)}
              ></input>
              <br />
              <label htmlFor="imageFile">Category Image</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Category Image"
                onChange={pickedHandler}
              ></input>
              {purl?(<img src={purl} alt="product_image"/>):(<></>)}
          
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
              <br/>
              <button className="primary" type="submit">
                
                Create
              </button>
            </div>
          </>
        </form>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>CATEGORIES</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={(category._id, index)}>
                    <td>{category._id}</td>

                    <td>
                      {isEdit === index ? (
                        <input
                          value={updateName}
                          onChange={onCategoryNameChange}
                        />
                      ) : (
                        category.name
                      )}
                    </td>
                    <td>
                      {isEdit !== index ? (
                        <button
                          type="button"
                          className="small"
                          onClick={() => onEditClick(index)}
                        >
                          Edit
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="small"
                          onClick={()=>onUpdateHandler(category)}
                        >
                          Update
                        </button>
                      )}
                      {isEdit === index && (
                        <button
                          type="button"
                          className="small"
                          onClick={() => onEditClick(null)}
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        type="button"
                        className="small"
                        onClick={() => deleteHandler(category)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
