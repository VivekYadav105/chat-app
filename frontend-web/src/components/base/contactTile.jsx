const ContactTile = (props)=>{
    return(
        <article className='relative contact flex items-center gap-3 bg-dark rounded-md group py-2 ps-3' key={props._id}  onClick={props.onClick}>
            <img src={props.profilePic} className='rounded-full' width={35} height={35} alt="" />
            <p className='text-primary'>{props.userName}</p>
            {/* <img className='absolute right-5 h-6 p-1 hover:bg-secondary duration-200 hover:shadow-sm hover:shadow-white aspect-square bg-white cursor-pointer rounded-full' src='/icons/close.svg'/> */}
        </article>
    )
}

export default ContactTile
