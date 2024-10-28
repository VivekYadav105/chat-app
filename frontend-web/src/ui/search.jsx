import { MdSearch } from "react-icons/md"
export default function SearchBar(props){
    return(
        <section className="searchBar border-b-2 flex items-center gap-2 border-primary w-full bg-secondary ps-4 text-light-text rounded-xl">
            <span>
                <MdSearch className="text-primary text-2xl"/>
            </span>
            <input type="text" onChange={(e)=>{
                props.setSearchQuery(e.target.value)
            }} 

            onKeyDown={(e)=>{
                if(e.code=="Enter"){/*code to send message*/}
            }} placeholder={props.placeholder||"Type here to search"} className="search grow bg-transparent px-4 py-2"/>
        </section>
    )
}