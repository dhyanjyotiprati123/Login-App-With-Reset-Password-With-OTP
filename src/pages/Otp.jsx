import React from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Otp = () => {
    const [userInfo, setUserInfo] = useState({
       name: "",
       userEmail: ""
    })
    const [otp, setOtp] = useState();
    const navigate = useNavigate();

    const handleUserInfo = async(e)=>{
       const {name, value} = e.target;
       setUserInfo({...userInfo, [name]: value})
    }

    const handleOtp = (e)=> {
        setOtp(e.target.value)
    }


    const generateOtp = async(e)=>{
      e.preventDefault();
       try {
        const response = await axios.get("http://localhost:5000/api/otp");
        console.log(response);
        console.log(response.data);

         const mailObj = {
            name: userInfo.name,
            userEmail: userInfo.userEmail,
            text: `Your Password Reset Code is ${parseInt(response.data.code)}`,
            subject: "Enter this code to reset your password. It's valid for only 15 minutes"
         }
          
         try {
          if(response.status === 201){
             const response = await axios.post("http://localhost:5000/api/mail", mailObj);
             if(response.status === 200){
              toast.success("Otp sent to your registered mail")
             }
          }
         } catch (error) {
           toast.error("Something went wrong");
         }
         
        
       } catch (error) {
        toast.error(`Error Occured ${error}`, {
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
  


    const verifyOtp = async(e)=>{
      e.preventDefault();
      try {
         const response = await fetch(`http://localhost:5000/api/otp/verify/${otp}`);
 
         if(response.status === 200){
           toast.success("Otp Verified", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
           });

           navigate("/recovery")
         }

         if(response.status === 400){
           toast.error("Invalid Otp", {
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

      } catch (error) {
        toast.error("Something went wrong please try again", {
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
  

  return (
    <div className='otp'>
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
        <div className="otp-wrapper">
            <form  className="otp-form">
              <input type="text" className="otp-input" name="name" placeholder='Name' value={userInfo.name} onChange={handleUserInfo} />
              <input type="text" className="otp-input" name="userEmail" placeholder='Email' value={userInfo.userEmail} onChange={handleUserInfo} />
              <button className="otp-generate" type='submit' onClick={generateOtp} >Generate OTP</button>
            </form>
           
            <form className="otp-form">
                <input type="number" className="otp-input" name="otp" placeholder='Enter OTP' value={otp} onChange={handleOtp} />
                <button type='submit' className="otp-submit" onClick={verifyOtp}>Verify</button>
            </form>
        </div>
    </div>
  )
  }

export default Otp;