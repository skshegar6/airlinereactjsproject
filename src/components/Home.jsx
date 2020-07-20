import React from 'react';
import { Link } from "react-router-dom";
import HomePageImage from '../tools/Flight.jpg';
class Home extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let htmlLinkData;
        if(this.props.stateData.isStaffLoginedIn){
            htmlLinkData = <Link  to="/staff">Go to Staff</Link>;
        }else if(this.props.stateData.isAdminLoginedIn){
            htmlLinkData = <Link  to="/admin">Go to Admin</Link>;
        }else{
            htmlLinkData = <><Link  to="/staff-login">Go to Staff</Link><br></br><Link  to="/admin-login">Go to Admin</Link></>
        }
        return(
            <div className= "container">
                <img src={HomePageImage}  style={{'width':'100%'}}/>
                <h2>Welcome to Aireline Flight Passengers Manage, Check In and Out App</h2>
                {htmlLinkData}
            </div>
        )
    }
}

export default Home;