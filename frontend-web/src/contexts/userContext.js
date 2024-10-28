import React from "react"
import useSessionStorage from '../hooks/useSessionStorage'
import useSocket from "../hooks/useSocket";


const inialState = {userName:"",token:"",profilePic:"",email:""}
const UserContext = React.createContext(inialState);

export default function UserProvider(props){
    const [user,setUser] = useSessionStorage("user",{})
    const [socket] = useSocket(user)
    return(
        <UserContext.Provider value={{user,setUser,socket}}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext};