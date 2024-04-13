import React, {  useState,  } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {  FaLock ,  } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from 'axios';
import PopError from './PopError';


function Login() {
  const [email , setEmail]= useState("");
  const [password , setPassword]=useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [err , setErr] =useState(false)
  const [errMessage,setErrMessage]=useState(undefined)
  const [loding,setLoding]=useState(false)
  const navigate= useNavigate()
  
  const proxy="http://localhost:8000"

 async function checkLogin(e){
  e.preventDefault() 
   
   setLoding(true)
   if(email.endsWith("@gmail.com") && 3<password.length  ){
    try{
      
     const result=await axios.post(`${proxy}/Login`, {email,password})
    
     
     if (result.status === 200) {
//-------------------contextApi---------------------------------------------------------------------------
      sessionStorage.setItem('email',email)
      sessionStorage.setItem('password',password)
      navigate("/ChatRoom");
      setLoding(false)
    }
  } catch (err) {
    setLoding(false)
    // If login fails, display error message
    setErr(true);
    setErrMessage("An error occurred during login");
    setTimeout(() => {
      setErr(false);
    }, 8000);
    
  }
    
    }
    else{
      setLoding(false)
      setErr(true)
      if(password.length<=3){
        return setErrMessage("Password Must be greater than 3 Letter")
      }
      setErrMessage("Please enter a valid email and password.");
      setTimeout(()=>{
        setErr(false)
      },8000)
     }
     
   }
  

 


  return (
  
  <div 
  style={{overflow:"auto",backgroundSize:"cover",backgroundImage:"url('https://img.freepik.com/free-photo/space-background-realistic-starry-night-cosmos-shining-stars-milky-way-stardust-color-galaxy_1258-154643.jpg')",alignContent:"center",justifyContent:'space-around',
  color:'white',display:'flex',height:'100vh',minWidth:'600px',position:'relative'}} >

{/*----------------------------------Pop--Error--Message-----------------------------------------------------*/}
    <div style={{position:'absolute',zIndex:'1',display:'flex',right:'40px',bottom:'40px'}}>
         {err?<PopError message={errMessage}/>:''}
    </div> 
  
  <form method='POST'
  onSubmit={checkLogin}
  
  style={{ marginTop:"100px",borderRadius:"30px",height:"fit-content",width:'auto',background:"Black",justifyContent:"center",alignContent:"center",border:"1px solid white",}}>
    
    <h1 style={{textAlign:'center',marginTop:'10px'}}>Login</h1>

   {/*---------------------------E-Mail----------------------------------------------------------- */}

    <div style={{margin:"30px 30px ",display:'flex',alignContent:'center',justifyContent:"center",height:"40px",position:"relative",}}>
     <input style={{borderRadius:"40px",width:"400px",background:'transparent',padding:"10px 50px 10px 20px",color:"white",}} type='email' placeholder='Enter your Email' required 
     value={email}
     onChange={ (e)=>setEmail(e.target.value)}
     autoComplete='on'
     />
     <MdEmail style={{position:"absolute",right:"7%",top:"10px"}} />
   </div>

    {/*---------------------------------Password------------------------------------------------------ */}
    
    <div style={{margin:"30px 30px ",display:'flex',alignContent:'center',justifyContent:"center",height:"40px",position:"relative",}}>
    <input  style={{borderRadius:"40px",width:"400px",background:'transparent',padding:"10px 50px 10px 20px",color:"white"}} type={showPassword ? "text":"password"} placeholder='Enter your Password' required
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    autoComplete='on'
    />
   
   <FaLock style={{position:"absolute",right:"7%",top:"10px",}}
   onClick={()=>
    
   setShowPassword((prev) => !prev)
   
  }
   />
   </div>
   

   {/* ------------------------------Login--------------------------------------------------------------*/}

    <div style={{margin:"50px 0px ",display:'flex',alignContent:'center',justifyContent:"center",height:"50px"}}>
    <div style={{margin:"10px 30px",height:"40px",width:'100px'}}>
    <button type="submit"
     style={{textDecoration:'none',width:"100%",height:"40px",borderRadius:"10px",}}>
      {loding?'Logging...':'Login'}
      </button>
    </div>

    {/*--------------------------------------SignUP-------------------------------------------------*/}
    
    <Link to="/SignUP" style={{margin:"10px 30px",height:"40px",width:'100px'}} >
    <button style={{textDecoration:'none',width:"100%",height:"40px",borderRadius:"10px",}} >
     Sign Up
    </button>
    </Link>
   
    </div>

    {/*--------------------------------------------Foget password--------------------------------------*/}
    <div style={{float:"right",margin:"20px 30px"}}>
    <Link to="/ForgetPassword">Forget-Password</Link>
    </div>
    

  </form>
    
    
    
  
    </div>
   
  )
}

export default Login
