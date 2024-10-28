import React, { useEffect, useReducer } from "react"
import chatReducer from '../reducers/chatReducer'

const ChatContext = React.createContext({});

let initialState = {
    chatId:"",
    chatName:"",
    chatImage:"",
    users:[],
    lastMessage:{
        sender:{
            userName:"",
            content:""
        }
    },
    isGroupChat:true,
    messages:[],
    chatPic:''
}


export default function ChatProvider(props){
    const [chatState, chatDispatch] = useReducer(chatReducer, initialState);

    useEffect(()=>{
        console.log("chatState:",chatState)
    },[chatState])
    return(
        <ChatContext.Provider value={{chatState,chatDispatch}}>
            {props.children}
        </ChatContext.Provider>
    )
}

export {ChatContext}