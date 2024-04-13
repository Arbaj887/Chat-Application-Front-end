import React, { useEffect, } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import LeftRoom from './leftRoom/LeftRoom'
import RightRoom from './rightRoom/RightRoom'

import axios from 'axios'

function ChatRoom() {
  const navigate = useNavigate()

  
useEffect(()=>{
  const sessionEmail = sessionStorage.getItem('email')
  const sessionPassword = sessionStorage.getItem('password')
  if (!sessionEmail  && !sessionPassword){
    return navigate('/')
  }
   async function checkSession(){
   try{
    
       const sessionValue = await axios.post(`${ process.env.REACT_APP_BACKEND_URL}/sessionCheck`,{sessionEmail,sessionPassword})
       

       
    if(!sessionValue){
      
      return navigate('/')
    }
    
  }
  catch(err){
    console.log('err')
  }
  }
 checkSession()
  // eslint-disable-next-line 
},[])


  return (
    
   <div style={{display:'flex',justifyContent:"space-between",height:'100vh',left:'20px',top:'30px'}}>
{/*---------------------------------------Left---Room-------------------------------------------------- */}

    <div style={{flexBasis:'35%',}}>
      <LeftRoom />
       <Outlet />
    </div>
{/*---------------------------------------Right---Room-------------------------------------------------- */}
    
    <div style={{flexBasis:'70%'}}>  
      <RightRoom/>
    </div>
   
    </div>
  )
}

export default ChatRoom
