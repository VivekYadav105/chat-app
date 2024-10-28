import ChatTileSection from "../components/chatTileSection";
import ChatSection from "../components/chatSection";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { ChatContext, ChatListContext, UserContext } from "../contexts";
import useFetch from "../hooks/useFetch";
import endpoints from "../api/endpoints";
function ChatPage(props){
    const {chatState} = useContext(ChatContext)
    const {user} = useContext(UserContext)
    const {chatList,chatListDispatch} = useContext(ChatListContext)
    const [chats,setChats] = useState([]);
    const [loading,setLoading] = useState(true)

    useFetch({url:endpoints.getChats,method:"get",config:{user}},[],(data)=>{
        if(data){
            console.log("from date:",data.response)
            chatListDispatch({type:"SET_CHAT_LIST",payload:data.response})
            setLoading(false)
        }
    })

    useEffect(()=>{
        if(chatList){
            console.log(chatList);
            setChats(() => chatList.flatMap((ele) => {
                const {users} = ele
                const receiver = users.filter((i)=>i.userName!==user.userName)
                return ele.chatType==="group"?{...ele,chatId:ele._id}:{users:receiver,chatId:ele._id,chatType:ele.chatType,chatName:ele.chatName||receiver[0]&&receiver[0].userName,lastMessage:ele.lastMessage,profilePic:ele.groupPic}
          }))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[chatList])

    return(
        <section className="chat-page-wrapper ps-12 grid grid-cols-12 grid-flow-col">
            <div className={`col-span-12 ${!chatState.chatId?"":"hidden"} sm:grid sm:col-span-4 lg:col-span-3`}>
                {chats&&<ChatTileSection loading={loading} chats={chats} chatType={props.chatType}></ChatTileSection>}
            </div>
            <div className={`shadow-lg shadow-dark col-span-12 ${chatState.chatId?"":"hidden"} sm:grid sm:col-span-9 md:col-span-8 lg:col-span-9`}>
                {chatState.chatId?<ChatSection loading={loading} chats={chats} setChats={setChats}></ChatSection>:
                    <h1 className="text-primary text-2xl text-center inline-block m-auto">Please select the chat to view</h1>
                }
            </div>
        </section>
    )
}

export default ChatPage