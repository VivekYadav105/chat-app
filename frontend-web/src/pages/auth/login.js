import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/userContext";
import Input from "../../ui/input";
import { Link, useNavigate } from "react-router-dom";
import {BarLoader} from 'react-spinners'
import useFetch from "../../hooks/useFetch";
import { ToastContext } from "../../contexts";
import endpoints from "../../api/endpoints";

function Login({setActivePage}){
    const {setToastMsg} = useContext(ToastContext)
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate();

    const [loginDetails,setLoginDetails] = useState();

    function handleSubmit(e){
        e.preventDefault();
        console.log("submitted")
        const {email,password} = e.target
        setLoginDetails((prev)=>(
            {email:email.value,password:password.value}
        ))
    }

    function handleDemo(e){
        e.preventDefault();
        
    }

    const [data,error,loading] = useFetch({url:endpoints.login,method:'post',postData:loginDetails},[loginDetails])

    useEffect(()=>{
        if(data) {
            setUser({...data.response})
            navigate('/')
        }
        console.log(data)
    },[data])

    return(
        <section className="login-wrapper flex items-center w-full h-full">
                <form onSubmit={(e)=>handleSubmit(e)} className="w-full h-full flex flex-col justify-evenly items-center p-4 md:px-8 gap-10 rounded-l-md">
                    <h1 className="text-2xl relative top-3 sm:top-0 sm:text-3xl sm:mb-3 text-green-600 font-bold">Login</h1>
                    <Input label="Email" required={true} name="email" type="email" id="email-login"></Input>
                    <Input label="Password" required={true} name="password" type="password" id="email-password"></Input>
                    <div className="buttons-wrapper flex flex-col">
                        <div className="flex gap-[10px]">
                            <button className={`bg-green-600 relative border-[1px] border-black p-2 px-4 rounded-md duration-300 ${loading?'opacity-50 cursor-not-allowed':'hover:bg-dark hover:text-primary hover:border-primary'}`}>
                                {loading&&(
                                    <div className="absolute flex justify-center left-1/2 bottom-1 -translate-x-1/2">
                                        <BarLoader width={50} color="#f6d7b7" loading={loading} height={2}/>
                                    </div>
                                )}
                                Login
                            </button>
                            <button className="bg-green-600 border-[1px] border-black p-2 px-4 rounded-md hover:bg-dark hover:text-primary hover:border-primary duration-300" type="button">
                                <Link to={'/forgot'}>
                                    Forgot Password
                                </Link>                        
                            </button>
                        </div>
                        <div className="flex items-center m-auto flex-col">
                            <button className="text-xs p-0 bg-transparent mt-2" type="button">Not a user?<span className="underline text-green-500 hover:text-white duration-200 ps-1" onClick={()=>{setActivePage(1)}}>signup</span></button>
                            <button className="text-xs p-0 bg-transparent mt-2" type="submit"><span className="underline text-green-500 hover:text-white duration-200 ps-1" onClick={handleDemo}>View demo</span></button>
                        </div>
                    </div>
                </form>
        </section>
    )
}

export default Login;