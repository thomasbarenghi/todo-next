import { combineReducers } from '@reduxjs/toolkit';
import todosReducer from './slides/todoSlide';

const rootReducer = combineReducers({
 todos: todosReducer,
});

export default rootReducer;
