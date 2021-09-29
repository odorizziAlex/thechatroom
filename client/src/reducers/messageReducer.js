// this is where the actual state is going to be
import { GET_MESSAGES, ADD_MESSAGE, DELETE_MESSAGE, MESSAGES_LOADING } from "../actions/types"

const initialState = {
    messages: [],
    loading: false
}

export default function (state = initialState, action) {
    // console.log("switch function in reducer", action);
    switch (action.type) {
        case GET_MESSAGES:
            console.log("get reducer", action.payload);
            return {
                ...state,
                messages: action.payload,
                loading: false
            }
            case ADD_MESSAGE:
            console.log("add reducer");
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case DELETE_MESSAGE:
            console.log("delete reducer");
            return {
                ...state,
                messages: state.messages.filter(message => message._id !== action.payload)
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