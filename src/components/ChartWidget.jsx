import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  getStatsByGarageID,
  getStatsLimitByGarageID,
} from "../services/EnviromentService";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { useState } from "react";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function ChartWidget({ garageId, isTemperature, isHumidity, isCO2 }) {
  const queryClient = useQueryClient();
  const [values, setValues] = useState([]);
  const [dates, setDates] = useState([]);
  const [labels, setLabels] = useState([]);
  const [minMax, setMinMax] = useState({min: 0, max: 0});

  if (garageId == null) garageId = 1;
  const { data: chartData, status } = useQuery(["stats", garageId], () =>
    getStatsByGarageID(garageId)
  );
  const { data: limitData, status: limitStatus } = useQuery(
    ["statslimit", garageId],
    () => getStatsLimitByGarageID(garageId)
  );

  useEffect(() => {
    if (chartData) {
      setDates(
        chartData.map((item) => {
          let date = new Date(item.time);
          let day = date.getDate();
          let month = date.getMonth() + 1; // Months are zero-based, so add 1
          let year = date.getFullYear();

          return `${day}/${month}/${year}`;
        })
      );

      if(isCO2){

        let valueArray = chartData.map((item) => item.cO2);
        setValues(valueArray);
        let max = Math.max(...valueArray);
        let min = Math.min(...valueArray);
        setMinMax({min:min , max: max});

      }
      if(isHumidity){
        let valueArray = chartData.map((item) => item.humidity);
        setValues(valueArray);
        let max = Math.max(...valueArray);
        let min = Math.min(...valueArray);
        setMinMax({min:min , max: max});
      }
      if(isTemperature){
        
        let valueArray = chartData.map((item) => item.temperature);
        setValues(valueArray);
        let max = Math.max(...valueArray);
        let min = Math.min(...valueArray);
        setMinMax({min:min , max: max});

      }



        
    }
  }, [chartData]);

  // useEffect (() => {
  //   if (limitData) {
  //     if(isTemperature){
  //       let min = 
  //       setMinMax({min: 0, max: limitData.co2Limit * 1.5});
  //     }
  //     if(isHumidity){
  //       setMinMax({min: 0, max: limitData.humidityLimit});
  //     }
  //     if(isCO2){
  //       setMinMax({min: 0, max: limitData.co2Limit});
  //     }
      
  //   }
  // }, [limitData]);


  useEffect(() => {
    console.log(chartData);
    console.log(limitData);
  }, [chartData, limitData]);

  useEffect(() => {
    console.log(values);
    console.log(dates);
    if (dates) {
      setLabels(dates);
    }
  }, [values, dates]);

  const data = {
    labels: labels,
    // data && limitData && data.length > 0 && data.map((item) => item.time),

    datasets: [
      {
        labels: "Sales of the Week",
        data: values,
        backgroundColor: "aqua",
        borderColor: "black",
        pointBorderColor: "aqua",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: minMax,
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <>
      <Box ml="10px" mr="10px" w="25vw" h="500px" borderRadius={10}>
        <Line data={data} options={options}></Line>
      </Box>
    </>
  );
}
