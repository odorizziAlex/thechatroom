// this is where the actual state is going to be
import { GET_MESSAGES, ADD_MESSAGE, DELETE_MESSAGE } from "../actions/types"

const initialState = {
    messages: [
        { _id: "1", name: "Alex", message: "World", timestamp: "01/01/2000, 16:20" },
        { _id: "2", name: "Matteo", message: "Ciao Ragazzi", timestamp: "01/01/2001, 16:21" },
        { _id: "3", name: "Alex", message: "Hallo mein Name is alex und ich schreibe einen langen text", timestamp: "01/01/2000, 16:20" },
        { _id: "4", name: "Matteo", message: "Hallo mein Name is matteo und ich schreibe einen langen text", timestamp: "01/01/2001, 16:21" },
        { _id: "5", name: "Alex", message: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,        ", timestamp: "01/01/2000, 16:20" },
        { _id: "6", name: "Matteo", message: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,        einen langen text", timestamp: "01/01/2001, 16:21" },
    ]
}

export default function (state = initialState, action) {
    // console.log("switch function in reducer", action);
    switch (action.type) {
        case GET_MESSAGES:
            console.log("get reducer");
            return {
                ...state
            }
            case ADD_MESSAGE:
            console.log("add reducer");
            return {
                ...state,
                messages: [...state.messages,action.payload]
            }
        case DELETE_MESSAGE:
            console.log("delete reducer");
            return {
                ...state,
                messages: state.messages.filter(message => message._id !== action.payload)
            }
        default:
            return state;
    }
}