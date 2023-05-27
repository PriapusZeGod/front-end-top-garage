import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { getStatsByGarageID } from "../services/EnviromentService";
import { getStatsLimitByGarageID } from "../services/EnviromentService";
import { useEffect } from "react";

export default function TableComponent({
  garageId,
  isTemperature,
  isHumidity,
  isCO2,
}) {
  const queryClient = useQueryClient();

  if (garageId == null) garageId = 1;
  const { data, status } = useQuery(["stats", garageId], () =>
    getStatsByGarageID(garageId)
  );
  const { data: limitData, status: limitStatus } = useQuery(
    ["statslimit", garageId],
    () => getStatsLimitByGarageID(garageId)
  );

  useEffect(() => {
    console.log(data);
    console.log(limitData);
  }, [data, limitData]);

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Value</Th>
            <Th isNumeric>% to limit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            limitData &&
            data.length > 0 &&
            isCO2 &&
            data.map((item) => (
              <TableRow
                key={item.id}
                time={item.time}
                param={item.cO2}
                maxValue={limitData.indoorEnvironmentSettings.co2Limit}
                isTemperature={isTemperature}
                isCO2={isCO2}
                isHumidity={isHumidity}
              />
            ))}

          {data &&
            limitData &&
            data.length > 0 &&
            isHumidity &&
            data.map((item) => (
              <TableRow
                key={item.id}
                time={item.time}
                param={item.humidity}
                maxValue={limitData.indoorEnvironmentSettings.humidityLimit}
                isTemperature={isTemperature}
                isCO2={isCO2}
                isHumidity={isHumidity}
              />
            ))}

          {data &&
            limitData &&
            data.length > 0 &&
            isTemperature &&
            data.map((item) => (
              <TableRow
                key={item.id}
                time={item.time}
                param={item.temperature}
                maxValue={limitData.indoorEnvironmentSettings.temperatureLimit}
                isTemperature={isTemperature}
                isCO2={isCO2}
                isHumidity={isHumidity}
              />
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function TableRow({ time, param, maxValue, isTemperature, isHumidity, isCO2 }) {
  const date = new Date(time);
  let paramType = "";
  if (isTemperature) {
    paramType = "°C";
  }
  if (isHumidity) {
    paramType = "Humidity";
  }
  if (isCO2) {
    paramType = "CO2";
  }

  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const year = date.getFullYear();

  // Pad single-digit day/month with leading zero if necessary
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");

  // Create the final formatted date string
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
  return (
    <>
      <Tr>
        <Td>{formattedDate}</Td>
        <Td>
          {param}
          {paramType}
        </Td>
        <Td isNumeric>{Math.round((param * 100) / maxValue)}%</Td>
      </Tr>
    </>
  );
}
