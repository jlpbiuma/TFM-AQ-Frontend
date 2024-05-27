import React, { useState, useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import io from "socket.io-client";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// const socket = io("http://localhost:5001");

const Chart = () => {
  const [dataPoints1, setDataPoints1] = useState([]);
  const [dataPoints2, setDataPoints2] = useState([]);

  useEffect(() => {
    socket.on("data", (data) => {
      const { yValue1, yValue2 } = data;
      setDataPoints1((prevDataPoints1) => [
        ...prevDataPoints1,
        { x: new Date(), y: yValue1 },
      ]);
      setDataPoints2((prevDataPoints2) => [
        ...prevDataPoints2,
        { x: new Date(), y: yValue2 },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const options = {
    zoomEnabled: true,
    theme: "light2",
    title: {
      text: "Speed of Bugatti vs Lamborghini",
    },
    axisX: {
      title: "Time",
      valueFormatString: "HH:mm:ss",
    },
    axisY: {
      suffix: " km/h",
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "top",
      fontSize: 18,
      fontColor: "dimGrey",
    },
    data: [
      {
        type: "line",
        xValueType: "dateTime",
        xValueFormatString: "HH:mm:ss",
        yValueFormatString: "#,##0 km/h",
        showInLegend: true,
        name: "Bugatti Veyron",
        dataPoints: dataPoints1,
      },
      {
        type: "line",
        xValueType: "dateTime",
        xValueFormatString: "HH:mm:ss",
        yValueFormatString: "#,##0 km/h",
        showInLegend: true,
        name: "Lamborghini Aventador",
        dataPoints: dataPoints2,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default Chart;
