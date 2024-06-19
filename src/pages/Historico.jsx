import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { CSVLink } from "react-csv";
import API_MEDIDAS from "../api/medidas";
import { medidasColumn } from "../components/table/columns/medidasColumn";
import Table from "../components/table/Table";
import Notifications from "../utils/Notifications";

const ViewHistorico = () => {
  const { id_estacion, id_magnitud } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [historicData, setHistoricData] = useState([]);
  const [startDate, setStartDate] = useState(
    moment().subtract(1, "days").toDate()
  );
  const [endDate, setEndDate] = useState(moment().toDate());

  useEffect(() => {
    setIsLoading(true);

    API_MEDIDAS.get_medidas_by_id_estacion_magnitud(
      id_estacion,
      id_magnitud,
      moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
      moment(endDate).format("YYYY-MM-DD HH:mm:ss")
    )
      .then((response) => {
        console.log("Historic data fetched:", response.medidas);
        setHistoricData(response.medidas);
      })
      .catch((error) => {
        const error_message = error.response.data.error;
        Notifications.error(error_message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id_estacion, id_magnitud, startDate, endDate]);

  const csvHeaders = [
    { label: "Timestamp", key: "timestamp" },
    { label: "Value", key: "value" },
    // Add more headers as per your data structure
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Historico</h1>
      <div className="flex gap-4 mb-4">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="yyyy-MM-dd HH:mm"
          className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="yyyy-MM-dd HH:mm"
          className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <CSVLink
          data={historicData}
          headers={csvHeaders}
          filename={`historico_${moment().format("YYYY-MM-DD")}.csv`}
          className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
          target="_blank"
        >
          Download CSV
        </CSVLink>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Table
          modalTitle="Historico"
          data={historicData}
          column={medidasColumn}
          setData={setHistoricData}
          buttonText="Historico"
        />
      )}
    </div>
  );
};

export default ViewHistorico;
