import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormInputs from '../components/FormInputs';
import {RegisterData} from "../data/registerData";
import { useNavigate } from 'react-router-dom';
import { useCreateUserMutation } from '../redux/apis/userApi';

const Register = () => {

  const [userInput, setUserInput] = useState({
     name:"",
     email:"",
     password:"",
     cpassword: ""
  });

  const [profilePic, setProfilePic] = useState()
  const [preview, setPreview] = useState("");

  const [createUser, {isSuccess}] = useCreateUserMutation();
  const navigate = useNavigate()

  const handleProfilePic =(e)=>{
     setProfilePic(e.target.files[0])
  }
 

  const handleChange= (e)=>{
    setUserInput({...userInput, [e.target.name]: e.target.value})
  }


  const handleSubmit = async(e)=>{
    e.preventDefault();
    const user = {
      profile: preview,
      name: userInput.name,
      email: userInput.email,
      password: userInput.password,
      cpassword: userInput.cpassword
    };

    await createUser(user);
    setUserInput({
      name:"",
      email:"",
      password:"",
      cpassword: ""
    })
    setPreview("")
  }



  useEffect(()=> {
    if(profilePic){
      const reader = new FileReader();
      reader.readAsDataURL(profilePic);
      reader.onloadend =()=>{
        setPreview(reader.result)
      }
    }
  },[profilePic]);

  useEffect(()=>{
    if(isSuccess){
      navigate("/")
    }
  }, [isSuccess,navigate])


  return (
    <div className='register'>
      <div className="register-wrapper">
        <div className="register-card">
          <h1>Create Your Account</h1>

          <form className="register-form">
            <input type="file" id='profile' className='register-profilePic' accept='images/*' onChange={handleProfilePic} />
            <label htmlFor='profile' className="register-profile">
              <img src={preview} alt="" />
            </label> 

            {
              RegisterData.map((val) => <FormInputs key={val.id} onchange={handleChange} {...val} value={userInput[val.name]} msg={val.errorMsg} />)
            }

            <button className="register-btn" type='submit' onClick={handleSubmit}>
              Create
            </button>

            <h6>Already Have an Accout? <span><Link className='link' to="/">Login Here</Link></span></h6>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register