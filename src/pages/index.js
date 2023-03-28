import { requestToBodyStream } from "next/dist/server/body-streams";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux"
import CreateTodo, {createTodoVisibilityExternal} from "@/componentes/project/createTodo/createTodo";
import TodoCard from "@/componentes/project/todoCard/todoCard";

export default function Home() {

    const dispatch = useDispatch();
    const todos = useSelector((state) => state?.todos?.items) ?? [];

    return (
        <>
            <Head>
                <title>Todo Next</title>
                <meta name="description" content="Todo Next" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
               <CreateTodo/>  
                <section className=" bg-gray-100 min-h-screen py-16 w-full flex flex-col" >
                    <div className="seccion">
                    <div className="  flex flex-row justify-between w-full">
                        <h1>Mis{" "}<strong className="font-semibold" >tareas</strong></h1>
                        <button className="rounded-3xl bg-blue-700 py-4 px-8 flex text-white font-semibold" onClick={(e) => createTodoVisibilityExternal()} >Añadir tarea</button>
                    </div>
                    <div className="  flex flex-col justify-between mt-6 gap-5 w-full">
                        {
                            todos.map((todo) => (
                                <>
                                    <TodoCard todo={todo} />
                                </>
                            ))
                        }
                    </div>
                    </div>
                </section>
            </main>
        </>
    )
}



{/* <div className="d-flex flex-column" style={{ gap: 40 }}>
{
    todos.map((todo) => {
        return <Task todo={todo} handleSetActualTodo={handleSetActualTodo} />
    })
}
</div> */}


{/* <section id={style["hero"]}>
<div id={style["col-todos"]} className="d-flex flex-column padding-lr-t1">
    <div
        id={style["controles"]}
        className="d-flex flex-column justify-content-between flex-sm-row flex-md-row align-items-xl-center"
        style={{ gap: 8 }}
    >
        <h1 className="titulo1-regular margin-b-0">
            Mis <strong>tareas</strong>
        </h1>
        <button className="btn btn-primary btn1 btn1-t1" type="button" onClick={(e) => { openModal(true); }}>
            Añadir tarea
        </button>
    </div>
    <div className="d-flex flex-column" style={{ gap: 40 }}>
        {
            todos.map((todo) => {
                return <Task todo={todo} handleSetActualTodo={handleSetActualTodo} />
            })
        }
    </div>
</div>
<Aside todoId={actualTodo.id} />
</section>
<ModalBox>
<form onSubmit={handleAddTodo} style={{ marginBottom: "40px" }} >
    <input type="text" name='titulo' placeholder="Escribe tu tarea" />
    <input type="text" name='description' placeholder="Escribe una descripción" />
    <button>Agregar</button>
</form>
</ModalBox>
</> */}