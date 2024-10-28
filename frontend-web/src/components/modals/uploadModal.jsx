import { MdClose,MdDocumentScanner } from "react-icons/md"
import { useDropzone } from "react-dropzone";
import {BarLoader} from 'react-spinners'
import { ButtonAmetyst } from "../../ui/button";


const UploadModal = (props)=>{
    const onDrop = (acceptedFiles) => {
    const uniqueFiles = Array.from(acceptedFiles).filter(file => (
        !props.selectedFiles.some(selectedFile => selectedFile.name === file.name)
        ));
        props.setSelectedFiles(prevSelectedFiles => [...prevSelectedFiles, ...uniqueFiles]);
    }
    const accept = {
        'image/*': ['.png','.jpg','.jpeg'],
        'application/pdf': ['.pdf'],
    }
    
    function handleClose(){
        props.setUploadModal(false)
        props.setShowFiles(true)
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept
    });
    return(
        <div className="file-upload-modal shadow-lg shadow-dark absolute top-0 left-0 -translate-y-full bg-dark rounded w-[300px] h-[400px]">
            <div className="relative w-full">
                <input multiple onChange={props.handleFileUpload} type="file" accept="image/*, .pdf, .docx, .doc" className="bg-primary file-input text-dark w-full rounded-lg p-4"/>
                <button onClick={()=>{props.setUploadModal(false)}} className="close-btn w-5 hover:bg-secondary rounded-full borderdark duration-200 absolute right-0 bg-white top-1/2 -translate-y-1/2 -translate-x-1/2">
                    <img src="/icons/close.svg" alt="x" className="rounded-full" />
                </button>
            </div>
            <div className="selected-file-pillet-wrapper w-100 h-32 my-3 overflow-x-scroll items-center gap-3 flex gap-2 p-1">
                {!props.selectedFiles.length&&<h1 className="text-primary text-center absolute left-1/2 -translate-x-1/2">No files Selected</h1>}
                {props.selectedFiles.map((i,index)=>(
                    <article key={index} className="flex bg-primary w-fit relative flex-col text-xs justify-between overflow-hidden rounded-md py-1 px-2 text-white">
                        <button className="ms-auto hover:border-dark absolute top-2 right-2 z-10 hover:shadow-md hover:bg-dark duration-200 rounded-full" onClick={()=>{props.setSelectedFiles((prev)=>(prev.filter(ele=>ele.name!=i.name)))}}>
                            <MdClose size={20}/>
                        </button>
                        {i.type.includes("image")&&<img src={URL.createObjectURL(i)} className="h-10 rounded-full" alt='' />}
                        {i.type.includes('application')&&<MdDocumentScanner className="m-auto" size={50}/>}
                        <span className="whitespace-nowrap keep-all">
                            {i.name&&i.name.length>20&&i.name.substring(0,8)+'...'+i.name.substring(i.name.length-10)}
                            {i.name&&i.name.length<20&&i.name}
                        </span>
                    </article>
                ))}
            </div>
            <div className="react-draggable w-100 h-20 flex items-center">
            <div className="dropzone-div border-2 border-primary text-primary w-100 border-dashed" {...getRootProps()}>
                <input className="dropzone-input" {...getInputProps()} />
                <div className="text-center w-full h-40 flex items-center justify-center">
                    {isDragActive ? (
                    <p className="dropzone-content">Release to drop the selected files here to upload</p>
                    ) : (
                    <p className="dropzone-content">
                        Drag 'n' drop some files here, or click to select files
                    </p>
                    )}
                </div>
            </div>
            </div>
            <div className="m-auto w-full flex justify-center gap-2">
                <ButtonAmetyst onClick={handleClose} className="w-full">Close Modal</ButtonAmetyst>                           
            </div>
            <div className="flex w-full flex-col justify-center gap-2 items-center absolute bottom-0 m-auto">
                {props.loading&&
                <BarLoader width={50} color="#f6d7b7" loading={props.loading} height={2}>
                </BarLoader>
                }
            </div>
        </div>  
    )
}

export default UploadModal