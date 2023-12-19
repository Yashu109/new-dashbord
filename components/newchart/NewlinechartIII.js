// import React, { useEffect, useState } from 'react';
// import CanvasJSReact from '@canvasjs/react-stockcharts';
// import axios from 'axios';
// import moment from 'moment';
// import "./Newlinechart.css"
// import { ThreeCircles } from "react-loader-spinner";


// const CanvasJS = CanvasJSReact.CanvasJS;
// const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

// function NewlinechartMain({ serialNumber }) {
//   const [resData, setResData] = useState(null);
//   const [arr2, setArr] = useState(null)


//   const Newlinechart = async () => {
//     const today = new Date();

//     const sevenDaysAgo = new Date(today);
//     sevenDaysAgo.setDate(today.getDate() - 7);

//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     const formattedDate = `${year}/${month}/${day}`;

//     const serialNumber1 = serialNumber
//     // setsevenDaysData(serialNumber1)
//     // console.log(formattedDate,serialNumber1, 'aaaaaaaaaa')

//     const API = "https://wf8dxu1cue.execute-api.us-east-1.amazonaws.com/default/iotdata";
//     const data = {
//       // SerialNumber:"S170H120L122-10-1816:05:18",
//       // SerialNumber: "S170H120L122-07-2617:36:51",
//       SerialNumber: serialNumber1,
//       startDate: "2023/09/08",
//       endDate: formattedDate
//     }
//     try {
//       const response = await axios.post(API, data)
//       const responseData = response.data.body;
//       console.log(responseData, 'dataresponse')
//       // setsevenDaysData(responseData)

//       return response
//     }

//     catch (error) {
//       console.error(error)
//     }
//   }
//   Newlinechart();


//   const setGraphData = (data) => {
//     const graphArray = [];
//     const graphArray1 = [];

//     //   let today = new Date();
//     // let year = today.getFullYear();
//     for (let item of data) {
//       // const formattedData = props.formattedData 
//       const postedDateTime = item?.payload?.PostedDatetime;
//       // const parseDate = timeParse('%Y-%m-%d')
//       const dateStr = postedDateTime.split(' ');
//       const splitdate = dateStr[0].split('-');
//       const splitTime = dateStr[1].split(':')
//       const xdate = new Date('20' + splitdate[0], splitdate[1] - 1, splitdate[2], splitTime[0], splitTime[1], splitTime[2]);
//       // console.log(xdate, 'ddd')
//       // const timestamp = "1690385400000";
//       const formattedDate = moment(parseInt(postedDateTime)).format('hh');
//       const formattedDate_1 = moment(parseInt(postedDateTime)).format('YYYY-MM-DD');

//       const sunLight1 = item.payload.SunLight1
//       const sunLight2 = item.payload.SunLight2
//       const limitpostedDateTime = parseInt(String(dateStr).substring(0, 2))
//       const limitsunLight1 = parseInt(String(sunLight1).substring(0, 2))
//       const limitsunLight2 = parseInt(String(sunLight1).substring(0, 2))

//       const averageSunLightData = ((sunLight1 - sunLight2) / sunLight1) * 100;
//       // const averageSunLightData = 

//       console.log(averageSunLightData, "avrageLimitsunLight");

//       const avrageLimitsunLight = parseInt(String(averageSunLightData).substring(0, 2))
//       console.log(avrageLimitsunLight, "avrageLimitsunLight")

//       graphArray.push({ x: xdate, y: avrageLimitsunLight })
//       console.log(data, 'dataset')
//     }
//     setArr(graphArray)
//     return graphArray
//   }
//   // console.log(arr, 'arr')
//   useEffect(() => {

//     Newlinechart().then((res) => {
//       setGraphData(res.data.body)
//       console.log(res, "resdata")
//       // const graphData = res.data.body
//       setResData(res.data.body)

//     }).catch((err) => {
//       console.error(err)
//     })
//   }, [serialNumber]);

//   const options = {
//     // title: {
//     //   text: "Soil Moisture"
//     // },
//     animationEnabled: true,
//     exportEnabled: true,
//     charts: [{
//       axisX: {
//         crosshair: {
//           text: "soil moisture",
//           enabled: true,
//           snapToDataPoint: true,
//           valueFormatString: 'YYYY-MMM-DD'

//         }
//       },
//       // toolTip: {
//       //   shared: true
//       // },
//       axisY: {
//         crosshair: {
//           text: "date ",
//           enabled: true,
//           snapToDataPoint: true,
//           // valueFormatString:" "         
//         }
//       },
//       data: [{
//         type: "spline",
//         xValueFormatString: 'YYYY-MM-DD',
//         xValueType: "dateTime",
//         dataPoints: arr2
//       },

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
//     height: "270px",
//     // margintop: "2rem",
//     margin: "10px",
//   };

//   return (
//     <div>
//       {/* {sevenDaysData} */}
//       {arr2 ? (<div>
//         {arr2 && (
//           <div>
//             <CanvasJSStockChart navigator={navigator} containerProps={containerProps} options={options} />
//           </div>
//         )}
//       </div>) : (
//         <div className='spinner-div-newLinechart'>
//         <ThreeCircles
//           height="50"
//           width="50"
//           color="#4fa94d"
//           wrapperStyle={{}}
//           wrapperClass=""
//           visible={true}
//           ariaLabel="three-circles-rotating"
//           outerCircleColor="#4fa94d"
//           innerCircleColor="#0796e3"
//           middleCircleColor="#4fa94d" />
//           </div>
//       )}
//     </div>
//   );
// };

// export default NewlinechartMain;

import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-stockcharts';
import axios from 'axios';
import moment from 'moment';
import "./Newlinechart.css"
import { ThreeCircles } from "react-loader-spinner";


const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

function NewlinechartMain({ serialNumber }) {
  const [resData, setResData] = useState(null);
  const [arr2, setArr] = useState(null)
  const [startdate, setstartdate] = useState();
  const [enddate, setenddate] = useState();
  const [selectedRange, setSelectedRange] = useState(7);

  const Newlinechart = async () => {
    const today = new Date();

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}/${month}/${day}`;
    setstartdate("2023/09/08");
    setenddate(formattedDate);
    const serialNumber1 = serialNumber
    // setsevenDaysData(serialNumber1)
    // console.log(formattedDate,serialNumber1, 'aaaaaaaaaa')

    const API = "https://wf8dxu1cue.execute-api.us-east-1.amazonaws.com/default/iotdata";
    const data = {
      // SerialNumber:"S170H120L122-10-1816:05:18",
      // SerialNumber: "S170H120L122-07-2617:36:51",
      SerialNumber: serialNumber1,
      startDate: "2023/09/08",
      endDate: formattedDate
    }
    try {
      const response = await axios.post(API, data)
      const responseData = response.data.body;
      // console.log(responseData, 'dataresponse')
      // setsevenDaysData(responseData)

      return response
    }

    catch (error) {
      console.error(error)
    }
  }
  // Newlinechart();

  const Newlinechartfresh = async (start, end) => {
    const today = new Date();

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}/${month}/${day}`;
    setstartdate(start);
    setenddate(end);
    const serialNumber1 = serialNumber
    // setsevenDaysData(serialNumber1)
    // console.log(serialNumber1, 'aaaaaaaaaa')

    const API = "https://wf8dxu1cue.execute-api.us-east-1.amazonaws.com/default/iotdata";
    const data = {
      // SerialNumber:"S170H120L122-10-1816:05:18",
      // SerialNumber: "S170H120L122-07-2617:36:51",
      SerialNumber: serialNumber1,
      startDate: start,
      endDate: end
    }
    try {
      const response = await axios.post(API, data)
      const responseData = response.data.body;
      // console.log(responseData, 'dataresponse')
      setGraphData(response.data?.body);
      setResData(response.data?.body);
      // setsevenDaysData(responseData)

      return response
    }

    catch (error) {
      console.error(error)
    }
  }
  const setGraphData = (data) => {
    const graphArray = [];
    const graphArray1 = [];

    //   let today = new Date();
    // let year = today.getFullYear();
    for (let item of data) {
      // const formattedData = props.formattedData 
      const postedDateTime = item?.payload?.PostedDatetime;
      // const parseDate = timeParse('%Y-%m-%d')
      const dateStr = postedDateTime.split(' ');
      const splitdate = dateStr[0].split('-');
      const splitTime = dateStr[1].split(':')
      const xdate = new Date('20' + splitdate[0], splitdate[1] - 1, splitdate[2], splitTime[0], splitTime[1], splitTime[2]);
      // console.log(xdate, 'ddd')
      // const timestamp = "1690385400000";
      const formattedDate = moment(parseInt(postedDateTime)).format('hh');
      const formattedDate_1 = moment(parseInt(postedDateTime)).format('YYYY-MM-DD');

      const sunLight1 = item.payload.SunLight1
      const sunLight2 = item.payload.SunLight2
      const limitpostedDateTime = parseInt(String(dateStr).substring(0, 2))
      const limitsunLight1 = parseInt(String(sunLight1).substring(0, 2))
      const limitsunLight2 = parseInt(String(sunLight1).substring(0, 2))

      const averageSunLightData = ((sunLight1 - sunLight2) / sunLight1) * 100;
      // const averageSunLightData = 

      // console.log(averageSunLightData, "avrageLimitsunLight");

      const avrageLimitsunLight = parseInt(String(averageSunLightData).substring(0, 2))
      // console.log(avrageLimitsunLight, "avrageLimitsunLight")

      graphArray.push({ x: xdate, y: avrageLimitsunLight })
      // console.log(data, 'dataset')
    }
    setArr(graphArray)
    return graphArray
  }
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
  // console.log(arr, 'arr')
  useEffect(() => {

    Newlinechart().then((res) => {
      setGraphData(res.data.body)
      // console.log(res, "resdata")
      // const graphData = res.data.body
      setResData(res.data.body)

    }).catch((err) => {
      console.error(err)
    })
  }, [serialNumber]);

  const options = {
    // title: {
    //   text: "Soil Moisture"
    // },
    animationEnabled: true,
    exportEnabled: true,
    charts: [{
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          valueFormatString: 'YYYY-MMM-DD'

        }
      },
      
      axisY: {
        crosshair: {
          title: "sunLight",
          // prefix: "$",
          // tickLength: 0,
          text: "date ",
          enabled: true,
          snapToDataPoint: true,
          // valueFormatString:" "         
        }
      },
      toolTip: {
        shared: true
      },
      data: [{
        name:"sunLight",
        type: "spline",
        xValueFormatString: 'YYYY-MM-DD',
        xValueType: "dateTime",
        dataPoints: arr2
      },

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
    height: "270px",
    // margintop: "2rem",
    margin: "10px",
  };

  return (
    <div>
      {/* {sevenDaysData} */}
      {arr2 ? (<div>
        {arr2 && (
          <div>
            <div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                <div style={{ fontSize: 14, fontWeight: 'bold', fontFamily: 'monospace' }}>From {startdate} To {enddate}</div>

              </div>
              <CanvasJSStockChart navigator={navigator} containerProps={containerProps} options={options} />
            </div>
          </div>
        )}
      </div>) : (
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
            middleCircleColor="#4fa94d" />
        </div>
      )}
    </div>
  );
};

export default NewlinechartMain;

