import Header from '../header/Header'
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Tabs from '../header/Tabs'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import { FaTractor } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios'
import UsersForConsultant from '../apiservices/ApiServices.jsx'
import Farmer from '../Farmer/Farmer.jsx';
import Home from '../home/Home.jsx';
import FarmerDetail from '../farmer/FarmarDetail.jsx'
import MainHeader from '../varities/MainHeader.jsx'
import Sidebar from '../sidemenu/Sidebar.jsx';
import { FaUserCircle } from "react-icons/fa";
// import RecentImages from "../farmer/RecentImages";
import Newlinechart from '../newchart/Newlinechart'
import comingsoon from '../../assets/ComingSoon.png'
export {
    Header,
    Tabs,

    //Icons
    SearchIcon,
    KeyboardArrowDownIcon,
    ListItemIcon,
    HomeIcon,
    InboxIcon,
    MailIcon,
    FaTractor,
    FaUserCircle,
    FaMapLocationDot,
    DashboardOutlinedIcon,
    SmsOutlinedIcon,
    MarkChatUnreadOutlinedIcon,
    SettingsOutlinedIcon,
    GroupAddOutlinedIcon,
    HelpCenterIcon,
    comingsoon,

    axios,
    //api services

    UsersForConsultant,

    //tabs
    Farmer,
    Home,
    FarmerDetail,
    MainHeader,
    Sidebar,
    // RecentImages,
    // Newlinechart,
}