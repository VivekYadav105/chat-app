import { Tooltip } from 'react-tooltip'
import AddChat from './addChat'
import { useContext } from 'react';
import {  ChatContext, UserContext } from '../contexts';

function SideNav({setChatType,chatType,setModalInfo}){
    const {user} = useContext(UserContext)
    const {chatState,chatDispatch} = useContext(ChatContext)

    function changeChatType(type){
        if(chatState.chatId!==""){
            chatDispatch({type:"GO_BACK",payload:""})
        }
        setChatType(type)
    }

    return(
        <section className="sideNav fixed flex pb-3 z-50 flex-col top-0 l-0 bg-secondary h-screen justify-between">
            <div className="chat-sort-icons relative p-2">
                <span className="logo mb-3 absolute top-0 left-1/2 -translate-x-1/2 p-2 bg-primary border-dark rounded-sm w-full flex justify-center border-b-2">
                    <img src="/icons/logo.svg" alt="logo" />
                </span>
                <ul className="flex flex-col gap-2 pt-16">
                        <li data-tooltip-id="user_chat" data-tooltip-content="view users" data-tooltip-place="left" className={`p-1 rounded-full text-lg ${chatType=="indivisual"?"bg-primary":"bg-secondary hover:bg-opacity-10 duration-200 hover:bg-white"} shadow-xl shadow-dark border-[1px] border-primary`} aria-roledescription="chats" onClick={()=>changeChatType("indivisual")}>
                            <img src="/icons/user_chat.svg" className="m-auto" width={20} height={20} alt="" />
                            <Tooltip className='rounded-3xl text-primary font-mono font-semibold' id="user_chat"/>
                        </li>

                        <li data-tooltip-id="group_chat" data-tooltip-content="View groups" data-tooltip-place="left" className={`p-1 rounded-full text-lg ${chatType=="group"?"bg-primary":"bg-secondary hover:bg-opacity-10 duration-200 hover:bg-white"} shadow-xl shadow-dark border-[1px] border-primary`} aria-roledescription="groups" onClick={()=>changeChatType("group")}>
                            <Tooltip className='rounded-3xl text-primary font-mono font-semibold' id="group_chat"/>
                            <img src="/icons/group_chat.svg" alt='' className="m-auto" width={20} height={20} />
                        </li>
                </ul>
            </div>
            <div className="chat-icons p-2">
            <ul className="flex flex-col gap-2 pt-16 relative">
                    <li data-tooltip-id="add_chat" data-tooltip-content="add group or indivisual chat" data-tooltip-place="left" className='relative' aria-roledescription="chats" >
                        <img src="/icons/new_chat.svg" width={30} height={30} alt="" className={`p-1 rounded-full text-lg relative bg-white py-2 hover:bg-opacity-10 duration-200 hover:bg-white shadow-xl shadow-dark`} onClick={()=>setModalInfo((prev)=>({...prev,active:true,type:"groupChat",name:"Add new Group Chat"}))}/>
                        <Tooltip className='rounded-3xl text-primary font-mono font-semibold' id="add_chat"/>
                    </li>
                    <li className='relative' data-tooltip-id="show_invites" data-tooltip-content="show invites" data-tooltip-place="left"  aria-roledescription="invites">
                        <img src="/icons/invite.png" width={30} height={30} alt="" className={`p-1 rounded-full text-lg relative bg-secondary border-primary border-2 hover:bg-primary duration-200 shadow-xl shadow-dark`} onClick={()=>setModalInfo((prev)=>({...prev,active:true,type:"invite",name:"Invite section"}))}/>
                        <Tooltip className='rounded-3xl text-primary font-mono font-semibold' id="show_invites"/>
                    </li>

            </ul>
            </div>
            <div className="profile-icons p-2">
                <ul className="flex flex-col gap-2">
                    <li data-tooltip-id="settings" data-tooltip-content="settings" data-tooltip-place="left" className="p-1 rounded-full text-lg bg-dark" aria-roledescription="settings" onClick={()=>setModalInfo((prev)=>({...prev,active:true,type:"settings",name:"Settings section"}))}>
                        <img src="/icons/setting.svg" className="m-auto" alt="setting" width={20} height={20}/>
                        <Tooltip className='rounded-3xl text-primary font-mono font-semibold' id="settings"/>

                    </li>
                    <li data-tooltip-id="profile" data-tooltip-content="view profile" data-tooltip-place="left" className="p-1 rounded-full text-lg bg-dark" aria-roledescription="profile-info">
                        <img src={user.profilePic} width={30} height={30} alt="" className={`p-1 rounded-full text-lg relative bg-secondary border-primary border-2 hover:bg-primary duration-200 shadow-xl shadow-dark`} onClick={()=>setModalInfo((prev)=>({...prev,active:true,type:"profile",name:"Profile section"}))}/>
                        <Tooltip className='rounded-lg text-primary font-mono font-semibold' id="profile"/>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default SideNav;