import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react"
import chatDispatch from "../../reducers/chatReducer"
import { ContactContext, ToastContext, UserContext } from "../../contexts"
import { apiInstance } from "../../hooks/useFetch"
import { type } from "@testing-library/user-event/dist/type"
import endpoints from "../../api/endpoints"

const ProfileMenu = forwardRef((props,ref)=>{
    const [menu,setMenu] = useState({id:"",active:false,index:1})
    const {setToastMsg} = useContext(ToastContext)
    const {contacts,contactDispatch} = useContext(ContactContext)
    const {user} = useContext(UserContext)
    useImperativeHandle(ref,()=>({
        changeMenu(id,new_index){
            setMenu((prev)=>(prev&&(prev.id==id?{...prev,active:!prev.active}:{...prev,id:id,index:new_index,active:true})))
        }
    }))

    function deleteContact(id){
        apiInstance.get(endpoints.deleteContact(id),{headers:{'Authorization': 'Bearer ' + user.token}})
        .then((res)=>{
            const {data} = res
            setToastMsg({type:"success",message:data.message})
            contactDispatch({type:'SET_CONTACTS',payload:data.response})
        })
        .catch(err=>{
           const {data} = err?err.response:""
           setToastMsg({type:"error",message:data.message})
        })
    }
    
    function sendMsg(id){
        setMenu((prev)=>({...prev,active:false}))
        let chat = props.chats.filter((i)=>(i.chatType==="indivisual"&&i.users.find((ele)=>(ele._id===id))))
        if(chat) chatDispatch({type:"SET_CHAT",payload:{chatId:chat._id}})
        else setToastMsg({type:"info",message:"chat doesn't exist.\nPlease create the indivisual Chat"})
        setMenu((prev)=>({...prev,active:true,type:"groupChat"}))
    }
    

    useEffect(()=>{
    },[menu])
    return(
        <ul ref={ref} className={`profile-menu bg-dark-200 absolute z-50 right-1 top-0 text-white rounded backdrop-blur-sm p-2 w-fit ${!menu.active&&"hidden"}`} style={{transform:`translateY(${menu.index*50+30}px)`}}>
            <li className='p-1 hover:bg-primary rounded duration-150'>View Profile</li>
            <li className='p-1 hover:bg-primary rounded duration-150' onClick={()=>deleteContact(menu.id)}>Remove Contact</li>
            <li className='p-1 hover:bg-primary rounded duration-150'>View Media</li>
            <li className='p-1 hover:bg-primary rounded duration-150 hover:cursor-pointer' onClick={()=>sendMsg(menu.id)}>Send Message</li>
        </ul>
    )
})

export default ProfileMenu