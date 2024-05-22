import Table from "../components/table/Table.jsx";
import { deviceColumns } from "../components/table/columns/deviceColumns";
import { DATA2 } from "../data/MOCK_DATA-2";
import Notifications from "../utils/Notifications.js";

const ViewSensores = () => {
  return (
    <>
      <button onClick={Notifications.success}>Pulsa</button>
    </>
  );
};

export default ViewSensores;
