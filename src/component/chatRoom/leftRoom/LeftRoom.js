import React,{ useState,useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate} from 'react-router-dom';
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { RiUserReceived2Fill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs"; 
import { RxCross1 } from "react-icons/rx";


function LeftRoom() {
   
    const [displayList , setDisplayList] = useState('none')
    const [image,setImage]=useState('')
    const navigate=useNavigate()

useEffect(()=>{
  const email = sessionStorage.getItem('email')
  const password = sessionStorage.getItem('password')
//----------------------------get--User image ----------------------------------------------------------------
  async function findImage(){
    try{
     
        const findImage = await axios.post(`${REACT_APP_BACKEND_URL}/Login`,{email,password})
         setImage(findImage.data['image'])
                     
 
           
   }
   catch(err){
     console.log(err)
   }
   }
  findImage()
},[])


    const logout=(e)=>{
      e.preventDefault() 
      sessionStorage.removeItem('email')
      sessionStorage.removeItem('password')
      navigate('/')
    }

  return (
    <div>
{/*--------------------------------TOP---Section-------------------------------------------- */}  
     <div style={{background:'lightgrey',borderRight:'0.5px solid darkgrey',display:'flex',justifyContent:"space-between",height:'100px',padding:'5px',position:'relative'}}>
{/*--------------------------------TOP-----Image-----Elements-------------------------------------------- */}    
       <div>
         <img style={{width:"90px",height:'90px',borderRadius:'50%',background:'white',border:"2px solid lightgreen",cursor:"pointer"}}
        src={image} alt=''/>
       </div>
{/*--------------------------------TOP----Others-----Element------------------------------------ */}          
       <div style={{fontSize:"40px",display:'flex',justifyContent:'center',alignContent:'center',margin:'10px 0px'}}>
       
       <Link to='/ChatRoom'>
        <IoChatbubbleEllipsesSharp style={{margin:'0px 18px',color:'black'}} />
        </Link>

       <Link to='/ChatRoom/GlobalUser'>
        <RiUserReceived2Fill  style={{margin:'0px 18px',color:'black'}} />
        </Link>

       <BsThreeDotsVertical   style={{margin:'10px 18px',cursor:'pointer'}} 
          onClick={()=> setDisplayList('flex')}
       />
       </div>

     {/*-------------------list--of--threeDots------------------------------------------- */}
       <div style={{position:'absolute',background:'lightgrey',right:'10px',display:`${displayList}`,width:'250px',justifyContent:'center',border:'2px solid black',borderRadius:'20px',marginTop:'10px',zIndex:'1',}}>
         
         <ul style={{fontSize:'30px',listStyleType: 'none',marginTop:'30px',cursor:'pointer'}}>

         <Link to='/ChatRoom/Setting' style={{textDecoration:'none',color:'black'}}
         onClick={()=> setDisplayList('none')}   
         >
          <li style={{borderBottom:'1px solid black',margin:'10px'}}>Setting</li>
          </Link>
        
         <Link to='/ChatRoom/FeedBack' style={{textDecoration:'none',color:'black'}}
            onClick={()=> setDisplayList('none')}   
         > 
         <li style={{borderBottom:'1px solid black',margin:'10px'}}>FeedBack</li>
         </Link>
         
          <li style={{borderBottom:'1px solid black',margin:'10px'}}
          onClick={logout}
          >Log out</li>
        
         </ul>
      {/* ------------------cross--icon-------------------------------------------------- */}
         
         <RxCross1 style={{margin:'10px',fontSize:'30px',cursor:'pointer'}}
         onClick={()=> setDisplayList('none')}
         />
         
      </div>
     </div>
    
      
    </div>

  )
}

export default LeftRoom
