import { useContext, useEffect, useState } from "react"
import Input from "../../ui/input";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import {BarLoader} from 'react-spinners'
import {ToastContext} from '../../contexts'
import { useSearchParams } from "react-router-dom";
import endpoints from "../../api/endpoints";

function ForgotPassword({setActivePage}){
    const [forgotDetails,setforgotDetails] = useState();
    const {setToastMsg} = useContext(ToastContext)
    let [searchParams] = useSearchParams();

    function handleSubmit(e){
        e.preventDefault()
        const {email} = e.target
        setforgotDetails({email:email.value})       
    }

    const [data,error,loading] = useFetch({url:endpoints.forgotPassword,method:'post',postData:forgotDetails},[forgotDetails])

    useEffect(()=>{
        const token = searchParams.get("token")
        if(token){
            setActivePage(1)
        }
        // const token = 
            // setActivePage(1)
    },[])

    useEffect(()=>{
        if(data){
            console.log(data)
            setToastMsg({type:"success",message:data.message})
        }
    },[data])

    return(
        <section className="forgot-wrapper flex items-center w-1/2">
                <form onSubmit={(e)=>handleSubmit(e)} className="w-full h-full flex flex-col justify-between items-center p-4 md:px-8 gap-2 rounded-l-md">
                    <h1 className="text-3xl mb-3 text-green-600 font-bold">Forgot Password</h1>
                    <Input color="green" name="email" label="Email" type="email" id="email-login" required={true}></Input>
                    <div className="buttons-wrapper flex flex-col">
                        <div className="flex gap-[10px]">
                        <button type="submit" className={`bg-green-600 relative border-[1px] border-black p-2 px-4 rounded-md ${loading?'opacity-50 cursor-not-allowed':'hover:bg-dark hover:text-primary hover:border-primary'} duration-300`}>
                            {loading&&(
                                    <div className="absolute flex justify-center left-1/2 bottom-1 -translate-x-1/2">
                                        <BarLoader width={50} color="#f6d7b7" loading={loading} height={2}/>
                                    </div>
                                )}
                                Submit
                            </button>
                            <button type="button" className="bg-green-600 border-[1px] border-secondary p-2 px-4 rounded-md" >
                                <Link to={'/auth'}>
                                    Back to login
                                </Link>                        
                            </button>
                        </div>
                    </div>
                </form>
        </section>
    )
}

export default ForgotPassword;