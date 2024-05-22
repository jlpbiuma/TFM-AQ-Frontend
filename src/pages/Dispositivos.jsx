import Table from "../components/table/Table.jsx";
import { deviceColumns } from "../components/table/columns/deviceColumns";
import { DATA2 } from "../data/MOCK_DATA-2";

const ViewDispositivos = () => {
  return <Table data={DATA2} column={deviceColumns} tableContext="device" />;
};

export default ViewDispositivos;
