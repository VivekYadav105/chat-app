import { createContext, useContext, useEffect, useReducer, useState } from "react";
import useFetch from "../hooks/useFetch";
import { UserContext } from "./userContext";
import contactReducer from "../reducers/contactReducer";
import endpoints from "../api/endpoints";

const ContactContext = createContext({})

function ContactProvider(props){
    const {user} = useContext(UserContext)
    const [contacts,contactDispatch] = useReducer(contactReducer,[])

    useFetch({url:endpoints.getContacts,method:"get",config:{user}},[user],(data,error,loading)=>{
        if(data){
          console.log(data);          
          contactDispatch({type:"SET_CONTACTS",payload:data.response})
          console.log("contacts:",data.response.contacts)
        }
      })

    return(
        <ContactContext.Provider value={{contacts,contactDispatch}}>
            {props.children}
        </ContactContext.Provider>
    )    
}

export default ContactProvider
export {ContactContext}