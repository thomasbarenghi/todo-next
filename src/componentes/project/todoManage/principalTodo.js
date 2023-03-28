import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTodo, checkTodo } from "@/redux/slides/todoSlide";

export default function PrincipalTodo({ todo }) {
  const dispatch = useDispatch();
  const [titleValue, setTitleValue] = useState(todo.title);
  const [descriptionValue, setDescriptionValue] = useState(todo.description);
  const [errors, setErrors] = useState({});
  const [errorDescription, setErrorDescription] = useState({});
  const [errorTitle, setErrorTitle] = useState({});

  const [principalVisibility, setPrincipalVisibility] = useState({
    title: { edit: false, prev: null },
    description: { edit: false, prev: null },
  });

  const handleEditTodo = () => {
    if (titleValue === null && descriptionValue === null) {
      return;
    }

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
    const errorTitleX = validateTitle({
      title: e.target.value,
    });

    setErrorTitle(errorTitleX);

    if (Object.keys(errorTitleX).length > 0) {
      return;
    }

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
    const errorDescription = validateDescription({
      description: e.target.value,
    });

    setErrorDescription(errorDescription);

    if (Object.keys(errorDescription).length > 0) {
      return;
    }

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
          <>
            <input
              type="text"
              defaultValue={titleValue}
              autoFocus
              onChange={(e) => handleVisibilityInputTitleChange(e)}
              onBlur={() => handleVisibilityInputTitleBlur()}
              required
            />
            {errorTitle.title && (
              <p className="text-red-500 text-xs italic">{errorTitle.title}</p>
            )}
          </>
        ) : (
          <h5
            className="font-semibold"
            onClick={() => handleVisibilityTextTitleBlur()}
          >
            {titleValue}
          </h5>
        )}
        {principalVisibility.description.edit ? (
          <>
            <textarea
              style={{ lineHeight: "135% !important" }}
              defaultValue={descriptionValue}
              autoFocus
              onChange={(e) => handleVisibilityInputDescriptionChange(e)}
              onBlur={() => handleVisibilityInputDescriptionBlur()}
              required
            />
            {errorDescription.description && (
              <p className="text-red-500 text-xs italic">
                {errorDescription.description}
              </p>
            )}
          </>
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

function validateTitle(values) {
  let errors = {};

  if (!values.titulo) {
    errors.title = "El titulo es obligatorio";
  }
  return errors;
}

function validateDescription(values) {
  let errors = {};
  console.log(values);
  if (!values.description || values.description === "") {
    console.log("entro");
    errors.description = "La descripcion es obligatoria";
  }
  return errors;
}
