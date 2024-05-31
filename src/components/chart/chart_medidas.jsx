/* App.js */
import React, { useState, useEffect, useRef } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = ({ data, escala }) => {
  const [dataPoints1, setDataPoints1] = useState([]);
  const [dataPoints2, setDataPoints2] = useState([]);
  const chartRef = useRef(null);

  const updateInterval = 1000;
  let yValue1 = 408;
  let yValue2 = 350;
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
      deltaY2 = 5 + Math.random() * (-5 - 5);
      yValue1 = Math.floor(Math.random() * (408 - 400 + 1) + 400);
      yValue2 = Math.floor(Math.random() * (350 - 340 + 1) + 340);

      newPoints1.push({
        x: xValue,
        y: yValue1,
      });

      newPoints2.push({
        x: xValue,
        y: yValue2,
      });
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
        " Bugatti Veyron - " + yValue1 + " km/h";
      chartRef.current.options.data[1].legendText =
        " Lamborghini Aventador - " + yValue2 + " km/h";
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
      text: "Speed of Bugatti vs Lamborghini",
    },
    axisX: {
      title: "chart updates every 2 secs",
      viewportMinimum:
        dataPoints1.length > 20 ? dataPoints1[dataPoints1.length - 20].x : null,
      viewportMaximum:
        dataPoints1.length > 20 ? dataPoints1[dataPoints1.length - 1].x : null,
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
      itemclick: toggleDataSeries,
    },
    data: [
      {
        type: "line",
        xValueFormatString: "#,##0 seconds",
        yValueFormatString: "#,##0 km/h",
        showInLegend: true,
        name: "Bugatti Veyron",
        dataPoints: dataPoints1,
      },
      {
        type: "line",
        xValueFormatString: "#,##0 seconds",
        yValueFormatString: "#,##0 km/h",
        showInLegend: true,
        name: "Lamborghini Aventador",
        dataPoints: dataPoints2,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart
        options={options}
        onRef={(ref) => (chartRef.current = ref)}
      />
    </div>
  );
};

export default Chart;
