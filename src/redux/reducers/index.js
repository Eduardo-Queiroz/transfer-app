import { combineReducers } from "redux";
import { Reducer as global } from "./global";
import { Reducer as transfer } from "./transfer";
import { Reducer as auth } from "./auth";

const AppReducer = combineReducers({
  global,
  transfer,
  auth,
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case "CLEAR":
      state = undefined;
      break;
  }
  return AppReducer(state, action);
};

export default rootReducer;
