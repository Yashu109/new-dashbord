// import React, { useEffect, useState } from 'react';
// import CanvasJSReact from '@canvasjs/react-stockcharts';
// import axios from 'axios';
// import moment from 'moment';
// import "./Newlinechart.css";
// // import { format, startOfDay } from 'date-fns';
// import { ThreeCircles } from "react-loader-spinner";


// const CanvasJS = CanvasJSReact.CanvasJS;
// const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

// function NewlinechartMain({serialNumber}) {
//   const [resData, setResData] = useState(null);
//   const [arr, setArr] = useState(null)
//   const [arr1, setArr1] = useState(null)
//   const [selectedRange, setSelectedRange] = useState(7);
//   const [changeserialNumber, setChangeserialNumber] = useState(0)

//   // const num = 12345
//   // console.log(num.toFixed(2))


//     const Newlinechart = async () => {
//       const serialNumber1 = serialNumber

//       const today = new Date();

//       const year = today.getFullYear();
//       const month = String(today.getMonth() + 1).padStart(2, '0');
//       const day = String(today.getDate()).padStart(2, '0');
//       const formattedDate = `${year}/${month}/${day}`;
//       console.log(formattedDate,serialNumber1, 'aaaaaaaaaa')

//       const API = "https://wf8dxu1cue.execute-api.us-east-1.amazonaws.com/default/iotdata";
//       const data = {
//         SerialNumber:serialNumber1,
//         // SerialNumber: "S170H120L122-07-2617:36:51",
//         startDate: "2023/09/08",
//         endDate: formattedDate
//       }
//       try {
//         const response = await axios.post(API, data)
//         const responsedata = response.data.body;
//         console.log(responsedata, 'dataresponse')

//         return response
//       }

//       catch (error) {
//         console.error(error)
//       }
//     }

//     const setGraphData = (data) => {
//       const graphArray = [];
//       const graphArray1 = [];

//       for (let item of data) {
//         const postedDateTime = item?.payload?.PostedDatetime;
//         const dateStr = postedDateTime.split(' ');
//         const splitdate = dateStr[0].split('-');
//         const splitTime = dateStr[1].split(':')
//         const xdate = new Date('20' + splitdate[0], splitdate[1] - 1, splitdate[2], splitTime[0], splitTime[1], splitTime[2]);
//         // console.log(xdate, 'ddd')
//         const SoilTemperature = item.payload.SoilTemperature
//         // const limitpostedDateTime = parseInt(String(dateStr).substring(0, 2))
//         const limitSoilTemperature = parseInt(String(SoilTemperature).substring(0, 2))


//         const EnvHumidity = item.payload.EnvBmeHumidity
//         const limitEnvHumidity = parseInt(String(EnvHumidity).substring(0, 2))


//         const datestring = new Date(postedDateTime)
//         console.log(splitTime, splitdate, 'aaaaaa')
//         // console.log(postedDateTime,soilMoisture_1)
//         graphArray.push({ x: xdate, y: limitSoilTemperature })
//         graphArray1.push({ x: xdate, y: limitEnvHumidity })

//         console.log(data,'dataset')
//       }
//       // console.log(graphArray, "graph")
//       console.log(arr1, 'arr1')
//       setArr(graphArray)
//       setArr1(graphArray1)

//       return graphArray
//     }
//     useEffect(() => {

//     // setSelectedRange(7);
//     Newlinechart().then((res) => {
//       setGraphData(res.data.body)
//       // console.log(res.data.body)
//       // const graphData = res.data.body
//       setResData(res.data.body)

//     }).catch((err) => {
//       console.error(err)
//     })
//   }, [serialNumber]);
  
//   const options = {
//     animationEnabled: true,
//     exportEnabled: true,
//     charts: [{
//       axisX: {
//         crosshair: {
//           title: "Env Humidity",
//           enabled: true,
//           snapToDataPoint: true,
//           valueFormatString: 'YYYY MMM DD'

//         }
//       },
      
//       axisY: {
//         crosshair: {
//           // text:"date ",
//           enabled: true,
//           snapToDataPoint: true,
//           valueFormatString: '#'
//         }
//       },
//       data: [{
//         type: "spline",
//         xValueFormatString: 'YYYY MMM DD',
//         // showInLegend: true, 
//         markerType: "circle",
//         name: "series1",
//         legendText: "Env Humidity",
//         dataPoints: arr
//       },
//       {
//         type: "spline",
//         xValueFormatString: 'YYYY-MMM-DD',
//         // showInLegend: true, 
//         markerType: "cross",
//         name: "series2",
//         legendText: "Soil Temperature",
//         // xValueType: "dateTime",
//         dataPoints: arr1
//       }
//       ]
//     }],
//     rangeSelector: {

//       buttons: [{
//         label: "7 days",
//         range: 7 * 24 * 60 * 60 * 1000,
//         rangeType: "number",

//       }, {
//         label: "15 days",
//         range: 15 * 24 * 60 * 60 * 1000,
//         rangeType: "number"
//       }, {
//         label: "30 days",
//         range: 30 * 24 * 60 * 60 * 1000,
//         rangeType: "number"
//       }, {
//         label: "1 year",
//         range: 365 * 24 * 60 * 60 * 1000,
//         rangeType: "number"
//       },
//       {
//         label: "All",
//         rangeType: "all"
//       }
//       ]
//     }
//   };

//   const containerProps = {
//     width: "90%",
//     height: "320px",
//     // margintop: "2rem",
//     margin: "10px"
//   };
//   return (
//     <div>
//        {arr ?( <div>
//         {arr && (
//           <div>
//             <CanvasJSStockChart navigator={navigator} containerProps={containerProps} options={options} />
//           </div>
//         )}
//       </div>):(
//         <div className='spinner-div-newLinechart'>
//         <ThreeCircles
//         height="50"
//         width="50"
//         color="#4fa94d"
//         wrapperStyle={{}}
//         wrapperClass=""
//         visible={true}
//         ariaLabel="three-circles-rotating"
//         outerCircleColor="#4fa94d"
//         innerCircleColor="#0796e3"
//         middleCircleColor="#4fa94d"/>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NewlinechartMain;

import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-stockcharts';
import axios from 'axios';
import moment from 'moment';
import "./Newlinechart.css";
// import { format, startOfDay } from 'date-fns';
import { ThreeCircles } from "react-loader-spinner";


const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

function NewlinechartMain({serialNumber}) {
  const [resData, setResData] = useState(null);
  const [arr, setArr] = useState(null)
  const [arr1, setArr1] = useState(null)
  const [selectedRange, setSelectedRange] = useState(7);
  const [changeserialNumber, setChangeserialNumber] = useState(0)
  const [startdate, setstartdate] = useState();
  const [enddate, setenddate] = useState();
  // const num = 12345
  // console.log(num.toFixed(2))


    const Newlinechart = async () => {
      const serialNumber1 = serialNumber

      const today = new Date();

      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${year}/${month}/${day}`;
      setstartdate("2023/09/08");
    setenddate(formattedDate);
      // console.log(serialNumber1, 'aaaaaaaaaa')

      const API = "https://wf8dxu1cue.execute-api.us-east-1.amazonaws.com/default/iotdata";
      const data = {
        SerialNumber:serialNumber1,
        // SerialNumber: "S170H120L122-07-2617:36:51",
        startDate: "2023/09/08",
        endDate: formattedDate
      }
      try {
        const response = await axios.post(API, data)
        const responsedata = response.data.body;
        // console.log(responsedata, 'dataresponse')

        return response
      }

      catch (error) {
        console.error(error)
      }
    }
    const Newlinechartfresh = async (start, end) => {
      const serialNumber1 = serialNumber
      setstartdate(start);
      setenddate(end);
     
      const API = "https://wf8dxu1cue.execute-api.us-east-1.amazonaws.com/default/iotdata";
      const data = {
        SerialNumber:serialNumber1,
        // SerialNumber: "S170H120L123-08-2813:13:22",
        startDate: start,
        endDate: end
      }
      try {
        const response = await axios.post(API, data)
        const responsedata = response.data.body;
        // console.log(responsedata, 'dataresponse')
        setGraphData(response.data.body);
        setResData(response.data.body);
        return response
      }

      catch (error) {
        console.error(error)
      }
    }
    const setGraphData = (data) => {
      const graphArray = [];
      const graphArray1 = [];

      for (let item of data) {
        const postedDateTime = item?.payload?.PostedDatetime;
        const dateStr = postedDateTime.split(' ');
        const splitdate = dateStr[0].split('-');
        const splitTime = dateStr[1].split(':')
        const xdate = new Date('20' + splitdate[0], splitdate[1] - 1, splitdate[2], splitTime[0], splitTime[1], splitTime[2]);
        // console.log(xdate, 'ddd')
        const SoilTemperature = item.payload.SoilTemperature
        // const limitpostedDateTime = parseInt(String(dateStr).substring(0, 2))
        const limitSoilTemperature = parseInt(String(SoilTemperature).substring(0, 2))


        const EnvHumidity = item.payload.EnvBmeHumidity
        const limitEnvHumidity = parseInt(String(EnvHumidity).substring(0, 2))
        console.log(limitEnvHumidity,limitSoilTemperature,'sss')

        const datestring = new Date(postedDateTime)
        // console.log(splitTime, splitdate, 'aaaaaa')
        // console.log(postedDateTime,soilMoisture_1)
        graphArray.push({ x: xdate, y: limitSoilTemperature })
        graphArray1.push({ x: xdate, y: limitEnvHumidity })

        // console.log(data,'dataset')
      }
      // console.log(graphArray, "graph")
      // console.log(arr1, 'arr1')
      setArr(graphArray)
      setArr1(graphArray1)

      return graphArray
    }
    useEffect(() => {

    // setSelectedRange(7);
    Newlinechart().then((res) => {
      setGraphData(res.data.body)
      // console.log(res.data.body)
      // const graphData = res.data.body
      setResData(res.data.body)

    }).catch((err) => {
      console.error(err)
    })
  }, [serialNumber]);
  const handleRangeChange = (range) => {
    // Update the selected range and call the API with the corresponding date range

    let startDate = "";
    let endDate = "";

    // Determine the start and end dates based on the selected range
    const today = new Date();
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}/${month}/${day}`;
    };

    switch (range) {
      case "1W":
        startDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 7
        );
        endDate = today;
        break;
      case "15D":
        startDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 15
        );
        endDate = today;
        break;
      case "1M":
        startDate = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          today.getDate()
        );
        endDate = today;
        break;
      case "3M":
        startDate = new Date(
          today.getFullYear(),
          today.getMonth() - 3,
          today.getDate()
        );
        endDate = today;
        break;
      case "6M":
        startDate = new Date(
          today.getFullYear(),
          today.getMonth() - 6,
          today.getDate()
        );
        endDate = today;
        break;
      // Add more cases for other ranges as needed
      default:
        break;
    }

    // Format the dates in "yyyy/mm/dd" format
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    Newlinechartfresh(formattedStartDate, formattedEndDate);
    // Call the API with the formatted date range
    // this.fetchData(formattedStartDate, formattedEndDate);
  };
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    charts: [{
      axisX: {
        crosshair: {
          title: "Env Humidity",
          enabled: true,
          snapToDataPoint: true,
          valueFormatString: 'YYYY MMM DD'

        }
      },
      
      axisY: {
        crosshair: {
          // text:"date ",
          enabled: true,
          snapToDataPoint: true,
          valueFormatString: '#'
        }
      },
      toolTip: {
        shared: true
      },
      data: [{
        type: "spline",
        xValueFormatString: 'YYYY MMM DD',
        // showInLegend: true, 
        markerType: "circle",
        name: "SoilTemperature",
        // legendText: "Env Humidity",
        dataPoints: arr
      },
      {
        type: "spline",
        xValueFormatString: 'YYYY-MMM-DD',
        // showInLegend: true, 
        markerType: "cross",
        name: "Environmental Humidity",
        // legendText: "Soil Temperature",
        // xValueType: "dateTime",
        dataPoints: arr1
      }
      ]
    }],
    rangeSelector: {
        enabled: false,
      buttons: [{
        label: "7 days",
        range: 7 * 24 * 60 * 60 * 1000,
        rangeType: "number",

      }, {
        label: "15 days",
        range: 15 * 24 * 60 * 60 * 1000,
        rangeType: "number"
      }, {
        label: "30 days",
        range: 30 * 24 * 60 * 60 * 1000,
        rangeType: "number"
      }, {
        label: "1 year",
        range: 365 * 24 * 60 * 60 * 1000,
        rangeType: "number"
      },
      {
        label: "All",
        rangeType: "all"
      }
      ]
    }
  };

  const containerProps = {
    width: "90%",
    height: "320px",
    // margintop: "2rem",
    margin: "10px"
  };
  return (
    <div>
       {arr ?( <div>
        {arr && (

          <div>
            <div>
              <div style={{display:'flex', flexDirection:'row', marginTop:10}}>
              <button
                onClick={() => handleRangeChange("1W")}
                disabled={selectedRange === "1W"}
                style={{
                  fontSize: 12,
                  borderColor: "#00a3ff",
                  backgroundColor: "#e5f3fd",
                  marginLeft: 8,
                  marginRight: 8,
                  borderRadius: 5,
                }}
              >
                1 week
              </button>
              <button
                onClick={() => handleRangeChange("15D")}
                disabled={selectedRange === "15D"}
                style={{
                  fontSize: 12,
                  borderColor: "#00a3ff",
                  backgroundColor: "#e5f3fd",
                  marginLeft: 8,
                  marginRight: 8,
                  borderRadius: 5,
                }}
              >
                15 days
              </button>

              <button
                onClick={() => handleRangeChange("1M")}
                disabled={selectedRange === "1M"}
                style={{
                  fontSize: 12,
                  borderColor: "#00a3ff",
                  backgroundColor: "#e5f3fd",
                  marginLeft: 8,
                  marginRight: 8,
                  borderRadius: 5,
                }}
              >
                1 Month
              </button>
              <button
                onClick={() => handleRangeChange("3M")}
                disabled={selectedRange === "3M"}
                style={{
                  fontSize: 12,
                  borderColor: "#00a3ff",
                  backgroundColor: "#e5f3fd",
                  marginLeft: 8,
                  marginRight: 8,
                  borderRadius: 5,
                }}
              >
                3 Months
              </button>
              <button
                onClick={() => handleRangeChange("6M")}
                disabled={selectedRange === "6M"}
                style={{
                  fontSize: 12,
                  borderColor: "#00a3ff",
                  backgroundColor: "#e5f3fd",
                  marginLeft: 8,
                  marginRight: 8,
                  borderRadius: 5,
                }}
              >
                6 Months
              </button>
              <div style={{ fontSize:14, fontWeight:'bold', fontFamily:'monospace'}}>From {startdate} To {enddate}</div>

              </div>
            <CanvasJSStockChart navigator={navigator} containerProps={containerProps} options={options} />
          </div>
          </div>
        )}
      </div>):(
        <div className='spinner-div-newLinechart'>
        <ThreeCircles
        height="50"
        width="50"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="#4fa94d"
        innerCircleColor="#0796e3"
        middleCircleColor="#4fa94d"/>
        </div>
      )}
    </div>
  );
};

export default NewlinechartMain;

