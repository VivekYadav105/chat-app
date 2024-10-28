import Input from "../../ui/input";
import { Button, ButtonAmetyst } from "../../ui/button";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { ToastContext, UserContext,ChatListContext } from "../../contexts";
import endpoints from "../../api/endpoints";


function CreateGroup(props){
    const [chatInfo,setChatInfo] = useState()
    const {user} = useContext(UserContext)
    const {chatListDispatch} = useContext(ChatListContext)
    const {setToastMsg} = useContext(ToastContext)    

    function handleSubmit(e){
        e.preventDefault()
        const chatName = e.target.chatName.value
        const users = props.selectedContacts.map((i)=>(i._id))
        setChatInfo({chatName,users,chatType:"group"})
    }

    useFetch({url:endpoints.createChat,method:"post",postData:chatInfo,config:{user}},[chatInfo],(data,error,loading)=>{
        if(data){
            console.log(data);
            setToastMsg({type:"success",message:"Chat created successfully"})
            chatListDispatch({type:"SET_CHAT_LIST",payload:data.response})
        }
    })
    
    return(
        <section className="fixed top-1/2 left-[50vw] -translate-x-1/2 w-screen max-w-[300px] -translate-y-1/2 flex flex-col bg-secondary shadow-lg pt-3 rounded-lg">
            <header className="flex justify-evenly items-center pb-2 border-b-2 border-white">
                <div className="logo">
                    <img src="/icons/logo.svg" alt="" width={30} height={30} />
                </div>
                <span className="heading text-white">Create Group</span>
                <button className='bg-white rounded-full text-sm' onClick={()=>props.setGroupPane(false)}>
                    <img src="/icons/close.svg" alt="x" className='rounded-full' width={20} height={20} />
                </button>
            </header>
            <form className="mt-3 m-auto" onSubmit={handleSubmit}>
                <Input name="chatName" label="chatName"></Input>
                <div className="groupMembers flex p-3 gap-1">
            {props.selectedContacts.map((i)=>{
                return(
                    <article className='tag flex w-fit gap-1 items-center bg-dark-200 text-white backdrop-blur-lg p-1 text-sm rounded-md'>
                     <img src={i.profilePic} alt={i.userName} className='rounded-full bg-primary' width={20} height={20} />
                     <span className='text-sm'>{i.userName}</span>                           
                     <button className='bg-white rounded-full text-sm' onClick={()=>props.updateSelectedMembers(i._id)}>
                        <img src="/icons/close.svg" alt="x" className='rounded-full' width={20} height={20} />
                    </button>
                    </article>
                )
            })}
            </div>
            <div className="p-2 pb-3 m-auto">
                <ButtonAmetyst disabled={props.selectedContacts.length===0} type="submit">Create Group</ButtonAmetyst>
            </div>
            </form>
            
        </section>
    )
}

export default CreateGroup;