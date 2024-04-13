import React, { useState } from 'react'
import UserContext from './UserContext.js'
function UserContextProvider({children}) {

  const [selectedUser, setSelectedUser] = useState(null);

  return (
   <UserContext.Provider value={{selectedUser, setSelectedUser}}>
     {children}
     
   </UserContext.Provider>
  )
}

export default UserContextProvider
