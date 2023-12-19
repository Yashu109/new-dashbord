import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Nav, NavItem, NavDropdown } from 'react-bootstrap';
import {
  Home,
  FarmerDetail,
  comingsoon,
} from '../modules/Module'

function CustomTabPanel(props) {
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

CustomTabPanel.propTypes = {
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

  const handleViewDetailsClick = () => {
    setValue(5);
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box id="boxes" sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center',width:'100%' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Home" {...a11yProps(0)} style={{ textTransform: 'capitalize', fontWeight: 'bold' }} />
          <Tab label="Fruit" {...a11yProps(1)} style={{ textTransform: 'capitalize', fontWeight: 'bold' }} />
          <Tab label="Vegitable" {...a11yProps(2)} style={{ textTransform: 'capitalize', fontWeight: 'bold' }} />
          <Tab label="Leaf green" {...a11yProps(3)} style={{ textTransform: 'capitalize', fontWeight: 'bold' }} />
          <Tab label="Location" {...a11yProps(4)} style={{ textTransform: 'capitalize', fontWeight: 'bold' }} />
          <Tab label="Farmer" {...a11yProps(5)} style={{ textTransform: 'capitalize', fontWeight: 'bold' }} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Home onVeiwDetailsClick={handleViewDetailsClick} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
        <img src={comingsoon} style={{width:"100px"}}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item Four
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Item Five  
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <FarmerDetail />
      </CustomTabPanel>
    </Box>
  );
}