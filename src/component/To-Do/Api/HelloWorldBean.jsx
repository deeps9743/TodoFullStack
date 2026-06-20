import {ApiClient} from "./ApiClient";

export function retrieveHelloWorldBean(){
        return ApiClient.get("/hello-world")
    }
export const retrieveHelloWorldBeanWithPathVariable = 
(username) => { return ApiClient.get(`/hello-world/path-variable/${username}`) }


