import React from 'react';
import { Link } from "react-router-dom";

class HeaderJs extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      isAdminLoginedIn : props.loginStatus.isAdminLoginedIn,
      isStaffLoginedIn: props.loginStatus.isStaffLoginedIn
    }
  }

  logoutChange(){
    let loginData;
    if(localStorage.getItem('loginData') && localStorage.getItem('loginData') !== undefined){
      loginData = JSON.parse(localStorage.getItem('loginData'));
    }
    if(loginData && loginData.user == 'admin'){
      this.props.updateLogout('admin');  
    }else if(loginData && loginData.user == 'staff'){
      this.props.updateLogout('staff');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isAdminLoginedIn: nextProps.loginStatus.isAdminLoginedIn,isStaffLoginedIn: nextProps.loginStatus.isStaffLoginedIn});  
  }
    render(){
        let htmlContent;
        if(this.state.isStaffLoginedIn){
          htmlContent = <ul className="nav navbar-nav" style={{'display':'-webkit-box'}}>
                    <li className="active" style={{'paddingRight':'10px'}}><Link  to="/staff">Staff Page</Link></li>
                  </ul>; 
        }else if(this.state.isAdminLoginedIn){
          htmlContent = <ul className="nav navbar-nav" style={{'display':'-webkit-box'}}>
            <li className="active" style={{'paddingRight':'10px'}}><Link  to="/admin">Admin Page</Link></li>
          </ul>
        }else{
          htmlContent="";
        }
        return(
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
            <div className="navbar-header">
                <Link className="navbar-brand" to="/">AirLine Checking App</Link>
            </div> 
              {htmlContent}  
              { ( this.state.isStaffLoginedIn && !this.state.isAdminLoginedIn ) || ( !this.state.isStaffLoginedIn && this.state.isAdminLoginedIn )   ?   
                <ul className="nav navbar-right">
                  <button type="submit" className="btn btn-primary" onClick={this.logoutChange.bind(this)}>Logout</button>
                </ul> :
                <ul className="nav navbar-right">
                  <li style={{'paddingRight':'10px'}}><Link  to="/staff-login">Login to Staff</Link></li>
                  <li style={{'paddingRight':'10px'}}><Link  to="/admin-login">Login to Admin</Link></li>
                </ul>
              }  
            </div>
          </nav>   
        )
    }
}

export default HeaderJs;