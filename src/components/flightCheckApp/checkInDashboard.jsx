import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import  * as flightsActions  from "../../js/redux/actions/admin/Dashboard.js";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";

class DashBoard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          flights:[],
          matchedFlights:[],
          fliterValue:[{'id':'1','name':'CheckedIn'},{'id':'2','name':'UnCheckedIn'},{'id':'3','name':'Required Wheel Chair'}],
          service_datas:[],
          passangersByFlight:[],
          passangersByFilter:[],
          selectFlight:{},
          start_time:'',
          end_time:'',
          select_flight:'',
          fliter_select:0 
        };
        this.flightTimes= [];
        this.selectTimes={'start_time':'','end_time':''};
        for(let i=0;i<=23;i++){
            this.flightTimes.push({'id':i,'value':i});
        }
        this.selectTime = this.selectTime.bind(this); 
        this.selectFilter = this.selectFilter.bind(this);
    }

    checkInBetweenTime(startTime,endTime,betweenTime){
        let currentDate = new Date();   
        let startDate = new Date(currentDate.getTime());
        startDate.setHours(startTime.split(":")[0]);
        startDate.setMinutes(startTime.split(":")[1]);
        startDate.setSeconds(startTime.split(":")[2]);
        let endDate = new Date(currentDate.getTime());
        endDate.setHours(endTime.split(":")[0]);
        endDate.setMinutes(endTime.split(":")[1]);
        endDate.setSeconds(endTime.split(":")[2]);
        let InbetweenTime = new Date(currentDate.getTime());
        InbetweenTime.setHours(betweenTime.split(":")[0]);
        InbetweenTime.setMinutes(betweenTime.split(":")[1]);
        InbetweenTime.setSeconds(betweenTime.split(":")[2]);
        if(startDate < InbetweenTime && endDate > InbetweenTime){
            return true;
        }else{
            return false;
        }
          
    }


    onChange(evt){
        this.setState({
            [evt.target.name] : evt.target.value
        });
    }

    selectTime(evt){
        if(evt.target.name == 'start_time'){
            this.setState({start_time : evt.target.value});
            this.selectTimes['start_time'] =evt.target.value;
        }else{
            this.setState({end_time : evt.target.value});
            this.selectTimes['end_time'] = evt.target.value;
        }
        if(this.selectTimes['end_time'] !==  '' && this.selectTimes['start_time'] !== ''){
            let flightsArray = this.state.flights.filter((flight) =>{
                if(this.checkInBetweenTime(this.selectTimes['start_time']+':00:00',this.selectTimes['end_time']+':00:00',flight.start_Time)) return flight;
            })
            if(flightsArray.length == 0){
                this.setState({matchedFlights:[]});
                this.setState({select_flight:''});
                this.setState({passangersByFlight:[]});
                this.setState({service_datas:[]});
                this.setState({selectFlight:[]});
            }else{
                this.setState({matchedFlights:flightsArray});
            }
        }
    }

    selectFlight(evt){
      let flightSelect;
      if(evt.target !== undefined) flightSelect =evt.target.value;
      else flightSelect =evt;
        this.setState({select_flight:flightSelect});
        this.state.flights.filter((flight)=>{
            if(flight.id == flightSelect){
                this.setState({passangersByFlight:flight.passengers});
                this.setState({service_datas:flight.service_datas});
                this.setState({selectFlight:flight});
            }
        })
    }

    selectFilter(evt){
        this.setState({fliter_select:evt.target.value});
        let filterData;
        if(evt.target.value === '1'){
          filterData = this.state.passangersByFlight.filter(pass=>{
            if(pass.checkIn_status) return pass;
          })
        }else if(evt.target.value === '2'){
          filterData = this.state.passangersByFlight.filter(pass=>{
            if(!pass.checkIn_status) return pass;
          })
        }else if(evt.target.value === '3'){
          filterData = this.state.passangersByFlight.filter(pass=>{
            if(pass.isRequiredWheel) return pass;
          })
        }else{
          filterData = this.state.passangersByFlight;  
        }
        this.setState({passangersByFilter:filterData});
      }


    componentDidMount(){
      if(this.props.match.params.flightId){
        this.getData('reEnterFlightData');
      }else{
        this.getData();
      }
    }

    async getData(type){
      if(type === 'reEnterFlightData'){
        await this.props.actions.loadFlightsInServer();
        this.setState({flights:this.props.flights});
        this.selectFlight(this.props.match.params.flightId)
        this.setState({start_time : '0',end_time : '23',matchedFlights:this.props.flights});
      }else{
        await this.props.actions.loadFlightsInServer();
        this.setState({flights:this.props.flights});
      }
        
    }

    getServiceHtml(){
        let htmldata=''
        this.state.service_datas.map((el)=>{
            htmldata += el.name+', ';
        })
        return htmldata;
    }

    render(){
        return(
          <> 
          <div className="row">
              <div className="col-md-6">
              Select Flight in Time Start Time : 
              <select name='start_time' value={this.state.start_time} onChange={this.selectTime.bind(this)}>
                <option value="select">select</option>
                {this.flightTimes && this.flightTimes.map( el =>(
                    <option key ={el.id} value={el.id}>{el.value+':00:00'}</option>
                ))} 
              </select> 
              &nbsp;End Time : 
              <select name='end_time' value={this.state.end_time}  onChange={this.selectTime.bind(this)}>
                  <option value="select">select</option>
                  {this.flightTimes && this.flightTimes.map(el =>(
                      <option key ={el.id} value={el.id}>{el.value+':00:00'}</option>
                  ))} 
                </select>
              </div>
              <div className="col-md-6">
                 Select Flight In List :&nbsp; 
                 <select name='selectl_flight' value={this.state.select_flight} onChange={this.selectFlight.bind(this)}>
                 <option >select</option>
                  {this.state.matchedFlights && this.state.matchedFlights.map(el =>(
                      <option key={el.id} value={el.id}>{el.name}</option>
                  ))}
                 </select>   
              </div>
          </div>
          <div className="row">
              <hr></hr>
          </div>
          <div className="row">
            <div className="col-md-3">
                  <label>Flight Name : {this.state.selectFlight.name}</label>
            </div>
            <div className="col-md-3">
                  <label>From : {this.state.selectFlight.from_place} To : {this.state.selectFlight.to_place}</label>
            </div>
            <div className="col-md-6">
            Filter By Values : <select name='fliter_select' value={this.state.fliter_select} onChange={this.selectFilter.bind(this)}>
                 <option value='0'>select</option>
                  {this.state.fliterValue && this.state.fliterValue.map( el =>(
                      <option key ={el.id} value={el.id}>{el.name}</option>
                  ))}
                 </select>
            </div>    
          </div>
          <div className="row">  
          <table className="table">
          <thead>
             <tr>
                 <th scope="col">Name</th>
                 <th scope="col">Seat Name</th>
                 <th scope="col">Ancilary Services</th>
                 <th scope="col">CheckIn Status</th>
                 <th scope="col">Actions</th>
             </tr>
         </thead>  
         <tbody>
         {(this.state.fliter_select == 0) ?
         (this.state.passangersByFlight && this.state.passangersByFlight.map(el => (
           <tr key={el.id}>
           <td>{el.name}</td>  
           <td>{el.seat_no}</td>
           <td>{this.getServiceHtml()}</td>
           <td>{(el.checkIn_status == true) ? 'Yes' : 'No' }</td>
           <td>
                { 
                (el.checkIn_status == true)
                ? <Link className="btn btn-primary disabledCursor" onClick={ (event) => event.preventDefault() } to={'/check_In/passenger/'+el.flight_id+'/'+el.id} disabled>CheckedIn</Link>
                : <Link className='btn btn-primary notDisabled' style={{'marginRight':'10px'}} to={'/check_In/passenger/'+el.flight_id+'/'+el.id} disabled>Click CheckIn</Link>
                } 
           </td>
       </tr> 
            ))) : (this.state.passangersByFilter && this.state.passangersByFilter.map(el => (
                <tr key={el.id}>
                <td>{el.name}</td>  
                <td>{el.seat_no}</td>
                <td>{this.getServiceHtml()}</td>
                <td>{(el.checkIn_status == true) ? 'Yes' : 'No' }</td>
                <td>
                     { 
                     (el.checkIn_status == true)
                     ? <Link className="btn btn-primary disabledCursor" onClick={ (event) => event.preventDefault() } to={'/check_In/passenger/'+el.flight_id+'/'+el.id} disabled>CheckedIn</Link>
                     : <Link className='btn btn-primary notDisabled' style={{'marginRight':'10px'}} to={'/check_In/passenger/'+el.flight_id+'/'+el.id} disabled>Click CheckIn</Link>
                     } 
                </td>
            </tr> 
                 ))

            )}
            
            </tbody>   
            </table> 
            </div>    
        </>    
        )
    }
}

DashBoard.propTypes = {
    flights:PropTypes.array,
    loadFlightsInServer:PropTypes.func
  }

const mapStateToProps = state => {
    return { flights : state.flights};
  };
  
  function mapDispatchToProps(dispatch) {
    return {
      actions:bindActionCreators(flightsActions,dispatch)
    };
  }
  
  const FlightsDataList = connect(
    mapStateToProps,
    mapDispatchToProps
  )(DashBoard);
  
export default FlightsDataList;