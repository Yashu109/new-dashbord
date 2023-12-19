import React, { useState } from 'react';
import './Sidebar.css';
import {
  DashboardOutlinedIcon,
  SmsOutlinedIcon,
  MarkChatUnreadOutlinedIcon,
  SettingsOutlinedIcon,
  GroupAddOutlinedIcon,
  HelpCenterIcon,
} from '../modules/Module';
import Home from '../home/Home';

function Sidebar() {
  const [dashboard, setDashboard] = useState(false);

  const dashboardClick = () => {
    // Toggle the dashboard state
    setDashboard(prevDashboard => !prevDashboard);
  };

  return (
    <>
      <div className='sidebar'>
        <div className='DashboardOutlinedIcon'>
          <DashboardOutlinedIcon />
          <p onClick={dashboardClick}>Dashboard</p>
          {dashboard }
        </div>
        <div className='SmsOutlinedIcon'>
          <SmsOutlinedIcon />
          <p>Message</p>
        </div>
        <div className='MarkChatUnreadOutlinedIcon'>
          <MarkChatUnreadOutlinedIcon />
          <p>Notification</p>
        </div>
        <div className='SettingsOutlinedIcon'>
          <SettingsOutlinedIcon />
          <p> Settings</p>
        </div>
        <div className='GroupAddOutlinedIcon'>
          <GroupAddOutlinedIcon />
          <p> Accounts</p>
        </div>
        <div className='HelpCenterIcon'>
          <HelpCenterIcon />
          <p> Support</p>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
