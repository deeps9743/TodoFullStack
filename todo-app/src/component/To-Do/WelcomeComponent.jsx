import {useParams ,Link} from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import {retrieveHelloWorldBeanWithPathVariable} from "./Api/HelloWorldBean";
import { useAuth } from "./security/AuthContext";

function WelcomeComponent(){
    const { username } = useParams();
    const { token } = useAuth();
    const [helloWorldData, setHelloWorldData] = useState("");

    function CallHelloWorld(){
        console.log("Call Hello World")
        retrieveHelloWorldBeanWithPathVariable(username)
            .then((response) => successfulResponse(response))
            .catch((error) => errorResponse(error))
            .finally(() => console.log("cleanup"));
    }

    function successfulResponse(response){
        setHelloWorldData(response.data.message);
        return response.data;
    }

    function errorResponse(error, response){
        console.log(error);
        console.log(response);
    }

    return(
        <>
            <h1>Welcome {username}</h1>
            <div className="Welcome">
                Manage your todos <Link to="/todos">here</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={CallHelloWorld}>Call Hello World</button>
                <div>{helloWorldData}</div>
            </div>
        </>

    )
}
export default WelcomeComponent;