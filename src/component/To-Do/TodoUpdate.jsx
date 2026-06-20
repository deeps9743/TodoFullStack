import { useNavigate, useParams } from "react-router-dom";
import { createTodoApi, retrieveTodoByIdApi, updateTodoByIdApi } from "./Api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { Formik, Form } from "formik";

export default function TodoUpdate() {
    const useAuths = useAuth();
    const username = useAuths.username;
    const { id } = useParams();
    const [description, setDescription] = useState("");
    const [targetDate, setTargetDate] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        retrieveTodo(id);
    }, [id]);

    function retrieveTodo(id) {
        if (id !==-1) {
            retrieveTodoByIdApi(username, id)
                .then((response) => {
                    setDescription(response.data.description);
                    setTargetDate(response.data.targetDate);
                }).catch((error) => console.log(error))
                .finally(() => console.log("cleanup"));
        }    
    }

    function onSubmit(values) {
        
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false,
        };
        if (id === '-1') {
            // Create a new todo
            createTodoApi(username, todo)
                .then(() => navigate(`/todos/`))
                .catch((error) => console.log(error))
                .finally(() => console.log("cleanup"));
        }else {
        updateTodoByIdApi(username, id, todo).
            then(() => navigate(`/todos/`))
             .catch((error) => console.log(error))
             .finally(() => console.log("cleanup"));
        }
    }

    function validate(values) {
        let errors = {};   
        if(!values.description) {
            errors.description = "Enter a description";
        }
        if(!values.targetDate) {
            errors.targetDate = "Enter a target date";
        }
        return errors;
    }

    return (
        <div className="TodoUpdate">
            {id !== '-1' && <h1>Update Todo</h1>}
            {id === '-1' && <h1>Create Todo</h1>}
            <div>
                <Formik
                    initialValues={{ description, targetDate }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({ handleChange, values, errors, touched }) => (
                        <Form>
                            <div>
                                <label>Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={values.description}
                                    onChange={(e) => {
                                        handleChange(e);
                                        setDescription(e.target.value);
                                    }}
                                />
                                {errors.description && touched.description && (
                                    <div className="alert alert-warning">{errors.description}</div>
                                )}
                            </div>
                            <div>
                                <label>Target Date</label>
                                <input
                                    type="date"
                                    name="targetDate"
                                    value={values.targetDate}
                                    onChange={(e) => {
                                        handleChange(e);
                                        setTargetDate(e.target.value);
                                    }}
                                />
                                {errors.targetDate && touched.targetDate && (
                                    <div className="alert alert-warning">{errors.targetDate}</div>
                                )}
                            </div>
                            <button className="btn btn-success m-5" type="submit">
                                Save
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}