import axios from "axios";

// To Fetch User's For Consultant
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

// To Fetch Plot Details/UserDetails for UserId

const PlotDetailsForUserId = async (id) => {
  // const id = "6ff86cb3-d4dc-44c9-9d06-78d313c0222f";
  let data = {
    userId: id,
  };
  const API =
    "https://iotr2zasp6.execute-api.us-east-1.amazonaws.com/default/FetchPlotDetails/plotdetails";

  try {
    const response = await axios.post(API, data);
    return response;
  } catch (error) {
    console.error("error fetching users by ServiceApiForUser", error);
  }
};
export default { UsersForConsultant };
