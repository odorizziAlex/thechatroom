import { GET_MESSAGES, SEND_MESSAGE, DELETE_MESSAGE } from "./types"

export const getMessages = () => {
    return {
        type: GET_MESSAGES
    }
}
