import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
//import { useMyContext } from "../myContext/MyContext";

const Soptable = ({ userId }) => {
  const [editingRows, setEditingRows] = useState({});
  const [editedData, setEditedData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [allData, setAllData] = useState([]);
  const [showCreateRow, setShowCreateRow] = useState(false);
  const [selectedOption, setSelectedOption] = useState('option1');
  const [plotData, setPlotData] = useState([])
  const [plotName, setPlotName] = useState('')
  const [cropName, setCropName] = useState('')
  const [plotId, setPlotId] = useState('')
  const [sopDate, setSopDate] = useState('')
  const [sopPlot, setSopPlot] = useState('')
  const [filteredData, setFilteredData] = useState(allData);
  const [cropCycle, setCropCycle] = useState('');

  //const { fetchPlotLocation } = useMyContext();

  useEffect(() => {
    // console.log(apiData.body[0].data,'apidata')
    fetchData();
    // setAllData(apiData.body[0].data);
  }, [userId]);

  const handleEditClick = (id) => {
    setEditingRows((prevEditingRows) => ({
      ...prevEditingRows,
      [id]: true,
    }));
  };

  const handleSaveClick = (id) => {
    // Prepare the updated data with both edited and non-edited rows
    const updatedData = allData.map((item) => {
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

    console.log("Updated Data:", updatedData);
    const userId1 = localStorage.getItem("sopuserID")
    const input = {
      userId: userId1,
      PlotId: plotId,
      data: updatedData,
    };

    axios
      .post(
        "https://oe9lrm4u3m.execute-api.us-east-1.amazonaws.com/default/SaveSOPDetails",
        input
      )
      .then((response) => {
        console.log("API Response:", updatedData);
        // Update the allData state with the updated data
        setAllData(updatedData);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });

    // Exit the editing mode for all rows
    setEditingRows({});
    setIsEditMode(false);
  };

  const fetchData = async (plotid) => {
    const retriveResponse = [];
    const userId1 = localStorage.getItem("sopuserID")
    try {
      const API =
        "https://zgiphmcemb.execute-api.us-east-1.amazonaws.com/default/RetrieveSOP/sop";
      const response = await axios.post(API, {
        userId: userId1,
        // cropType:"Grapes",
        PlotId: plotid ? plotid : plotId,
        // day: "Day 10",
      });
      // retriveResponse.push(response.data)
      // setApiData(response.data);
      console.log(response.data.body[0].data, "responsedata");
      setAllData(response.data.body[0].data);
      // setIsLoading(false); // Set loading state to false when data is received
    } catch (error) {
      console.error("API Error:", error);
      // setIsLoading(false); // Set loading state to false in case of error
    }
  };
  const handlePlotFetch = (value) => {
    let val = value.split(",");
    fetchData(val[0])
    setSopPlot(val[0])
    setPlotName(val[1])
    setCropName(val[2])
    setSopDate(val[3])
    console.log(value, 'plotid')
  }
  const handleInputChange = (id, column, value) => {
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [id]: {
        ...prevEditedData[id],
        [column]: value,
      },
    }));
  };

  const handleCreateRow = () => {
    setShowCreateRow(true);
  };
  const handleCreateClick = () => {
    setShowCreateRow(true);
  };

 

  const saveRowToBackend = (newRow) => {
    // Replace this URL with your actual API endpoint for creating rows
    const apiEndpoint =
      "https://oe9lrm4u3m.execute-api.us-east-1.amazonaws.com/default/SaveSOPDetails";

    // Send a POST request to create the new row
    axios
      .post(apiEndpoint, newRow)
      .then((response) => {
        console.log("API Response for creating row:", response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  
  const updateDataToBackend = (updatedData) => {
    const userId1 = localStorage.getItem("sopuserID")
    // Prepare the request payload
    const input = {
      userId: userId1,
      PlotId: plotId,
      data: updatedData,
    };

    // Send the updated data to your backend API for storage
    axios
      .post(
        "https://oe9lrm4u3m.execute-api.us-east-1.amazonaws.com/default/SaveSOPDetails",
        input
      )
      .then((response) => {
        console.log("API Response for updating data:", response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  const generateUniqueId = () => {
    // Generate a unique ID for the new row (you can use a library or custom logic)
    // For simplicity, you can use a timestamp as an ID
    return Date.now().toString();
  };

 
  const handleModifyClick = () => {
    setIsEditMode(!isEditMode); // Toggle edit mode when "Modify" button is clicked
  };


  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  }


  const handleAssignClick = async () => {
    const userId1 = localStorage.getItem("sopuserID")
    const API =
      "https://iotr2zasp6.execute-api.us-east-1.amazonaws.com/default/FetchPlotDetails/plotdetails";
    try {
      const response = await axios.post(API, {
        userId: userId1,
      });
      console.log("fffff", response.data.body);
      let plotData = response.data.body;
      setPlotData(plotData);
      console.log("userData", plotData);
    } catch (error) {
      console.error("error from  db", error);

    }
  };

  const handleCancelClick = (id) => {
    setEditingRows((prevEditingRows) => ({
      ...prevEditingRows,
      [id]: false,
    }));
  };

  const handleDeleteClick = (id) => {
    // Remove the row from the allData state

    const deletedData = allData.filter((item) => item.id !== id);
    const userId1 = localStorage.getItem("sopuserID")
    const input = {
      userId: userId1,
      PlotId: plotId,
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


  const handleCropCycleChange = (event) => {


    setCropCycle(event.target.value);
    console.log("cropcycle", cropCycle)


  };


  const handleSearchClick = () => {
    const cropCycleValue = parseInt(cropCycle);

    if (!cropCycleValue) {
      // If cropCycle is empty or not a valid number, set filtered data to allData
      setFilteredData(allData);
    } else {
      const filtered = allData.filter((item) => {
        if (typeof item.thedayapurif === 'string') {
          const matchResult = item.thedayapurif.match(/\d+/);
          if (matchResult && matchResult.length > 0) {
            const dayNumber = parseInt(matchResult[0]);
            return dayNumber <= cropCycleValue;
          }
        }
        return false;
      });

      setFilteredData(filtered);
    }
  };
  const dataToMap = filteredData.length > 0 ? filteredData : allData;


  console.log('Crop Cycle Value:', filteredData);
  // ... (other functions remain the same)

  return (
    <div className="main-sop">
      <div className="api-data-container">
        <div className="CMAD">
          
          <button className="Modify" onClick={handleModifyClick}>
            Modify
          </button>
          

          <select
          className="Assign"
          onClick={handleAssignClick}
            onChange={(e) => {
              handlePlotFetch(e.target.value);
            }}
           
          >
            <option
           
            >Assign</option>
            {plotData
              .map((itm, index) => (
                <option value={[itm.PlotId, itm.Name, itm.CropType, itm.Date]} key={itm.index}>
                  {itm.Name}
                </option>
              ))}
          </select>
        </div>
        <div className="sop-varients">
          
          <p>Crop:{cropName}</p>
          <p>Variety:</p>
          <p className="cropcycle">Crop Cycle:
            <div className="search-bar">
              <input

                type="text"
                placeholder="Enter Day"
                value={cropCycle}
                onChange={handleCropCycleChange}
              />
              <button onClick={handleSearchClick}>
                Search
              </button>
            </div>
          </p>
        </div>
        <table className="sop-table">
          <thead>
            <tr>
              <th>SR.No</th>
              <th>The day after pruning</th>
              <th>Date</th>
              <th>Name of Drug</th>
              <th>Drug dosage per liter / acre</th>
              <th>Names of fertilizers</th>
              <th>Fertilizer quantity per acre</th>
              <th>Remark/Activity</th>
              {/*<th>Action</th>*/}
              <th>{isEditMode ? "Action" : ""}</th>
            </tr>
          </thead>
          <tbody>
            
            
            {allData && dataToMap.map((item) => (
              <tr key={item.id}>
                <td>
                  {editingRows[item.id] ? (
                    <input
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
                    <input
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
                    <input
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
                    <input
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
                    <input
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
                    <input
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
                    <input
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
                    <input
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
    </div>
  );
};

export default Soptable;
