import { useState } from "react";
import Notifications from "../utils/Notifications.js";
import Chart from "../components/chart/chart_medidas.jsx";
import MultiSelectComboBox from "../components/common/MultipleSelectionCombobox.jsx";
import image from "../img/logoAQ.png";

const Home = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  return (
    <div className="p-4 bg-slate-700 h-full flex justify-center">
      Home
      <img src="./../img/logoAQ.png" />
      <div className="flex flex-col align-items">
        <div className="bg-white w-52 h-52 border rounded-lg shadow-2xl p-3 text-black-700 font-bold">
          Hola mundo!
        </div>
      </div>
    </div>
  );
};

export default Home;
