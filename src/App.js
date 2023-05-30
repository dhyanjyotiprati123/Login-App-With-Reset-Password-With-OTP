import React, {useEffect} from 'react';
import "./style/main.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from './pages/Profile';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserQuery } from './redux/apis/userApi';
import { userLoggedIn } from './redux/slices/userSlice';
import Otp from './pages/Otp';
import Recovery from './pages/Recovery';


const App = () => {
  const user = useSelector(state => state.user.user);
  const {data, isLoading, isSuccess} = useGetUserQuery();
  const dispatch = useDispatch();

  useEffect(()=>{
     if(isSuccess){
       dispatch(userLoggedIn(data))
     }
  }, [data, isSuccess, dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
           
           <Route index element={ user? <Profile />:<Login />} />
           {
            user &&  <Route path='/profile' element={<Profile />} />
           }
          
           <Route path='/register' element={<Register />} /> 
           <Route path="/otp" element={<Otp />} />
           <Route path='/recovery' element={<Recovery />} />
      </Route>
    )
  );


  return (
    <div className='app'>
      {
        isLoading? <><div className='loading'>Loading....</div></> : <RouterProvider router={router} />
      }  
    </div>
  )
}

export default App