import { createStore, combineReducers } from "redux";
import { dataReducer } from "./dataReducer";
import { userReducer } from "./userReducer";

const reducer = combineReducers({
  data: dataReducer,
  account: userReducer,
});

const store = createStore(reducer);

export default store;
