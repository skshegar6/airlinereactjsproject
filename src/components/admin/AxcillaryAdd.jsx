import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import  * as AncillaryAPIActions  from "../../js/redux/actions/admin/Ancillary.js";
import { Link } from "react-router-dom";

class AncillaryForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            flight_id:''
        }
        this.moveToDashboard=''; 
    }

    async componentDidMount(){
        if(this.props.match.params.passengerId){
            if(this.props.ancillaries && this.props.ancillaries.length > 0){
                let loadData = this.props.ancillaries.filter(ancillary =>{
                    if(ancillary.id == this.props.match.params.passengerId) return ancillary; 
                })
                this.setState({...loadData[0]});    
            }else{
                await this.props.actions.loadAncillariesByFlightInServer(this.props.match.params.passengerId);
                let loadData = this.props.ancillaries.filter(ancillary =>{
                    if(ancillary.id == this.props.match.params.passengerId) return ancillary; 
                })
                this.setState({...loadData[0]});
            }
        }else{
            this.setState({flight_id:this.props.match.params.flightId});
        }
    } 

    onChangeData(evt){
        this.setState({
            [evt.target.name] : evt.target.value
        });
    }

    async submitFormData(evt){
        evt.preventDefault();
        await this.props.actions.saveAncillaryApiInServer(this.state);
        document.getElementById('link').click()
    }

    render(){
        return (
        <div>   
            <h3> User Register</h3> 
            <form action="/action_page.php">
                <div className="form-group">
                    Name: <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChangeData.bind(this)}/>
                </div>
                <div className="row">
                    <div className="col-md-3" style={{'textAlign':'center'}}>
                         <button type="submit" className="btn btn-primary" 
                         onClick={this.submitFormData.bind(this)}>Save</button>       
                    </div>
                    <div className="col-md-3" style={{'textAlign':'center'}}>
                        <Link id="link" className='btn btn-primary' style={{'marginRight':'10px','display':'none'}} to={'/admin/ancillaries/'+this.state.flight_id} >Home</Link>
                    </div>
                </div>
            </form>
        </div>
        )
    }
}

AncillaryForm.propTypes = {
    loadAncillariesByFlightInServer:PropTypes.func,
    saveAncillaryApiInServer:PropTypes.func,
    ancillaries:PropTypes.array
}

const mapStateToProps = state => {
    return { ancillaries : state.ancillaries
    };
  };

function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators(AncillaryAPIActions,dispatch)
    };
}

const AncillariesForm = connect(
    mapStateToProps,
    mapDispatchToProps
  )(AncillaryForm);

export default AncillariesForm;