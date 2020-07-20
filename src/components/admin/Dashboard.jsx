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
          flights:[]
        };
    }
    async componentDidMount(){
      if(this.props.flights.length > 0){
        this.setState({flights:this.props.flights});
      }else{
        await this.props.actions.loadFlightsInServer();
        this.setState({flights:this.props.flights});
      }
    }
    render(){
        return(
          <table className="table">
          <thead>
             <tr>
                 <th scope="col">FlightName</th>
                 <th scope="col">Start Place</th>
                 <th scope="col">End Place</th>
                 <th scope="col">Actions</th>
             </tr>
         </thead>  
         <tbody>
         {this.state.flights && this.state.flights.map(el => (
           <tr key={el.id}>
           <td>{el.name}</td>  
           <td>{el.from_place}</td>
           <td>{el.to_place}</td>
           <td>
             <Link className='btn btn-primary' style={{'marginRight':'10px'}} to={'/admin/passanger/'+el.id} >Manage Passagers</Link>
             <Link className='btn btn-primary' style={{'marginRight':'10px'}} to={'/admin/ancillaries/'+el.id}>Manage Acillary</Link> 
           </td>
       </tr> 
            ))}
            
            </tbody>   
            </table>  
          
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