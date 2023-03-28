import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import CreateTodo, {
  createTodoVisibilityExternal,
} from "@/componentes/project/createTodo/createTodo";
import TodoCard from "@/componentes/project/todoCard/todoCard";
import { setActivas } from "@/redux/slides/todoSlide";
import { useEffect, useState } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const todosX = useSelector((state) => state?.todos?.items) ?? [];
  const filter = useSelector((state) => state?.todos?.filter) ?? [];
  const [todos, setTodos] = useState(todosX);

  useEffect(() => {
    setTodos(todosX);
  }, [todosX]);

  useEffect(() => {
    if (filter.active === "all") {
      setTodos(todosX);
    } else if (filter.active === "completed") {
      setTodos(todosX.filter((todo) => todo.completed));
    } else if (filter.active === "incompleted") {
      setTodos(todosX.filter((todo) => !todo.completed));
    }
  }, [filter.active, todosX]);

  return (
    <>
      <Head>
        <title>Todo Next | Thomas Barenghi</title>
        <meta name="description" content="Todo Next" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1D4ED8" />
      </Head>
      <main>
        <CreateTodo />
        <section
          className=" flex w-full flex-col bg-gray-100 py-16"
          style={{ minHeight: "auto" }}
        >
          <div className="seccion">
            <div className="flex w-full flex-col justify-between gap-2 overflow-x-scroll sm:flex-row sm:overflow-hidden">
              <h1>
                Mis <strong className="font-semibold">tareas</strong>
              </h1>
              <div className="flex gap-2">
                <select
                  className="  rounded-3xl border-r-8 border-solid border-blue-200 bg-blue-200 py-4 px-6 align-middle font-semibold text-blue-700"
                  onChange={(e) =>
                    dispatch(setActivas({ value: e.target.value }))
                  }
                  value={filter.active}
                >
                  {filter?.options?.map((option) => (
                    <option
                      name={option.label}
                      key={option.value}
                      value={option.value}
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>

                <button
                  className="flex justify-center whitespace-nowrap rounded-3xl bg-blue-700 py-4 px-8 align-middle font-semibold text-white"
                  onClick={(e) => createTodoVisibilityExternal()}
                >
                  Añadir tarea
                </button>
              </div>
            </div>
            <div className="  mt-6 flex w-full flex-col justify-between gap-5">
              {todos.map((todo) => (
                <div key={todo.id}>
                  <TodoCard todo={todo} />
                </div>
              ))}
              {todos.length === 0 && (
                <div
                  className="mt-4 flex flex-col  items-center justify-center"
                  style={{ minHeight: "200px" }}
                >
                  <h4 className="mb-4 w-full text-center">
                    Hey, parece que no hay ninguna tarea por aquí 😵‍💫, <br />{" "}
                    <bold className="font-semibold">
                      ¿Que esperas para crear una?
                    </bold>{" "}
                    🤯
                  </h4>
                  <h5 className="w-full text-center sm:w-3/5">
                    Tip: Si haces click en los 3 puntos de la tarea, verás el
                    menu de edición, donde podrás editar la tarea, agregar
                    subtareas, eliminarlas, marcarlas como completadas, etc.
                  </h5>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
