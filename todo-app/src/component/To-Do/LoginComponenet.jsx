import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./security/AuthContext";
function LoginComponent() {
    const { isAuthenticated, setIsAuthenticated, login } = useAuth();
    const [username, setUsername] = useState("Deepak")
    const [password, setPassword] = useState("Elektrobit")
    const [loginMessage, setLoginMessage] = useState("")
    const navigate = useNavigate();
    function handleUserNameChange(event) {
        setUsername(event.target.value)
    }
    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }
    async function handleSubmit() {
        if (await login(username, password)) {
            console.log("Login successful")
            navigate(`/welcome/${username}`)
        } else {
            console.log("Login failed")
            setLoginMessage("Authentication failed!")
            setIsAuthenticated(false);
        }
    }
    return (
        <div className="Login">
            <h1>Time to Get Things Done</h1>
            <div className="LoginMessage">{loginMessage}</div>
            <div>
                <label>Username</label>
                <input type="text" name="username"  value={username} onChange={handleUserNameChange}/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={handlePasswordChange} />
            </div>
            <button onClick={handleSubmit}>Login</button>
        </div>
    );
}
export default LoginComponent;