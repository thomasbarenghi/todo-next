import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Image from "next/image";
import { deleteTodo } from "@/redux/slides/todoSlide";
import AddSubTodoFn from "./addSubTodoFn";
import PrincipalTodo from "./principalTodo";
import SubTodos from "./subTodos";

export const manageTodoVisibilityExternal = () => {
  TodoManage.handleVisibility();
};

export default function TodoManage() {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state?.todos?.items) ?? {};
  const actualTodoId = useSelector((state) => state?.todos?.actualTodo) ?? {};
  const actualTodo = todos.find((todo) => todo.id === actualTodoId);
  const [manageTodoVisibility, setManageTodoVisibility] = useState(false);
  const [addSubTodoVisibility, setAddSubTodoVisibility] = useState(false);

  const handleVisibility = () => {
    setManageTodoVisibility(true);
  };

  useEffect(() => {
    setAddSubTodoVisibility(false);
  }, [manageTodoVisibility]);

  TodoManage.handleVisibility = handleVisibility;

  return (
    <>
      {manageTodoVisibility && actualTodo && (
        <div
          className="fixed z-10 flex h-screen w-screen items-center justify-end align-middle"
          style={{ background: "#00000066", top: 0, left: 0 }}
        >
          <div className="seccion flex h-full justify-end py-14">
            <div className="relative flex h-full w-full flex-col rounded-3xl bg-white p-10 sm:w-3/4 lg:w-2/5 2xl:w-1/4">
              <div
                className="absolute top-4 right-4 p-1 "
                onClick={() => setManageTodoVisibility(false)}
              >
                <Image
                  width={14}
                  height={14}
                  alt={"close"}
                  src={"/icon/cross.svg"}
                />
              </div>
              <div className="mb-4">
              <h4 className=" font-semibold">Editemos esta tarea 🤯</h4>
              <p className="text-sm  text-gray-500">
                Haz click en el titulo de tu tarea para editarla, puedes hacer
                lo mismo con la descripción y las subtareas.
              </p>
              </div>
              <div className="flex h-full flex-col justify-between ">
                <div className="relative h-full overflow-y-scroll ">
                  <div className="absolute top-0 left-0 bottom-0 right-0 pr-4">
                    <PrincipalTodo todo={actualTodo} />
                    {addSubTodoVisibility === false && (
                      <button
                        className="text-sm font-semibold text-blue-700"
                        onClick={() =>
                          setAddSubTodoVisibility(!addSubTodoVisibility)
                        }
                      >
                        Añadir subtarea
                      </button>
                    )}
                    {addSubTodoVisibility && (
                      <AddSubTodoFn
                        todo={actualTodo}
                        setAddSubTodoVisibility={setAddSubTodoVisibility}
                      />
                    )}
                    <div>
                      {actualTodo.subTodos.length > 0 && (
                        <SubTodos todo={actualTodo} />
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => dispatch(deleteTodo(actualTodo.id))}
                    className="mt-4 w-full rounded-3xl bg-red-700 py-3 px-8 font-semibold text-white"
                  >
                    Borrar tarea
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
