import React,{useState,useEffect, useContext, } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import UserContext from '../../../contextAPI/UserContext'




function FriendChat() {
  
  const navigate = useNavigate()
  const [friend,setFriend]=useState([])
  const email = sessionStorage.getItem('email')
  const password = sessionStorage.getItem('password')
  const {setSelectedUser}=useContext(UserContext)

 
  useEffect( ()=>{
    
    
   getFriend(); 
   // eslint-disable-next-line react-hooks/exhaustive-deps  
  },[friend]) 

const getFriend= async ()=>{
  try{
  const result = await axios.post("http://localhost:8000/Friend",{email,password});
  
   setFriend(result.data[0]['friend'])
  }catch(err){
    return navigate('/')
  }
  
 }

 const handleUserClick = (user) => {
// --------------------------set--seclect---user--in--Context------------------------------------------- 
  setSelectedUser(user.email);
 
  
};
  
 
return (
  <div style={{ 
    maxWidth: '500px', 
  maxHeight:'80vh',
  overflowY:'scroll',
  scrollbarWidth:'none',
  
  margin: '0 auto', 
   }}>

  {
  friend.length!==0?(
   
     
    friend.map((friend,index)=>{
        const friendImage= friend.image
        const friendName =friend.name
        const friendEmail = friend.email 
         
   return (
         
    <div key={index}   onClick={() => handleUserClick(friend)}
      style={{background:'smokewhite',borderBottom:'0.5px solid lightgrey',borderRadius:'20px',display:'flex',height:'80px',padding:'5px',marginTop:'20px'}}>
     <div>
      <img style={{width:"70px",height:'70px',borderRadius:'50%',background:'white',border:"2px solid lightgreen",cursor:"pointer",margin:" 0px 30px",}}
      src={friendImage} alt=''/>
     </div>
      
     <div >

        <div style={{margin:" 0px 20px",display:'flex',overflowY:'hidden',width:'180px',scrollbarWidth:'none'}}>
            {friendName}
        </div>

        <div style={{margin:" 0px 20px",display:'flex',overflowY:'hidden',width:'180px',scrollbarWidth:'none'}}>
             {friendEmail}
        </div>

      </div>


    </div>
          )
       
      }
     )
    ):(
     <h5 style={{display:'flex',justifyContent:'center',margin:'30px',}}>No Friend</h5>
   )
    }
  
  </div>
  )
}

export default FriendChat
