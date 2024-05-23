import React from "react";
import Notifications from "../utils/Notifications.js";

const Home = () => {
  return (
    <div>
      Home
      <div>
        <button onClick={Notifications.success}>Success</button>
      </div>
    </div>
  );
};

export default Home;
