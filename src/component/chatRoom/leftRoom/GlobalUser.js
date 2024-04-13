import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GlobalFriendRequest from './GlobalFriendRequest';

function GlobalUser() {
 
  const [globalUser,setGlobalUser]=useState([])
  const [clickedUserEmails, setClickedUserEmails] = useState(() => {
    const storedClickedUserEmails = sessionStorage.getItem('clickedUserEmails');
    return storedClickedUserEmails ? JSON.parse(storedClickedUserEmails) : [];
  });
  
  const email = sessionStorage.getItem('email')

useEffect(()=>{
  async function global(){
   const global = await axios.get(`${ process.env.REACT_APP_BACKEND_URL}/Global`)
      
          
          setGlobalUser(global.data.filter((user) => {  
//-------------------------------This will not show user her own profile on gloal user to add.....
            return user.email!==sessionStorage.getItem('email');
        }))
       
  }
  global()
},[])

//----------------------------------Sending--Friend------Request-------------------------------------------------
const addFriend=async (e,friendEmail)=>{
  e.preventDefault()
  console.log(friendEmail)
  try {
    const response = await axios.post(`${ process.env.REACT_APP_BACKEND_URL}/FriendRequest`,{friendEmail,email});
    console.log(response.data)
    // Handle the response as needed
    if (response.status===200){
      if (!clickedUserEmails.includes(friendEmail)) {
      setClickedUserEmails([...clickedUserEmails, friendEmail]);
      sessionStorage.setItem('clickedUserEmails', JSON.stringify([...clickedUserEmails, friendEmail]));
      }
    }
  } catch (error) {
    // Handle errors
    console.error('Error sending friend request:', error);
  }
}

  return (
  <div style={{ maxWidth: '500px', 
  maxHeight:'80vh',
  overflowY:'scroll',
  scrollbarWidth:'none',
  
  margin: '0 auto', 
   }}>
{/*-------------------------------------Sended----Friend--Request-------------------------------------*/}    
     <GlobalFriendRequest style={{maxHeight:'200px',overflowY:'scroll',scrollbarWidth:'none'}}/>
     
  {
  globalUser.length!==0?(
   
     
    globalUser.map((friend,index)=>{
        const friendImage= friend.image
        const friendName =friend.name
        const friendEmail = friend.email 
         
   return (
         
    <div key={index}
      style={{justifyContent:'space-around',background:'smokewhite',borderBottom:'0.5px solid lightgrey',borderRadius:'20px',display:'flex',height:'80px',padding:'5px',marginTop:'20px',}}>
     <div>
      <img style={{width:"70px",height:'70px',borderRadius:'50%',background:'white',border:"2px solid lightgreen",cursor:"pointer",margin:" 0px 2px",}}
      src={friendImage} alt=''/>
     </div>

     <div style={{}}>

      <div style={{margin:" 0px 20px",display:'flex',overflowY:'hidden',width:'180px',scrollbarWidth:'none'}}>
      {friendName}
      </div>

      <div style={{margin:" 0px 20px",display:'flex',overflowY:'hidden',width:'180px',scrollbarWidth:'none'}}>
        {friendEmail}
        </div>

        </div>
{/*-----------------------------------------Add---Button----------------------------------------------------*/}
   
     <div style={{position:'relative',right:'15px'}}>
      
    <button style={{
      backgroundColor:` ${clickedUserEmails.includes(friendEmail) ? 'lightgreen' : 'lightgrey'}`,
      color: 'white',
      height:'40px',
      width:'80px',
      border: 'none',
      padding: '8px 10px',
      borderRadius: '35px',
      cursor: 'pointer',
      outline: 'none',
     }}
      onClick={(e)=>{addFriend(e,friendEmail)}}>
             {clickedUserEmails.includes(friendEmail) ? '+Added' : '+Add'}
        </button>
     </div>

  </div>
          )
       
      }
     )
  ):(
    <h5 style={{display:'flex',justifyContent:'center',margin:'30px',}}>No User Found</h5>
  )
    }
  
  </div>
  )
}

export default GlobalUser
