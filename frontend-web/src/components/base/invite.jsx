function Invite(props){
    return(
        <article className="invite w-full h-16 flex gap-2 relative rounded-md border-[1px] border-primary">
            <div className="flex items-center w-fit h-full ps-2">
                <img src={props.profilePic} alt="" className="rounded-full bg-primary" height={50} width={50}/>
            </div>
            <article className="flex items-center">
                <p className="invitation-header flex flex-col relative">
                    <span className="text-lg text-primary">{props.userName}</span>
                    <span className="text-sm text-white ps-2">{props.inviteStatus}</span>
                </p>
            </article>
            <span className="absolute top-3 right-3 text-xs text-light-text">{props.sentTime}</span>
        </article>
    )
}

export default Invite