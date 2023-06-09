import {Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr,} from "@chakra-ui/react";
import React, {useEffect} from "react";

export default function TableComponent({
  chartData,
  limitData,
  isTemperature,
  isHumidity,
  isCO2,
}) {
  // const queryClient = useQueryClient();

  // if (garageId == null) garageId = 1;
  // const { data, status } = useQuery(["stats", garageId], () =>
  //   getStatsByGarageID(garageId)
  // );
  // const { data: limitData, status: limitStatus } = useQuery(
  //   ["statslimit", garageId],
  //   () => getStatsLimitByGarageID(garageId)
  // );

  useEffect(() => {
    console.log(chartData);
    console.log(limitData);
  }, [chartData, limitData]);

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
          {chartData &&
            limitData &&
            chartData.length > 0 &&
            isCO2 &&
            chartData.map((item) => (
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

          {chartData &&
            limitData &&
            chartData.length > 0 &&
            isHumidity &&
            chartData.map((item) => (
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

          {chartData &&
            limitData &&
            chartData.length > 0 &&
            isTemperature &&
            chartData.map((item) => (
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
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Pad single-digit day/month with leading zero if necessary
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");

  // Create the final formatted date string
  const formattedDate = `${formattedDay}/${formattedMonth} - ${hours}:${minutes}`;
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
