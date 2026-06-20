import {ApiClient} from "./ApiClient";

export function retrieveAllTodosApi(username){
        return ApiClient.get(`/users/${username}/todos/`)
}

export function retrieveTodoByIdApi(username, id){
        return ApiClient.get(`/users/${username}/todos/${id}`)
}
export function deleteTodoByIdApi(username, id){
        return ApiClient.delete(`/users/${username}/todos/${id}`)
}

export function updateTodoByIdApi(username, id, todo){
        return ApiClient.put(`/users/${username}/todos/${id}`, todo)
}

export function createTodoApi(username, todo){
        return ApiClient.post(`/users/${username}/todos/`, todo)
}