import { combineReducers } from "redux";
import interfaceReducer from "./interface";
import settlementReducer from "./settlement";

export default combineReducers({
    interface: interfaceReducer,
    settlement: settlementReducer,
});
