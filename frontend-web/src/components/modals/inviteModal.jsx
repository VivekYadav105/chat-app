import SearchBar from "../../ui/search";
import { useContext, useEffect, useState } from "react";
import Input from '../../ui/input'
import {ButtonAmetyst} from '../../ui/button'
import useFetch, { apiInstance } from "../../hooks/useFetch";
import endpoints from '../../api/endpoints'
import {BounceLoader} from 'react-spinners'
import { UserContext ,ToastContext} from "../../contexts";
import { ContactContext } from "../../contexts/contactContext";

export default function InviteModal(){
    const {user} = useContext(UserContext)
    const {contactDispatch} = useContext(ContactContext)
    const {setToastMsg} = useContext(ToastContext)
    const [invites,setInvites] = useState([])
    const [userDetail,setUserDetail] = useState()
    const [type,setType] = useState("all")

    function handleSubmit(e){
        e.preventDefault()
        const {contact} = e.target
        if(contact.value) setUserDetail(contact.value)
    }

    function parseDate(time){
        return time.substr(0,10)
    }

    function parseTime(time){
        let k = time.substr(12,4)
        let day = "Am"
        k = k.split(":")
        if(Number(k[0])>12){
            k[0] = String(Number(k[0])-12)
            day = "Pm"
        }
        return k.join(":")+" "+day
    }

    async function acceptInvite(id){
        const res = await apiInstance.put(`${endpoints.getInvites(id)}`, { inviteStatus: "accepted" }, { headers: { 'Authorization': `Bearer ${user.token}` } });
        const {data} = res
        setInvites((prev)=>{
            return prev.map((i)=>{
                if(i._id==id){
                    i.inviteStatus = data.response.invite.inviteStatus
                }
                return i
            })
        })
        contactDispatch({type:"ADD_CONTACT",payload:data.response.contact})
    }

    function deleteInvite(id){
        apiInstance.delete(`${endpoints.deleteInvite(id)}`,{headers:{'Authorization':`Bearer ${user.token}`}})
        setInvites((prev)=>(prev.filter((item)=>item._id!==id)))
    }

    const [getData,error,loading] = useFetch({url:endpoints.getInvites,method:'get',config:{user}})

    useEffect(()=>{
        if(getData){
            setInvites(getData.response)
        }
    },[getData])

    useEffect(()=>{
        if(userDetail){
            async function fetchData(){
                try{

                    const res = await apiInstance.post(endpoints.sendInvite,{contact:userDetail},{headers:{'Authorization':`Bearer ${user.token}`}})
                    if(res.status==200){
                        setInvites((prev)=>([...prev,res.data.response]))
                        setToastMsg({type:"success",message:"invitation sent successfully."})
                    }else if(res.status==204){
                        setToastMsg({type:"success",message:"User is invited via Mail"})
                    }
                    setUserDetail("")
                }
                catch(err){
                    console.log(err)
                }
            }
            fetchData()    
        }
    },[userDetail])

    useEffect(()=>{
    },[invites,type])

    return(
        <section>
        <div className="px-4 py-2 bg-dark" id="send-invite">
            <SearchBar></SearchBar>
        </div>    
        <h1 className="font-mono text-white pt-3 ps-3 mx-2 border-b-2">Invites</h1>
        <div className="flex justify-center items-center gap-1 border-2 w-fit m-auto rounded-md mt-2 shadow-sm border-primary shadow-dark">
            <button onClick={()=>{setType("sent")}} className={`p-1 px-2 rounded-md text-md relative hover:bg-primary duration-200 hover:opacity-90 ${type=="sent"?"bg-primary":"bg-secondary"}`}>Sent</button>
            <button onClick={()=>{setType("received")}} className={`p-1 px-2 rounded-md text-md relative hover:bg-primary duration-200 hover:opacity-90  ${type=="received"?"bg-primary":"bg-secondary"}`}>received</button>
            <button onClick={()=>{setType("all")}} className={`p-1 px-2 rounded-md text-md relative hover:bg-primary duration-200 hover:opacity-90  ${type=="all"?"bg-primary":"bg-secondary"}`}>All</button>
        </div>
        <div className="space-y-2 overflow-y-scroll pt-3 h-[300px] px-1 mx-1" id="invites">
            {
                loading?<BounceLoader className="text-primary m-auto"></BounceLoader>:
                invites.length?
                invites.filter((i)=>{
                    if(type==="sent") return i.sender.userName == user.userName
                    else if(type==="received") return i.receiver.userName == user.userName
                    else return true
                })
                .map((ele)=>(
                    <article className="group invite w-full h-16 flex gap-2 overflow-hidden relative rounded-sm border-[1px] border-primary" key={ele._id}>
                    <div className="flex items-center w-fit h-full ps-2">
                        <img src={ele.receiver.profilePic} className="rounded-full bg-primary" alt="img" height={50} width={50}/>
                    </div>
                    <article className="flex items-center">
                        <p className="invitation-header flex flex-col relative">
                            <span className="text-lg text-primary text-center">{ele.receiver.userName}</span>
                            <span className="text-xs text-white ps-2">{ele.inviteStatus}</span>
                        </p>
                    </article>
                    <span className="absolute top-2 right-3 text-xs text-light-text">{parseDate(ele.timeStamp)}</span>
                    <span className="absolute top-6 right-3 text-[7.5px] text-light-text">{parseTime(ele.timeStamp)}</span>
                    <div className="flex items-center absolute h-full px-2 right-0 top-1/2 -translate-y-1/2 translate-x-full gap-2 duration-150 bg-dark group-hover:translate-x-0">
                        <img className="p-1 duration-300 hover:bg-primary rounded text-red-300" src="/icons/delete.png" style={{width:"32px",aspectRatio:"1 / 1"}} onClick={()=>deleteInvite(ele._id)}/>
                        {user.userName==ele.receiver.userName&&<img className="p-1 duration-300 hover:bg-primary rounded text-red-300" src="/icons/accept.svg" style={{width:"35px",aspectRatio:"1 / 1"}} onClick={()=>acceptInvite(ele._id)}/>}
                    </div>
                </article>
                )):<article className="border-2 border-dashed border-primary rounded-sm p-2">
                    <h1 className="text-primary text-center my-3">No invites</h1>
                </article>
            }
        </div>
        <h1 className="font-mono text-white pt-3 ps-3 mx-2 border-b-2">Send Invite</h1>
        <div className="">
            <form className="pt-5 flex flex-col gap-2 m-auto items-center justify-center" onSubmit={handleSubmit}>
                <Input name="contact" label="Username or email" required={true}></Input>
                <ButtonAmetyst>Send</ButtonAmetyst>
            </form>
        </div>
    </section>
    )
}