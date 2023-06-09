import {Box} from "@chakra-ui/layout";
import React, {useEffect, useState} from "react";
import {useQuery, useQueryClient} from "react-query";
import {getStatsByGarageID, getStatsLimitByGarageID,} from "../../services/EnviromentService.jsx";
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement,} from "chart.js";
import TableComponent from "./Table.jsx";
import {Link} from "react-router-dom";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function ChartWidget({
  garageId,
  isTemperature,
  isHumidity,
  isCO2,
}) {
  const queryClient = useQueryClient();
  const [values, setValues] = useState([]);
  const [dates, setDates] = useState([]);
  const [labels, setLabels] = useState([]);
  const [minMax, setMinMax] = useState({ min: 0, max: 0 });
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

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
          let hours = date.getHours();
          let minutes = date.getMinutes();
        
          // Pad single-digit day/month with leading zero if necessary
          const formattedDay = String(day).padStart(2, "0");
          const formattedMonth = String(month).padStart(2, "0");
        
          // Create the final formatted date string
          
          return `${formattedDay}/${formattedMonth} - ${hours}:${minutes}`;
        })
      );

      if (isCO2) {
        let valueArray = chartData.map((item) => item.cO2);
        setValues(valueArray);
        let max = Math.max(...valueArray);
        let min = Math.min(...valueArray);
        setMinMax({ min: min, max: max });
      }
      if (isHumidity) {
        let valueArray = chartData.map((item) => item.humidity);
        setValues(valueArray);
        let max = Math.max(...valueArray);
        let min = Math.min(...valueArray);
        setMinMax({ min: min, max: max });
      }
      if (isTemperature) {
        let valueArray = chartData.map((item) => item.temperature);
        setValues(valueArray);
        let max = Math.max(...valueArray);
        let min = Math.min(...valueArray);
        setMinMax({ min: min, max: max });
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
      <Link onClick={() => handleOpenModal()}>
        <Box
          ml="10px"
          mr="10px"
          width="100%"
          maxWidth="400px"
          height="400px"
          borderRadius={10}
        >
          <Line data={data} options={options}></Line>
        </Box>
      </Link>
      <TableModal isOpen={isOpen} onClose={handleCloseModal} chartData={chartData} limitData={limitData} isTemperature={isTemperature} isCO2={isCO2}
      isHumidity={isHumidity}/>
    </>
  );
}

function TableModal({
  isOpen,
  onClose,
  chartData,
  limitData,
  isTemperature,
  isHumidity,
  isCO2,
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Table</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableComponent
              chartData={chartData}
              limitData={limitData}
              isTemperature={isTemperature}
              isHumidity={isHumidity}
              isCO2={isCO2}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
