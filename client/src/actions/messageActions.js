import { GET_MESSAGES, ADD_MESSAGE, DELETE_MESSAGE } from "./types"

export const getMessages = () => {
    return {
        type: GET_MESSAGES
    }
}

export const addMessage = (message) => {
    console.log("add action", message);
    return {
        type: ADD_MESSAGE,
        payload: message
    }
}

export const deleteMessage = (_id) => {
    console.log("delete action", _id);
    return {
        type: DELETE_MESSAGE,
        payload: _id
    }
}
