import React, { useState } from "react";
import { Col, Row, Button, FormGroup, Input } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { storeUser } from "../../helpers";

const initialUser = { password: "", identifier: "" }; 
const Login = () => {
  const [user, setUser] = useState(initialUser); 
  const navigate = useNavigate(); 
  const handleChange = ({ target }) => {
     // Destructure the "name" and "value" properties from the "target" object, which represents the event target 
    const { name, value } = target;
    // Update the "user" state by setting a new state based on the previous state using a function callback
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const url = `http://localhost:1337/api/auth/local`;
    try {
      // Check if both the user identifier and password are present
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user); // Send a POST request to the authentication API with user data
        // If the API responds with a JWT (JSON Web Token)
        if (data.jwt) {
          // Store the user data and JWT token by calling this function
          storeUser(data);
          // Display a success toast notification using the "toast.success" method from the "react-toastify" library
          toast.success("Logged in successfully!", {
            hideProgressBar: true,
          });
          // Reset the user object (assuming a state called "user" is used to store login credentials)
          setUser(initialUser);
          navigate("/"); //Home page
        }
      }
    } catch (error) {
      // Handle any errors that occur during the login process. Display an error toast notification using the "toast.error" method from the "react-toastify" library
      toast.error(error.message, { 
        hideProgressBar: true,
      });
    }
  };

  return (
    <Row className="login">  
      <Col sm="12" md={{ size: 4, offset: 4 }}> 
        <div>  
          <h2>Login:</h2> 
          <FormGroup>
            <Input
              type="email" // The type of input field is set to "email", indicating that it should accept an email address as its value.
              name="identifier" //The "name" attribute for the input field, used to identify the form field.
              value={user.identifier} // The current value of the input field, derived from the "user.identifier" state.
              onChange={handleChange} // The "onChange" event handler for the input field. It calls the "handleChange" function to update the "user" state when the user types or modifies the input.
              placeholder="Enter your email" // The placeholder text shown inside the input field before the user enters their email address.
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password" 
              name="password" 
              value={user.password} 
              onChange={handleChange} 
              placeholder="Enter password"
            />
          </FormGroup>
          {/* Login  Button, When clicked, it will call the "handleLogin" function */}
          <Button color="primary" onClick={handleLogin}>
            Login
          </Button>
          <h6>
            {/* An "h6" element with a link to the registration page */}
            Click <Link to="/registration">Here</Link> to sign up
          </h6>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
