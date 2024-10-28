import {Button,ButtonAmetyst,ButtonPrimary} from '../ui/button'
import ChatBar from './chatBar'
import ChatTile from './base/chatTile'
import SideNav from './sideNav'
import { MessagePrimary,GroupMessage } from './base/message'
import SearchBar from '../ui/search'

export default function Component(){
    return(
        <>
                <SideNav/>
        
                <section className="px-10 py-4">
            <div className="space-x-2 space-y-1">
                <Button>Hello</Button>
                <ButtonAmetyst>Hello</ButtonAmetyst>
                <ButtonPrimary>Hello world</ButtonPrimary>
                <section className="chat-section bg-secondary rounded-md">
                <MessagePrimary  messageTime={"3:00pm"} text="Lorem Ipsum is simply dummy text of the printing 
                and typesetting industry. Lorem Ipsum has been the industry's standard 
                dummy text ever since the 1500s, when an unknown printer took a galley 
                of type and scrambled it to make a type specimen book. It has survived 
                not only five centuries,but also the leap into electronic typesetting, 
                remaining essentially unchanged.  It was popularised in the 1960s with 
                the release of Letraset sheets containing Lorem Ipsum passages, and more 
                recently with desktop publishing software like Aldus PageMaker including 
                versions of Lorem Ipsum."></MessagePrimary>
                <MessagePrimary text="this is a Messgae" type="secondary" messageTime={"3:00pm"}></MessagePrimary>                    
                <GroupMessage userName="user1" messageTime="9:00" text="this is a group messgae from user 1" image="logo512.png"/>
                </section>
                <ChatTile userName="Contact name" active={true} image="logo192.png" lastText="hello junior!! This is senior with super senior waiting for sub junior in the sub way minor
                ." activeTime="9:30pm" isActive={true}></ChatTile>
                <ChatTile userName="Contact name" image="logo192.png" lastText="hello junior!! This is senior with super senior waiting for sub junior in the sub way minor
                ." activeTime="9:30pm"></ChatTile>
                <ChatBar/>
                <SearchBar/>
            </div>
            
        </section>
        </>
    )
}