import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import Axios from "axios";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstant';
import {storage} from '../firebase'
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const [purl, setPurl] = useState("");
  const [file,setFile]= useState()

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerDescription(user.seller.description);
      }
    }
    if(!file){
      return
    }
    const filereader= new FileReader();
    filereader.onload=()=>{
      setPurl(filereader.result)
    }
    filereader.readAsDataURL(file)
    
  }, [dispatch, userInfo._id, user,file]);










  const submitHandler =(e) =>{
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched');
    }
    else{
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
          updateUserProfile({
            userId: user._id,
            name,
            email,
            password,
            sellerName,
            sellerLogo:downloadURL,
            sellerDescription,
          })
        );

      });
    }
   
    
  );}
  
  };
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   // dispatch update profile
  //   if (password !== confirmPassword) {
  //     alert('Password and Confirm Password Are Not Matched');
  //   } else {
  //     dispatch(
  //       updateUserProfile({
  //         userId: user._id,
  //         name,
  //         email,
  //         password,
  //         sellerName,
  //         sellerLogo,
  //         sellerDescription,
  //       })
  //     );
  //   }
  // };
  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0];
  //   const bodyFormData = new FormData();
  //   bodyFormData.append('image', file);
  //   setLoadingUpload(true);
  //   try {
  //     const { data } = await Axios.post('/api/uploads', bodyFormData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: `Bearer ${userInfo.token}`,
  //       },
  //     });
  //     setSellerLogo(data);
  //     console.log(data)
  //     setLoadingUpload(false);
  //   } catch (error) {
  //     setErrorUpload(error.message);
  //     setLoadingUpload(false);
  //   }
  // };
  function pickedHandler(e){
    const Pickedfile = e.target.files[0];
    setFile(Pickedfile)}   
  


  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile Updated Successfully
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            {user.isSeller && (
              <>
                <h2>Seller</h2>
                <div>
                  <label htmlFor="sellerName">Seller Name</label>
                  <input
                    id="sellerName"
                    type="text"
                    placeholder="Enter Seller Name"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                  ></input>
                </div>
                <div>
                <label htmlFor="imageFile">Category Image</label>
              <input
                type="file"
                id="sellerLogo"
                label="Choose Seller Logo"
                onChange={pickedHandler}
              ></input>
              {purl?<img src={purl} alt=""/>:<></>}
          
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}

                </div>
                <div>
                  <label htmlFor="sellerDescription">Seller Description</label>
                  <input
                    id="sellerDescription"
                    type="text"
                    placeholder="Enter Seller Description"
                    value={sellerDescription}
                    onChange={(e) => setSellerDescription(e.target.value)}
                  ></input>
                </div>
              </>
            )}
            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}