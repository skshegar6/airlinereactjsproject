import React from 'react';
import { connect } from "react-redux";
import PropTypes, { func } from 'prop-types';
import  * as PassangerAPIActions  from "../../js/redux/actions/admin/Passanger.js";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";


class Passagers extends React.Component{
    constructor(props){
        super(props)
        this.state={
          passengers:[],
          fliterValue:[{'id':'1','name':'Address'},{'id':'2','name':'DOB'},{'id':'3','name':'Passport'}],
          fliter_select:0
        }
        this.deleteData = this.deleteData.bind(this);
        this.getPassengers = this.getPassengers.bind(this);
        this.selectFilter = this.selectFilter.bind(this);
    }

    componentDidMount(){
      this.getPassengers();
    }

    selectFilter(evt){
      this.setState({fliter_select:evt.target.value});
      let filterData;
      if(evt.target.value === '1'){
        filterData = this.props.passengers.filter(pass=>{
          if(pass.address === '') return pass;
        })
      }else if(evt.target.value === '2'){
        filterData = this.props.passengers.filter(pass=>{
          if(pass.dob === '') return pass;
        })
      }else if(evt.target.value === '3'){
        filterData = this.props.passengers.filter(pass=>{
          if(pass.passport_no === '') return pass;
        })
      }else{
        filterData = this.props.passengers;  
      }
      this.setState({passengers:filterData});
    }

    async getPassengers(){
      let alreadyDataLoad = false;
      for(let i=0;i<this.props.passengers.length;i++){
        if(this.props.passengers[i].flight_id == this.props.match.params.flightId) alreadyDataLoad = true;
      }
      if(alreadyDataLoad){
        let flightId = this.props.match.params.flightId;
        let passengersData= this.props.passengers.filter(function(data){
            if(data.flight_id === flightId) {return data}
        })
        this.setState({passengers:passengersData}); 
      }else{
        await this.props.actions.loadPassangersByFlightInServer(this.props.match.params.flightId);
        this.setState({passengers:this.props.passengers});
      }
    }
    async deleteData(value){
     await this.props.actions.deletePassangerInServer(value);
     this.setState({passengers:this.state.passengers.filter(e => e.id !== value)});
    }
    render(){
        return(
            <>
          <div className="row">
              <div className="col-md-3">
                  List of Fight passengers
              </div>
              <div className="col-md-3">
                 Filter Missing Value : <select name='fliter_select' value={this.state.fliter_select} onChange={this.selectFilter.bind(this)}>
                 <option value='0'>select</option>
                  {this.state.fliterValue && this.state.fliterValue.map( el =>(
                      <option key ={el.id} value={el.id}>{el.name}</option>
                  ))}
                 </select>
              </div>
              <div className="col-md-3">
                   <Link  className='btn btn-primary' style={{'marginRight':'10px'}} to={'/admin/passanger/add/'+this.props.match.params.flightId} name="sekar" >Add passenger</Link>
              </div>
          </div>  
          <table className="table">
          <thead>
             <tr>
                 <th scope="col">Name</th>
                 <th scope="col">Address</th>
                 <th scope="col">DOB</th>
                 <th scope="col">Seat No</th>
                 <th scope="col">Passport No</th>
                 <th scope="col">Actions</th>
             </tr>
          </thead>  
          <tbody> 
            {this.state.passengers ? this.state.passengers.map( el => (
            <tr key={el.id}>
                <td>{el.name}</td>
                <td>{el.address}</td>
                <td>{el.dob}</td>
                <td>{el.seat_no}</td>
                <td>{el.passport_no}</td>
                <td>
                    <Link className='btn btn-primary' style={{'marginRight':'10px'}} to={'/admin/passanger/edit/'+this.props.match.params.flightId+'/'+el.id} >Edit</Link>
                    <button className='btn btn-primary' style={{'marginRight':'10px'}} to={'/admin/passanger/delete/'+el.id} onClick={() => this.deleteData(el.id)}>Delete</button>
                    <Link id="link" className='btn btn-primary' style={{'marginRight':'10px','display':'none'}} to={'/admin/passanger/'+this.props.match.params.flightId} >Move Dashboard</Link>
                </td>
            </tr>
            ))
            : <tr><td>Loding...</td></tr>
          }
          </tbody>   
          </table>
           </>
        )
    }
}

Passagers.propTypes = {
    passengers:PropTypes.array,
    flights:PropTypes.array,
    deletePassangerInServer:PropTypes.func
  }

const mapStateToProps = state => {
    return { 
      passengers:state.passengers,
      flights:state.flights
    };
  };

  function mapDispatchToProps(dispatch) {
    return {
      actions:bindActionCreators(PassangerAPIActions,dispatch)
    };
  }

const PassagersList = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Passagers);  
 

export default PassagersList;