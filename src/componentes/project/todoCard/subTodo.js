import { useDispatch, useSelector } from "react-redux";
import { checkSubTodo } from "@/redux/slides/todoSlide";

export default function SubTask({ todo }) {
  const dispatch = useDispatch();

  return (
    <>
      <div style={{ width: "97%", marginTop: "16px" }}>
        <h6 className="mb-3 font-semibold">Subtarea/s</h6>
        <div className="flex w-full flex-col gap-1">
          {todo.subTodos.map((subTodo) => {
            return (
              <div className="flex flex-col">
                <div className="flex gap-2 align-middle justify-start items-center">
                  <input
                    className="form-check-input mini-ckBox"
                    type="checkbox"
                    style={{ minWidth: "20px", minHeight: "20px", maxWidth: "20px", maxHeight: "20px" }}
                    onChange={() => {}}
                    onClick={() =>
                      dispatch(
                        checkSubTodo({ idTodo: todo.id, idSubTodo: subTodo.id })
                      )
                    }
                    checked={subTodo.completed}
                  />
                  <div>
                    <p className="font-light  text-black">{subTodo.title} </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
