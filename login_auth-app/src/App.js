import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { Container } from "reactstrap";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Logout from "./components/Logout";
import { ToastContainer } from "react-toastify";
import { Protector } from "./helpers";

function App() {
  return (
    <Container> 
      <BrowserRouter>  
        <Routes> 
          <Route path="/" element={<Protector Component={Home} />} />  {/* The root route ("/") is mapped to the "Home" component wrapped inside the "Protector" component */}
          <Route path="/login" element={<Login />} />  {/* The "/login" route is mapped to the "Login" component */}
          <Route path="/logout" element={<Logout />} /> {/* The "/logout" route is mapped to the "Logout" component */}
          <Route path="/registration" element={<Registration />} /> {/* The "/registration" route is mapped to the "Registration" component */}
        </Routes>
        <ToastContainer /> {/* The "ToastContainer" component is used to display toast notifications */}
      </BrowserRouter>
    </Container>
  );
}

export default App;
