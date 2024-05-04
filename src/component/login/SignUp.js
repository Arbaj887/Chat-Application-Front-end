import React, { useState,useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaUser, FaLock ,FaPhoneAlt} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import axios from 'axios';
import PopError from './PopError';
import Language from '../../api_json_File/Language.json'


function SignUp() {
   const inputRef = useRef(null);
  const defaultImage="https://img.freepik.com/free-photo/space-background-realistic-starry-night-cosmos-shining-stars-milky-way-stardust-color-galaxy_1258-154643.jpg"
  const [image,setImage]=useState(defaultImage)
  const [userName , setUserName]= useState("");
  const [email , setEmail]= useState("");
  const [password , setPassword]=useState("");
  const [confirmPassword, setConfirmPassword]=useState("");
  const [phoneNumber , setPhoneNumber]= useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [language,setLanguage]=useState('')
  const [loding,setLoding]=useState(false)
  const [message,setMessage]=useState(undefined)
  const [displayMessage , setDisplayMessage] =useState(false)
//-------------------for--cloudniary--Upload------------------------------------------------------------
  const [fileImage,setFileImage]=useState('')
 
  


//------------------------Upload--image---to-Cloudinary--------------------------------
const uploadFile = async (fileImage) => {
   
  const data = new FormData();
  data.append('file', fileImage);
  data.append('upload_preset', 'images_preset');
  try {
    let cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
    let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
    const res = await axios.post(api, data);
    const { secure_url } = res.data;
    console.log('Image uploaded successfully:', secure_url);
    return secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    if (error.response) {
      // Cloudinary API responded with an error
      console.error('Cloudinary API Error:', error.response.data);
      const errorMessage = error.response.data.error.message || 'Unknown error occurred';
      // Displaying the error
      setMessage(errorMessage);
      setDisplayMessage(true);
      setTimeout(() => {
        setDisplayMessage(false);
      }, 8000);
    } else {
      // Other errors occurred
      console.error('Network Error:', error.message);
      setMessage('Error occurred while uploading image to Cloudinary');
      setDisplayMessage(true);
      setTimeout(() => {
        setDisplayMessage(false);
      }, 8000);
    }
    throw error; // Rethrow the error to propagate it
  }
};


//-----------------------------SignUp-in-----Database--------------------------------


const signUp = async (e)=>{
  e.preventDefault()
 
  
  if(email.endsWith("@gmail.com") && 3<password.length < 20 && password===confirmPassword ){
    try{
      setLoding(true)
//-----------------------------Calling---------UploadFile--Function---------------------------------
      let uploadUrl;  
 
    if(fileImage){
     
      uploadUrl= await uploadFile(fileImage); 
   
    
  }else{
    uploadUrl=defaultImage;
  }

  
  //-------------------connecting to--database---------------------------------------  
    const result=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/SignUp`, {fileImage:uploadUrl ,userName,email,password,phoneNumber,language})
    
     if(result.status===200){
          setMessage(result.data.message)
          
     }
     setLoding(false)
     setDisplayMessage(true)
     setTimeout(() => {
      setDisplayMessage(false);
    }, 8000);
    }
    catch(err){
      setLoding(false)
      setMessage(err.response.data.error || 'Error occurs')
      setDisplayMessage(true)
      setTimeout(() => {
       setDisplayMessage(false);
     }, 8000);
    }
  }
  else{
    setLoding(false)
    if(password!==confirmPassword){
       setMessage('Password and Confirm password must be same')
       setDisplayMessage(true)
       setTimeout(() => {
        setDisplayMessage(false);
      }, 8000);
    }
 
  }

}

//---------------------------------------------image---ref----------------------
  const imageRef=()=>{
    inputRef.current.click()
    
  }
  const validateImage=(e)=>{
    e.preventDefault()
    const file =  e.target.files[0];

//----------------Cloudniary---UseState------------------------------------------
             setFileImage(file)
 //--- URL.createObjectURL(file) it will create file image object url---------------
 
    setImage(URL.createObjectURL(file))
    
    
    
   }

  return (
  
    
 <div style={{overflow:"auto",backgroundSize:"cover",backgroundImage:`url(${defaultImage})`,alignContent:"center",justifyContent:'center',color:'white',display:'flex',height:'100vh',minWidth:"600px"}} >

{/* ---------------------------------------pop---up----Error------------------------------------------------ */}
      <div style={{position:'absolute',zIndex:'1',display:'flex',right:'40px',bottom:'40px'}}>
         {displayMessage?<PopError message={message}/>:''}

      </div>


  <form method='POST' 
   onSubmit={signUp}
  
      style={{margin:"40px",borderRadius:"30px",background:"Black",justifyContent:"center",alignContent:"center",border:"1px solid white",height:"fit-content",width:'auto'}}>
    
    <h1 style={{textAlign:'center',marginTop:'10px'}}>Sign Up</h1>

{/*--------------------------------------User----Image------------------------------------------------------------------ */}
   
     <div style={{height:"120px",margin:"30px 0px ",display:'flex',alignContent:'center',justifyContent:"center",position:"relative",}}>
      <div style={{height:"120px",width:"120px",display:'flex',alignContent:'center',justifyContent:"center",position:"relative",}}>
      <img style={{width:"100px",height:'100px',borderRadius:'50%',background:'white',border:"2px solid lightgreen",cursor:"pointer"}}
      src={image} alt=""
      onClick={imageRef}
      />
     
      <FaCirclePlus  style={{fontSize:'25px',bottom:"25px",right:"10px",position:'absolute',color:"lightgreen",cursor:"pointer",background:'black'}} 
      onClick={imageRef}
      />
      
     </div>
     
      
      <input  type="file" hidden  accept='image/jpeg, image/png' 
      ref={inputRef}
      onChange={validateImage}
      
     />
      
     </div>

{/*--------------------------------------User Name------------------------------------------------------------- */}
    <div style={{margin:"30px 30px ",display:'flex',alignContent:'center',justifyContent:"center",height:"40px",position:"relative",}}>
     <input style={{borderRadius:"40px",width:"400px",background:'transparent',padding:"10px 50px 10px 20px",color:"white",}} type='text' placeholder='Enter your Name' required 
     value={userName}
     onChange={ (e)=>setUserName(e.target.value)}
     autoComplete="on"
     />
     <FaUser style={{position:"absolute",right:"7%",top:"10px"}} />
   </div>

   {/*-----------------------------------------User-Email-------------------------------------------------------------- */}

    <div style={{margin:"30px 30px ",display:'flex',alignContent:'center',justifyContent:"center",height:"40px",position:"relative",}}>
     <input style={{borderRadius:"40px",width:"400px",background:'transparent',padding:"10px 50px 10px 20px",color:"white",}} type='email' placeholder='Enter your Email' required 
     value={email}
     onChange={ (e)=>setEmail(e.target.value)}
     autoComplete="on"
     />
     <MdEmail style={{position:"absolute",right:"7%",top:"10px"}} />
   </div>

    {/*----------------------------------------Password--------------------------------------------------------- */}
    
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

   {/*----------------------------------Confirm---Password----InputBox 3--------------------------------------------*/}

   <div style={{margin:"30px 30px ",display:'flex',alignContent:'center',justifyContent:"center",height:"40px",position:"relative",}}>
    <input  style={{borderRadius:"40px",width:"400px",background:'transparent',padding:"10px 50px 10px 20px",color:"white"}} type={showPassword ? "text":"password"} placeholder='Confirm Password' required
    value={confirmPassword}
    onChange={(e)=>setConfirmPassword(e.target.value)}
    autoComplete='on'
    />
   
   <FaLock style={{position:"absolute",right:"7%",top:"10px",}}
   onClick={()=> 
   setShowPassword((prev) => !prev)
  }
   />
   </div>
   
   {/*-------------------------------------------User--Phone---Number------------------------------------------- */}

   <div style={{margin:"30px 30px ",display:'flex',alignContent:'center',justifyContent:"center",height:"40px",position:"relative",}}>
    <input  style={{borderRadius:"40px",width:"400px",background:'transparent',padding:"10px 50px 10px 20px",color:"white"}} 
    type='tel' pattern="[0-9]{10}"
    placeholder='Enter Phone Number' required
    value={phoneNumber}
    onChange={(e)=>setPhoneNumber(e.target.value)}
    autoComplete='on'
    />
   
   <FaPhoneAlt style={{position:"absolute",right:"7%",top:"10px",}}
   onClick={()=> 
   setShowPassword((prev) => !prev)
  }
   />
   </div>
   {/*-----------------------------------Language------------------------------------------------------*/}

   <div style={{margin:"30px 30px ",display:'flex',alignContent:'center',justifyContent:"center",height:"40px",position:"relative",}}>
    <label style={{margin:"6px 20px",fontSize:"20px"}}>Select Language</label>
   
      <select  style={{width:"100px",borderRadius:"10px",background:"grey",color:"white",border:"1px solid white",padding:"0px 10px"}}
            value={language}
            onChange={(e)=>setLanguage(e.target.value)}
          >
          {Language.map((language, index) => (
          <option key={index} value={language.code}>
            {language.name}
          </option>
        ))}
          
      </select>
     
   
   </div>

   {/* -------------------------------------Login----Buttons-------------------------------------------------------*/}

    <div style={{margin:"50px 0px ",display:'flex',alignContent:'center',justifyContent:"center",height:"50px"}}>
    <Link to="/" style={{margin:"10px 30px",height:"40px"}} >
    <button  style={{textDecoration:'none',width:"100px",height:"40px",borderRadius:"10px",}}>
      Login
    </button>
    </Link>
    

    {/*--------------------------------------SignUP-------------------------------------------------*/}
    <div style={{margin:"10px 30px",width:"auto",height:"40px"}} >
    <button type="submit" style={{textDecoration:'none',width:"100px",height:"40px",borderRadius:"10px",}}>
     {loding?'Signing...':'Sign Up'}
    </button>
    </div>
    </div>

   
  </form>
    
    
    
  
    </div>
    
  )
}

export default SignUp
