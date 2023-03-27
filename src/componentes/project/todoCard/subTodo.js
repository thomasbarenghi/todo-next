export default function SubTask({ todo }) {
  return (
    <>
      <div style={{ width: "97%", marginTop: "16px" }}>
        <h6 className="font-semibold mb-2">Subtarea/s</h6>
        <div className="d-flex flex-column gap-2">
          {todo.subTodos.map((subTodo) => {
            return (
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <input
                    className="form-check-input mini-ckBox"
                    type="checkbox"
                    defaultChecked=""
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
