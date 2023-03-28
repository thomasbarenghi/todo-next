import React from "react";
import { useDispatch } from "react-redux";
import { addSubTodo } from "@/redux/slides/todoSlide";

export default function AddSubTodoFn({ todo, setAddSubTodoVisibility }) {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = todo.subTodos.length + 1;
    const completed = false;
    const newSubTodo = {
      id,
      title: e.target.titulo.value,
      completed,
    };
    const idTodo = todo.id;
    dispatch(addSubTodo({ idTodo, newSubTodo }));
    setAddSubTodoVisibility(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 justify-end align-bottom flex-col"
    >
      <label
        className="flex flex-col w-full gap-1 font-medilight text-black"
        htmlFor="titulo"
      >
        <input
          type="text"
          name="titulo"
          id="titulo"
          className="bg-blue-100 rounded-3xl px-4 py-2 placeholder:text-blue-600 text-sm"
          placeholder="Ingresa un titulo para tu subtarea"
        />
      </label>
      <div className="flex gap-2 justify-start items-start align-top">
        <button
          type="submit"
          className="rounded-3xl bg-blue-700 py-2 px-6 flex text-white font-semibold text-sm"
        >
          Añadir
        </button>
        <button
          type="button"
          onClick={(e) => setAddSubTodoVisibility(false)}
          className="rounded-3xl bg-red-700 py-2 px-6 flex text-white font-semibold text-sm"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
