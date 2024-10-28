import { createContext, useState, useRef, useEffect } from "react";
import Toast from "../ui/toastMsg";

const ToastContext = createContext(Object.create(null))

function ToastProvider(props){
    const toastRef = useRef(null)
    const [toastMsg,setToastMsg] = useState({message:"",type:""})
    
    return(
    <ToastContext.Provider value={{toastRef,setToastMsg,toastMsg}}>
        <Toast ref={toastRef}></Toast>
        {props.children}
    </ToastContext.Provider>
    )
}

export default ToastProvider
export {ToastContext}