import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import { thunk } from "redux-thunk";
import applicationReducer from "./applicationReducer";

const rootReducer = combineReducers({
  applications: applicationReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
