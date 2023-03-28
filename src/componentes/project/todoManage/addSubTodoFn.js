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
      className="tr flex flex-col justify-end gap-2 align-bottom"
    >
      <label
        className="font-medilight flex w-full flex-col gap-1 text-black"
        htmlFor="title"
      >
        <input
          type="text"
          name="title"
          id="title"
          required
          className="rounded-3xl bg-blue-100 px-4 py-3 text-sm placeholder:text-blue-600"
          placeholder="Ingresa un título para tu subtarea"
          onChange={handleValidation}
        />
        {errors.title && (
          <span className="text-xs text-red-500">{errors.title}</span>
        )}
      </label>
      <div className="flex items-start justify-start gap-2 align-top">
        <button
          type="submit"
          className="flex rounded-3xl bg-blue-700 py-2 px-6 text-sm font-semibold text-white"
        >
          Añadir
        </button>
        <button
          type="button"
          onClick={(e) => setAddSubTodoVisibility(false)}
          className="flex rounded-3xl bg-red-700 py-2 px-6 text-sm font-semibold text-white"
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
