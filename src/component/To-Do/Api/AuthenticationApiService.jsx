import {ApiClient} from "./ApiClient";

export const executeBasicAuthenticationService = (token) => {
    return ApiClient.get("/basicAuth", {
        headers: {
            Authorization: token
        }
    });
};
export const executeJwtAuthenticationService = (username, password) => {
    return ApiClient.post("/authenticate", {username, password})};