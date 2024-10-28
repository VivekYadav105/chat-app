const chatListReducer = (state, action) => {
    const { payload } = action
    console.log(payload);
    
    switch (action.type) {
        case "SET_CHAT_LIST":
            return [...payload]
        case "GET_CHAT_LIST":
            return state
        case "DELETE_CHAT":
            return [...state.filter((ele)=>ele._id!==payload.chatId)]
        case "SET_LAST_MESSAGE":
            const newState = state.map((ele)=>{
                if(ele._id===payload.chatId){
                    return {...ele,lastMessage:payload.message}
                }
                return ele
            })
            console.log(newState);
            return [...newState]
        default:
            return state
    }
}

export default chatListReducer