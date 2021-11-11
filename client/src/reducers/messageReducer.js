// this is where the actual state is going to be
import { GET_MESSAGES, ADD_MESSAGE, DELETE_MESSAGE, MESSAGES_LOADING } from "../actions/types"
import Config from '../Config/Config'

const initialState = {
    messages: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES:
            return {
                ...state,
                messages: action.payload,
                loading: false
            }
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case DELETE_MESSAGE:
            return {
                ...state,
                messages: state.messages.map(message => {
                    if(message.id === action.payload) {
                        message.message = Config.MESSAGE_DELETED_STRING;
                    }
                    return message;
                })
                
            }
        case MESSAGES_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}