import React from "react";
import SubTodo from "./subTodo";

export default function SubTodos({ todo }) {
  return (
    <div className="mt-4 flex flex-col items-start justify-start align-top">
      <h6 className="mb-2 font-semibold">Subtodos</h6>
      {todo.subTodos.map((subTodo) => (
        <SubTodo key={subTodo.id} subTodo={subTodo} todoId={todo.id} />
      ))}
    </div>
  );
}
