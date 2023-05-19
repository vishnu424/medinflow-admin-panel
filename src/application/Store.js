import authReducer from "./Reducers/Auth";
import subjectReducer from "./Reducers/Subjects";
import topicReducer from "./Reducers/Topics";
import lessonReducer from "./Reducers/Lessons";
import flowchartReducer from "./Reducers/Flowchart";
import doctorReducer from "./Reducers/Doctor";
import userReducer from "./Reducers/Users";
import subTopicReducer from "./Reducers/SubTopics";
import { applyMiddleware, compose, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  topic: topicReducer,
  subtopic: subTopicReducer,
  subject: subjectReducer,
  lesson: lessonReducer,
  flowchart: flowchartReducer,
  doctor: doctorReducer,
  user: userReducer,
});

let composeEnhancers = compose;
composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const Store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
);
