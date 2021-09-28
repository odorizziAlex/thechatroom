// Bring together all of other reducers

import { combineReducers } from "redux";
import messageReducer from './messageReducer';

export default combineReducers({
    message: messageReducer
})