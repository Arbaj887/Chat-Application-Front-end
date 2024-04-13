import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div style={{display:'flex',justifyItems:'center',alignContent:'center',fontSize:'30px',flexDirection:'column',height:"100vh"}}>
     <div >
      404 Page Not Found...
      </div> 
      <div>
      <Link to="/" style={{cursor:"pointer"}}>Login Page</Link>
      </div>
    </div>
  )
}

export default PageNotFound
