import axios from 'axios'
import { GET_MESSAGES, ADD_MESSAGE, DELETE_MESSAGE, MESSAGES_LOADING } from "./types"

export const getMessages = () => dispatch => {
    dispatch(setMessagesLoading());
    axios
        .get('/api/messages')
        .then(res =>
            dispatch({
                type: GET_MESSAGES,
                payload: res.data
            })
        )
}

export const addMessage = (message) => dispatch => {
    console.log("add action", message);
    axios
        .post('/api/messages', message)
        .then(res => 
            dispatch({
                type: ADD_MESSAGE,
                payload: res.data
            })
        )
}

export const deleteMessage = (_id) => dispatch => {
    console.log("delete action", _id);
    axios.delete(`/api/messages/${_id}`)
        .then(res => dispatch({
            type: DELETE_MESSAGE,
            payload: _id
        }))
    return {
        type: DELETE_MESSAGE,
        payload: _id
    }
}

export const setMessagesLoading = () => {
    return {
        type: MESSAGES_LOADING
    }
}
