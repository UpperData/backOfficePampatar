import { combineReducers } from "redux";
import settings from "./settings/Reducer";
import chatReducer from "./chats/Reducer";
import notesReducer from "./notes/Reducer";
import contactReducer from "./contacts/";
import emailReducer from "./email/";
import maintodoReducer from "./todos/Todos";
import todoReducer from "./todos/";
import session from './session/Reducer'
import backoffice from './backoffice/Reducer'

const Reducers = combineReducers({
  settings,
  chatReducer,
  contactReducer,
  emailReducer,
  notesReducer,
  todoReducer,
  maintodoReducer,
  session,
  backoffice,
});

export default Reducers;
