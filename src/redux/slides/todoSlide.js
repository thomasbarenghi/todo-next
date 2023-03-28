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
    editSubTodoRed(state, action) {
      console.log(action.payload);
      const { idTodo, idSubTodo, subTodoEdited } = action.payload;
      const index = state.items.findIndex((todo) => todo.id === idTodo);
      const indexSubTodo = state.items[index].subTodos.findIndex(
        (subTodo) => subTodo.id === idSubTodo
      );
      state.items[index].subTodos[indexSubTodo] = subTodoEdited;
    },
    deleteSubTodoRed(state, action) {
      console.log(action.payload);
      const { todoId, idSubTodo } = action.payload;
      const index = state.items.findIndex((todo) => todo.id === todoId);
      const indexSubTodo = state.items[index].subTodos.findIndex(
        (subTodo) => subTodo.id === idSubTodo
      );
      state.items[index].subTodos.splice(indexSubTodo, 1);
    },
    checkTodoRed(state, action) {
      console.log(action.payload);
      const { idTodo } = action.payload;
      const index = state.items.findIndex((todo) => todo.id === idTodo);
      console.log(index);
      state.items[index].completed = !state.items[index].completed;
    },
    checkSubTodoRed(state, action) {
      console.log(action.payload);
      const { idTodo, idSubTodo } = action.payload;
      const index = state.items.findIndex((todo) => todo.id === idTodo);
      console.log(index);
      const indexSubTodo = state.items[index].subTodos.findIndex(
        (subTodo) => subTodo.id === idSubTodo
      );
      console.log(indexSubTodo);
      state.items[index].subTodos[indexSubTodo].completed = !state.items[
        index
      ].subTodos[indexSubTodo].completed;
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

export const deleteTodo = (id) => (dispatch) => {
  console.log(id);
  dispatch(deleteTodoRed(id));
};

export const addSubTodo = (todo) => (dispatch) => {
  console.log(todo);
  dispatch(addSubTodoRed(todo));
};

export const editSubTodo = (todo) => (dispatch) => {
  console.log(todo);
  dispatch(editSubTodoRed(todo));
};

export const deleteSubTodo = (todo) => (dispatch) => {
  console.log(todo);
  dispatch(deleteSubTodoRed(todo));
};

export const checkTodo = (todo) => (dispatch) => {
  console.log(todo);
  dispatch(checkTodoRed(todo));
};

export const checkSubTodo = (todo) => (dispatch) => {
  console.log(todo);
  dispatch(checkSubTodoRed(todo));
};

//Exportamos las acciones que generan cambios en el estado
export const {
  postTodoRed,
  setActualTodoRed,
  editTodoRed,
  addSubTodoRed,
  deleteTodoRed,
  editSubTodoRed,
  deleteSubTodoRed,
  checkTodoRed,
  checkSubTodoRed,
} = todoSlice.actions;

//Exportamos el reducer
export default todoSlice.reducer;
