import { useState } from "react";
import Notifications from "../utils/Notifications.js";
import Chart from "../components/chart/chart_medidas.jsx";
import MultiSelectComboBox from "../components/common/MultipleSelectionCombobox.jsx";

const Home = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  return (
    <div>
      Home
      <div>
        <div className="p-4">
          <h1 className="text-2xl mb-4">MultiSelect ComboBox</h1>
          {/* <MultiSelectComboBox
            items={items}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
