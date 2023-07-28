import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row, Button, FormGroup, Input } from "reactstrap";

const initialUser = { email: "", password: "", username: "" }; 
const Registration = () => {
  const [user, setUser] = useState(initialUser); 
  const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

  //SignUp Process
  const signUp = async () => {
    try {
      // Define the URL for user registration on the local authentication API
      const url = `http://localhost:1337/api/auth/local/register`;
      if (user.username && user.email && user.password) { 
        const res = await axios.post(url, user); // Send a POST request to the registration endpoint of the authentication API with the user data
        if (!!res) { // If the response (res) from the API is not empty or falsy (using !! to convert to a boolean)
          toast.success("Registered successfully!", { 
            hideProgressBar: true,
          });
          // Reset the user object (assuming a state called "user" is used to store registration data)
          setUser(initialUser);
          navigate("/login"); // Navigate the user to the login page
        }
      }
    } catch (error) {
      // Handle any errors that occur during the sign-up process. Display an error toast notification.
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };

  const handleUserChange = ({ target }) => {
    // Extract the "name" and "value" properties from the "target" object, which represents the event target (e.g., a form input)
    const { name, value } = target;
    // Update the "user" state by setting a new state based on the previous state using a function callback
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  return (
    <Row className="register">
      <Col sm="12" md={{ size: 4, offset: 4 }}>
        <div>
          <h2>Sign up:</h2>
          <FormGroup>
            <Input
              type="text" // users can enter any text in this input field.
              name="username" //used to give the input a name. Username property. Any changes to the input will be reflected in the user.password state.
              value={user.username} //set to the value of the username property from the user object. This ensures that the input field is controlled by the state, and the displayed value is updated according to the user.username value.
              onChange={handleUserChange} //Call this function to update the new state/value from the user's input.
              placeholder="Enter your full name" //appears inside the input field to give users a hint about what kind of input is expected
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email" 
              name="email" // Email property.
              value={user.email} 
              onChange={handleUserChange} //updates the user state based on the changes made by the user in the input field.
              placeholder="Enter your email" 
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password" 
              name="password" // Password property.
              value={user.password} 
              onChange={handleUserChange} 
              placeholder="Enter password"
            />
          </FormGroup>
          <Button color="primary" onClick={signUp}>
             {/*SignUp Button, When clicked, it will call the "signUp" function */}
            Sign up
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default Registration;
