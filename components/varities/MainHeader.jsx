// import React from 'react'
// import Image from "../../assets/Logo.png"
// import './MainHeader.css'
// import {
//     KeyboardArrowDownIcon,
//     SearchIcon,
// } from '../modules/Module'
// function MainHeader() {
//     return (
//         <div>
//             <div className='header'>
//                 <div className='Mainheadercontent'>
//                     <img className='Logo-image' src={Image} alt='Logo'></img>
//                     <div className="logo-main">
//                         <span name="digi">DIGI</span>
//                         <span name="crop">CROP</span>
//                     </div>
//                     <div className='search-full'>
//                         <div className='SearchIcon'>
//                             <SearchIcon />
//                         </div>
//                         <div>
//                             <input
//                                 className='search'
//                                 type='text'
//                                 text-align='center'
//                                 placeholder='Search user or plot'>
//                                 {/* <SearchIcon /> */}

//                             </input>
//                         </div>

//                     </div>
//                     <div className='username'>
//                         username
//                         <KeyboardArrowDownIcon />
//                     </div>
//                 </div>
//                 <div className='viewbycatogeries'>
//                     <select className='dropdown'>
//                         <option>
//                             View By Categories
//                         </option>
//                     </select>
//                 </div>

//             </div>
//         </div>
//     )
// }
// export default MainHeader;

//import * as React from "react";
//import AppBar from "@mui/material/AppBar";
//import Box from "@mui/material/Box";
//import Toolbar from "@mui/material/Toolbar";
//import Typography from "@mui/material/Typography";
//import Button from "@mui/material/Button";
//import IconButton from "@mui/material/IconButton";
//import MenuIcon from "@mui/icons-material/Menu";
//import { KeyboardArrowDownIcon, SearchIcon } from "../modules/Module";
//import "./MainHeader.css";

//export default function ButtonAppBar() {
//  return (
//    <Box sx={{ flexGrow: 1 }}>
//      <AppBar position="static">
//        <Toolbar>
//          {/* <IconButton
//            size="large"
//            edge="start"
//            // color="inherit"
//            aria-label="menu"
//            sx={{ mr: 2 }}
//          >
//            <MenuIcon />
//          </IconButton> */}

//          <div className="header">
//            <div className="Mainheadercontent">
//              <img className="Logo-image" src={Image} alt="Logo"></img>
//              <div className="logo-main">
//                <span name="digi">DIGI</span>
//                <span name="crop">CROP</span>
//              </div>
//              <div className="search-full">
//                <div className="SearchIcon">
//                  <SearchIcon />
//                </div>
//                <div>
//                  <input
//                    className="search"
//                    type="text"
//                    text-align="center"
//                    placeholder="Search user or plot"
//                  >
//                    {/* <SearchIcon /> */}
//                  </input>
//                </div>
//              </div>
//              <div className="username">
//                username
//                <KeyboardArrowDownIcon />
//              </div>
//            </div>
//            <div className="viewbycatogeries">
//              <select className="dropdown">
//                <option>View By Categories</option>
//              </select>
//            </div>
//          </div>
//          {/* <Button color="inherit">Login</Button> */}
//        </Toolbar>
//      </AppBar>
//    </Box>
//  );
//}
//import React, { useState } from "react";
import React, { useState, useEffect } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { KeyboardArrowDownIcon, SearchIcon } from "../modules/Module";
import "./MainHeader.css";
//import ApiComponent from "./ApiComponent";
export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [vegetableMenuAnchorEl, setVegetableMenuAnchorEl] = useState(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
  const [vegetableData, setVegetableData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryData, setCategoryData] = useState([]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleVegetableClick = (vegetable) => {
    // Add your logic to handle the click for the individual vegetable item
    console.log(`Clicked on ${vegetable}`);
    // You can perform any additional actions here
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    //setSelectedCategory(null);
  };

  const handleVegetableMenuOpen = async (event) => {
    setVegetableMenuAnchorEl(event.currentTarget);

    // Fetch data when "Vegetable" is clicked
    try {
      const response = await fetch(
        "https://qk8xhbdx25.execute-api.us-east-1.amazonaws.com/default/category"
      );
      const data = await response.json();

      // Check if data is an array and has the filter method
      if (Array.isArray(data.data) && data.data.length > 0) {
        // Extract only the vegetable data
        const vegetableData =
          data.data[0].Categories.find((category) =>
            category.hasOwnProperty("Vegetables")
          )?.Vegetables || [];

        setVegetableData(vegetableData);
      } else {
        console.error("Invalid data structure:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleVegetableMenuClose = () => {
    setVegetableMenuAnchorEl(null);
    setVegetableData([]); // Clear vegetable data when the menu is closed
  };
  const [fruitMenuAnchorEl, setFruitMenuAnchorEl] = useState(null);
  const [fruitData, setFruitData] = useState([]);

  const handleFruitMenuOpen = async (event) => {
    setFruitMenuAnchorEl(event.currentTarget);

    // Fetch data when "Fruit" is clicked
    try {
      const response = await fetch(
        "https://qk8xhbdx25.execute-api.us-east-1.amazonaws.com/default/category"
      );
      const data = await response.json();

      // Check if data is an array and has the filter method
      if (Array.isArray(data.data) && data.data.length > 0) {
        // Extract only the fruit data
        const fruitData =
          data.data[0].Categories.find((category) =>
            category.hasOwnProperty("Fruits")
          )?.Fruits || [];

        setFruitData(fruitData);
      } else {
        console.error("Invalid data structure:", data);
      }
    } catch (error) {
      console.error("Error fetching fruit data:", error);
    }
  };

  const handleFruitMenuClose = () => {
    setFruitMenuAnchorEl(null);
    setFruitData([]); // Clear fruit data when the menu is closed
  };

  const handleSubMenuOpen = (event) => {
    setSubMenuAnchorEl(event.currentTarget);
  };

  const handleSubMenuClose = () => {
    setSubMenuAnchorEl(null);
  };
  const [greenLeavesMenuAnchorEl, setGreenLeavesMenuAnchorEl] = useState(null);
  const [greenLeavesData, setGreenLeavesData] = useState([]);

  const handleGreenLeavesMenuOpen = async (event) => {
    setGreenLeavesMenuAnchorEl(event.currentTarget);

    // Fetch data when "Green Leaves" is clicked
    try {
      const response = await fetch(
        "https://qk8xhbdx25.execute-api.us-east-1.amazonaws.com/default/category"
      );
      const data = await response.json();

      // Check if data is an array and has the filter method
      if (Array.isArray(data.data) && data.data.length > 0) {
        // Extract only the Green Leaves data
        const greenLeavesData =
          data.data[0].Categories.find((category) =>
            category.hasOwnProperty("Green Leaves")
          )?.["Green Leaves"] || [];

        setGreenLeavesData(greenLeavesData);
      } else {
        console.error("Invalid data structure:", data);
      }
    } catch (error) {
      console.error("Error fetching Green Leaves data:", error);
    }
  };

  const handleGreenLeavesMenuClose = () => {
    setGreenLeavesMenuAnchorEl(null);
    setGreenLeavesData([]); // Clear Green Leaves data when the menu is closed
  };
  const [farmerMenuAnchorEl, setFarmerMenuAnchorEl] = useState(null);
  const [farmerData, setFarmerData] = useState([]);

  const handleFarmerMenuOpen = async (event) => {
    setFarmerMenuAnchorEl(event.currentTarget);

    // Fetch data when "Farmer" is clicked
    try {
      const response = await fetch(
        "https://qk8xhbdx25.execute-api.us-east-1.amazonaws.com/default/category"
      );
      const data = await response.json();

      // Check if data is an array and has the filter method
      if (Array.isArray(data.data) && data.data.length > 0) {
        // Extract only the Farmer data
        const farmerData =
          data.data[0].Categories.find((category) =>
            category.hasOwnProperty("Farmer")
          )?.Farmer || [];

        setFarmerData(farmerData);
      } else {
        console.error("Invalid data structure:", data);
      }
    } catch (error) {
      console.error("Error fetching Farmer data:", error);
    }
  };

  const handleFarmerMenuClose = () => {
    setFarmerMenuAnchorEl(null);
    setFarmerData([]);
  };
  const [locationMenuAnchorEl, setLocationMenuAnchorEl] = useState(null);
  const [locationData, setLocationData] = useState([]);

  const handleLocationMenuOpen = async (event) => {
    setLocationMenuAnchorEl(event.currentTarget);

    // Fetch data when "Location" is clicked
    try {
      const response = await fetch(
        "https://qk8xhbdx25.execute-api.us-east-1.amazonaws.com/default/category"
      );
      const data = await response.json();

      // Check if data is an array and has the filter method
      if (Array.isArray(data.data) && data.data.length > 0) {
        // Extract only the Location data
        const locationData =
          data.data[0].Categories.find((category) =>
            category.hasOwnProperty("Location")
          )?.Location || [];

        setLocationData(locationData);
      } else {
        console.error("Invalid data structure:", data);
      }
    } catch (error) {
      console.error("Error fetching Location data:", error);
    }
  };

  const handleLocationMenuClose = () => {
    setLocationMenuAnchorEl(null);
    setLocationData([]);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/*<AppBar position="static">*/}
      {/*<Toolbar>
          <div className="header">
            <div className="Mainheadercontent">
              <img className="Logo-image" src={Image} alt="Logo"></img>
            </div>*/}

      <Typography
        className="viewbycatogeries"
        onClick={handleMenuOpen}
        aria-controls="categories-menu"
        aria-haspopup="true"
      >
        View By Categories
        <KeyboardArrowDownIcon />
      </Typography>

      <Menu
        id="categories-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            width: "200px",
            height: "200px",
            backgroundColor: "black",
          },
        }}
      >
        <MenuItem style={{ color: "white" }} onClick={handleVegetableMenuOpen}>
          Vegetable
        </MenuItem>
        <MenuItem
          style={{ color: "white" }}
          onClick={handleFruitMenuOpen}
          //onClick={handleVegetableMenuOpen}
        >
          Fruit
        </MenuItem>
        {/*<MenuItem style={{ color: "white" }}>Fruit</MenuItem>*/}
        <MenuItem
          style={{ color: "white" }}
          onClick={handleGreenLeavesMenuOpen}
        >
          Green Leaves
        </MenuItem>
        <MenuItem style={{ color: "white" }} onClick={handleFarmerMenuOpen}>
          Farmer
        </MenuItem>
        <MenuItem style={{ color: "white" }} onClick={handleLocationMenuOpen}>
          Location
        </MenuItem>
      </Menu>
      <Menu
        id="vegetable-menu"
        anchorEl={vegetableMenuAnchorEl}
        open={Boolean(vegetableMenuAnchorEl)}
        onClose={handleVegetableMenuClose}
        PaperProps={{
          style: {
            width: "200px",
            height: "200px",
            backgroundColor: "lightgray",
            marginLeft: "200px",
            marginTop: "-44px",
          },
        }}
      >
        {vegetableData.map((vegetable) => (
          <MenuItem
            key={vegetable}
            style={{ color: "black" }}
            onClick={() => handleVegetableClick(vegetable)}
          >
            {vegetable}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        id="fruit-menu"
        anchorEl={fruitMenuAnchorEl}
        open={Boolean(fruitMenuAnchorEl)}
        onClose={handleFruitMenuClose}
        PaperProps={{
          style: {
            width: "200px",
            height: "200px",
            backgroundColor: "lightgray",
            marginLeft: "200px",
            marginTop: "-80px",
          },
        }}
      >
        {fruitData.map((fruit) => (
          <MenuItem
            key={fruit}
            style={{ color: "black" }}
            onClick={() => handleFruitMenuOpen(fruit)}
          >
            {fruit}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        id="green-leaves-menu"
        anchorEl={greenLeavesMenuAnchorEl}
        open={Boolean(greenLeavesMenuAnchorEl)}
        onClose={handleGreenLeavesMenuClose}
        PaperProps={{
          style: {
            width: "200px",
            height: "200px",
            backgroundColor: "lightgray",
            marginLeft: "200px",
            marginTop: "-114px",
          },
        }}
      >
        {greenLeavesData.map((item) => (
          <MenuItem
            key={item}
            style={{ color: "black" }}
            onClick={() => handleGreenLeavesMenuOpen(item)}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        id="farmer-menu"
        anchorEl={farmerMenuAnchorEl}
        open={Boolean(farmerMenuAnchorEl)}
        onClose={handleFarmerMenuClose}
        PaperProps={{
          style: {
            width: "200px",
            height: "200px",
            backgroundColor: "lightgray",
            marginLeft: "200px",
            marginTop: "-150px",
          },
        }}
      >
        {farmerData.map((item) => (
          <MenuItem
            key={item}
            style={{ color: "black" }}
            onClick={() => handleFarmerMenuOpen(item)}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        id="location-menu"
        anchorEl={locationMenuAnchorEl}
        open={Boolean(locationMenuAnchorEl)}
        onClose={handleLocationMenuClose}
        PaperProps={{
          style: {
            width: "200px",
            height: "200px",
            backgroundColor: "lightgray",
            marginLeft: "200px",
            marginTop: "-186px",
          },
        }}
      >
        {locationData.map((item) => (
          <MenuItem
            key={item}
            style={{ color: "black" }}
            onClick={() => handleLocationMenuOpen(item)}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>

      <Menu
        id="submenu"
        anchorEl={subMenuAnchorEl}
        open={Boolean(subMenuAnchorEl)}
        onClose={handleSubMenuClose}
        className="submenu"
        PaperProps={{
          style: {
            width: "200px",
            height: "200px",
            backgroundColor: "white",
            marginLeft: "201px",
            marginTop: "-44px",
          },
        }}
      ></Menu>
      {/*</div>*/}
      {/*</Toolbar>*/}
      {/*</AppBar>*/}
    </Box>
  );
}
