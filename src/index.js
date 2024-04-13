import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import UserContextProvider from './contextAPI/UserContextProvider.js';
import Login from './component/login/Login';
import SignUp from './component/login/SignUp';
import PageNotFound from './component/login/PageNotFound';
import ForgetPassword from './component/login/ForgetPassword'
import ChatRoom from './component/chatRoom/ChatRoom';
import FriendChat from './component/chatRoom/leftRoom/FriendChat';
import GlobalUser from './component/chatRoom/leftRoom/GlobalUser';
import Setting from './component/chatRoom/leftRoom/Setting';
import FeedBack from './component/chatRoom/leftRoom/FeedBack';


const router= createBrowserRouter(
  createRoutesFromElements(
    <Route  element={<App/>} >
      <Route  path='/' element={<Login/>}/>
      <Route path='/SignUP' element={<SignUp/>}/>
      <Route path='/*' element={<PageNotFound/>}/>
      <Route path='/ForgetPassword' element={<ForgetPassword/>}/>
{/*-------------------CHAT-----Room--Component-------------------------------*/}
      <Route path='/ChatRoom' element={<ChatRoom/>} >
{/*----------------------Left---Side---------Component---------------------- */}        
      <Route  path='/ChatRoom' element={<FriendChat/>}/>
       <Route path='/ChatRoom/GlobalUser' element={<GlobalUser/>}/>
       <Route path='/ChatRoom/Setting'   element={<Setting/>}/>
       <Route path='/ChatRoom/FeedBack' element={<FeedBack/>}/>
      </Route>  
{/* ----------------------------FeedBack-------------------------------------- */}
      
    </Route>
    
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
   <RouterProvider router={router}/>
   </UserContextProvider>
   </React.StrictMode>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
