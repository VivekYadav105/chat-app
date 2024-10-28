import './main.css'
import ChatPage from './pages/chatPage'
import SideNav from './components/sideNav'
import {BrowserRouter as Router,Route,Routes, Navigate} from 'react-router-dom'
import Component from './components'
import {Auth,Reset} from './pages/auth'
import { useContext, useEffect, useState } from 'react'
import {UserContext,ChatProvider,ChatListContext,ContactContext,ContactProvider, ChatListProvider} from './contexts'
import ProtectedRoute from './components/protectedRoute'
import Modal from './components/modals'
// import useFetch from './hooks/useFetch'
// import useToast from './hooks/useToast'

function App() {
  const [chatType,setChatType] = useState("indivisual") 
  const {user} = useContext(UserContext)
  const [modalInfo,setModalInfo] = useState({active:false,type:"",name:""})

  useEffect(()=>{
    if(!user.userName||!user.token){
      setModalInfo({active:false,type:"",name:""})
    }
  },[user])


  return (      
    <ContactProvider>
      <ChatProvider>
        <ChatListProvider>
          <div className="App w-screen h-screen bg-dark">
            <Router>
                <Routes>
                  <Route path='/' element={<Navigate to={'/chat'}/>}></Route>
                    <Route path='/component' 
                      element={
                        <ProtectedRoute protectType={user.token}>
                          <Component/>
                        </ProtectedRoute>
                        }>  
                    </Route>
                    <Route path='/chat' 
                      element={
                        <ProtectedRoute protectType={user.token}>
                            <ChatPage chatType={chatType}/>
                        </ProtectedRoute>
                      }>  
                    </Route>
                    <Route path='/auth' element={user.token?<Navigate to={"/chat"}></Navigate>:<Auth></Auth>}></Route>  
                    <Route path='/forgot' element={user.token?<Navigate to={"/chat"} replace></Navigate>:<Reset></Reset>}></Route>                
                </Routes>
              {user.token&&<SideNav setModalInfo={setModalInfo} chatType={chatType} setChatType={setChatType}></SideNav>}
            </Router>
            {user.token&&modalInfo.active&&<Modal modalInfo={modalInfo} setModalInfo={setModalInfo}></Modal>}
          </div>
        </ChatListProvider>
      </ChatProvider>
    </ContactProvider>
  );
}

export default App;
