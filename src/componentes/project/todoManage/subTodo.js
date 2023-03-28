import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  editSubTodo,
  checkSubTodo,
  deleteSubTodo,
} from "@/redux/slides/todoSlide";
import Image from "next/image";

export default function SubTodo({ subTodo, todoId }) {
  const dispatch = useDispatch();
  const idSubTodo = subTodo.id;
  const [addSubTodoVisibility, setAddSubTodoVisibility] = useState({
    title: { edit: false, prev: null },
  });
  const [titleValue, setTitleValue] = useState(subTodo.title);
  const [errors, setErrors] = useState({});

  const handleEditSubTodo = () => {
    const title = titleValue !== null ? titleValue : subTodo.title;

    const id = subTodo.id;

    const newEditSubTodo = {
      idSubTodo: id,
      subTodoEdited: {
        id,
        title: title,
        completed: subTodo.completed,
      },
      idTodo: todoId,
    };

    dispatch(editSubTodo(newEditSubTodo));
  };

  const handleVisibilityTextTitleBlur = () => {
    setAddSubTodoVisibility({
      ...addSubTodoVisibility,
      title: {
        ...addSubTodoVisibility.title,
        edit: true,
      },
    });
  };

  const handleVisibilityInputTitleChange = (e) => {
    const errorTitle = validateSubTodoForm({
      titulo: e.target.value,
    });

    setErrors(errorTitle);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setTitleValue(e.target.value);
  };

  const handleVisibilityInputTitleBlur = () => {
    setAddSubTodoVisibility({
      ...addSubTodoVisibility,
      title: {
        ...addSubTodoVisibility.title,
        edit: false,
      },
    });
    handleEditSubTodo();
  };

  return (
    <>
      <div
        className="flex w-full flex-row justify-between gap-3"
        key={subTodo.id}
      >
        <div className="flex flex-row items-center justify-center gap-2  align-middle">
          <input
            type="checkbox"
            className=""
            onChange={() => {}}
            checked={subTodo.completed}
            onClick={() =>
              dispatch(checkSubTodo({ idTodo: todoId, idSubTodo }))
            }
          />

          {addSubTodoVisibility.title.edit ? (
            <>
              <input
                type="text"
                defaultValue={titleValue}
                autoFocus
                required
                onChange={(e) => handleVisibilityInputTitleChange(e)}
                onBlur={() => handleVisibilityInputTitleBlur()}
              />
              {errors.title !== null && (
                <p className="text-xs italic text-red-500">{errors.title}</p>
              )}
            </>
          ) : (
            <p
              className="text-base"
              onClick={() => handleVisibilityTextTitleBlur()}
            >
              {titleValue}
            </p>
          )}
        </div>
        <Image
          src="/icon/cross.svg"
          width={10}
          height={10}
          onClick={() => dispatch(deleteSubTodo({ idSubTodo, todoId }))}
        />
      </div>
    </>
  );
}

function validateSubTodoForm(values) {
  let errors = {};

  if (!values.titulo) {
    errors.title = "El titulo es obligatorio";
    console.log("El titulo es obligatorio", values);
  } else {
    errors.title = null;
  }

  return errors;
}
