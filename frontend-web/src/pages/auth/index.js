import Login from './login'
import Signup from './signup'
import './index.css'
import { useEffect, useState } from 'react'
import ForgotPassword from './forgotPassword'
import ResetPassword from './resetPassword'

function Auth(){
    const [activePage,setActivePage] = useState(0)

    return(
        <section className='flex items-center justify-center w-screen h-screen p-3'>
        <div className={`hide-scroll Auth-wrapper pt-10 sm:pt-0 container flex justify-between rounded-md relative border-2 border-secondary m-auto py-5 bg-secondary g-[20px] sm:max-w-[800px] max-w-[500px]`}>
            {/* <div className='sm:hidden absolute top-5 left-1/2 -translate-x-1/2'>
                <h1 className='bg-light-dark backdrop-blur-md text-primary font-bold text-4xl font-archivo'>Wizard Chat</h1>
            </div> */}
            <div className={`illustration hidden sm:block absolute left-0 bottom-1/2 z-50 border-2 space-y-3 border-primary translate-y-[calc(50%-.5px)] duration-300 w-[calc(50%-20px)] h-full ${activePage==0?"bg-dark translate-x-[calc(100%+40px)] rounded-r-md":"bg-dark rounded-l-md"}`}>
                <h1 className='text-3xl font-semibold text-center text-primary pt-10'>Wizard Chat</h1>
                {activePage==1?
                <img src={"/signup.jpg"} className='w-1/2 h-auto m-auto'/>
                :
                <img src={"/login.jpg"} className='w-3/4 h-auto m-auto'/>
                }                
            </div>
            <div className={`flex ${activePage==1&&"hidden"} w-full sm:w-1/2 h-full me-auto md:m-auto md:block md:w-full`}>
                <Login setActivePage={setActivePage}></Login>
            </div>
            <div className={`flex ${activePage==0&&"hidden"} w-full sm:w-1/2 ms-auto md:block md:m-auto md:w-full`}>
                <Signup setActivePage={setActivePage}></Signup>
            </div>
        </div>
        </section>
    )
}

function Reset(){
    const [activePage,setActivePage] = useState(0)

    useEffect(()=>{
        console.log(activePage)
    },[activePage])


    return(
        <section className='flex items-center justify-center w-screen h-screen'>
        <div className={`Auth-wrapper container flex justify-between rounded-md relative border-2 border-secondary  m-auto py-5 bg-secondary g-[40px] max-w-[800px]`}>
            <div className={`illustration absolute left-0 bottom-1/2 z-50 border-2 border-primary translate-y-[calc(50%-.5px)] duration-300 w-[calc(50%-40px)] h-full ${activePage==0?"bg-dark translate-x-[calc(100%+80px)] rounded-r-md":"bg-dark rounded-l-md"}`}>
                <h1 className='text-3xl font-semibold text-center text-primary pt-3'>Wizard Chat</h1>
                {activePage==1?
                <img src={"/signup.jpg"} className='w-1/2 h-[calc(100%-50px)] m-auto'/>
                :
                <img src={"/login.jpg"} className='w-1/2 h-[calc(100%-50px)] m-auto'/>
                }                
            </div>
            <ForgotPassword setActivePage={setActivePage}></ForgotPassword>
            <ResetPassword setActivePage={setActivePage}></ResetPassword>
        </div>
        </section>
    )
}


export {Auth,Reset}