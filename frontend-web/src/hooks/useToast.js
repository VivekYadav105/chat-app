import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../contexts";

function useToast(type,message){
    const {toastRef,toastMsg} = useContext(ToastContext)
    useEffect(()=>{
        if(toastRef&&toastRef.current){
            toastRef.current.show(toastMsg)
        }
    },[toastMsg])
    return toastMsg
}

export default useToast;