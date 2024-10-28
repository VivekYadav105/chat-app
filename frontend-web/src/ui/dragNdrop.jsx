import { useDropzone } from "react-dropzone";

function DropZone({onDrop,accept}){
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept
      });
    return(
<div className="dropzone-div border-2 border-primary text-primary w-100 border-dashed" {...getRootProps()}>
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content">Release to drop the files here</p>
        ) : (
          <p className="dropzone-content">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
    </div>
    )
}

export default DropZone