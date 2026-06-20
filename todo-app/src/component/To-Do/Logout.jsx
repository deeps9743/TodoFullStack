import {useAuth} from "./security/AuthContext";
export function LogoutComponent(){
    const { setIsAuthenticated, logout } = useAuth();
    setIsAuthenticated(false);
    return(
        <div className="LogoutComponent">
            <h1>You are logged out</h1>
            <div className="LogoutComponent">
                Thank you for using our application
            </div>
        </div>
    )
}