import React, { useEffect, useState } from 'react';
import Camera from "../undraw_camera.svg"
import Abstract from "../abstract.svg";
import { useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../redux/apis/userApi';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { userLoggedOut } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';


const Profile = () => {
  const user = useSelector(state => state.user.user);
  const [profilePic, setProfilePic] = useState();
  const [preview, setPreview] = useState(user.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState({
     name: user.name,
     email: user.email
  });

  const [updateUser, {isSuccess, data}] = useUpdateUserMutation();

  const handleImage =(e)=>{
    setProfilePic(e.target.files[0])
  }

  const handleInputs = (e)=>{
    setUserInfo({...userInfo, [e.target.name]: e.target.value})
  }

  useEffect(()=>{
    if(profilePic){
      const reader = new FileReader();
      reader.readAsDataURL(profilePic);
      reader.onloadend = ()=>{
        setPreview(reader.result)
      }
    }
  },[profilePic]);

  const handleSubmit = async(e)=>{
     e.preventDefault();
     const newUser = {
       profile: preview,
       name: userInfo.name,
       email: userInfo.email
     }

     await updateUser({id: user._id, body: newUser})
  }

  const handleLogout = async()=>{
     try {
      const response = await fetch("http://localhost:5000/api/logout", {
         credentials: "include"
      });
      if(response.status === 200){
        toast("User Logged Out", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch(userLoggedOut())
        navigate("/")
      }
     } catch (error) {
        toast.error("Error Occured", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
     }
  }

  useEffect(() => {
    if(isSuccess){
      alert(`your name has been updated to ${data.name} your email updated to ${data.email}`)
    }
  }, [data,isSuccess]);

  return (
    <div className='profile'>
       <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
      >
      </ToastContainer>
      <div className="profile-wrapper">

        <div className="profile-logout">
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
        
        <div className="profile-card">
           <h1>Hello!</h1>
           <h2>Welcome</h2>
           <h3>{user.name}</h3>
          <form className="profile-form">
             <label htmlFor='manuh' className="profile-avatar">
                <div className="profile-camera">
                  <img src={Camera} alt="" />
                </div>
                <input type="file" id='manuh' onChange={handleImage} />
                <img src={preview} alt="" className='profile-preview' />
             </label>
             <div className="profile-container">
               <input type="text" className="profile-input" placeholder='Full Name' name="name" value={userInfo.name} onChange={handleInputs} />
               <input type="email" className="profile-input" placeholder='Email' name="email" value={userInfo.email} onChange={handleInputs} />
               <button className="profile-btn" type='submit' onClick={handleSubmit}>Update</button>
             </div>
          </form>

          <div className="profile-abstract">
            <img src={Abstract} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile