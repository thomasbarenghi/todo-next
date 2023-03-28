import { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { postTodo } from "../../../redux/slides/todoSlide";

export const createTodoVisibilityExternal = () => {
  CreateTodo.handleVisibility();
};

export default function CreateTodo() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state?.todos?.items) ?? [];
  const [createTodoVisibility, setCreateTodoVisibility] = useState(false);
  const [errors, setErrors] = useState({});
  const handleVisibility = () => {
    setCreateTodoVisibility(true);
  };

  CreateTodo.handleVisibility = handleVisibility;

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate({
      titulo: e.target.titulo.value,
      descripcion: e.target.descripcion.value,
    });

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const id = todos.length + 1;
    const completed = false;
    const newTodo = {
      id,
      title: e.target.titulo.value,
      description: e.target.descripcion.value,
      completed,
      subTodos: [],
      completedSubTodos: [],
    };
    dispatch(postTodo(newTodo));
    setCreateTodoVisibility(false);
  };

  return (
    <>
      {createTodoVisibility && (
        <div
          className="fixed z-10 flex h-screen w-screen items-center justify-center align-middle"
          style={{ background: "#00000066", top: 0, left: 0 }}
        >
          <div className="seccion container flex justify-center">
            <div className="relative flex w-full flex-col rounded-3xl bg-white p-10 sm:w-max ">
              <div
                className="absolute top-4 right-4 p-1 "
                onClick={() => setCreateTodoVisibility(false)}
              >
                <Image
                  width={15}
                  height={15}
                  alt={"close"}
                  src={"/icon/cross.svg"}
                />
              </div>
              <h3 className="font-semibold">Creemos una tarea 🚀</h3>
              <form onSubmit={handleSubmit}>
                <div className="mt-4 mb-4 flex w-full flex-col gap-3 sm:flex-row ">
                  <label className="font-medilight flex  flex-col gap-1 text-black">
                    Titulo
                    <input
                      type="text"
                      name="titulo"
                      className="w-full rounded-3xl bg-blue-100 px-4 py-3 placeholder:text-blue-600"
                      placeholder="Ingresa un titulo increíble"
                      required
                    />
                    {errors.titulo && (
                      <span className="text-sm text-red-500">
                        {errors.titulo}
                      </span>
                    )}
                  </label>
                  <label className="font-medilight flex  flex-col gap-1 text-black">
                    Descripción
                    <input
                      type="text"
                      name="descripcion"
                      className="w-full rounded-3xl bg-blue-100 px-4 py-3 placeholder:text-blue-600"
                      placeholder="Ingresa una descripción increíble"
                      required
                    />
                    {errors.descripcion && (
                      <span className="text-sm text-red-500">
                        {errors.descripcion}
                      </span>
                    )}
                  </label>
                </div>
                <button
                  type="submit"
                  className="flex rounded-3xl bg-blue-700 py-4 px-8 font-semibold text-white"
                >
                  Crear tarea
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function validate(form) {
  let errors = {};
  if (!form.titulo) {
    errors.titulo = "El titulo es requerido";
  }
  if (!form.descripcion) {
    errors.descripcion = "La descripcion es requerida";
  }
  return errors;
}
