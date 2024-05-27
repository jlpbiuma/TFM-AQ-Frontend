import React from "react";
import Notifications from "../utils/Notifications.js";
import Chart from "../components/chart/test.jsx";

const Home = () => {
  return (
    <div>
      Home
      <div>
        <button onClick={Notifications.success}>Success</button>
        <Chart />
      </div>
    </div>
  );
};

export default Home;
