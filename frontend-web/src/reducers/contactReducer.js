const contactReducer = (state, action) => {
    const { payload } = action
    
    switch (action.type) {
        case "SET_CONTACTS":
            return [...payload]
        case "GET_CONTACTS":
            return state
        case "ADD_CONTACT":
            return [...state,payload]
        case "REMOVE_CONTACT":
            return [...state.filter((ele)=>ele._id!==payload.contactId)]
        case "REMOVE_ALL_CONTACTS":
            return []
        default:
            return state
    }
}

export default contactReducer