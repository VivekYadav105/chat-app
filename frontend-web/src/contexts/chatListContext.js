import React,{useReducer} from "react";
import chatListReducer from "../reducers/chatListReducer";
import { useEffect } from "react";

const ChatListContext = React.createContext([]);

export default function ChatListProvider(props){
    const [chatList,chatListDispatch] = useReducer(chatListReducer,[])

    useEffect(()=>{
        console.log(chatList);
    },[chatList])

    return(
        <ChatListContext.Provider value={{chatList,chatListDispatch}}>
            {props.children}
        </ChatListContext.Provider>
    )
}

export {ChatListContext}