import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const initialState = {
  items: [],
  actualTodo: {},
  loading: false,
  error: null,
};

//Reducers
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    getTodos(state, action) {},
    postTodoRed(state, action) {
      state.items = [...state.items, action.payload];
    },
    setActualTodoRed(state, action) {
      console.log(action.payload);
      state.actualTodo = action.payload;
    },
    editTodoRed(state, action) {
      console.log(action.payload);
      const { id, todoEdited } = action.payload;
      const index = state.items.findIndex((todo) => todo.id === id);
      state.items[index] = todoEdited;
    },
    addSubTodoRed(state, action) {
      console.log(action.payload);
      const { idTodo, newSubTodo } = action.payload;
      const index = state.items.findIndex((todo) => todo.id === idTodo);
      state.items[index].subTodos = [
        ...state.items[index].subTodos,
        newSubTodo,
      ];
    },
    deleteTodoRed(state, action) {
      console.log(action.payload);
      const id = action.payload;
      const index = state.items.findIndex((todo) => todo.id === id);
      state.items.splice(index, 1);
    },
  },
});

//Action
export const postTodo = (todo) => (dispatch) => {
  console.log(todo);
  dispatch(postTodoRed(todo));
};

export const setActualTodo = (todo) => (dispatch) => {
  console.log(todo);
  dispatch(setActualTodoRed(todo));
};

export const editTodo = (todo) => (dispatch) => {
  console.log(todo);
  dispatch(editTodoRed(todo));
};

export const addSubTodo = (todo) => (dispatch) => {
  console.log(todo);
  dispatch(addSubTodoRed(todo));
};

export const deleteTodo = (id) => (dispatch) => {
  console.log(id);
  dispatch(deleteTodoRed(id));
};

//Exportamos las acciones que generan cambios en el estado
export const { postTodoRed, setActualTodoRed, editTodoRed, addSubTodoRed, deleteTodoRed } = todoSlice.actions;

//Exportamos el reducer
export default todoSlice.reducer;
