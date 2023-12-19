import React, { useState } from 'react'
import Image from "../../assets/Logo.png"
import {
  SearchIcon,
  KeyboardArrowDownIcon,
  MainHeader
} from '../modules/Module'
import { FaUserCircle } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { AiOutlineSearch } from 'react-icons/ai';
// import { Tab, Tabs } from 'react-bootstrap';
import './Header.css'
import Tabs from '../header/Tabs'
// import { ButtonToolbar } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Nav, NavItem, NavDropdown } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
function Header(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
Header.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>

      <div className=''>
        <div className='main-header'>

          <div className='Logo-main'>

            <img className='Logo-image' src={Image} alt='Logo'></img>
            <div className='digi-crop'>
              <span name="digi">DIGI</span>
              <span name="crop">CROP</span>
            </div>

          </div>

          {/* <AiOutlineSearch /> */}
          <div className='searchicon'>
          <IoSearchSharp />

          </div>
          <input
            className='search'
            type='text'
            text-align='center'
            placeholder='Search user or plot'
          />
          <div className='username-tab'>
            <div>
            <FaUserCircle />
            </div>

            <span name='username'>username</span>
            <KeyboardArrowDownIcon />
          </div>

        </div>
        <div>
<MainHeader />
      
          {/* <NavDropdown title="Dropdown" id="nav-dropdown">
            <NavDropdown.Item eventkey="4.1">Action</NavDropdown.Item>
            <NavDropdown.Item eventkey="4.2">Another action</NavDropdown.Item>
            <NavDropdown.Item eventkey="4.3">Something else here</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventkey="4.4">Separated link</NavDropdown.Item>
          </NavDropdown>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box> */}
        </div>
      </div>

    </>
  )
}
// export default Header;
