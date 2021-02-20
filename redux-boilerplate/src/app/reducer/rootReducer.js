import { combineReducers } from "redux";
import toggleReducer from "./toggleReducer";

const rootReducer = combineReducers({
  toggle: toggleReducer,
});
export default rootReducer;
