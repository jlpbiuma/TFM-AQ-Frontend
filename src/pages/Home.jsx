import React from "react";
import Notifications from "../utils/Notifications.js";

export const Home = () => {
  return (
    <div>
      Home
      <div>
        <button onClick={Notifications.success}>Success</button>
      </div>
    </div>
  );
};
