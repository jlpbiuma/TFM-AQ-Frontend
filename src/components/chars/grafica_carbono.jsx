/* App.js */
import React, { useState, useEffect, useRef } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = () => {
  const [dataPoints1, setDataPoints1] = useState([]);
  const [dataPoints2, setDataPoints2] = useState([]);
  const chartRef = useRef(null);

  const updateInterval = 1000;
  let yValue1 = 0;
  let yValue2 = 0;
  let xValue = 5;

  const toggleDataSeries = (e) => {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chartRef.current.render();
  };

  const updateChart = (count = 1) => {
    let deltaY1, deltaY2;
    const newPoints1 = [];
    const newPoints2 = [];

    for (let i = 0; i < count; i++) {
      xValue += 2;
      deltaY1 = 5 + Math.random() * (-5 - 5);
     // deltaY2 = 5 + Math.random() * (-5 - 5);
      yValue1 = Math.floor(Math.random() * (100) + 0);
      //yValue2 = Math.floor(Math.random() * (0 - 30 + 1) + 0 );

      newPoints1.push({
        x: xValue,
        y: yValue1,
      });

      // newPoints2.push({
      //   x: xValue,
      //   y: yValue2,
      // });
    }

    setDataPoints1((prevDataPoints1) => {
      const updatedDataPoints1 = [...prevDataPoints1, ...newPoints1];
      return updatedDataPoints1.length > 20
        ? updatedDataPoints1.slice(-20)
        : updatedDataPoints1;
    });

    setDataPoints2((prevDataPoints2) => {
      const updatedDataPoints2 = [...prevDataPoints2, ...newPoints2];
      return updatedDataPoints2.length > 20
        ? updatedDataPoints2.slice(-20)
        : updatedDataPoints2;
    });

    if (chartRef.current) {
      chartRef.current.options.data[0].legendText =
        " Sensor 1 - " + yValue1 + " CO2e";
      chartRef.current.options.data[1].legendText =
        " Sensor 2 - " + yValue2 + " CO2e";
      chartRef.current.render();
    }
  };

  useEffect(() => {
    updateChart(22);
    const interval = setInterval(updateChart, updateInterval);
    return () => clearInterval(interval);
  }, []);

  const options = {
    zoomEnabled: true,
    theme: "light2",
    title: {
      text: "Dioxido de carbono",
    },
    axisX: {
      title: "Actualización cada 1 segundo",
      viewportMinimum:
        dataPoints1.length > 20 ? dataPoints1[dataPoints1.length - 20].x : null,
      viewportMaximum:
        dataPoints1.length > 20 ? dataPoints1[dataPoints1.length - 1].x : null,
    },
    axisY: {
      suffix: " CO2e",
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "top",
      fontSize: 18,
      fontColor: "dimGrey",
      itemclick: toggleDataSeries,
    },
    data: [
      {
        type: "line",
        xValueFormatString: "#,##0 seconds",
        yValueFormatString: "#,##0 CO2e/h",
        showInLegend: true,
        name: "Sensor 1",
        dataPoints: dataPoints1,
      },
      {
        type: "line",
        xValueFormatString: "#,##0 seconds",
        yValueFormatString: "#,##0 CO2e/h",
        showInLegend: true,
        name: "Sensor 2",
        dataPoints: dataPoints2,
      },
    ],
  };
  
  return (
    <div className="chart w-1/1,5">
      <CanvasJSChart
        options={options}
        onRef={(ref) => (chartRef.current = ref)}
      />
    </div>
  );
};


export default Chart;
