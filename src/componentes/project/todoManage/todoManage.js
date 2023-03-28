import { useDispatch, useSelector } from "react-redux";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import {
  editTodo,
  addSubTodo,
  deleteTodo,
  editSubTodo,
  deleteSubTodo,
  checkTodo,
  checkSubTodo,
} from "@/redux/slides/todoSlide";
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
    console.log("handleVisibility");
    setManageTodoVisibility(true);
  };

  useEffect(() => {
    setAddSubTodoVisibility(false);
  }, [manageTodoVisibility]);

  TodoManage.handleVisibility = handleVisibility;

  return (
    <>
      {manageTodoVisibility && (
        <div
          className="fixed z-10 h-screen w-screen flex justify-end align-middle items-center"
          style={{ background: "#00000066", top: 0, left: 0 }}
        >
          <div className="h-full py-20 seccion flex justify-end">
            <div className="bg-white rounded-3xl p-10 relative flex flex-col h-full w-full sm:w-3/4 lg:w-2/5 2xl:w-1/4">
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
              <h4 className="font-semibold mb-2">Editemos esta tarea 🤯</h4>
              <div className="flex justify-between flex-col h-full ">
                <div className="overflow-y-scroll relative h-full ">
                  <div className="absolute top-0 left-0 bottom-0 right-0 pr-4">
                    <PrincipalTodo todo={actualTodo} />
                    {addSubTodoVisibility === false && (
                      <button
                        className="font-semibold text-blue-700 text-sm"
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
                    className="w-full bg-red-700 text-white py-3 px-8 rounded-3xl font-semibold mt-4"
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







