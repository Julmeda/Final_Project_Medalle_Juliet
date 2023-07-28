import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate(); // Get the navigate function from the useNavigate hook
  
    // This useEffect runs only once when the component mounts
    useEffect(() => {
      localStorage.setItem("user", ""); // Clear the user data from local storage to simulate a logout
      navigate("/login"); // Redirect the user to the login page after logout
    }, [navigate]); // Empty dependency array ensures the effect runs only once
  
    return null; // Return null to render nothing (no visible content)
  };
  
  export default Logout;
  