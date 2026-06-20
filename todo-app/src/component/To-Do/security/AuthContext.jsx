import { createContext, useContext} from "react";
import { useState } from "react";
import { executeJwtAuthenticationService } from "../Api/AuthenticationApiService";
import { ApiClient } from "../Api/ApiClient";
//create context
export const AuthContext = createContext();

export const useAuth=()=>{
    return useContext(AuthContext);
}
//share with other components 
export default function AuthProvider({ children }) {
    //put some state in context
    const [username, setUsername] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    // function login(username,password){
    //     if (username === "Deepak" && password === "Elektrobit") {
    //     // Handle successful login
    //     setIsAuthenticated(true);
    //     setUsername(username);

    //     return true;
    // } else {
    //     // Handle failed login
    //     setIsAuthenticated(false);
    //     return false;
    // }
    // }
    // async function login(username,password){
    //     const batoken = 'Basic ' + window.btoa(username + ':' + password);
    //     console.log("Token: " + batoken);
    //     try {
    //         const response = await (await executeBasicAuthenticationService(batoken));
    //         ApiClient.interceptors.request.use((config) => {
    //             console.log("intercepting and adding a token")  
    //             config.headers.Authorization = batoken;
    //             return config;
    //         });
    //         setIsAuthenticated(true);
    //         setUsername(username);
    //         setToken(batoken);
    //         return true;
    //     } catch (error) {
    //         setIsAuthenticated(false);
    //         setUsername(null);
    //         setToken(null);
    //         return false;
    //     }
    // }


    async function login(username,password){
        try {
            const response = await executeJwtAuthenticationService(username, password);
            if (response.status === 200) {
                const bearerToken = "Bearer " + response.data.token;
            ApiClient.interceptors.request.use((config) => {
                console.log("intercepting and adding a token")  
                config.headers.Authorization = bearerToken;
                return config;
            });
                setIsAuthenticated(true);
                setUsername(username);
                console.log("Token: " + bearerToken);
                setToken(bearerToken);
                return true;
            } else {
                console.error("Authentication failed");
                return false;
            }
        } catch (error) {
            setIsAuthenticated(false);
            setUsername(null);
            setToken(null);
            delete ApiClient.defaults.headers.common.Authorization;
            return false;
        }
    }
    function logout(){
        setIsAuthenticated(false);
        setUsername(null);
        setToken(null);
        delete ApiClient.defaults.headers.common.Authorization;
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, username, token }}>
            {children}
        </AuthContext.Provider>
    )
}
export {

}