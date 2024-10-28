import { useEffect, useState } from 'react'
import InviteModal from './inviteModal'
import GroupChatModal from './chatModal'
import SettingsModal from './settingsModal'
import ProfileModal from './profileModal'

function Modal({modalInfo,setModalInfo}){
    const [transition,setTransition] = useState(modalInfo.active)

    useEffect(() => {
        if (!modalInfo.active) {
          setTransition(true);
          const timeout = setTimeout(() => {
            setTransition(false);
          }, 500);
          return () => clearTimeout(timeout);
        }
      }, [modalInfo.active]);
    
    return(
        <section className={`fixed left-14 top-0 duration-500 ${modalInfo.active?'translate-x-0':'-translate-x-[calc(100%+10px)]'}`}>
        <div className="bg-secondary overflow-y-scroll relative sm:w-[300px] w-[calc(100vw-50px)] h-screen" id="invite-modal">
            <div className="header flex justify-between items-center p-2 border-b-2 border-white">
                <h1 className="Invites Section text-white text-xl font-mono uppercase font-bold">{modalInfo.name}</h1>
                <span className="border-2 border-secondary hover:cursor-pointer hover:bg-dark hover:border-primary p-1 rounded-full duration-300 close-icon" onClick={()=>setModalInfo((prev)=>({...prev,active:false}))}>
                    <img src='/icons/close.svg' alt='x'/>
                </span>
            </div>
            {modalInfo.type=="invite"&&<InviteModal></InviteModal>}
            {modalInfo.type=="profile"&&<ProfileModal></ProfileModal>}
            {modalInfo.type=="groupChat"&&<GroupChatModal></GroupChatModal>}
            {modalInfo.type=="settings"&&<SettingsModal>settings section</SettingsModal>}
        </div>
        </section>
    )
}

export default Modal

export {InviteModal}