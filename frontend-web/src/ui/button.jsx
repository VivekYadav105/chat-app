const Button = (props)=>{
    const clickFunction = () => {return}
    return(
        <button className="p-2 px-5 rounded-2xl font-semibold text-md bg-blue-400 text-black border-[3px] border-blue-400 shadow-lg hover:border-pale-blue hover:bg-opacity-90 duration-200 active:bg-opacity-70 active:text-secondary-black active:border-primary-blue" type={props.type||"submit"} onClick={props.onClick||clickFunction}>
            {props.children}
        </button>
    )
}

const ButtonAmetyst = (props)=>{
    const clickFunction = () => {return}
    return(
        <button disabled={props.disabled} className="p-2 px-5 rounded-2xl font-semibold text-md bg-ametyst text-dark shadow-secondary border-[3px] border-ametyst shadow-lg hover:border-wisteria hover:bg-opacity-90 duration-200 active:bg-opacity-70 active:text-ametyst active:border-ametyst" type={props.type||"submit"} onClick={props.onClick||clickFunction}>
            {props.children}
        </button>
    )
}

const ButtonPrimary = (props)=>{
    const clickFunction = () => {return}
    return(
        <button disabled={props.disabled} className="p-2 px-5 rounded-2xl font-semibold text-md bg-secondary text-primary border-[3px] border-primary shadow-lg hover:border-wisteria hover:bg-opacity-90 duration-200 active:bg-opacity-70 active:text-grey active:border-ametyst" type={props.type||"submit"} onClick={props.onClick||clickFunction}>
            {props.children}
        </button>
    )
}

export {Button,ButtonAmetyst,ButtonPrimary}