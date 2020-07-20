import React from 'react';
import * as userApi from '../js/redux/api/userApiActions.js';

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            usertype:'',
            redirectToReferrer:false
        }
        this.loginusercheck = this.loginusercheck.bind(this);
    }

    componentDidMount(){
        let typleSplit = this.props.location.pathname.split('-');
        if(typleSplit['0'] == '/staff'){
            this.setState({usertype:'staff'})
        }else{
            this.setState({usertype:'admin'})
        }
        console.log('loading');
        window.gapi.load('auth2',()=>{
            window.gapi.auth2.init({
                client_id:'766328500670-fcpv74em491v4bdc70mm6to9g80cpfik.apps.googleusercontent.com'
            })
            window.gapi.load('signin2',()=>{
                const params = {
                        'scope': 'https://www.googleapis.com/auth/plus.login',
                        'width': 200,
                        'height': 50,
                        'longtitle': true,
                        'theme': 'light',
                        'onsuccess':this.loginusercheck
                }
                window.gapi.signin2.render('loginbutton',params)
               
            })
            window.gapi.auth2.signOut().then(function () {
                console.log('User signed out.');
            });
            console.log('Api loaded')
        })
        //this.renderGoogleLoginButton();
    }

    onChangeData(evt){
        this.setState({
            [evt.target.name] : evt.target.value
        });
    } 
    submitFormData(evt){
        evt.preventDefault();
        this.loginusercheck('web');
    }

    async loginusercheck(type){
        if(type == 'web'){
            let logindata = await userApi.loginUser(this.state);
            if(logindata.status == 'sucess'){
                if(this.state.usertype === 'admin'){
                    this.props.updateLogin('admin');
                    this.props.history.push('/admin');
                }else if(this.state.usertype === 'staff'){
                    this.props.updateLogin('staff');
                    this.props.history.push('/staff');
                }
            }else{
                alert('User details is incorrect')
            }
        }else{
            if(this.state.usertype === 'admin'){
                this.props.updateLogin('admin');
                this.props.history.push('/admin');
            }else if(this.state.usertype === 'staff'){
                this.props.updateLogin('staff');
                this.props.history.push('/staff');
            }
        }
    }

    cancelLogin(){
        this.props.history.push('/');
    }
    render(){
        return(
            <>
            <div className="row>"></div>
            <h2>Enter {this.state.usertype} login details</h2>
            <form action="/action_page.php" style={{'width':'60%'}}>
                <div className="form-group">
                    UserName: <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.onChangeData.bind(this)} />
                </div>
                <div className="form-group">
                    Password: <input type="text" className="form-control" name="password"  value={this.state.password} onChange={this.onChangeData.bind(this)} />
                </div>
                <div className="row">
                    <div className="col-md-4" style={{'textAlign':'center'}}>
                         <button type="submit" className="btn btn-primary" onClick={this.submitFormData.bind(this)} >Login</button>       
                    </div>
                    <div className="col-md-4" style={{'textAlign':'center'}}>
                         <div id="loginbutton"  >Login with Google</div>       
                    </div>
                    <div className="col-md-4" style={{'textAlign':'center'}}>
                        <button type="submit" className="btn btn-primary" onClick={this.cancelLogin.bind(this)}>Cancel</button>     
                    </div>
                </div>
            </form>
            </>
        )
    }       
}

export default Login;