import { useState } from "react";
import { useDispatch } from "react-redux";
import { editSubTodo, checkSubTodo, deleteSubTodo } from "@/redux/slides/todoSlide";
import Image from "next/image";

export default function SubTodo({ subTodo, todoId }) {
    const dispatch = useDispatch();
    const idSubTodo = subTodo.id;
    const [addSubTodoVisibility, setAddSubTodoVisibility] = useState({
      title: { edit: false, prev: null },
    });
    const [titleValue, setTitleValue] = useState(subTodo.title);
  
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
          className="flex flex-row gap-3 justify-between w-full"
          key={subTodo.id}
        >
          <div className="flex-row flex gap-2 justify-center align-middle  items-center">
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
              <input
                type="text"
                defaultValue={titleValue}
                autoFocus
                onChange={(e) => handleVisibilityInputTitleChange(e)}
                onBlur={() => handleVisibilityInputTitleBlur()}
              />
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
  