const initialState = {
    chats: [],
    profile: []
}

const chatItems = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CHATS':
            return {
                ...state,
                chats: action.payload
            }
        case 'GET_PROFILE':
            return {
                ...state,
                profile: action.payload
            }

        default:
            return state;
    }
};

export default chatItems
