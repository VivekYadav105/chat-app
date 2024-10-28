export default function Contact(props){
        return(
        <article id={props.id} onClick={props.onClick} className={`rounded-lg p-2 w-full relative hover:cursor-pointer max-w-[300px] h-[75px] ${props.active?"bg-primary":"bg-inherit"}`}>
            <div className="flex h-full gap-2 items-center w-full justify-between">
                <div className="img-wrapper relative flex-shrink-0 h-full rounded-2xl p-2  bg-red-300 aspect-[1/1]">
                <img src={props.profilePic||`icons/${props.chatType=="individual"?"user":"group"}_chat.svg`} alt="img" className="h-full w-full rounded-full object-cover"/>
                <span className={`absolute -top-0.5 -left-0.5 w-[12.5px] h-[12.5px] rounded-full ${props.isActive==true?"bg-green-400":"hidden"}`}></span>
                </div>
                <div className="m-auto">
                    <h1 className={`font-semibold ${props.active?"text-secondary":"text-white"}`}>
                        {props&&props.userName}
                        <span className={`absolute right-2 font-thin text-[10px] ${props.active?"text-dark":"text-white"}`}>{props.isActive==true?"Now":props.activeTime}</span>
                    </h1>
                    <p className={`text-xs text-justify text-light-text ${props.active?"text-white":"text-light-text"}`}>
                        <span className="font-bold pe-2">{props.lastMessageSender?props.lastMessageSender.length>81?props.lastMessageSender.substring(0,77)+" ...":props.lastMessageSender:"No recent messages"}</span>
                        {props.lastMessage?props.lastMessage.length>81?props.lastMessage.substring(0,77)+" ...":props.lastMessage:null}
                    </p>
                </div>
                {/* <img src="/icons/options-dots.png" alt="options" width={35} height={35} className="hover:bg-secondary duration-200 rounded-full p-2 bg-dark border-2 border-primary"/> */}
            </div>
        </article>
    )
}