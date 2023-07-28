import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Function to store user data in the browser's localStorage
export const storeUser = (data) => { // The "storeUser" function takes an object "data" as input, likely containing user-related information like username and JWT.
    localStorage.setItem(
      // The "localStorage.setItem" method is used to store user data in the browser's localStorage.
      // By storing the user data in localStorage, the application can access this information across browser sessions and page reloads.
      "user",
      JSON.stringify({
        username: data.user.username, // Extract and store the username from the "data" object. It takes two arguments: the key (in this case, "user") and the value, which is a JSON string representing an object.
        jwt: data.jwt, // Extract and store the JWT (access token) from the "data" object
      })
    );
  };
  
  // Function to retrieve user data from the browser's localStorage
  export const userData = () => {
    const stringifiedUser = localStorage.getItem("user") || '""'; // Get the stored user data as a JSON string, or an empty string if not present
    return JSON.parse(stringifiedUser || {}); // Parse the JSON string back to an object, or return an empty object if no data is found
  };
  // The "Protector" component acts as a protective wrapper for other components
  export const Protector = ({ Component }) => {
    // Get the navigate function from the "react-router-dom" package
    const navigate = useNavigate();
    // Retrieve the JWT (access token) from the user data
    const { jwt } = userData();
  
    useEffect(() => {
      // This "useEffect" hook runs when the component mounts or when the "jwt" variable changes
      if (!jwt) {
        // If the JWT is not present (user is not authenticated)
        navigate("/login"); // Redirect the user to the login page using the "navigate" function
      }
    }, [navigate, jwt]);
    
    // Render the wrapped component
    return <Component />;
  };
  