import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Recovery = () => {
  const [userInfo, setUserInfo] = useState({
     email: "",
     password: ""
  });

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setUserInfo({...userInfo, [name]: value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
       const resetRes = await axios.get("http://localhost:5000/api/createsession");
       
       if(resetRes.data.flag === true){
         try {
          const response = await axios.patch("http://localhost:5000/api/password/reset", userInfo);
          if(response.status === 201){
            toast.success("Password Reset Successfully")
          }

         } catch (error) {
          toast.error(error)
         }

       }
    } catch (error) {
      toast.error("Something Went Wrong")
    }
  }

  return (
    <div className='recovery'>
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
        />
       <div className="recovery-wrapper">
          <h1>Reset Your Password</h1>

          <form className="recovery-form">
            <input type="email" placeholder='Enter Your Email' className="recovery-input" name="email" value={userInfo.email} onChange={handleChange} />
            <input type="password" placeholder='New Password' className="recovery-input" name="password" value={userInfo.password} onChange={handleChange} />
            <button className="recovery-btn" type='submit' onClick={handleSubmit}>Reset</button>
          </form>
       </div>
    </div>
  )
}

export default Recovery