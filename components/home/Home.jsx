import React, { useState, useEffect, useCallback } from 'react';
import './Home.css'
import {
  axios,
  Farmer,
  FaTractor,
  Sidebar,
  //api services
  UsersForConsultant,
} from '../modules/Module'
import RecentMonitoringTable from '../recentMonitoringTable/RecentMonitoringTable'
import { Row, Col } from 'react-bootstrap';
 
import img1 from '../../assets/Rectangle 17686.png' 
import img2 from '../../assets/Rectangle 17685.png' 
import img3 from '../../assets/Rectangle 17688.png'
import img4 from '../../assets/Rectangle 17734.png'

function Home({ onVeiwDetailsClick, userId_serialNumber, userId }) {
  const [farmer, setFarmer] = useState('')
  const [byLocation, setByLocation] = useState('')
  const [byVegitable, setByVegitable] = useState('')
  const [isfirttime, setIsFirsttime] = useState(true)
  const [firstUserId, setFirstUserId] = useState(null);
  const [firstSerialNumber, setFirstSerialNumber] = useState(null);
  const [userdata, setUserdata] = useState([])
  const [farmerData, setFarmerData] = useState('')


  let userId1 = userId_serialNumber?.userId ?? firstUserId;
  let serialNumber1 = userId_serialNumber?.serialNumber ?? firstSerialNumber;
  console.log(userId1, serialNumber1, 'ccc')

  const UsersForConsultant = async () => {
    const consultantId = "99aa13e8-42ea-4796-a256-c620c3f4e138";
    const consultantIdNew = "07b0a30b-d300-471a-b457-1ab0c2abfafc";
    // const consultantIdNew = "f13dd461-5c67-4fae-b2ef-bc3152dac252"

    const API =
      "https://77s7svdggd.execute-api.us-east-1.amazonaws.com/production/";
    let data = {
      partitionKey: consultantIdNew, //consultantId
    };
    try {
      const response = await axios.post(API, data);
      return response;
    } catch (error) {
      console.error("error in UsersForConsultantService", error);
    }
  };
  const fetchData = useCallback(async () => {
    const API =
      "https://iotr2zasp6.execute-api.us-east-1.amazonaws.com/default/FetchPlotDetails/plotdetails";
    try {
      const response = await axios.post(API, {
        userId: userId1,
      });
      // console.log("fffff", response.data.body);
      let userData = response.data.body;
      console.log("userData", userData);
      setUserdata(userData)
    } catch (error) {
      console.error("error from  db", error);
      // if (error) fetchData();
      // Handle any error that occurred
    }
    // console.log("userId", userId);
  }, [userId1]);


  const registeredFarmer = async () => {
    const API = "https://qk8xhbdx25.execute-api.us-east-1.amazonaws.com/default/RegisteredFarmers"
    try {
      const response = await axios.get(API);
      // console.log(response.data.data.Count, 'aaaa')
      setFarmer(response.data.data.Count)
    } catch (error) {
      console.error('Error fetching registered users:', error);
    }

  };
  const countByLocation = async () => {
    const API = "https://qk8xhbdx25.execute-api.us-east-1.amazonaws.com/default/byLocation"
    try {
      const response = await axios.get(API);
      setByLocation(response.data.data.Count)
    } catch (error) {
      console.error('Error fetching countByLocation:', error);
    }

  };
  const countByVegitable = async () => {
    const API = "https://qk8xhbdx25.execute-api.us-east-1.amazonaws.com/default/byVegetables"
    try {
      const response = await axios.get(API)
      // console.log(response.data.data.Count, 'aaaa')
      setByVegitable(response.data.data.Count)
    } catch (error) {
      console.error('Error fetching countByVegitable:', error)
    }
    // setByVegitable()
  }
  const countByFruits = async () => {
    const API = "https://qk8xhbdx25.execute-api.us-east-1.amazonaws.com/default/byFruits"
    try {
      const response = await axios.get(API);
      const apiData = response.data;
      // console.log("response", apiData);


      const count = apiData.data.Count
      // console.log(count, response.data, 'aaaa')
      // setByFruits(count)
    } catch (error) {
      console.error('Error fetching countByFruits:', error);
    }

  };

  // const getUserdetails = async () => {
  //   let userData, dataObj = {};
  //   const API = "https://trwbbpqaw1.execute-api.us-east-1.amazonaws.com/default/getUserdetails"
  //   try {
  //     axios
  //       .post(API, {
  //         username: 'be04891a-0bed-48d7-b19b-1ea02fec59be'
  //       })
  //       .then((res) => {
  //         userData = res.data.body;
  //         console.log(userData, 'llll')

  //         userData.forEach((attribute) => {
  //           dataObj[attribute.Name] = attribute.Value;
  //         });
  //         // console.log(dataObj.given_name + ' ' + dataObj.family_name, 'qqq');
  //       })
  //   } catch (error) {
  //     console.error('Error fetching getUserdetails:', error)
  //   }
  // }
  const getAllUsersDetails = async () => {
    let resData, userdataObj = {}, attributes = {};
    try {
      const API =
        "https://69bdva1sj0.execute-api.us-east-1.amazonaws.com/default/allUserDetails";
      const res = await axios.post(API);
      const resData = res.data.body.slice(-3);
      setFarmerData(resData);
      console.log("User Data:", resData);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }

  const displayFarmerData = farmerData.length > 0 ? farmerData[0] : null
  const displayFarmerData1 = farmerData.length > 0 ? farmerData[1] : null 
  const displayFarmerData2 = farmerData.length > 0 ? farmerData[2] : null
  console.log(displayFarmerData, 'cccc')


  // const listOfPruningdate = async () => {
  //   let pruningDate = []
  //   const API = "https://iotr2zasp6.execute-api.us-east-1.amazonaws.com/default/FetchPlotDetails/plotdetails"
  //   const response = await axios.post(API, {
  //     userId: 'be04891a-0bed-48d7-b19b-1ea02fec59be'
  //   })
  //   pruningDate = response.data.body

  //   console.log(response.data.body, 'zzzz')
  //   pruningDate.forEach((element) => {
  //     //  return element.Date
  //     console.log(element.Date, 'aaaaa')

  //   });

  // }

  useEffect(() => {
    if (isfirttime) {
      UsersForConsultant().then((res) => {
        setFirstUserId(res?.data[0]?.userId);
        setFirstSerialNumber(res?.data[0]?.SerialNumber);
        setIsFirsttime(false);
      });
    }
    registeredFarmer();
    countByFruits();
    countByLocation();
    countByVegitable();
    userId1 && fetchData();
    // getUserdetails();
    // listOfPruningdate();
    getAllUsersDetails();
    // handlePlotFetch();
  }, [firstUserId, firstSerialNumber]);


  return (
    <>
      <Row>
        <Col xs={3} className='sidebar-component'>
          <div >
            <Sidebar />
          </div>
        </Col>
        <Col xs={10} >
          <div className='details-and-report'>
            <div className="home row">
              <div>
                <p>Total Connections By</p>
              </div>
              <div className="col-sm-2">
                <div className="home-card">
                  <div className="card-body-connections" onClick={onVeiwDetailsClick}>

                    <div className='registered-farmer'>
                    <img src={img1} style={{marginLeft:"20px",marginTop:"15px"}}></img>

                      <div className='farmer-value'>

                        <span>Registered  Farmer</span>
                        <p>{farmer}</p>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="home-card">
                  <div className="card-body-connections-1">

                    <div className='By-Location'>
                      <img src={img2} style={{marginLeft:"20px",marginTop:"15px"}}></img>
                      {/* <FaTractor style={{ fontSize: '30px' }} /> */}
                      <div className='farmer-value'>

                        <span>
                          By Location
                        </span>
                        <p>{byLocation}</p>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="home-card">
                  <div className="card-body-connections-2">

                    <div className='By-vegitable'>
                      <img src={img3} style={{marginLeft:"20px",marginTop:"15px"}}></img>

                      {/* <FaTractor style={{ fontSize: '30px' }} /> */}
                      <div className='farmer-value'>

                        <span>
                          By vegitable
                        </span>
                        <p>{byVegitable}</p>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="home-card">
                  <div className="card-body-connections-3">

                    <div className='By-Pruning-Date'>
                      <img src={img4} style={{marginLeft:"20px",marginTop:"15px"}}></img>

                      {/* <FaTractor style={{ fontSize: '30px' }} /> */}
                      <div className='farmer-value'>

                        <span>
                          By Pruning Date
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="home-card">
                  <div className="card-body-connections-4">

                    <div className='By-Veriety'>
                      <img src={img2} style={{marginLeft:"20px",marginTop:"15px"}}></img>

                      {/* <FaTractor style={{ fontSize: '30px' }} /> */}
                      <div className='farmer-value'>

                        <span>
                          By Veriety
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="details row">
              <div className='view-detals'>
                <p>
                  New Cultivation
                </p>
              </div>
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body">
                    <div key={displayFarmerData?.username} className='new-cultivation'>
                      {displayFarmerData ? (
                        <>
                          <p>
                            FarmerName: {
                              displayFarmerData.attributes.find(
                                (attr) => attr.Name === "given_name"
                              )?.Value
                            }
                          </p>
                          <p>
                            Mob: {
                              displayFarmerData.attributes.find(
                                (attr) => attr.Name === "phone_number"
                              )?.Value
                            }
                          </p>
                        </>
                      ) : (
                        <>
                          Loading...
                        </>
                      )}

                      {/* <p>FarmerName: Rajesh N</p>
                      <p>Mob: 9876543210</p> */}
                    </div>
                    <div className='new-cultivation'>
                      <p>Locatio: Maharastra</p>
                      <p> Crop-Grapes</p>
                    </div>
                    <div className='btn-details'>
                      <a href="#" className="btn btn-primary" onClick={onVeiwDetailsClick}>View Details</a>
                      <a href="#" className="btn btn-light">Report</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body">

                    <div key={displayFarmerData1?.username} className='new-cultivation'>
                      {displayFarmerData1 ? (
                        <>
                          <p>
                            FarmerName: {
                              (displayFarmerData1.attributes ?? []).find(
                                (attr) => attr.Name === "given_name"
                              )?.Value
                            }
                          </p>
                          <p>
                            Mob: {
                              (displayFarmerData1.attributes ?? []).find(
                                (attr) => attr.Name === "phone_number"
                              )?.Value
                            }
                          </p>
                        </>
                      ) : (
                        <>
                          Loading...
                        </>
                      )}

                      {/* <p>FarmerName: Rajesh N</p>
                      <p>Mob: 9876543210</p> */}
                    </div>
                    <div className='new-cultivation'>
                      <p>Locatio: Maharastra</p>
                      <p> Crop-Grapes</p>
                    </div>
                    <div className='btn-details'>
                      <a href="#" className="btn btn-primary" onClick={onVeiwDetailsClick}>View Details</a>
                      <a href="#" className="btn btn-light">Report</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body">

                    <div key={displayFarmerData2?.username} className='new-cultivation'>
                      {displayFarmerData2 ? (
                        <>
                          <p>
                            FarmerName: {
                              (displayFarmerData2.attributes ?? []).find(
                                (attr) => attr.Name === "given_name"
                              )?.Value
                            }
                          </p>
                          <p>
                            Mob: {
                              (displayFarmerData2.attributes ?? []).find(
                                (attr) => attr.Name === "phone_number"
                              )?.Value
                            }
                          </p>
                        </>
                      ) : (
                        <>
                          Loading...
                        </>
                      )}

                      {/* <p>FarmerName: Rajesh N</p>
                      <p>Mob: 9876543210</p> */}
                    </div>
                    <div className='new-cultivation'>
                      <p>Locatio: Maharastra</p>
                      <p> Crop-Grapes</p>
                    </div>
                    <div className='btn-details'>
                      <a href="#" className="btn btn-primary" onClick={onVeiwDetailsClick}>View Details</a>
                      <a href="#" className="btn btn-light">Report</a>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            {/* <RecentMonitoringTable /> */}
          </div>
        </Col>
      </Row>
    </>

  );
};

export default Home;
