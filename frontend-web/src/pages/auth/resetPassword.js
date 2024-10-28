import { useContext, useEffect, useState } from "react"
import Input from "../../ui/input";
import { Link } from "react-router-dom";
import { ToastContext } from "../../contexts";
import { useNavigate,useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import {BarLoader} from 'react-spinners'
import endpoints from "../../api/endpoints";

function ResetPassword(props){
    const [newPassword,setpassword] = useState();
    const [token,setToken] = useState()
    const {setToastMsg} = useContext(ToastContext)
    let [searchParams] = useSearchParams();
    const [data,error,loading] = useFetch({url:endpoints.resetPassword,method:'post',postData:{password:newPassword,token}},[newPassword])
    const navigate = useNavigate()


    useEffect(()=>{
         console.log(searchParams.get("token"))
        setToken(searchParams.get("token"))
    },[])

    useEffect(()=>{
        if(data){
            setToastMsg({type:"success",message:data.message})
            navigate('/')
        }
    })

    function handleSubmit(e){
        e.preventDefault()
        const {password,confirmPassword} = e.target
        if(password.value!==confirmPassword.value) setToastMsg({type:"error",message:"Both the passswords doesn't match"})
        else setpassword(password.value) 
    }


    return(
        <section className="reset-wrapper flex items-center w-1/2">
            <form onSubmit={(e)=>handleSubmit(e)} className="w-full h-full flex flex-col justify-between items-center p-4 md:px-8 gap-2 rounded-l-md">
                <h1 className="text-3xl mb-3 text-green-600 font-bold">ResetPassword</h1>
                <Input color="green" label="Password" name="password" type="password" id="password"></Input>
                <Input color="green" label="Confirm Password" name="confirmPassword" type="password" id="password-cnfrm"></Input>
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
                        <button className="bg-green-600 border-secondary border-[1px] p-2 px-4 rounded-md" type="button">
                            <Link to={'/login'}>
                                Back to login
                            </Link>                        
                        </button>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default ResetPassword;