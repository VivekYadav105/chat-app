import {useContext, useEffect, useRef, useState} from 'react'
import useFetch from '../../hooks/useFetch'
import {ToastContext, UserContext} from '../../contexts'
import { ButtonPrimary } from '../../ui/button'
import ProfileMenu from './profileMenu'
import { ContactContext } from '../../contexts/contactContext'

function ProfileModal(){
    const {user,setUser} = useContext(UserContext)
    const {contacts} = useContext(ContactContext) 
    const {setToastMsg} = useContext(ToastContext)
    const {setContacts} = useContext(ContactContext)
    const profileMenuRef = useRef(null)

    function logOut(){
        sessionStorage.removeItem("user")
        setUser({})
        setToastMsg({type:"success",message:"User Logged out successfully"})
    }

    return(
        <>
        <div className="flex flex-col border-b-2 border-dark pb-3">
            <img src={user.profilePic} alt="ProfilePic" width={50} height={50} className="m-auto my-3 rounded-full border-2 border-primary"/>
            <article className="flex justify-evenly items-center">
            <div className="flex flex-col">
            
            <span className="text-lg text-primary w-100 block">
                <span className="text-white text-xs pe-[2px] uppercase font-mono">UserName:</span>
                {user.userName}
            </span>
            <p className="space-x-5">
            <span className="text-lg text-primary text-center">
                <span className="text-white text-xs pe-[2px] uppercase font-mono">FName:</span>
                {user.fname||"user"}
            </span>
            <span className="text-lg text-primary">
                <span className="text-white text-xs pe-[2px] uppercase font-mono">lName:</span>
                {user.lname||"user"}
            </span>
            </p>
            <span className="text-lg text-primary">
                <span className="text-white text-xs pe-[2px] uppercase font-mono">Email:</span>
                {user.email}
            </span>

            </div>
            </article>
            <div className='flex mt-3 items-center m-auto'>
                <ButtonPrimary onClick={logOut}>Log Out</ButtonPrimary>
            </div>
        </div>
        <div className='contacts flex flex-col relative'>
            <h1 className="text-xl text-white font-bold ps-3 py-2 font-mono uppercase">Contacts</h1>
            <ProfileMenu ref={profileMenuRef}></ProfileMenu>
            <div className='flex flex-col gap-2'>
            {!contacts.length?(
                <article className='text-center text-primary mb-5 border-dashed border-2 border-primary rounded-md'>
                    <h1 className='text-center text-primary'>No contacts found.<br/> Send Invites from the menu</h1>
                </article>
            ):contacts.map((ele,index)=>(
            <article key={index} className='p-2 relative h-400 rounded-sm bg-dark mx-3 flex gap-2 text-white'>
                <img src={ele.profilePic} className='rounded-md' width={30} height={30} alt="" />
                <h1 className=''>{ele.userName}</h1>
                <span className='dot rounded-full bg-green-400 w-2 h-2 absolute left-1 top-1'></span>
                <img src="/icons/options-dots.png" onClick={()=>{profileMenuRef.current.changeMenu(ele._id,index+1)}} width={30} height={10} className='border-2 p-1 border-primary aspect-square absolute right-3 top-1/2 bg-secondary hover:bg-primary duration-300 -translate-y-1/2 rounded-full shadow-lg shadow-dark' alt="" />
            </article>
                ))
            }
                </div>
            </div>
        <div className="flex flex-col border-t-2">
            <h1 className="text-xl text-white font-bold ps-3 py-2 font-mono uppercase">Groups</h1>
            <div className='py-3'>
                <article className='text-center text-primary border-dashed border-2 border-primary rounded-md'>
                    <h1 className='text-center text-primary'>No contacts found.<br/> Send Invites from the menu</h1>
                </article>
            </div>
        </div>
        </>
    )
}

export default ProfileModal