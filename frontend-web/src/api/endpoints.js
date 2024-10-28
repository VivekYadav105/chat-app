const endpoints = {
    signUp:"/user/signup",
    login:"/user/login",
    verify:"/user/verify",
    forgotPassword:"/user/forgotPassword",
    resetPassword:"/user/resetPassword",
    logOut:"/user/logout",
    deleteUser:"/user/delete",
    sendInvite:"/user/invite",
    getInvites:'/user/invite',
    updateInvite:(inviteId)=>`/user/updateInvite/${inviteId}`,
    deleteInvite:(inviteId)=>`/user/deleteInvite/${inviteId}`,

    getChats:'/chat',
    createChat:'/chat/create',
    getMessages:'/chat/getMessages',
    sendMessage:'/chat/send',
    deleteChat:(chatId)=>`/chat/delete/${chatId}`,
    deleteMessage:(messageId)=>`/chat/deleteMessage/${messageId}`,
    updateGroup:'/chat/updateGroup',

    getContacts:'/contact',
    deleteContact:(contactId)=>`/contact/remove/${contactId}`,
}

export default endpoints