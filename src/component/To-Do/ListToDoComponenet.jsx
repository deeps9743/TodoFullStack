import { useState, useEffect } from "react";
import {retrieveAllTodosApi,deleteTodoByIdApi} from "./Api/TodoApiService"
import { useAuth } from "./security/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

export function ListTodoComponent(){
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);
    const username = useAuth().username;
    const navigate = useNavigate();
    const { id } = useParams();
    function retrieveTodos(){
        retrieveAllTodosApi(username)
            .then((response) => {
                console.log(response.data);
                setTodos(response.data);
            })
            .catch((error) => errorResponse(error))
            .finally(() => console.log("cleanup"));
    };

    useEffect(() => {
        console.log("Hello from useEffect");
        retrieveTodos();
    }, [id]);

    function errorResponse(error){
        console.log(error);
    }
    function deleteTodo(id){
        deleteTodoByIdApi(username, id)
            .then(() => {
                setMessage(`Delete of todo id=${id} successful`);
                retrieveTodos();
            })
            .catch((error) => errorResponse(error))
            .finally(() => console.log("cleanup"));
    }
    function handleUpdate(id) {
            navigate(`/todo/update/${id}`)
    }
    function addTodo() {
        navigate(`/todo/update/-1`)
    }
    return(
    <div className="container">
        <h1>Things you want to do</h1>
            {message && <div className="alert alert-success">{message}</div>}
        <div className="ListTodoComponent">
            <table className="table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Is Done ?</th>
                        <th>Target Date</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id}>
                            <td>{todo.description}</td>
                            <td>{todo.done ? "Done" : "Pending"}</td>
                            <td>{todo.targetDate}</td>
                            <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                            <td><button className="btn btn-info" onClick={() => handleUpdate(todo.id)}>Update</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="button">
            <button className="btn btn-success m-5" onClick={addTodo}>Create Todo</button>
        </div>
    </div>
)
}