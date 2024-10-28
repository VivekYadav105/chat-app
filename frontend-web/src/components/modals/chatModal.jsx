import { useContext, useState } from 'react'
import AddChat from '../addChat'
import { ButtonPrimary } from '../../ui/button'
import { ContactContext } from '../../contexts'
import CreateGroup from './createGroup'
import ContactTile from '../base/contactTile'

function ChatModal(){
    const [selectedContacts,setSelectedContacts] = useState([])
    const [groupPane,setGroupPane] = useState(false)
    const {contacts} = useContext(ContactContext)

    function updateSelectedMembers(id){
        setSelectedContacts((prev)=>{
            if(prev.filter((ele)=>(ele._id==id)).length){
                return prev.filter((ele)=>ele._id!=id)
            }else{ 
                let k = contacts.find(ele=>ele._id===id)
                return [...prev,k]
            }
        })
    }


    return(
        <>
            <AddChat />
            <h1 className='text-lg uppercase font-mono p-2 text-white text-bold mt-5'>Group Chat</h1>
            <div className='flex gap-1 items-center p-2 flex-wrap max-h-[180px] min-h-[100px] border-2 border-ametyst rounded-xl'>
                {selectedContacts.length?selectedContacts.map((i)=>{
                    return(
                        <article className='tag flex gap-1 items-center bg-dark-200 text-white backdrop-blur-lg p-1 text-sm rounded-md'>
                         <img src={i.profilePic} alt={i.userName} className='rounded-full bg-primary' width={30} height={30} />
                         <span className='text-lg'>{i.userName}</span>                           
                         <button className='bg-white rounded-full text-sm' onClick={()=>updateSelectedMembers(i._id)}>
                            <img src="/icons/close.svg" alt="x" className='rounded-full' width={20} height={20} />
                        </button>
                        </article>
                    )
                }):<h1 className='text-primary border-dashed w-full text-sm font-bold text-center'>select contacts to create group</h1>}
            </div>
            <div className='flex flex-col gap-2 px-3 h-[300px] mt-6'>
                <h1 className='border-b-2 uppercase font-mono mx-5 px-2 text-white'>Contacts</h1>
                {contacts.length?contacts.map(
                    (i,index)=><ContactTile {...i} onClick={()=>updateSelectedMembers(i._id)}/>
                    ):<h1 className='text-primary text-center'>No contacts here</h1>
            }
            </div>
            <div className='pt-4 flex justify-center'>
                <ButtonPrimary disabled={selectedContacts.length===0} onClick={()=>{setGroupPane(true)}}>Create Group</ButtonPrimary>
            </div>
            {groupPane&&<CreateGroup selectedContacts={selectedContacts} setGroupPane={setGroupPane} updateSelectedMembers={updateSelectedMembers} />}
        </>
    )
}

export default ChatModal