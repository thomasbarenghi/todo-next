import React from "react";
import { useDispatch } from "react-redux";
import { addSubTodo } from "@/redux/slides/todoSlide";
import { useState } from "react";

export default function AddSubTodoFn({ todo, setAddSubTodoVisibility }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validate({
      title: e.target.title.value,
    });

    if (Object.keys(error).length > 0 && error.title !== null) {
      setErrors({
        ...errors,
        title: error.title,
      });
      return;
    }

    const id = todo.subTodos.length + 1;
    const completed = false;
    const newSubTodo = {
      id,
      title: e.target.title.value,
      completed,
    };
    const idTodo = todo.id;
    dispatch(addSubTodo({ idTodo, newSubTodo }));
    setAddSubTodoVisibility(false);
  };

  const handleValidation = (e) => {
    const error = validate({
      title: e.target.value,
    });
    setErrors(error);
    if (Object.keys(errors).length > 0) {
      return;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 justify-end align-bottom flex-col"
    >
      <label
        className="flex flex-col w-full gap-1 font-medilight text-black"
        htmlFor="title"
      >
        <input
          type="text"
          name="title"
          id="title"
          required
          className="bg-blue-100 rounded-3xl px-4 py-2 placeholder:text-blue-600 text-sm"
          placeholder="Ingresa un title para tu subtarea"
          onChange={handleValidation}
        />
        {errors.title && (
          <span className="text-red-500 text-xs">{errors.title}</span>
        )}
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

function validate(title) {
  const errors = {};
  console.log("tt", title);
  if (title.title === "" || !title.title) {
    errors.title = "El title es requerido";
    console.log("errors");
  }
  return errors;
}
