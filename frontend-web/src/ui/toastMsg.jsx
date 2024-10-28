import { forwardRef, useContext, useEffect, useState } from "react"
import { ToastContext } from "../contexts"
const Toast = forwardRef((props,ref) => {
    const [active,setActive] = useState(false)
    const {toastMsg,setToastMsg} = useContext(ToastContext)

    useEffect(()=>{
        if(toastMsg.message) setActive(true)
    },[toastMsg])

    useEffect(()=>{
        if(active) setTimeout(()=>{
            setActive(false);
            setToastMsg({type:"",message:""})
        },5000)
    },[active])

    return(
        <section ref={ref} className={`${active?"translate-y-[30px]":"translate-y-[-40px]"} z-50 duration-500 toast-wrapper min-w-fit w-screen max-w-[300px] rounded absolute top-[-20px] left-1/2 -translate-x-1/2`}>
            <div className={`p-2 w-full text-center px-4 rounded-xl shadow-sm ${toastMsg.type=="success"?"bg-green-600 text-dark shadow-green-200":"bg-secondary text-red-500 shadow-red-300"}`}>{toastMsg.message}</div>
        </section>
    )
})

export default Toast;