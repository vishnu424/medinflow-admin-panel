import authReducer from "../../application/Reducers/Auth";
import subjectReducer from "../../application/Reducers/Subjects";
import topicReducer from "../../application/Reducers/Topics";
import lessonReducer from "../../application/Reducers/Lessons";
import flowchartReducer from "../../application/Reducers/Flowchart";
import doctorReducer from "../../application/Reducers/Doctor";
import userReducer from "../../application/Reducers/Users";
import subTopicReducer from "../../application/Reducers/SubTopics";
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
