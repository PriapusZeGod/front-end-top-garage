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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function ChartWidget({ garageId }) {
  // const queryClient = useQueryClient();

  // if (garageId == null) garageId = 1;
  // const { data, status } = useQuery(["stats", garageId], () =>
  //   getStatsByGarageID(garageId)
  // );
  // const { data: limitData, status: limitStatus } = useQuery(
  //   ["statslimit", garageId],
  //   () => getStatsLimitByGarageID(garageId)
  // );

  // useEffect(() => {
  //   console.log(data);
  //   console.log(limitData);
  // }, [data, limitData]);

  const data = {
    labels: ["Mon", "Tue", "Wed"],
    //data && limitData && data.length > 0 && data.map((item) => item.time),
    datasets: [
      {
        labels: "Sales of the Week",
        data: [6, 3, 9],
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
      y: {
        min: 3,
        max: 6,
      },
    },
  };
  return (
    <Box ml="10px" mr="10px" w="25vw" h="400px" borderRadius={10}>
      {console.log(getStatsByGarageID(garageId))}
      <Line data={data} options={options}></Line>
    </Box>
  );
}
