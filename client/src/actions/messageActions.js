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

export const addMessage = (socket, message) => dispatch => {
    axios
        .post('/api/messages', message)
        .then(res => 
            dispatch({
                type: ADD_MESSAGE,
                payload: res.data
            })
        )
    socket.current.emit('message', message);
}

export const deleteMessage = (socket, id) => dispatch => {
    axios.delete(`/api/messages/${id}`)
        .then(res => dispatch({
            type: DELETE_MESSAGE,
            payload: id
        }))

    socket.current.emit('messageDeleted', id);

    return {
        type: DELETE_MESSAGE,
        payload: id
    }
}

export const setMessagesLoading = () => {
    return {
        type: MESSAGES_LOADING
    }
}
