import React from 'react'
// import { useState } from 'react'

function PopError({message}) {
   
  return (
    <div style={{margin:'10px',background:'black',border:'2px solid red',borderRadius:'10px',width:'300px',
                 float:'right',transition:'ease-in-out 0.5s',fontSize:'20px'}}>
       <div style={{diaplay:'flex',justifyContent:'center',margin:'25px 20px',alignContent:'center'}}>
        {message}
       </div>
        
    </div>
  )
}

export default PopError
