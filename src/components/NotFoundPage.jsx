
import React from 'react';
import PageNotFound from '../tools/PAGE_404.jpg';

class NotFoundPage extends React.Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <br />
                </div>
                <img src={PageNotFound}  />
            </div>
        )
    }
}

export default NotFoundPage;