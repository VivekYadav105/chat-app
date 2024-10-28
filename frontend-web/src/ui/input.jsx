export default function Input(props){
    return(
        <div className={`input-wrapper relative w-fit ${props.spacing}`}>
            <input style={props.style} name={props.name} placeholder={" "} className={`hover-input ${props.inputStyles} border-b-2 p-1 px-3 border-primary bg-secondary text-white peer focus:outline-none [&:has(:focus-visible)]:border-secondary focus:text-primary`} type={props.type} id={props.id} required={props.required} autoComplete="false"/>
            {props&&
            <label className={
                `pointer-events-none 
                absolute bottom-1/2 left-3 
                text-white
                bg-secondary
                ${props.labelStyles}
                translate-y-1/2 duration-500 text-lg 
                peer-focus:translate-x-[-5px] 
                peer-focus:translate-y-[-10.5px] 
                peer-focus:text-sm
                peer-focus:text-primary
                peer-focus:bg-dark
                `}>
                    {props.label}
            </label>}                   
        </div>
    )
}
