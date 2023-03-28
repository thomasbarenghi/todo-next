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

    console.log(newTodo);
    dispatch(postTodo(newTodo));
    setCreateTodoVisibility(false);
  };

  return (
    <>
      {createTodoVisibility && (
        <div
          className="fixed z-10 h-screen w-screen flex justify-center align-middle items-center"
          style={{ background: "#00000066", top: 0, left: 0 }}
        >
          <div className="seccion container flex justify-center">
            <div className="bg-white rounded-3xl p-10 relative flex flex-col w-full sm:w-max ">
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
                <div className="flex flex-col sm:flex-row mt-4 w-full gap-3 mb-4 ">
                  <label className="flex flex-col  gap-1 font-medilight text-black">
                    Titulo
                    <input
                      type="text"
                      name="titulo"
                      className="bg-blue-100 rounded-3xl px-4 py-3 placeholder:text-blue-600 w-full"
                      placeholder="Ingresa un titulo increíble"
                      required
                    />
                    {errors.titulo && (
                      <span className="text-red-500 text-sm">
                        {errors.titulo}
                      </span>
                    )}
                  </label>
                  <label className="flex flex-col  gap-1 font-medilight text-black">
                    Descripción
                    <input
                      type="text"
                      name="descripcion"
                      className="bg-blue-100 rounded-3xl px-4 py-3 placeholder:text-blue-600 w-full"
                      placeholder="Ingresa una descripción increíble"
                      required
                    />
                    {errors.descripcion && (
                      <span className="text-red-500 text-sm">
                        {errors.descripcion}
                      </span>
                    )}
                  </label>
                </div>
                <button
                  type="submit"
                  className="rounded-3xl bg-blue-700 py-4 px-8 flex text-white font-semibold"
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
