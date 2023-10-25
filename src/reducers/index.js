import { combineReducers } from "redux";
import saveDataReducer from "./saveData";

const allReducers = combineReducers({
    saveData: saveDataReducer
})

export default allReducers