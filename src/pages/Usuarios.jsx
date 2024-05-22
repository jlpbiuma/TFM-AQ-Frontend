import Table from "../components/table/Table.jsx";
import { userColumns } from "../components/table/columns/userColumns";
import { DATA } from "../data/MOCK_DATA";

const ViewUsuarios = () => {
  return <Table data={DATA} column={userColumns} tableContext="user" />;
};

export default ViewUsuarios;
