import {useAuth} from "./security/AuthContext";
export default function FooterComponent(){
    const { number } = useAuth();
    return(
        <footer className="FooterComponent">
            <div>
                Footer
            </div>
        </footer>
    )
}