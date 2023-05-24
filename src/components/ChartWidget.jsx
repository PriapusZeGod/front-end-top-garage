import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import { useQuery } from "react-query";
import {
  getStatsByGarageID,
  getStatsLimitByGarageID,
} from "../services/EnviromentService";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";

export default function ChartWidget({ garageId }) {
  const { data, status } = useQuery(["stats", garageId], () =>
    getStatsByGarageID(garageId)
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  const chartConfig = {
    labels: data?.map((item) => new Date(item.time).toLocaleString()) || [],
    datasets: [
      {
        label: "Temperature",
        data: data?.map((item) => item.temperature) || [],
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  return (
    <Box ml="10px" mr="10px" w="25vw" h="400px" borderRadius={10}>
      <Text>Chart Widget</Text>
      {data ? <Line data={chartConfig} /> : <Text>Loading...</Text>}
    </Box>
  );
}
