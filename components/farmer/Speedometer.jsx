import React, { useState } from "react";
import { useEffect } from "react";
import './FarmarDetails.css';

import Speedometer from "react-d3-speedometer";
import axios from "axios";
import {
  // Newlinechart,
  // RecentImages,
} from '../modules/Module'

export default function SpeedometerComponent({ SerialNumberFromPlotClick, userIdforImages, newplotIdforImages }) {
  const [meterValues, setMeterValues] = useState([]);
  const [dataFromApi, setDataFromApi] = useState('')
  const [dewPoint, setDewPoint] = useState()
  const [linechart, setLinechart] = useState()

  const handleGraphData = async () => {



    const API =
      "https://fzo8x58lug.execute-api.us-east-1.amazonaws.com/default/retrieveLastData/lastdata"
    try {
      const response = await axios.post(API, {
        serialNumber: SerialNumberFromPlotClick,
      });

      console.log(SerialNumberFromPlotClick,userIdforImages,newplotIdforImages,'SerialNumberFromPlotClick');
      console.log(response.data.body[0])
      setDataFromApi(response.data.body[0].payload)
    } catch (error) {
      console.error("error from  db", error);

    }
    let H =
      (Math.log10(Number(dataFromApi.EnvBmeHumidity)) - 2) / 0.4343 +
      (17.62 * Number(dataFromApi.EnvBmeTemp)) / (243.12 + Number(dataFromApi.EnvBmeTemp));
    let dew_point = (243.12 * H) / (17.62 - H);
    console.log("dew point:", dew_point.toFixed(2));
    let new_dew_point = dew_point.toFixed(2);
    setDewPoint(new_dew_point)

  };

  // const handlechartClick = () => {

  //   setLinechart(<Newlinechart />)
  //   alert('wertty')
  // }

  useEffect(() => {
    handleGraphData();
  }, [SerialNumberFromPlotClick, userIdforImages, newplotIdforImages])


  return (

    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh" }}>

      {/* Upper row */}

      <p
        style={{
          marginRight: "80%",
          fontWeight: "bold",
          color: "black",
        }}
      >
        Field Data
      </p>
      <div className="speedometer-text">
        <p
          style={{
            marginRight: "80%",
            fontWeight: "bold",
            color: "black",
            textDecoration: "underline",
          }}
        >
          Soil Data
        </p>
        <p
          style={{
            // marginLeft: "650px",
            fontWeight: "bold",
            // marginTop: "-10px",
            color: "black",
            textDecoration: "underline",
          }}
        >
          Analytic
        </p>
      </div>

      <div style={{ display: "flex", gap: "60px" }}>
        <div style={{ margin: "10px", textAlign: "center", cursor: 'pointer' }}  >

          <Speedometer
            value={dataFromApi.SoilMoisture1}
            minValue={0}

            maxValue={60}
            needleColor="black"

            segments={6}

            segmentColors={['#027148', "#04AF70", "#05ED98", "yellow", "orange", "#E41B17"]}
            textColor="black"
            valueTextFontSize={15}
            ringWidth={20}
            currentValueText="SoilMoisture1"
            width={200}
            height={150}
            className="hide-min-max"
          />
          <div style={{ marginTop: "-15px", marginBottom: "30px", fontWeight: "bold", color: "#034F9D" }}>{parseFloat(dataFromApi.SoilMoisture1).toFixed(2)} Cb</div>
        </div>
        <div style={{ margin: "10px", marginRight: "30px", textAlign: "center", cursor: 'pointer' }}  >
          <Speedometer
            value={dataFromApi.SoilMoisture2}
            minValue={0}
            maxValue={60}
            needleColor="black"

            segments={6}
            ringWidth={20}

            segmentColors={['#027148', "#04AF70", "#05ED98", "yellow", "orange", "#E41B17"]}
            textColor="black"
            valueTextFontSize={15}

            currentValueText="SoilMoisture2"
            width={200}
            height={150}
          />
          <div style={{ marginTop: "-15px", fontWeight: "bold", color: "#034F9D" }}>{parseFloat(dataFromApi.SoilMoisture2).toFixed(2)} Cb</div>

        </div>
        <div style={{ margin: "10px", marginRight: "30px", textAlign: "center", cursor: 'pointer' }}  >

          <Speedometer
            value={dataFromApi.SoilTemperature}
            minValue={0}
            maxValue={60}
            needleColor="black"

            segments={3}
            ringWidth={20}

            segmentColors={['#027148', "yellow", "orange"]}
            textColor="black"
            valueTextFontSize={15}

            currentValueText="SoilTemperature"
            width={200}
            height={150}
          />
          <div style={{ marginTop: "-15px", fontWeight: "bold", color: "#034F9D" }}>{parseFloat(dataFromApi.SoilTemperature).toFixed(2)} °C</div>

        </div>
        <div style={{ margin: "10px", marginRight: "30px", cursor: 'pointer' }}  >
          <Speedometer
            value={meterValues[3]}
            minValue={0}
            maxValue={100}
            needleColor="black"

            segments={3}
            ringWidth={20}

            segmentColors={["#E41B17", "orange", '#027148']}
            textColor="black"
            valueTextFontSize={15}

            currentValueText="diease/paste"
            width={200}
            height={150}
          />
        </div>
      </div>
      <p
        style={{
          marginRight: "80%",
          fontWeight: "bold",
          color: "black",
          textDecoration: "underline",
        }}
      >
        Ambient
      </p>
      {/* Lower row */}
      <div style={{ display: "flex", gap: "60px" }}>
        <div style={{ margin: "10px", marginRight: "30px", textAlign: "center", cursor: 'pointer' }}  >

          <Speedometer
            value={dataFromApi.EnvBmeHumidity}

            minValue={0}
            maxValue={100}
            needleColor="black"

            segments={3}
            ringWidth={20}

            segmentColors={["#E41B17", "orange", '#027148']}

            textColor="black"
            valueTextFontSize={15}

            currentValueText="EnvBmeHumidity"
            width={200}
            height={150}
          />
          <div style={{ marginTop: "-15px", fontWeight: "bold", color: "#034F9D" }}>{parseFloat(dataFromApi.EnvBmeHumidity).toFixed(2)} %</div>

        </div>
        <div style={{ margin: "10px", marginRight: "30px", textAlign: "center", cursor: 'pointer' }}  >

          <Speedometer
            value={meterValues[5]}
            minValue={0}
            maxValue={60}
            needleColor="black"


            segments={3}
            ringWidth={20}

            segmentColors={['#027148', "yellow", "orange"]}

            textColor="black"
            valueTextFontSize={15}

            currentValueText="Tempreture"
            width={200}
            height={150}
          />
          <div style={{ marginTop: "-15px", fontWeight: "bold", color: "#034F9D" }}>{parseFloat(dataFromApi.EnvBmeTemp).toFixed(2)} °C</div>

        </div>
        <div style={{ margin: "10px", marginRight: "30px", textAlign: "center", cursor: 'pointer' }}  >

          <Speedometer
            value={meterValues[6]}
            minValue={0}
            maxValue={100}
            needleColor="black"

            segments={3}
            ringWidth={20}

            segmentColors={['#027148']}
            textColor="black"
            valueTextFontSize={15}

            currentValueText="DewPoint"
            width={200}
            height={150}
          />
          <div style={{ marginTop: "-15px", fontWeight: "bold", color: "#034F9D" }}>{(dewPoint)}°C</div>

        </div>
        <div style={{ margin: "10px", marginRight: "30px", textAlign: "center", cursor: 'pointer' }}  >

          <Speedometer
            value={dataFromApi.SunLight1}
            minValue={0}
            maxValue={100}
            needleColor="black"

            segments={6}
            ringWidth={20}

            segmentColors={['#027148', "#04AF70", "#05ED98", "yellow", "orange", "#E41B17"]}

            textColor="black"
            valueTextFontSize={15}

            currentValueText="SunLight1"
            width={200}
            height={150}
          />
          <div style={{ marginTop: "-15px", fontWeight: "bold", color: "#034F9D" }}>{parseFloat(dataFromApi.SunLight1).toFixed(2)} Lux</div>

        </div>
      </div>

      <div className="imgaesandchart">

        <div className="recentimages-speedometer">
          {/* <RecentImages
            serialNumber={SerialNumberFromPlotClick}
            userId1={userIdforImages}
            newplotId={newplotIdforImages}
          /> */}
        </div>
        <div className="linechart-speedometer">
          {/* {linechart} */}

        </div>
      </div>

    </div>
  );
}


// onClick={handlechartClick}

