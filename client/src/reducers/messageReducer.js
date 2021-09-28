// this is where the actual state is going to be
import { GET_MESSAGES, SEND_MESSAGE, DELETE_MESSAGE } from "../actions/types"

const initialState = {
    messages: [
        {name: "Alex", message: "Hello World", timestamp: "01/01/2000, 16:20"},
        {name: "Matteo", message: "Ciao Ragazzi", timestamp: "01/01/2001, 16:21"}
    ]
}

export default function(state=initialState, action){
    switch(action.type) {
        case GET_MESSAGES:
            return {
                ...state
            }
        default:
            return state;
    }
}