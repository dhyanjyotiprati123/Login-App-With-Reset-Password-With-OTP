import React, { useState } from 'react';
import {FaUser} from "react-icons/fa";
import {Link} from "react-router-dom";
import { useLoginUserMutation } from '../redux/apis/userApi';
import { useNavigate } from 'react-router-dom';
import { userLoggedIn } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Login = () => {
  const [userInfo, setUserInfo] = useState({
      email: "",
      password: ""
  });

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setUserInfo({...userInfo, [name]:value})
  }

  const [loginUser, {data,isSuccess, isError}] = useLoginUserMutation()

  const handleSubmit = async(e)=>{
    e.preventDefault();
    await loginUser(userInfo);
  }

  useEffect(()=>{
    if(isSuccess){
      dispatch(userLoggedIn(data))
      navigate("/profile");

      setUserInfo({
        email: "",
        password: ""
      })
    } 
  }, [data,dispatch,isSuccess, navigate]);

  return (
    <div className='login'>
      <div className="login-wrapper">
        <div className="login-card">
          <h1>Hello Again!</h1>
          <p>explore more by</p>
          <p>connecting with us</p>
          <div className="login-profile">
            <FaUser />
          </div>
          <form className="login-form">
            <input type="email" className="login-input" placeholder='email' required="true" name="email" value={userInfo.email} onChange={handleChange} />
            <input type="password" className='login-input' placeholder='password' required="true" name='password' value={userInfo.password} onChange={handleChange} />
            <button className="login-btn" type='submit' onClick={handleSubmit}>Let's Go</button>
            <h6>Not a Member  <span> <Link className='link' to="/register">Register Now</Link> </span></h6>
          </form>
          
          {
            isError &&  <span className="login-reset">forgot password <Link to="/otp">click here</Link></span>
          }
         
        </div>
      </div>
    </div>
  )
}

export default Login