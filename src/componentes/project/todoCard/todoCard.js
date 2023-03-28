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
      <div className="rounded-3xl bg-white p-10 flex flex-row align-top justify-between items-start w-full">
        <div className="w-full">
          <div className="flex flex-row align-center justify-start items-start gap-2">
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
          className="p-2 border-solid border-blue-700 border-2 rounded-2xl"
          type="button"
          onClick={() => handleSetActualTodo()}
        >
          <Image width={20} height={20} alt="config" src={"/icon/dots.svg"} />
        </button>
      </div>
    </div>
  );
}
