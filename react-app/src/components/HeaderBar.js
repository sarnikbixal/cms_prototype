import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as _ from 'lodash';

class HeaderBar extends Component {
    constructor(props){
      super(props);

    }

    render() {
      return(
        <nav class="navbar navbar-light bg-light">
          <a href="/">Cart</a>
          <span class="navbar-brand mb-0 h1">{this.props.pageTitle || null}</span>
        </nav>
      )
    }
 }
 
 export default withRouter(HeaderBar);
 