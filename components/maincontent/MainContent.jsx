// import Sidebar from "../sidemenu/Sidebar";
import './MainContent.css'
import {
    FarmerDetail,
    Header,
    Tabs,
    MainHeader,
} from '../modules/Module';
import { Row, Col } from 'react-bootstrap';
import Sidebar from '../sidemenu/Sidebar';
import LoginPage from '../login/LoginPage'
import Home from '../home/Home';
import RecentMonitoringTable from '../recentMonitoringTable/RecentMonitoringTable'
// import Report from '../farmer/Report'
function MainContent() {
    return (
        <>
        {/* <Report/> */}
            <div className='digicrop-dashboard' >
                <div className='header-of-page'>
                    <Header />        
                </div >
                {/* <Row className='Row'> */}

                    {/* <Col xs={2} className='p-0 d-flex justify-content-center'>
                        <div className='row-3 '>
                            <Sidebar />
                        </div>
                    </Col> */}
                    <Col  className='p-0 bg-light' >
                        <div className='row-3'>
                            <Tabs />
                        </div>
                    </Col >

                {/* </Row>   */}
            </div>
{/* <FarmerDetail/> */}
{/* <MainHeader/> */}

        </>
    )
}
export default MainContent;