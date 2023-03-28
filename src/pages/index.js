import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import CreateTodo, {
  createTodoVisibilityExternal,
} from "@/componentes/project/createTodo/createTodo";
import TodoCard from "@/componentes/project/todoCard/todoCard";

export default function Home() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state?.todos?.items) ?? [];

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
        <section className=" flex w-full flex-col bg-gray-100 py-16" style={{minHeight: "auto"}}>
          <div className="seccion">
            <div className="  flex w-full flex-col justify-between gap-2 sm:flex-row">
              <h1>
                Mis <strong className="font-semibold">tareas</strong>
              </h1>
              <button
                className="flex justify-center rounded-3xl bg-blue-700 py-4 px-8 align-middle font-semibold text-white"
                onClick={(e) => createTodoVisibilityExternal()}
              >
                Añadir tarea
              </button>
            </div>
            <div className="  mt-6 flex w-full flex-col justify-between gap-5">
              {todos.map((todo) => (
                <>
                  <TodoCard todo={todo} />
                </>
              ))}
              {todos.length === 0 && (
                <div
                  className="flex flex-col items-center  justify-center"
                  style={{ minHeight: "200px" }}
                >
                  <h4 className="mb-4 w-full text-center">
                    Hey, parece que aun no creaste ninguna tarea 😵‍💫, <br />{" "}
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
