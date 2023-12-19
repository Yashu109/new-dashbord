import React, { useState, useEffect } from 'react';
import './FarmarDetails.css';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SideMenu from './SideMenu';
// import Shcedule from './Shcedule';
import axios from "axios";
import Speedometer from '../Farmer/speedometer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Images from './Report';
import Report from '../farmer/Report'
import Weather from '../farmer/Weather';
import {
  // RecentImages,
} from "../modules/Module"

const FarmarDetails = () => {
  
  const [selectedTab, setSelectedTab] = useState('Field Data');
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [allData, setAllData] = useState([]);
  const [plotId, setPlotId] = useState('')
  const [plotData, setPlotData] = useState([])
  const [cropName, setCropName] = useState('')
  const [plotName, setPlotName] = useState('')
  const [editingRows, setEditingRows] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [selectedValue, setSelectedValue] = useState('');
  const [maratiData, setMaratiData] = useState();
  const [plotDetails, setPlotDetails] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);
  const [SerialNumberFromPlotClick, setSerialNumberFromPlotClick] = useState()
  const [plotIdFromFetchApi, setPlotIdFromFetchApi] = useState('')
  const [plotLocationData, setPlotLocationData] = useState('')
  const [userIdFromSidemenu, setUserIdFromSidemenu] = useState();
const [plotIdforAll, setPlotIdforAll] = useState('')
  var userId1 = userIdFromSidemenu;
  console.log(userId1,'userId1')
  const tabs = ['Field Data', 'Schedule', 'Weather', 'Report', 'History'];

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    console.log(selectedTab);
  };

  const handleMenuClick = (menu) => {

    console.log(`Clicked on ${menu}`);
  };
  
  const fetchData = async (plotId, SerialNumber, cropName) => {
    const retriveResponse = [];
    
    setSerialNumberFromPlotClick(SerialNumber);
    setCropName(cropName)
    setPlotIdforAll(plotId)
    console.log(cropName,plotId,SerialNumber,'dddd')
    try {
      const API = "https://zgiphmcemb.execute-api.us-east-1.amazonaws.com/default/RetrieveSOP/sop";
      const response = await axios.post(API, {
        userId: userId1,
        PlotId: plotIdforAll,
      });
      console.log(SerialNumber)
      console.log(response.data.body);
      setAllData(response.data.body[0].data);
      setMaratiData(response.data.body[0].maratiData);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const dataToMap = selectedValue === "Marathi" ? maratiData : allData;


  const handleFetchPlotDetails = async () => {
    
    const API = "https://iotr2zasp6.execute-api.us-east-1.amazonaws.com/default/FetchPlotDetails/plotdetails";

    try {
      const response = await axios.post(API, {
        userId: userId1,
      });

      const plotDetailsArray = response.data.body;
      // const plotLocation = response.data.body[0].PlotLocation
      console.log(plotDetailsArray, 'ssss')
      // setPlotLocationData(plotLocation)
      setPlotIdFromFetchApi(plotDetailsArray)
      console.log(plotDetailsArray,'plotIdFromFetchApi')

      // Create an array to store plot names and plot IDs
      const plotDetails  = plotDetailsArray.map(plot => ({
        name: plot.Name,
        id: plot.PlotId,
        SerialNumber: plot.SerialNumber,
        CropType: plot.CropType,
        // Location: plot.PlotLocation
      })
      
      );



      setPlotDetails(plotDetails);
      console.log(plotDetails,'plotDetails')
    } catch (error) {
      console.error("error from db", error);
    }
  };




  console.log("userDataaaa", plotIdFromFetchApi);


  const handleSaveClick = (id) => {
    // const userId1 = userIdFromSidemenu
    //userIdFromSidemenu
    const input = {
      userId: userId1,
      PlotId: plotIdforAll
      // plotIdFromFetchApi
    };

    let updatedData, updatedMaratiData;

    if (selectedValue === "English") {
      updatedData = allData.map((item) => {
        const editedRow = editedData[item.id] || {};
        return {
          id: item.id,
          date: editedRow.date || item.date,
          thedayapurif: editedRow.thedayapurif || item.thedayapurif,
          srno: editedRow.srno || item.srno,
          nameofdrug: editedRow.nameofdrug || item.nameofdrug,
          drugdosesr: editedRow.drugdosesr || item.drugdosesr,
          Nameoffer: editedRow.Nameoffer || item.Nameoffer,
          Fertilizerqpa: editedRow.Fertilizerqpa || item.Fertilizerqpa,
          Remark: editedRow.Remark || item.Remark,
        };
      });

      updatedMaratiData = [...maratiData]; // Create a copy of maratiData
    } else if (selectedValue === "Marathi") {
      updatedMaratiData = maratiData.map((item) => {
        const editedRow = editedData[item.id] || {};
        return {
          id: item.id,
          date: editedRow.date || item.date,
          thedayapurif: editedRow.thedayapurif || item.thedayapurif,
          srno: editedRow.srno || item.srno,
          nameofdrug: editedRow.nameofdrug || item.nameofdrug,
          drugdosesr: editedRow.drugdosesr || item.drugdosesr,
          Nameoffer: editedRow.Nameoffer || item.Nameoffer,
          Fertilizerqpa: editedRow.Fertilizerqpa || item.Fertilizerqpa,
          Remark: editedRow.Remark || item.Remark,
        };
      });

      updatedData = [...allData];
    }


    input.data = updatedData;
    input.maratiData = updatedMaratiData;

    axios
      .post(
        "https://oe9lrm4u3m.execute-api.us-east-1.amazonaws.com/default/SaveSOPDetails",
        input
      )
      .then((response) => {
        // Update the state with the updated data based on the selected language
        if (selectedValue === "English") {
          setAllData(updatedData);
        } else if (selectedValue === "Marathi") {
          setMaratiData(updatedMaratiData);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });

    // Exit the editing mode for all rows
    setEditingRows({});
    setIsEditMode(false);
  };



  const handleCancelClick = (id) => {
    setEditingRows((prevEditingRows) => ({
      ...prevEditingRows,
      [id]: false,
    }));
  };


  const handleEditClick = (id) => {
    setEditingRows((prevEditingRows) => ({
      ...prevEditingRows,
      [id]: true,
    }));
  };


  const handleDeleteClick = (id) => {
    // Remove the row from the allData state

    const deletedData = allData.filter((item) => item.id !== id);
    const userId1 = localStorage.getItem("sopuserID")
    console.log(userId1, 'xxxx')
    const input = {
      userId: userId1,
      PlotId: plotIdforAll,
      data: deletedData,
    };

    axios
      .post(
        "https://oe9lrm4u3m.execute-api.us-east-1.amazonaws.com/default/SaveSOPDetails",
        input
      )
      .then((response) => {
        console.log("API Response:", deletedData);
        // Update the allData state with the updated data
        setAllData(deletedData);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });

    console.log("Deleted Row ID: ", id);
    console.log("Updated Data After Deletion: ", deletedData);

    // setAllData(deletedData);
    alert("Deleted successfully");
  };

  const handleInputChange = (id, column, value) => {
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [id]: {
        ...prevEditedData[id],
        [column]: value,
      },
    }));
  };

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };
  useEffect(() => {

    // handleAssignClick()
    setShowSideMenu(true);

  }, []);
  const handleUserClick = (user) => {
    // Handle the selected user data here
    setSelectedUser(user);
    console.log(user.username,'111')
    //console.log(user.username)

    setUserIdFromSidemenu(user.username)
console.log(userIdFromSidemenu,'...')
    // setUserclick(true)
    handleFetchPlotDetails();

  };

  return (
    <div className="farmer-details-container" style={{ padding: 'none' }} >
      {showSideMenu && <SideMenu onUserClick={handleUserClick} />}

      <div className="farmer-details-content">
        <div className="back-table">
          {/* <hr className="horizontal-line"></hr> */}
          <div className='selectedTab'>{selectedTab ? selectedTab : ''}</div >
        </div>

        <div key={selectedUser?.username} className="farmer-details-username">
          {selectedUser ? (
            <>
              <p>
                <PersonIcon className="icon" />{" "}
                {
                  selectedUser.attributes.find(
                    (attr) => attr.Name === "given_name"
                  )?.Value
                }{" "}
                {
                  selectedUser.attributes.find(
                    (attr) => attr.Name === "family_name"
                  )?.Value
                }{"   "}
                |
              </p>
              {/*<p>Farmer ID: {selectedUser.username} |</p>*/}
              <p>Farmar ID: {selectedUser.username.substring(0, 8)} |</p>
              <p>
                <PhoneIcon className="icon" />{" "}
                {
                  selectedUser.attributes.find(
                    (attr) => attr.Name === "phone_number"
                  )?.Value
                }{" "}
                |
              </p>
              <p>
                <LocationOnIcon className="location-icon" />{" "}
                {/* {
                  selectedUser.attributes.find(
                    (attr) => attr.Name === "location"
                  )?.Value
                } */}

                {/* {plotLocationData} */}
                {/* {plotDetails.map((plot) =>{fetchData(plot.id, plot.SerialNumber, plot.CropType)
                  {plot.PlotLocation}
                 })} */}
                {" "}
                |
              </p>
            </>
          ) : (
            <p>Loading...</p>

          )}
        </div>

        <div className="plots-tab">
          {plotDetails.map((plot, index) => (
            <button key={index} onClick={() => fetchData(plot.id, plot.SerialNumber, plot.CropType)} >{plot.name}</button>
          ))}
        </div>


        <div className="fruits-tabs">
          <div className='data-tabs'>
            {tabs.map((tab) => (
              <p
                key={tab}
                className={selectedTab === tab ? 'selected' : ''}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </p>
            ))}
          </div>

        </div>

        {/* {selectedTab === 'Schedule' && <Shcedule/>} */}
        <div className='cropdetail'>
          <h4>Crop: {cropName} </h4> <h4>variety:  </h4>



          {selectedTab === 'Schedule' && (
            <div>

              <select
                value={selectedValue}
                onChange={handleSelectChange}
                className="selectlanguage"
              >
                <option value="">Select Language</option>
                <option value="English">English</option>
                <option value="Marathi">Marathi</option>
              </select>

            </div>
          )}

        </div>



        {selectedTab === 'Schedule' && (

            selectedValue === 'English' ?
            <div className="schedule-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>SR.No</th>
                      <th>The day after pruning</th>

                      <th>Name of Drug</th>
                      <th>Drug dosage per liter / acre</th>
                      <th>Fertigation</th>

                      <th>Remark/Activity</th>
                      <th>Action</th>


                    </tr>
                  </thead>
                  <tbody>
                    {allData && dataToMap.map((item) => (
                      <tr key={item.id}>
                        <td>
                          {editingRows[item.id] ? (
                            <textarea
                              type="text"
                              value={editedData[item.id]?.srno || item.srno}
                              onChange={(e) =>
                                handleInputChange(item.id, "srno", e.target.value)
                              }
                            />
                          ) : (
                            item.srno
                          )}
                        </td>
                        <td>
                          {editingRows[item.id] ? (
                            <textarea
                              type="text"
                              value={
                                editedData[item.id]?.thedayapurif || item.thedayapurif
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  item.id,
                                  "thedayapurif",
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            item.thedayapurif
                          )}
                        </td>


                        <td>
                          {editingRows[item.id] ? (
                            <textarea
                              type="text"
                              value={editedData[item.id]?.nameofdrug || item.nameofdrug}
                              onChange={(e) =>
                                handleInputChange(item.id, "nameofdrug", e.target.value)
                              }
                            />
                          ) : (
                            item.nameofdrug
                          )}
                        </td>
                        <td>
                          {editingRows[item.id] ? (
                            <textarea
                              type="text"
                              value={
                                editedData[item.id]?.drugdosesr || item.drugdosesr
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  item.id,
                                  "drugdosesr",
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            item.drugdosesr
                          )}
                        </td>

                        <td>
                          {editingRows[item.id] ? (
                            <textarea
                              type="text"
                              value={
                                editedData[item.id]?.Fertilizerqpa || item.Fertilizerqpa
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  item.id,
                                  "Fertilizerqpa",
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            item.Fertilizerqpa
                          )}
                        </td>
                        <td>
                          {editingRows[item.id] ? (
                            <textarea
                              type="text"
                              value={editedData[item.id]?.Remark || item.Remark}
                              onChange={(e) =>
                                handleInputChange(item.id, "Remark", e.target.value)
                              }
                            />
                          ) : (
                            item.Remark
                          )}
                        </td>



                        <td>
                          {editingRows[item.id] ? (
                            <>
                              <button onClick={() => handleSaveClick(item.id)}>
                                Save
                              </button>
                              <button onClick={() => handleCancelClick(item.id)}>
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() => handleEditClick(item.id)}
                                style={{ cursor: "pointer", marginRight: "10px" }}
                              />
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={() => handleDeleteClick(item.id)}
                                style={{ cursor: "pointer" }}
                              />
                            </>
                          )}
                        </td>


                      </tr>
                    ))}
                  </tbody>
                </table>
              </div> 



            :<div className='schedule-container'>
            <table className="data-table">
              <thead>
                <tr>
                  <th>अनुक्रमांक</th>
                  <th>छाटणीच्या दुसर् या दिवशी</th>
                  <th>तारीख</th>
                  <th> औषधाचे नाव  </th>
                  <th>२०० ली पाण्यासाठी प्रमाण</th>
                  <th>खतांची नावे [एकरी खतांचे प्रमाण]</th>
                  {/* <th>Fertilizer quantity per acre</th> */}
                  <th>टिप्पणी</th>
                  <th>Action</th>

                </tr>
              </thead>
              <tbody>
                {maratiData && dataToMap.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {editingRows[item.id] ? (
                        <textarea className="textarea"
                          type="text"
                          value={editedData[item.id]?.srno || item.srno}
                          onChange={(e) =>
                            handleInputChange(item.id, "srno", e.target.value)
                          }
                        />
                      ) : (
                        item.srno
                      )}
                    </td>
                    <td>
                      {editingRows[item.id] ? (
                        <textarea className="textarea"
                          type="text"
                          value={
                            editedData[item.id]?.thedayapurif || item.thedayapurif
                          }
                          onChange={(e) =>
                            handleInputChange(
                              item.id,
                              "thedayapurif",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        item.thedayapurif
                      )}
                    </td>
                    <td>
                      {editingRows[item.id] ? (
                        <textarea className="textarea"
                          type="text"
                          value={editedData[item.id]?.date || item.date}
                          onChange={(e) =>
                            handleInputChange(item.id, "date", e.target.value)
                          }
                        />
                      ) : (
                        item.date
                      )}
                    </td>

                    <td>
                      {editingRows[item.id] ? (
                        <textarea className="textarea"
                          type="text"
                          value={editedData[item.id]?.nameofdrug || item.nameofdrug}
                          onChange={(e) =>
                            handleInputChange(item.id, "nameofdrug", e.target.value)
                          }
                        />
                      ) : (
                        item.nameofdrug
                      )}
                    </td>
                    <td>
                      {editingRows[item.id] ? (
                        <textarea className="textarea"
                          type="text"
                          value={
                            editedData[item.id]?.drugdosesr || item.drugdosesr
                          }
                          onChange={(e) =>
                            handleInputChange(
                              item.id,
                              "drugdosesr",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        item.drugdosesr
                      )}
                    </td>
                    <td>
                      {editingRows[item.id] ? (
                        <textarea className="textarea"
                          type="text"
                          value={
                            editedData[item.id]?.Nameoffer || item.Nameoffer
                          }
                          onChange={(e) =>
                            handleInputChange(
                              item.id,
                              "Nameoffer",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        item.Nameoffer
                      )}
                    </td>

                    <td>
                      {editingRows[item.id] ? (
                        <textarea className="textarea"
                          type="text"
                          value={editedData[item.id]?.Remark || item.Remark}
                          onChange={(e) =>
                            handleInputChange(item.id, "Remark", e.target.value)
                          }
                        />
                      ) : (
                        item.Remark
                      )}
                    </td>

                    {isEditMode ? (
                      <td>
                        {editingRows[item.id] ? (
                          <>
                            <button onClick={() => handleSaveClick(item.id)}>
                              Save
                            </button>
                            <button onClick={() => handleCancelClick(item.id)}>
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon
                              icon={faEdit}
                              onClick={() => handleEditClick(item.id)}
                              style={{ cursor: "pointer", marginRight: "10px" }}
                            />
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={() => handleDeleteClick(item.id)}
                              style={{ cursor: "pointer" }}
                            />
                          </>
                        )}
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            
                
            
          
        )}
        {
          selectedTab === 'Report' && (
            <div className='Report'>
              <Report reportPlotid={plotIdFromFetchApi} />
            </div>
          )
        }
        {selectedTab === 'History' && (
          <div className="schedule-container">

            <table className="data-table">
              <thead>
                <tr>
                  <th>SR.No</th>
                  <th>Year</th>

                  <th>Tonnage</th>
                  <th>Avarage Size</th>
                  <th>Export/Domestic</th>


                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>

                </tr>
                <tr>
                  <td>2</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>

                </tr>
                <tr>
                  <td>3</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>

                </tr>
              </tbody>
            </table>
          </div>
        )}
        {selectedTab === "Field Data" && (
          <div className='speedometer'>
            <Speedometer SerialNumberFromPlotClick={SerialNumberFromPlotClick} userIdforImages={userIdFromSidemenu}
            newplotIdforImages={plotIdforAll}/>
            
          </div>
          
        )}
        {/* {selectedTab === "Field Data" && (
          // <RecentImages
            serialNumber={SerialNumberFromPlotClick}
            userId1={userIdFromSidemenu}
            newplotId={plotIdFromFetchApi}
          />
        )} */}
        {selectedTab === 'Weather' &&

          <Weather />

        }

      </div>
    </div>
  );
};

export default FarmarDetails;