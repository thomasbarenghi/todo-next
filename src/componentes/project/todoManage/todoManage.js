import { useDispatch, useSelector } from "react-redux";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import { editTodo, addSubTodo, deleteTodo } from "@/redux/slides/todoSlide";

export const manageTodoVisibilityExternal = () => {
  TodoManage.handleVisibility();
};

export default function TodoManage() {
  const dispatch = useDispatch();

  const actualTodo = useSelector((state) => state.todos.actualTodo) ?? {};
  const [manageTodoVisibility, setManageTodoVisibility] = useState(false);
  const [addSubTodoVisibility, setAddSubTodoVisibility] = useState(false);

  const handleVisibility = () => {
    console.log("handleVisibility");
    setManageTodoVisibility(true);
  };

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
                <Image width={14} height={14} alt={"close"} src={"/icon/cross.svg"} />
              </div>
              <h4 className="font-semibold mb-2">Editemos esta tarea 🤯</h4>
              <div className="flex justify-between flex-col h-full">
                <div>
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
                </div>
                <div>
                  <button
                    onClick={() => dispatch(deleteTodo(actualTodo.id))}
                    className="w-full bg-red-700 text-white py-3 px-8 rounded-3xl font-semibold "
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

function AddSubTodoFn({ todo, setAddSubTodoVisibility }) {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = todo.subTodos.length + 1;
    const completed = false;
    const newSubTodo = {
      id,
      title: e.target.titulo.value,
      completed,
    };
    const idTodo = todo.id;
    dispatch(addSubTodo({ idTodo, newSubTodo }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 justify-end align-bottom flex-col"
    >
      <label
        className="flex flex-col w-full gap-1 font-medilight text-black"
        htmlFor="titulo"
      >
        <input
          type="text"
          name="titulo"
          id="titulo"
          className="bg-blue-100 rounded-3xl px-4 py-2 placeholder:text-blue-600 text-sm"
          placeholder="Ingresa un titulo para tu subtarea"
        />
      </label>
      <div className="flex gap-2 justify-start items-start align-top">
        <button
          type="submit"
          className="rounded-3xl bg-blue-700 py-2 px-6 flex text-white font-semibold text-sm"
        >
          Añadir
        </button>
        <button
          type="button"
          onClick={(e) => setAddSubTodoVisibility(false)}
          className="rounded-3xl bg-red-700 py-2 px-6 flex text-white font-semibold text-sm"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

function PrincipalTodo({ todo }) {
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

  return (
    <div className="flex flex-row justify-start align-top items-start gap-2 mb-4">
      <input type="checkbox" defaultChecked="" className="mt-2" />

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
          <h5 className="font-semibold" onClick={() => handleVisibilityTextTitleBlur()}>{titleValue}</h5>
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
          <p className="text-base" onClick={() => handleVisibilityTextDescriptionBlur()}>
            {descriptionValue}
          </p>
        )}
      </div>
    </div>
  );
}
