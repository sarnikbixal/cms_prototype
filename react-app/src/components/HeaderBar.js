import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as pageActions from '../actions/pageActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class HeaderBar extends Component {

    render() {
      return(
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">{this.props.page.title}
            {this.props.page.status ? <span>:<span class="text-success"> {this.props.page.status}</span></span> : null}
          </span>
          <a className="" href="/"><i class="fa fa-shopping-cart" aria-hidden="true"></i></a>
        </nav>
      )
    }
 }
 
 function mapStateToProps(state, ownProps){
  return {
      page: state.page,
  };
}

function mapDispatchToProps(dispatch){
  return {
      pageActions: bindActionCreators(pageActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(HeaderBar));