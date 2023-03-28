import Image from "next/image";
import { useDispatch } from "react-redux";
import { setActualTodo } from "@/redux/slides/todoSlide";
import TodoManage, {
  manageTodoVisibilityExternal,
} from "../todoManage/todoManage";
import SubTodo from "./subTodo";
import { checkTodo } from "@/redux/slides/todoSlide";

export default function TodoCard({ todo }) {
  const dispatch = useDispatch();

  const handleSetActualTodo = () => {
    const todoId = todo.id;
    dispatch(setActualTodo(todoId));
    manageTodoVisibilityExternal();
  };

  return (
    <div key={todo.id}>
      <TodoManage />
      <div className="flex w-full flex-row items-start justify-between rounded-3xl bg-white p-10 align-top">
        <div className="w-full">
          <div className="align-center flex flex-row items-start justify-start gap-2">
            <input
              className="mt-3"
              onChange={() => {}}
              type="checkbox"
              onClick={() => dispatch(checkTodo({ idTodo: todo.id }))}
              checked={todo.completed}
            />
            <div>
              <h3 className="font-semibold">{todo.title}</h3>
              <p>{todo.description}</p>
            </div>
          </div>
          {todo.subTodos.length > 0 && <SubTodo todo={todo} />}
        </div>
        <button
          className="rounded-2xl border-2 border-solid border-blue-700 p-2"
          type="button"
          onClick={() => handleSetActualTodo()}
        >
          <Image width={20} height={20} alt="config" src={"/icon/dots.svg"} />
        </button>
      </div>
    </div>
  );
}
