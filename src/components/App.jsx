import React from 'react';
import StaffHome from './flightCheckApp/checkInDashboard.jsx';
import PassangerCheckIn from './flightCheckApp/passengerCheckIn.jsx';
import Home from './admin/Dashboard.jsx';
import Login from './Login.jsx'
import Header from './Header.jsx';
import PassangerAdd from './admin/PassangerAdd.jsx';
import Passanger from './admin/Passanger.jsx';
import Axcillary from './admin/Axcillary.jsx';
import AxcillaryAdd from './admin/AxcillaryAdd.jsx';
import { Router,Switch, Route,Redirect } from "react-router-dom";
import history from '../../src/js/history/history.js'
import NotFoundPage from './NotFoundPage.jsx';
import AppHome from './Home.jsx';


function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
      <Route
        {...rest}
        render={
            function(props){
                if(authed === true){
                    return <Component {...props} />;
                }
                else{
                    return <Redirect to={{pathname: '/', state: {from: props.location}}} />
                }
            }
        }
      />
    )
}

class App extends React.Component{ 
    constructor(props){
        super(props);
        this.state={
            isAdminLoginedIn : false,
            isStaffLoginedIn : false
        }
        this.updateLogin = this.updateLogin.bind(this);
        this.updateLogout = this.updateLogout.bind(this);
    }
    updateLogin(type){
        let loginData;
        if(type == 'staff'){
            loginData ={'login':'true','user':'staff'};
            this.setState({isStaffLoginedIn:true})
        }else{
            loginData ={'login':'true','user':'admin'};
            this.setState({isAdminLoginedIn:true})
        }
        localStorage.setItem('loginData', JSON.stringify(loginData));
    }
    updateLogout(type){
        if(type == 'staff'){
            this.setState({isStaffLoginedIn:false})

        }else{
            this.setState({isAdminLoginedIn:false})
        }
        localStorage.removeItem('loginData')
    }
    componentDidMount(){
        if(localStorage.getItem('loginData') && localStorage.getItem('loginData') !== undefined){
            let loginData = JSON.parse(localStorage.getItem('loginData'));
            if(loginData.user == 'staff'){
                this.setState({isStaffLoginedIn:true})
            }else if(loginData.user == 'admin'){
                this.setState({isAdminLoginedIn:true})                
            }
        }
    }
    render(){
    return (
        <div className="container">
        <Router history={history}> 
        <Header loginStatus={this.state} updateLogout={this.updateLogout} props={this.props}/>
            <Switch> 
                <Route exact path="/staff-login" render={props =><Login updateLogin={this.updateLogin} {...props}/>}  ></Route>
                <Route exact path="/admin-login" render={props =><Login updateLogin={this.updateLogin} {...props}/>}  ></Route>
                <Route exact path="/" render={props =><AppHome stateData={this.state} {...props}/>}  />  
                <PrivateRoute authed={this.state.isStaffLoginedIn} path="/check_In/passenger/:flightId/:passengerId" component={PassangerCheckIn} /> 
                <PrivateRoute authed={this.state.isStaffLoginedIn} path="/staff/:flightId" component={StaffHome} />
                <PrivateRoute authed={this.state.isAdminLoginedIn} path="/admin/ancillary/edit/:passengerId" component={AxcillaryAdd} /> 
                <PrivateRoute authed={this.state.isAdminLoginedIn} path="/admin/ancillary/add/:flightId" component={AxcillaryAdd} />
                <PrivateRoute authed={this.state.isAdminLoginedIn} path="/admin/ancillaries/:flightId" component={Axcillary} />
                <PrivateRoute authed={this.state.isAdminLoginedIn} path="/admin/passanger/edit/:flightId/:passengerId" component={PassangerAdd} />
                <PrivateRoute authed={this.state.isAdminLoginedIn} path="/admin/passanger/add/:flightId" component={PassangerAdd} />
                <PrivateRoute authed={this.state.isAdminLoginedIn} path="/admin/passanger/:flightId" component={Passanger} />
                <PrivateRoute authed={this.state.isAdminLoginedIn} path="/admin" component={Home} />
                <PrivateRoute authed={this.state.isStaffLoginedIn} path='/staff' component={StaffHome} />
                <Route exact path="*" component={NotFoundPage} />
            </Switch>       
        </Router>
        </div>
    )
    }
}

export default App;