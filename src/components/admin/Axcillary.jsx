import React from 'react';
import { connect } from "react-redux";
import PropTypes, { func } from 'prop-types';
import  * as AncillaryAPIActions  from "../../js/redux/actions/admin/Ancillary.js";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";


class AncillaryDash extends React.Component{
    constructor(props){
        super(props)
        this.state={
            ancillaries:[]
        }
    }

    componentDidMount(){
      this.getAncillaries();
    }
    async getAncillaries(){
        let alreadyDataLoaded = false;
        for(let i=0;i<this.props.ancillaries.length;i++){
          if(this.props.ancillaries[i].flight_id == this.props.match.params.flightId) alreadyDataLoaded = true;
        }
        if(alreadyDataLoaded){
          let ancillariesData =  this.props.ancillaries.filter(ancil=>{
            if(ancil.flight_id == this.props.match.params.flightId) return ancil;
          })
          this.setState({ancillaries:ancillariesData});
        }else{
          await this.props.actions.loadAncillariesByFlightInServer(this.props.match.params.flightId);
          this.setState({ancillaries:this.props.ancillaries});
        }
    }
    async deleteData(value){
     await this.props.actions.deleteAncillaryInServer(value);
     this.setState({ancillaries:this.state.ancillaries.filter(e => e.id !== value)});
    }
    render(){
        return(
            <>
          <div className="row">
              <div className="col-md-6">
                  List of Ancillaries Services In Flight
              </div>
              <div className="col-md-6">
                   <Link  className='btn btn-primary' style={{'marginRight':'10px'}} to={'/admin/ancillary/add/'+this.props.match.params.flightId} >Add Ancillaries Services</Link>
              </div>
          </div>  
          <table className="table">
          <thead>
             <tr>
                 <th scope="col">Name</th>
                 <th scope="col">Actions</th>
             </tr>
          </thead>  
          <tbody> 
            {this.state.ancillaries ? this.state.ancillaries.map( el => (
            <tr key={el.id}>
                <td>{el.name}</td>
                <td>
                    <Link className='btn btn-primary' style={{'marginRight':'10px'}} to={'/admin/ancillary/edit/'+el.id} >Edit</Link>
                    <button className='btn btn-primary' style={{'marginRight':'10px'}} onClick={() => this.deleteData(el.id)}>Delete</button>
                    <Link id="link" className='btn btn-primary' style={{'marginRight':'10px','display':'none'}} to={'/admin/ancillaries/'+this.props.match.params.flightId} >Move Dashboard</Link>
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

AncillaryDash.propTypes = {
    ancillaries:PropTypes.array,
    flights:PropTypes.array,
    deleteAncillaryInServer:PropTypes.func,
    loadPassangersByFlightInServer:PropTypes.func
  }

const mapStateToProps = state => {
    return { 
      ancillaries: state.ancillaries,
      flights : state.flights.flights
    };
  };

  function mapDispatchToProps(dispatch) {
    return {
      actions:bindActionCreators(AncillaryAPIActions,dispatch)
    };
  }

const AncillaryDashboard = connect(
    mapStateToProps,
    mapDispatchToProps
  )(AncillaryDash);  
 
export default AncillaryDashboard;