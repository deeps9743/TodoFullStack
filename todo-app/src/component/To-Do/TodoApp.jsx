import "./TodoApp.css";
import { LogoutComponent } from "./Logout";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { HeaderComponent } from "./Header";
import { ListTodoComponent } from "./ListToDoComponenet";
import { ErrorComponent } from "./ErrorComponent";
import WelcomeComponent from "./WelcomeComponent";
import LoginComponent from "./LoginComponenet";
import AuthProvider,{useAuth} from "./security/AuthContext";
import  FooterComponent  from "./Footer";
import TodoUpdate from "./TodoUpdate";
function AuthenticateLogin() {
    const { isAuthenticated } = useAuth();
    if(isAuthenticated){
        return <Outlet />;    
    }
    return <Navigate to="/login" />
}
export default function TodoApp() {
  // Component implementation
  return (
    <div className="TodoApp">
    <AuthProvider>
      <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route element={<AuthenticateLogin />}>
          <Route path="/welcome/:username" element={<WelcomeComponent />} />
          <Route path="/todos" element={<ListTodoComponent />} />
          <Route path="/todo/update/:id" element={<TodoUpdate />} />
          <Route path="/logout" element={<LogoutComponent />} />
        </Route>
        <Route path="*" element={<ErrorComponent />} />
      </Routes>
      </BrowserRouter>
        <FooterComponent />
    </AuthProvider>
    </div>
  );
}

