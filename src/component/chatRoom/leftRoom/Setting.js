import React, { useState,useRef, useEffect, } from 'react'
import axios from 'axios';
import Language from '../../../api_json_File/Language.json'
import { FaCirclePlus } from "react-icons/fa6";


function Setting() {
  const inputRef = useRef(null);
//-----------Cloudinary--Url---image------------------------------------------------------------------
  const [fileImage,setFileImage]=useState('')
  const[updateImage,setUpdateImage]=useState('')
  const[updateName,setUpdateName]=useState('')
  const [updatePhone,setUpdatePhone]=useState('')
  const[updatePassword,setUpdatePassword]=useState('')
  const [updateLanguage,setUpdateLanguage]=useState('')
  
  const [showPassword , setShowPassword]=useState(false)
  const [loding,setLoding] = useState(false)
  const email = sessionStorage.getItem('email')
  
  useEffect( ()=>{
    async function currentValue(){
   const currentValue = await (await axios.post(`${ process.env.REACT_APP_BACKEND_URL}/Setting`,{email})).data[0]
   
   
   setUpdateImage(currentValue['image'])
   setUpdateName(currentValue['name'])
   setUpdatePhone(currentValue['phone_number'])
   setUpdatePassword(currentValue['password'])
   setUpdateLanguage(currentValue['language'])
    }
    currentValue()
    // eslint-disable-next-line
  },[])
//------------------------upload-image to cloudnary---------------------------------------------------------
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
    
  }
}; 
//-----------------------------------------Update--User------------------------------------------------

const updateUser= async (e)=>{
  e.preventDefault()
  try{
    
    setLoding(true)
    let uploadUrl='';
    
       if(fileImage){
          
        uploadUrl= await uploadFile(fileImage); 
        
         
     }
     

      
         
          const update= await axios.post(`${ process.env.REACT_APP_BACKEND_URL}/settingUpdate`,
          {email,fileImage: uploadUrl ,updateName,updatePhone,updatePassword,updateLanguage})

//----------------------Context--Value--also updated-----------------------------------------------------------
        
          sessionStorage.setItem('password',update.data['password'])
         //  console.log(sessionStorage.getItem('password'))
        

   setLoding(false)

         
         
  }
  catch(err){
    console.log(err.response.data.error)
    setLoding(false)
  }
}



//---------------------------------------------image---ref----------------------
  const imageRef=()=>{
    
    inputRef.current.click()
    
    
  }
  const validateImage=(e)=>{
    e.preventDefault()
    const file =  e.target.files[0];
    
    setFileImage(file)
 //--- URL.createObjectURL(file) it will create file image object url---------------
    setUpdateImage(URL.createObjectURL(file))
    
    
   }

  return (
    <form onSubmit={updateUser}>
    <div style={{ 
      maxWidth: '600px', 
      maxHeight:'80vh',
      overflowY:'scroll',
      scrollbarWidth:'thin',
      scrollbarColor: 'lightgrey white',
      margin: '0 auto', 
      padding: '20px' ,
     
      
    }}>
       <h1 style={{ textAlign: 'center' }}>Setting</h1>
      <div style={{height:"120px",margin:"30px 0px ",display:'flex',alignContent:'center',justifyContent:"center",position:"relative",}}>
       <div style={{height:"120px",width:"120px",display:'flex',alignItems:'center',justifyItems:"center",position:"relative",}}>
        <img style={{width:"100px",height:'100px',borderRadius:'50%',background:'white',border:"2px solid lightgreen",cursor:"pointer"}}
          src={updateImage} 
          alt='' 
          onClick={imageRef}
        />
        <FaCirclePlus  style={{fontSize:'25px',bottom:"25px",right:"10px",position:'absolute',color:"lightgreen",cursor:"pointer",background:'white'}} 
          onClick={imageRef}
      />
      
      <input  type="file" hidden  accept='image/jpeg, image/png' 
      autoComplete='on'
      ref={inputRef}
      onChange={validateImage}
      
     />
      </div>
    </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>

        <div style={{ marginBottom: '15px' }}>
          Name:
          <input  type="text" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            autoComplete='on'
         value={updateName}
          onChange={(e)=>setUpdateName(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          Password:
          <input  type={showPassword?'text':'password'} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
            autoComplete='on'
         value={updatePassword}
          onChange={(e)=>setUpdatePassword(e.target.value)}
          />
          <input type="checkbox" style={{cursor:'pointer',fontSize:'10px',width:'20px'}} 
             autoComplete='on'
           onClick={()=>{ setShowPassword(!showPassword)}}
          /> show password
        </div>

        <div style={{ marginBottom: '15px' }}>
          Phone:
          <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
           value={updatePhone}
           onChange={(e)=>setUpdatePhone(e.target.value)}
           />
        </div>

        <div style={{ marginBottom: '15px' }}>
          Language:
          <select  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            value={updateLanguage}
            onChange={(e)=>setUpdateLanguage(e.target.value)}
          >
          {Language.map((language, index) => (
          <option key={index} value={language.code}>
            {language.name}
          </option>
        ))}
          
          </select>
        </div>

        <button style={{ width: '100%', padding: '10px', backgroundColor: 'lightgreen', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          type='submit'
          >{loding?'Updating...':'Update'}
        </button>
       </div>
     </div>
     </form>
  )
}


export default Setting;
