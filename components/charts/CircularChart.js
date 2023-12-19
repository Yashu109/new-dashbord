// import React from 'react'
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   HomeIcon,
//   InboxIcon,
//   MailIcon,
//   makeStyles,
//   DashboardOutlinedIcon,
//   SmsOutlinedIcon,
//   MarkChatUnreadOutlinedIcon,
//   SettingsOutlinedIcon,
//   GroupAddOutlinedIcon,
//   HelpCenterIcon,
// } from '../modules/Module.jsx';
// import { Typography } from '@mui/material';
// import Bodymenu from '../bodymenu/Bodymenu.jsx'


// const useStyles = makeStyles(() => ({
//   drawer: {
//     display: 'flex',
//     // justifyContent:'center',
//     width: '15%',
//     marginTop: '8rem'
//     // position:'relative',
//     // marginTop:'10%',
//   },
//   listItem: {
//     // color:'blue',
//     // backgroundColor:'blue',
//     // fontSize:'50px'
//     display: 'flex',

//   },
// }));

// function Sidebar() {

//   const classes = useStyles();
//   const root = useStyles();
//   // const {drawer,listItem} =useStyles()
//   // const data =()=>({a:1})
//   // console.log(data(),'sss')

//   return (
//     <>
//       <div className='sidebar'>
//         <Drawer
//           variant="permanent"
//           classes={{ paper: classes.drawer }}
//           open={true}
//           // ModalProps={{
//           //   keepMounted: false,
//           // }}
//           anchor="left"
//         >
//           <List >

//             <ListItem button classes={{ paper: root.listItem }}>
//               <ListItemIcon>
//                 {/* <HomeIcon /> */}
//                 <DashboardOutlinedIcon />
//               </ListItemIcon>
//               Dashboard
//             </ListItem>
//             <ListItem button>
//               <ListItemIcon>
//                 {/* <InboxIcon /> */}
//                 <SmsOutlinedIcon />
//               </ListItemIcon>
//               Message
//             </ListItem>
//             <ListItem button>
//               <ListItemIcon>
//                 {/* <MailIcon /> */}
//                 <MarkChatUnreadOutlinedIcon />
//               </ListItemIcon>
//               Notification
//             </ListItem>
//             <ListItem button>
//               <ListItemIcon>
//                 {/* <MailIcon /> */}
//                 <SettingsOutlinedIcon />
//               </ListItemIcon>
//               Settings
//             </ListItem>
//             <ListItem button>
//               <ListItemIcon>
//                 {/* <MailIcon /> */}
//                 <GroupAddOutlinedIcon />
//               </ListItemIcon>
//               Accounts
//             </ListItem>
//             <ListItem button>
//               <ListItemIcon>
//                 {/* <MailIcon /> */}
//                 <HelpCenterIcon />
//               </ListItemIcon>
//               Support
//             </ListItem>
//           </List>
//         </Drawer>
//         {/* <Typography>
//           <Bodymenu/>
//         </Typography> */}
//       </div>

//     </>
//   )
// }
// export default Sidebar;


// import * as React from 'react';
// import { PieChart } from '@mui/x-charts/PieChart';
// import { useDrawingArea } from '@mui/x-charts/hooks';
// import { styled } from '@mui/material/styles';

// const data = [
//   { value: 5, label: 'A' },
//   { value: 10, label: 'B' },
//   { value: 15, label: 'C' },
//   { value: 20, label: 'D' },
// ];

// const size = {
//   width: 400,
//   height: 200,
// };

// const StyledText = styled('text')(({ theme }) => ({
//   fill: theme.palette.text.primary,
//   textAnchor: 'middle',
//   dominantBaseline: 'central',
//   fontSize: 20,
// }));

// function CircularChart({ children }) {
//   const { width, height, left, top } = useDrawingArea();
//   return (
//     <StyledText x={left + width / 2} y={top + height / 2}>
//       {children}
//     </StyledText>
//   );
// }

// export default CircularChart
// //   return (
// //     <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
// //       <PieCenterLabel>Center label</PieCenterLabel>
// //     </PieChart>
// //   );
// // }\

// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import {
//     KeyboardArrowDownIcon,
//     SearchIcon,
// } from '../modules/Module'
// import './MainHeader.css'
// export default function ButtonAppBar() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <div className='header'>
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
//     </Box>
//   );
// }