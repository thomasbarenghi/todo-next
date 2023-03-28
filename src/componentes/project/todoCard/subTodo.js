import { useDispatch, useSelector } from "react-redux";
import { checkSubTodo } from "@/redux/slides/todoSlide";

export default function SubTask({ todo }) {
  const dispatch = useDispatch();

  return (
    <>
      <div style={{ width: "97%", marginTop: "16px" }}>
        <h6 className="mb-2 font-semibold">Subtarea/s</h6>
        <div className="d-flex flex-column gap-2">
          {todo.subTodos.map((subTodo) => {
            return (
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <input
                    className="form-check-input mini-ckBox"
                    type="checkbox"
                    defaultChecked=""
                    onChange={() => {}}
                    onClick={() =>
                      dispatch(
                        checkSubTodo({ idTodo: todo.id, idSubTodo: subTodo.id })
                      )
                    }
                    checked={subTodo.completed}
                  />
                  <div>
                    <p className="font-normal">{subTodo.title} </p>
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
