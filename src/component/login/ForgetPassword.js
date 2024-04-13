import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import { MdEmail } from "react-icons/md";
import axios from 'axios';


function ForgetPassword() {
    const [email , setEmail]= useState("");
    const [sendedOTP,setSendedOTP]=useState("");
    const [OTP , setOTP]= useState("");
    const [sendPassword,setSendPassword] = useState("")
    const [displayPassword,setDisplayPassword]= useState("");

//------------------------send-------otp--to---user---gmail------------------------------------
const sendOTP=async (e)=>{
    e.preventDefault() 
    setDisplayPassword("")
 if (email !== '')  {
  let otp=[];
  for(let i=0;i<=5;i++){
    let c=Math.floor(Math.random()*10)
     otp+=c
  }

  setSendedOTP(otp)
  
  try{
  const result= await axios.post(`${REACT_APP_BACKEND_URL}/FargotPassword`,{email,otp});
  setSendPassword(result.data[0]["password"])
  }
catch(err){
   setDisplayPassword("No user exist")
  }
}
 else{
   setDisplayPassword("Enter your Email")
 }
  
   
}
//--------------------------check---user--enter-----otp--------------------------------------------

const checkOTP=async(e)=>{

    e.preventDefault() 
   
   if (OTP===sendedOTP){
   
      setDisplayPassword(` Your Password : ${sendPassword}`)
      setTimeout(()=>{
         setEmail("")
          setDisplayPassword("") 
          setSendedOTP("")
          setOTP("")
      },10000)
     
   }

   else{
       setDisplayPassword(`Ivalid OTP`)
   }
    
}


  return (

    <div style={{overflow:"auto",backgroundSize:"cover",backgroundImage:"url('https://img.freepik.com/free-photo/space-background-realistic-starry-night-cosmos-shining-stars-milky-way-stardust-color-galaxy_1258-154643.jpg')",alignContent:"center",justifyContent:'center',color:'white',display:'flex',height:'100vh',minWidth:"600px"}} >
      
      <div style={{ marginTop:"100px",backgroundSize:"cover",borderRadius:"30px",height:"fit-content",width: "auto",background:"Black",justifyContent:"center",alignContent:"center",border:"1px solid white",padding:'30px'}}>
         
      <h1 style={{textAlign:'center',margin:'30px'}}>Forget-Password</h1>

         
         <div style={{margin:"10px 30px ",display:'flex',alignContent:'center',justifyContent:"center",height:"40px",position:"relative",}}>
            <input style={{borderRadius:"40px",width:"400px",background:'transparent',padding:"10px 50px 10px 20px",color:"white",}} type='email' placeholder='Enter your Email' required 
            value={email}
            onChange={ (e)=>setEmail(e.target.value)}
            autoComplete='on'
            />
            <MdEmail style={{position:"absolute",right:"7%",top:"10px"}} />
         </div>       
{/*---------------------------OTP------Button---------------------------------------------*/}
        
         <div style={{margin:"10px 30px",height:"40px",display:'flex',justifyContent:'center'}}>   
            <button onClick={sendOTP}
               style={{margin:'0px 30px',height:"40px",borderRadius:"20px",width:'140px'}} >
               Send OTP
            </button>
        </div>
         
       
{/*--------------------------Enter-------OTP------HERE-----------------------------------------*/}     
         
         <div style={{margin:"10px 30px ",display:'flex',alignContent:'center',justifyContent:"center",height:"40px",position:"relative",}}>
            <input style={{borderRadius:"40px",width:"400px",background:'transparent',padding:"10px 50px 10px 20px",color:"white",}} type='text' placeholder='Enter OTP' required 
            value={OTP}
            onChange={ (e)=>setOTP(e.target.value)}
            autoComplete='on'
            />
            <MdEmail style={{position:"absolute",right:"7%",top:"10px"}} />
         </div>
{/*------------------------------------OTP---Submit---------------------------------------------*/}

         <div style={{margin:"10px 30px",height:"40px",display:'flex',justifyContent:'center'}}>   
            <button onClick={checkOTP}
               style={{margin:'0px 30px',height:"40px",borderRadius:"20px",width:'140px'}} >
               submit
            </button>
        </div>
{/*----------------------------------------Diaplay---password--------------------------------*/}        
        <div style={{height:'30px',display:'flex',alignContent:'center',justifyContent:'center',margin:'20px',}}>
            
           { displayPassword}

    
        </div> 
        <div style={{float:'right',fontSize:'20px',bottom:'10px'}}>
         Go To :
         <Link to='/' style={{margin:'10px'}}>Login</Link>
        </div>
      </div>

    </div>
  )
}

export default ForgetPassword
