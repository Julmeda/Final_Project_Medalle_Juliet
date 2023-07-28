import React from "react";
import CustomNav from "../CustomNav";
import { userData } from "../../helpers";

const Home = () => {
  const { username } = userData();
  // Destructuring the "username" property from the object returned by the "userData" function
  return (
    <div>
      <CustomNav />
       {/* The "CustomNav" component renders a custom navigation bar */}
      <div className="home">
        {/* A div with class "home" for styling purposes */}
        <h2>Welcome {username}</h2>
        {/* A heading that displays the "Welcome" message followed by the user's username */}
      </div>
    </div>
  );
};

export default Home;
