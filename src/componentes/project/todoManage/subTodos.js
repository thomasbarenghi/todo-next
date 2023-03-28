import React from "react";
import SubTodo from "./subTodo";

export default function SubTodos({ todo }) {
  return (
    <div className="flex flex-col justify-start align-top items-start mt-4">
      <h6 className="font-semibold mb-2">Subtodos</h6>
      {todo.subTodos.map((subTodo) => (
        <SubTodo key={subTodo.id} subTodo={subTodo} todoId={todo.id} />
      ))}
    </div>
  );
}
