import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTodo } from "@/redux/slides/todoSlide";

export default function PrincipalTodo({ todo }) {
  const dispatch = useDispatch();
  const [titleValue, setTitleValue] = useState(todo.title);
  const [descriptionValue, setDescriptionValue] = useState(todo.description);

  const [principalVisibility, setPrincipalVisibility] = useState({
    title: { edit: false, prev: null },
    description: { edit: false, prev: null },
  });

  const handleEditTodo = () => {
    const title = titleValue !== null ? titleValue : todo.title;
    const description =
      descriptionValue !== null ? descriptionValue : todo.description;

    const id = todo.id;

    const newEditTodo = {
      id: id,
      todoEdited: {
        id,
        title: title,
        description: description,
        completed: todo.completed,
        subTodos: todo.subTodos,
        completedSubTodos: todo.completedSubTodos,
      },
    };

    dispatch(editTodo(newEditTodo));
  };

  const handleVisibilityTextTitleBlur = () => {
    setPrincipalVisibility({
      ...principalVisibility,
      title: {
        ...principalVisibility.title,
        edit: true,
      },
    });
  };

  const handleVisibilityInputTitleChange = (e) => {
    setTitleValue(e.target.value);
  };

  const handleVisibilityInputTitleBlur = () => {
    setPrincipalVisibility({
      ...principalVisibility,
      title: {
        ...principalVisibility.title,
        edit: false,
      },
    });
    handleEditTodo();
  };

  const handleVisibilityTextDescriptionBlur = () => {
    setPrincipalVisibility({
      ...principalVisibility,
      description: {
        ...principalVisibility.description,
        edit: true,
      },
    });
  };

  const handleVisibilityInputDescriptionChange = (e) => {
    setDescriptionValue(e.target.value);
  };

  const handleVisibilityInputDescriptionBlur = () => {
    setPrincipalVisibility({
      ...principalVisibility,
      description: {
        ...principalVisibility.description,
        edit: false,
      },
    });
    handleEditTodo();
  };

  const handleCompletedTodo = () => {
    const idTodo = todo.id;
    dispatch(checkTodo({ idTodo }));
  };

  return (
    <div className="flex flex-row justify-start align-top items-start gap-2 mb-4">
      <input
        type="checkbox"
        className="mt-2"
        onClick={() => handleCompletedTodo()}
        checked={todo.completed}
        onChange={() => {}}
      />

      <div style={{ width: "inherit" }}>
        {principalVisibility.title.edit ? (
          <input
            type="text"
            defaultValue={titleValue}
            autoFocus
            onChange={(e) => handleVisibilityInputTitleChange(e)}
            onBlur={() => handleVisibilityInputTitleBlur()}
          />
        ) : (
          <h5
            className="font-semibold"
            onClick={() => handleVisibilityTextTitleBlur()}
          >
            {titleValue}
          </h5>
        )}
        {principalVisibility.description.edit ? (
          <textarea
            style={{ lineHeight: "135% !important" }}
            defaultValue={descriptionValue}
            autoFocus
            onChange={(e) => handleVisibilityInputDescriptionChange(e)}
            onBlur={() => handleVisibilityInputDescriptionBlur()}
          />
        ) : (
          <p
            className="text-base"
            onClick={() => handleVisibilityTextDescriptionBlur()}
          >
            {descriptionValue}
          </p>
        )}
      </div>
    </div>
  );
}
