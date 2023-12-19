import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SideMenu.css";
import {
  FaUserCircle,
}from '../modules/Module'
const SideMenu = ({ onUserClick }) => {
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState(4);
  const [selectedUserName, setSelectedUserName] = useState(null);

  const getAllUsersDetails = async () => {
    try {
      const API =
        "https://69bdva1sj0.execute-api.us-east-1.amazonaws.com/default/allUserDetails";
      const res = await axios.post(API);
      const resData = res.data.body;
      setUsers(resData);
      console.log("Users Details:", resData);
    } catch (error) {
      console.error("Error fetching all user details", error);
    }
  };

  useEffect(() => {
    getAllUsersDetails();
  }, []);

  const handleViewMore = () => {
    setDisplayedUsers(displayedUsers + 5);
  };

  const handleUserClick = (user) => {
    // Call the parent component callback when a user is clicked
    onUserClick(user);

    // Set the selected user's name to display below userIcon
    setSelectedUserName(
      user.attributes.find((attr) => attr.Name === "given_name")?.Value
    );
    console.log("Selected User:", user);
  };
  useEffect(() => {
    // Select the default first user when the component mounts
    if (users.length > 0) {
      handleUserClick(users[0]);
    }
  }, [users]);

  return (
    <div className="container">
      <div className="sideMenu">
        <div className="userIcon">
        <FaUserCircle style={{width:"100%",height:"60px"}}/>
        </div>
        <div className="userName">
          {selectedUserName && <p> {selectedUserName}</p>}
        </div>
        <button className="messageButton">Message</button>
      </div>

      <div className="registeredUsers">
        <h2>Registered Users</h2>
        <ul style={{cursor:'pointer'}}>
          {users.slice(0, displayedUsers).map((user) => (
            <li key={user.username} onClick={() => handleUserClick(user)}>
              <p>
                {/* Name:{" "} */}
                {
                  user.attributes.find((attr) => attr.Name === "given_name")
                    ?.Value
                }
              </p>
              {/*<p>id: {user.username}</p>*/}
              {/* <p>id: {user.username.substring(0, 8)}</p> */}
            </li>
          ))}
        </ul>
      </div>

      {displayedUsers < users.length && (
        <div className="viewMore">
          <button onClick={handleViewMore}>View More</button>
        </div>
      )}
    </div>
  );
};

export default SideMenu;
