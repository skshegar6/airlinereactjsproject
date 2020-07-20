import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import  * as PassangerAPIActions  from "../../js/redux/actions/admin/Passanger.js";
import { Link } from "react-router-dom";
import SeatPicker from 'react-seat-picker';

class PassangerForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            address:'',
            dob:'',
            seat_no:'',
            seat_status:'',
            checkIn_status:'',
            seat_details:{'id': '', 'number': '', isReserved: false,'tooltip':'','seat_array_index':''},
            seat_checkIn_details:{'id': '', 'number': '', isReserved: false,'tooltip':'','seat_array_index':''},
            passport_no:'',
            flight_id:'',
            isRequiredWheel:false,
            loading:false
        }
        this.getIndexdetails = this.getIndexdetails.bind(this);
        this.moveToDashboard=''; 
        this.seatMaploading = {
            loading:false
        }; 
        this.flightdata1;
        this.seatMapData;
    }

    passagerFlightMapData(overallpassengerdata,flightId){
        let flightSeatArray=[];
        let passengersByFlight  = overallpassengerdata.filter(function(passenger){if(passenger.flight_id == flightId) return passenger});
        let incrementData=1;
        for(let i=0;i<5;i++){
            let rowData=[]; 
            for(let j=0;j<=6;j++){
                if(j <=2 ){
                rowData.push({ 'id':incrementData++, 'number': j+1, isReserved: false })
                }else if(j == 3){
                rowData.push(null)
                }else if(j > 3) {
                rowData.push({ 'id':incrementData++, 'number': j, isReserved: false });
                }
            if(j == 6) flightSeatArray.push(rowData);   
            }
        }
        passengersByFlight.map((value,index,array) =>{
            if(value.seat_status){
            let splitSeat = value.seat_details.seat_array_index.split(',');
            flightSeatArray[splitSeat[0]][splitSeat[1]] = value.seat_checkIn_details;
            }
        });
        return flightSeatArray;
    }


    async componentDidMount(){
        if(this.props.match.params.passengerId){
            if(this.props.flights && this.props.flights.length > 0){
                let flightId = this.props.match.params.flightId;
                let passengerId = this.props.match.params.passengerId;
               let flightData =  this.props.flights.filter((value) =>{
                    if(value.id == flightId) return value;
                })
                this.flightdata1 =  this.passagerFlightMapData(flightData[0].passengers,this.props.match.params.flightId); 
               let passengerByflightData = flightData[0].passengers.filter((data) =>{
                   if(data.id == passengerId) return data; 
               })
               this.setState(passengerByflightData[0]);
            }else{
                //await this.props.actions.loadPassangersInServer(this.props.match.params.flightId,this.props.match.params.passengerId);
                //this.setState({...this.props.passenger[0]});

                await this.props.actions.loadPassangersByFlightInServer(this.props.match.params.flightId);
                this.seatMapData = this.passagerFlightMapData(this.props.passenger,this.props.match.params.flightId);
                let passData = this.props.passenger.filter(pass=>{
                if(pass.id == this.props.match.params.passengerId) return pass;})
                this.setState(passData[0]);


            }

        }else{
            await this.props.actions.loadPassangersByFlightInServer(this.props.match.params.flightId)
            this.setState({flight_id:this.props.match.params.flightId});
        }
    }
    getIndexdetails(rowName,seatNo){
        let letIndexData=''
        if(rowName == 'A'){ letIndexData += '0' }
        else if(rowName == 'B'){ letIndexData += '1' }
        else if(rowName == 'C'){ letIndexData += '2' }
        else if(rowName == 'D'){ letIndexData += '3' }
        else if(rowName == 'E'){ letIndexData += '4'}
        if(seatNo <= 3){ letIndexData +=','+(parseInt(seatNo)-1)}
        else { letIndexData +=','+seatNo}
        return letIndexData;
    }
    addSeatCallbackContinousCase = ({ row, number, id }, addCb, params, removeCb) => {
        this.setState({
          loading: true
        }, async () => {
          if (removeCb) {
            await new Promise(resolve => setTimeout(resolve, 750))
            console.log(`Removed seat ${params.number}, row ${params.row}, id ${params.id}`)
            removeCb(params.row, params.number)
          }
          await new Promise(resolve => setTimeout(resolve, 750))
          console.log(`Added seat ${number}, row ${row}, id ${id}`)
          const newTooltip = `Selected seat ${number}, row ${row}, for CheckIn by `+this.state.name;
          let seat_checkIn_details={'id': id, 'number': number, isReserved: true,'tooltip':'Reserved by '+this.state.name+' and CheckedIn','seat_array_index':this.getIndexdetails(row, number)};
          let seat_details={'id': id, 'number': number, isReserved: true,'tooltip':'Reserved by '+this.state.name,'seat_array_index':this.getIndexdetails(row, number)};
          this.setState({checkIn_status:true,seat_no:`row ${row},${number}`,seat_status:true,seat_details:seat_details,seat_checkIn_details:seat_checkIn_details})
          addCb(row, number, id, newTooltip)
          this.setState({ loading: false })
        })
    }

    removeSeatCallback = ({ row, number, id }, removeCb) => {
        this.setState({
          loading: true
        }, async () => {
          await new Promise(resolve => setTimeout(resolve, 1500))
          console.log(`Removed seat ${number}, row ${row}, id ${id}`)
          // A value of null will reset the tooltip to the original while '' will hide the tooltip
          const newTooltip = ['A', 'B', 'C'].includes(row) ? null : ''
          removeCb(row, number, newTooltip)
          this.setState({ loading: false })
          let seat_checkIn_details={'id': '', 'number': '', isReserved: false,'tooltip':'','seat_array_index':''};
          let seat_details={'id': '', 'number': '', isReserved: false,'tooltip':'','seat_array_index':''};
          this.setState({seat_no:'',seat_status:false,seat_details:seat_details,seat_checkIn_details:seat_checkIn_details})
        })
      }

    onChangeData(evt){
        this.setState({
            [evt.target.name] : evt.target.value
        });

    }
    handleCheck(){
        this.setState({isRequiredWheel: !this.state.isRequiredWheel});
    }

    submitFormData(evt){
        evt.preventDefault();
        if(this.state.seat_status){
            let seat_details = this.state.seat_details;
            let seat_checkIn_details = this.state.seat_checkIn_details;
            seat_checkIn_details.tooltip = 'Reserved by '+this.state.name+' and CheckedIn, CheckIn process done';
            seat_details.tooltip='Reserved by '+this.state.name;
            this.setState({seat_checkIn_details:seat_checkIn_details,seat_details:seat_details})
        }
        this.props.actions.savePassangerInServer(this.state);
        this.props.history.push('/staff/'+this.props.match.params.flightId)
    }

    render(){
         const {loading} = this.state   
        return (
        <div>   
            <h3> Passenger Check In Process</h3>
            <div className = "row">
            <div className="col-md-6" style={{'textAlign':'center'}}>
             <div style={{ marginTop: '70px' }}>
              <div className="MapSeated" style={{'float':'right','width':'100px'}}><div style={{'width': '90px','float':'left'}}>
                    <div style={{'height': '20px',
                                    'width': '15px',
                                    'backgroundColor': '#03A9F4',
                                    'float':'left'   
                                }}
                    ></div><div style={{'paddingRight':'5px'}}>Empty Seat</div></div>
                    <div style={{'width': '90px','float':'left'}}>
                    <div style={{'height': '20px',
                                    'width': '15px',
                                    'backgroundColor': '#4CAF50',
                                    'float':'left'}}>
                    </div><div style={{'float':'left','paddingLeft':'5px'}}>CheckIn Select</div></div>
                    <div style={{'width': '90px'}}>
                    <div style={{'height': '20px',
                                    'width': '15px',
                                    'backgroundColor': '#E0E0E0',
                                    'float':'left'}}>
                    </div><div style={{'float':'left','paddingLeft':'5px'}}>checkedIn</div></div>
                </div> 
             {(this.seatMapData || this.flightdata1) ?                                                       
              <SeatPicker
                addSeatCallback={this.addSeatCallbackContinousCase}
                removeSeatCallback={this.removeSeatCallback}
                rows={(this.seatMapData || this.flightdata1)}
                maxReservableSeats={1}
                alpha
                visible
                selectedByDefault
                loading={loading}
                tooltipProps={{ multiline: true }}
                continuous
              />
              : <p>loading</p>}
             </div>
            </div>
            <div className="col-md-6" style={{'textAlign':'center'}}>  
            <form action="/action_page.php" style={{ marginTop: '80px' }}>
                <div className="form-group">
                    Name: <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChangeData.bind(this)}/>
                </div>
                <div className="form-group">
                    Address: <input type="text" className="form-control" name="address" value={this.state.address} onChange={this.onChangeData.bind(this)} />
                </div>
                <div className="form-group">
                    DOB: <input type="text" className="form-control" name="dob" value={this.state.dob} onChange={this.onChangeData.bind(this)}/>
                </div>
                <div className="form-group">
                    Seat Details: <input type="text" className="form-control" name="dob" disabled value={this.state.seat_no} onChange={this.onChangeData.bind(this)}/>
                </div>
                <div className="form-group">
                    Passport NO: <input type="text" className="form-control" name="passport_no" value={this.state.passport_no} onChange={this.onChangeData.bind(this)} />
                </div>
                <div className="form-group">
                    <input type="checkbox" onChange={this.handleCheck.bind(this)} checked={this.state.isRequiredWheel}/><span>&nbsp;&nbsp;Required Wheel Chair</span>
                </div>
                <div className="row">
                    <div className="col-md-12" style={{'textAlign':'center'}}>
                        <button type="submit" className="btn btn-primary" onClick={this.submitFormData.bind(this)}>Save</button>
                        <Link id="link" className='btn btn-primary' style={{'marginRight':'10px','display':'none'}} to={'/check_In/'} >Home</Link>
                    </div>
                </div>
            </form>
            </div>
            </div>
        </div>
        )
    }
}

PassangerForm.propTypes = {
    loadPassangersInServer:PropTypes.func,
    savePassangerInServer:PropTypes.func,
    editPassangerInServer:PropTypes.func,
    deletePassangerInServer:PropTypes.func,
    passenger:PropTypes.array,
    flights: PropTypes.array,
    mapseatdatas: PropTypes.array
}

const mapStateToProps = state => {
    return { passenger : state.passengers,
             mapseatdatas: state.seatMapdata,   
             flights: state.flights
    };
  };

function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators(PassangerAPIActions,dispatch)
    };
}

const PassangersForm = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PassangerForm);

export default PassangersForm;