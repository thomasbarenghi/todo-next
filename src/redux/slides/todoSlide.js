import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const initialState = {
  items: [],
  completas: [],
  incompletas: [],
  activas: [],
  actualTodo: {},
  //loading: false,
  // error: null,
  filter: {
    active: {},
    options: [
      { value: "all", label: "Todas" },
      { value: "completed", label: "Completas" },
      { value: "incompleted", label: "Incompletas" },
    ],
  },
};

//Reducers
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    getTodos(state, action) {},
    postTodoRed(state, action) {
      state.items = [...state.items, action.payload];
      state.incompletas = [...state.incompletas, action.payload.id];
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
      state.items = state.items.filter((todo) => todo.id !== id);
      state.completas = state.completas.filter((completa) => completa !== id);
      state.incompletas = state.incompletas.filter(
        (incompleta) => incompleta !== id
      );
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
      //Checkear el todo y mover a completadas
      console.log(action.payload);
      const { idTodo } = action.payload;
      const index = state.items.findIndex((todo) => todo.id === idTodo);
      console.log(index);
      state.items[index].completed = !state.items[index].completed;
      if (state.items[index].completed) {
        state.completas = [...state.completas, idTodo];
        state.incompletas = state.incompletas.filter(
          (incompleta) => incompleta !== idTodo
        );
      } else {
        state.incompletas = [...state.incompletas, idTodo];
        state.completas = state.completas.filter(
          (completa) => completa !== idTodo
        );
      }
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
      state.items[index].subTodos[indexSubTodo].completed =
        !state.items[index].subTodos[indexSubTodo].completed;
    },
    setFilterActivasRed(state, action) {
      state.filter.active = action.payload.value;
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

export const setActivas = (value) => (dispatch) => {
  console.log(value);
  dispatch(setFilterActivasRed(value));
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
  setFilterActivasRed,
} = todoSlice.actions;

//Exportamos el reducer
export default todoSlice.reducer;
