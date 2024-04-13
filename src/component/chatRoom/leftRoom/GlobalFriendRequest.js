import React,{useEffect,useState} from 'react'
import axios from 'axios'

function GlobalFriendRequest() {

    const [globalUser, setGlobalUser] = useState([]);
    const email = sessionStorage.getItem('email')

useEffect(()=>{
        async function global(){
         const global = await axios.post(`${REACT_APP_BACKEND_URL}/GetFriendRequest`,{email})
                
                setGlobalUser(global.data)
        }
        global()
        // eslint-disable-next-line
      },[globalUser])


//-------------------------------------Reject--Friend----------------------------------------------------

const rejectFriend=async (e,friendEmail)=>{
    e.preventDefault()
  
  try {
     await axios.post(`${REACT_APP_BACKEND_URL}/RejectFriendRequest`,{friendEmail,email});
    
    // Handle the response as needed
    
  } catch (error) {
    // Handle errors
    console.error('Error sending friend request:', error);
  }

}

//----------------------------------------Accept----Friend-------------------------------------------------------

const acceptFriend= async (e,friendEmail)=>{
    e.preventDefault()
    try {
        console.log(friendEmail)
       const c= await axios.post(`${REACT_APP_BACKEND_URL}/AcceptFriendRequest`,{friendEmail,email});
       
       // Handle the response as needed
       console.log(c)
       
     } catch (error) {
       // Handle errors
       console.error('Error sending friend request:', error);
     }

}


  return (

    <div>

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
        textAlign:'center',
        backgroundColor:`red`,
        color: 'white',
        height:'30px',
        width:'80px',
        border: 'none',
        padding: '3px 10px',
        borderRadius: '35px',
        cursor: 'pointer',
        outline: 'none',
        margin:'0px 5px 5px'
       }}
       
        onClick={(e)=>{rejectFriend(e,friendEmail)}}  >
            
        + Reject
      </button>
    <button style={{
        textAlign:'center',
        backgroundColor:` lightgreen`,
        color: 'white',
        height:'30px',
        width:'80px',
        border: 'none',
        padding: '3px 10px',
        borderRadius: '35px',
        cursor: 'pointer',
        outline: 'none',
        margin:'0px 5px 5px'
       }}
        onClick={(e)=>{acceptFriend(e,friendEmail)}}>
        +Accept
    </button>
       </div>
  
    </div>
            )
         
        }
       )
    ):(
      ''
    )
      }
    
    </div>
    
    
    )


    }
export default GlobalFriendRequest

