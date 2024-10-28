import { useState,forwardRef, useEffect, useContext, useImperativeHandle } from "react"
import { ChatContext, UserContext } from "../contexts"
import {BarLoader} from 'react-spinners'
import DropZone from "../ui/dragNdrop"
import { MdClose, MdDocumentScanner } from "react-icons/md"
import UploadModal from "./modals/uploadModal"
import { getValue } from "@testing-library/user-event/dist/utils"

const Chatbar = forwardRef((props,ref)=>{
    const [selectedFiles,setSelectedFiles] = useState([])
    const [message,setMessage] = useState("")
    const {chatState} = useContext(ChatContext)
    const {user} = useContext(UserContext)
    const [loading,setLoading] = useState(false)
    const [uploadModal,setUploadModal] = useState(false)
    const [showFiles,setShowFiles] = useState(false)

    useImperativeHandle(ref,()=>({
        getValue(){
            return {message,files:selectedFiles}
        },
        clearValue(){
            setMessage("")
            setSelectedFiles([])
        }
    }))


    const handleFileUpload = (files) => {
        const uniqueFiles = Array.from(files).filter(file => (
          !selectedFiles.some(selectedFile => selectedFile.name === file.name)
        ));
        setSelectedFiles(prevSelectedFiles => [...prevSelectedFiles, ...uniqueFiles]);
      };
    

    useEffect(()=>{console.log(selectedFiles)},[selectedFiles])


    return(
        <>
            <div className="chatbar-wrapper w-full relative">
            {uploadModal&&<UploadModal setShowFiles={setShowFiles} setUploadModal={setUploadModal} setSelectedFiles={setSelectedFiles} selectedFiles={selectedFiles} handleFileUpload={(e)=>{handleFileUpload(e.target.files)}} loading={loading}/>}
            <textarea value={message} onChange={(e)=>{setMessage(e.target.value)}} type="text" className="chatbar bg-secondary active:outline-none rounded-2xl px-4 py-2 pe-10 shadow-lg w-full text-white ps-16" rows={1} placeholder="Message"/>
            <article className="absolute flex items-center left-0 top-[calc(50%-3px)] -translate-y-1/2 ">
                <button onClick={()=>{setUploadModal(!uploadModal)}} type="button" className="hover:bg-primary hover:opacity-75 duration-300 send-button text-white w-[40px] h-[37px] border-2 border-primary bg-dark rounded-xl px-3">
                    <img src="/icons/attachement.png" alt="send"/>
                </button>
                {showFiles&&<span className="bg-primary mx-2 text-sm rounded-md">{selectedFiles.length}</span>}
            </article>
            <button onClick={props.sendMessage} type="button" className="send-button text-white absolute right-0 top-[calc(50%-3px)] -translate-y-1/2 w-[40px] h-[37px] bg-dark hover:bg-primary border-primary border-2 rounded-md hover:border-primary duration-200 px-3">
                <img src="/icons/send.svg" alt="send"/>
            </button>
            </div>
        </>
    )
})


export default Chatbar;