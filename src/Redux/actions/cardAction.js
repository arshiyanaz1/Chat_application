import axios from 'axios';

const baseUrlChat = 'https://jsonbin.org/me/chats';
const baseUrlProfile = 'https://jsonbin.org/me/profile';
const baseUrlEditProfile = 'https://jsonbin.org/me/profile/0';


export const getChats = () => async (dispatch) => {
    try {
        axios({
            method: "GET",
            url: `${baseUrlChat}`,
            headers: {
                'Authorization': 'token 6ebfff6d-fa4c-4e33-8f17-d4c9aa0cb71f'
            }
        })
            .then(function (response) {
                // handle success
                let data = response.data;
                dispatch({ type: 'GET_CHATS', payload: data })
            })
    } catch (e) { console.log(e) }
}

export const getProfile = (e) => async (dispatch) => {
    try {
        axios({
            method: "GET",
            url: `${baseUrlProfile}`,
            headers: {
                'Authorization': 'token 6ebfff6d-fa4c-4e33-8f17-d4c9aa0cb71f'
            }
        })
            .then(function (response) {
                // handle success
                let data = response.data;
                dispatch({ type: 'GET_PROFILE', payload: data })
            })
    } catch (e) { console.log(e) }
}

export const editProfile = (e) => async (dispatch) => {
    try {
        const msgArray = {
            id: 1,
            userName: e.userName,
            city: e.city,
            fallowers: e.fallowers,
            fallowings: e.fallowings
        }
        axios({
            method: "POST",
            url: `${baseUrlEditProfile}`,
            data: msgArray,
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'token 6ebfff6d-fa4c-4e33-8f17-d4c9aa0cb71f'
            }
        })
            .then(function (response) {
                dispatch({ type: 'GET_PROFILE', payload: response})

            })

    } catch (e) { }    
}


export const addChat = (e,text) => async (dispatch) => {
    try {

        let msgArray = [...e];

        msgArray.push({
           id: 1,
           userName: text.userName,
           userImg: "require('../assets/users/user-4.jpg')",
           messageTime: new Date(),
           messageText: text.messageText
       });
       axios({
           method: "POST",
           url: `${baseUrlChat}`,
           data: msgArray,
           headers: {
               "Content-Type": "application/json",
               'Authorization': 'token 6ebfff6d-fa4c-4e33-8f17-d4c9aa0cb71f'
           }
       })
           .then(function (response) {
               // handle success
               console.log('jdiuw')
               console.log('gcfqwfqwf',response)
               dispatch({ type: 'GET_CHAT', payload: response})
           })

    } catch (e) { }

}