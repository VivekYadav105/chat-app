import { apiInstance } from "../hooks/useFetch"
import { Button, ButtonAmetyst, ButtonPrimary } from "../ui/button"
import Input from "../ui/input"
import { useContext } from "react"
import { ToastContext, UserContext, ChatContext, ChatListContext } from "../contexts"
import { type } from "@testing-library/user-event/dist/type"
import endpoints from "../api/endpoints"

function CreateChat(props){
    const {setToastMsg} = useContext(ToastContext)
    const {user} = useContext(UserContext)
    const {chatListDispatch} = useContext(ChatListContext)
    

    function createChat(contact){
        apiInstance.post(endpoints.createChat,{users:[contact],chatType:"indivisual"},{headers:{'Authorization': 'Bearer ' + user.token}})
            .then((res)=>{
                const {data} = res
                console.log(data);
                if(data.status===201){
                    setToastMsg({type:"success",message:data.message})
                    chatListDispatch({type:"SET_CHAT_LIST",payload:data.response})
                }
                else if(data.status===200) {
                    setToastMsg({type:'success',message:data.message})
                }
            })
            .catch(err=>{
               console.log(err)
               const {data} = err?err.response:""
               setToastMsg({type:"error",message:data.message})
            })
    }   

    function handleSubmit(e){
        e.preventDefault()   
        const {contact} = e.target
        createChat(contact.value)
    }

    return(
        <section className="bg-dark rounded-xl p-2">
            <h1 className="text-lg uppercase pb-3 text-center font-medium text-white">Indivisual Chat</h1>
            <form className="flex gap-2 items-center" onSubmit={handleSubmit}>
                <Input inputStyles={`rounded-xl py-2`} labelStyles={`text-xs`} label="Enter email or username" name="contact" placeholder="Enter email or username" required="true"></Input> 
                <ButtonPrimary type="submit">Add</ButtonPrimary>
            </form>            
        </section>
    )
}

export default CreateChat