import { useContext, useState } from "react"
import { ChatContext,UserContext,ToastContext, ChatListContext} from "../contexts"
import {apiInstance} from '../hooks/useFetch'
import endpoints from "../api/endpoints"

function ChatMenu(props){
    const {chatState,chatDispatch} = useContext(ChatContext)
    const {chatListDispatch} = useContext(ChatListContext)
    const {user} = useContext(UserContext)
    const {setToastMsg} = useContext(ToastContext)

    async function deleteChat(){
        const res = await apiInstance.get(`${endpoints.deleteChat(chatState.chatId)}`,{headers:{'Authorization':`Bearer ${user.token}`}})
        if(res.status==200){
            setToastMsg({type:"success",message:res.data.message})
            chatDispatch({type:"DELETE_CHAT"})
            chatListDispatch({type:"DELETE_CHAT",payload:{chatId:chatState.chatId}})
        }else{
            setToastMsg({type:"error",message:"Failed to delete chat"})
        }
    }

    async function addContact(){
        try{
            const res = await apiInstance.post(endpoints.sendInvite,{contact:chatState.users[0].userName},{headers:{'Authorization':`Bearer ${user.token}`}})
            if(res){
                setToastMsg({type:"success",message:"invitation sent successfully"})
                // props.setChats((prev)=>(prev.filter(i=>i._id!==chatState.chatId)))
            }else{
                setToastMsg({type:"error",message:"Failed to delete chat"})
            }
        }catch(err){
            console.log(err);
        }
    }


    return(
        <ul className={`profile-menu bg-dark-200 absolute z-50 right-1 top-[50px] text-white rounded backdrop-blur-sm p-2 w-fit ${!props.activeMenu&&"hidden"}`}>
            {!chatState.isGroupChat&&<li className='p-1 hover:bg-primary rounded duration-150'>View Profile</li>}
            
            <li className='p-1 hover:bg-primary rounded duration-150'>View Media</li>
            {chatState.isGroupChat&&(
                <>
                    <li className="cursor-pointer p-1 hover:bg-primary rounded duration-150">Change Admin</li>
                    <li className="cursor-pointer p-1 hover:bg-primary rounded duration-150">Group Info</li>
                    <li className='cursor-pointer p-1 hover:bg-primary rounded duration-150'>View Users</li>
                    <li className='cursor-pointer p-1 hover:bg-primary rounded duration-150' onClick={deleteChat}>Delete Group</li>
                </>
            )}
            {!chatState.isGroupChat&&(
            <>
            <li className='cursor-pointer p-1 hover:bg-primary rounded duration-150' onClick={addContact}>Add Contact</li>
            <li className='cursor-pointer p-1 hover:bg-primary rounded duration-150' onClick={deleteChat}>Delete Chat</li>            
            </>
            )}
        </ul>
    )
}

export default ChatMenu
