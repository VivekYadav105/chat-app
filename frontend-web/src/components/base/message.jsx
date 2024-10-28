const MessagePrimary = (props)=>{
    const type = props.type||"primary"
    return(
    <div className={`message-wrapper w-full py-2`}>
        <div className={`message border-0 float p-1 flex items-center ${type=="primary"?"":"flex-row-reverse"}`}>
            <div className="flex flex-col">
                <img src={props.image} alt="" className={`${type=="primary"?"bg-gray-600":"bg-slate-400"} rounded-full w-[30px] h-[30px] border-2 border-green-200`} />
                <span className={`${type=="primary"?"right-2 ":"left-2"} bottom-2 timestamp text-xs text-light-text`}>{props.messageTime}</span>    
            </div>
            <p className={`relative message-text text-justify px-5 py-2 ${type=="primary"?"primary bg-primary":"secondary bg-dark"} mx-4 rounded-2xl shadow-md before:absolute relative max-w-[300px] text-cream`}>
                {props.message}
            </p>
            {props.files.map(ele=>{
                <article>
                    <img src={ele} alt="" width={40} height={50} className="bg-dark rounded-lg"/>
                </article>
            })}
        </div>      
      </div>
    )
}

const GroupMessage = (props)=>{
    const type = props.type||"primary"
    return(
        <div className={`message-wrapper w-full`}>
        <div className={`group-message border-0 float p-2 flex items-center ${type=="primary"?"":"flex-row-reverse"}`}>
            <img src={props.image} alt="" className={`${type=="primary"?"bg-gray-600":"bg-slate-400"} rounded-full w-[50px] h-[50px] shadow-sm`} />
            <div>
                <p className={`message-header px-6 space-x-1 ${props.type!=="primary"?"flex items-center gap-2 flex-row-reverse":""}`}>
                    <span className="text-white">{props.userName}</span>
                    <span className="text-xs text-light-text">{props.messageTime}</span>
                </p>
                <p className={`message-text text-justify px-5 py-2 ${type=="primary"?"primary bg-primary":"secondary bg-dark"} mx-4 rounded-2xl shadow-md before:absolute relative max-w-[300px] text-cream`}>{props.message}</p>
            </div>
        </div>
        </div>
    )
}

export {MessagePrimary,GroupMessage}