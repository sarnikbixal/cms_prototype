import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as _ from 'lodash';

class HeaderBar extends Component {
    constructor(props){
      super(props);

    }

    render() {
      return(
        <div className="header-bar">
            <a href="/">Cart</a>
        </div>
      )
    }
 }
 
 export default withRouter(HeaderBar);
 