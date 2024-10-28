import { useContext, useEffect, useRef, useState } from "react";
import ChatTile from "./base/chatTile";
import SearchBar from "../ui/search";
import { ChatContext, UserContext } from "../contexts";
import {PacmanLoader} from 'react-spinners';


function ChatTileSection(props){
    const {chatState,chatDispatch} = useContext(ChatContext)
    const [searchQuery,setSearchQuery] = useState()

    useEffect(()=>{
        console.log(props.chats)
    },[props.chats])
    

    useEffect(()=>{
    },[searchQuery])

    return(
        <section className="contact-section flex flex-col gap-2 p-2 bg-dark shadow-md border-e-2 border-primary h-screen">
            <div className="pb-3 space-y-2 border-b-[1px] border-secondary">
            <h1 className="text-2xl text-center text-white">{props.chatType=="indivisual"?"User":"Group"} Chat</h1>
            <div className="max-w-sm">
                <SearchBar setSearchQuery={setSearchQuery}></SearchBar>
            </div>
            </div>
            <div className="chats-wrapper relative overflow-auto flex gap-2 justify-center flex-col items-center">
                {props.loading&&<PacmanLoader className="text-primary" color="#7754B2" size={30}/>}
                {!props.loading&&props.chats&&(
                    searchQuery?(
                        props.chats.filter((i)=>i.chatName.includes(searchQuery)).length === 0 ? (
                            <h1 className="text-primary text-2xl text-center font-mono inline-block m-auto">
                              No chats with {searchQuery} are found
                            </h1>
                          ) :
                        props.chats.filter((i)=>{
                            return i.chatName.includes(searchQuery)})
                                   .map(i=><ChatTile onClick={()=>chatDispatch({
                                                type:"SET_CHAT",
                                                payload:{
                                                    chatId:i.chatId,
                                                    chatName:i.chatName,
                                                    chatImage:i.profilePic,
                                                    isGroupChat:i.chatType==="group",
                                                    users:i.users
                                                }
                                                })} 
                                            key={i.chatId} 
                                            profilePic={i.profilePic} 
                                            userName={i.chatName} 
                                            lastMessage={i.lastMessage&&i.lastMessage.content}
                                            active={chatState.chatId==i.chatId}>
                                            </ChatTile>)
                    ):
                    (
                        props.chats.filter((ele)=>ele.chatType==props.chatType).length?(
                        props.chats.filter((ele)=>ele.chatType==props.chatType).map((i)=>{
                            return <ChatTile onClick={()=>chatDispatch({
                                                            type:"SET_CHAT",
                                                                payload:{
                                                                    chatId:i.chatId,
                                                                    chatName:i.chatName,
                                                                    chatImage:i.profilePic,
                                                                    isGroupChat:i.chatType==="group",
                                                                    users:i.users
                                                                }
                                                            })} 
                                            key={i.chatId} 
                                            profilePic={i.profilePic} 
                                            userName={i.chatName} 
                                            active={chatState.chatId==i.chatId}
                                            lastMessage={i.lastMessage&&i.lastMessage.content}
                                            messageState={i.lastMessage&&i.lastMessage.timeStamp}
                                            lastMessageSender = {i.lastMessage&&i.lastMessage.sender.userName}
                                            ></ChatTile>
                        })):(<h1 className="text-primary">No {props.chatType} Chats</h1>)
                    )
                    
                )}
            </div>
        </section>
    )
}

export default ChatTileSection; 