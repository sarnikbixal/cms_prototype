import React, { Component } from 'react';
import * as notificationActions from '../actions/notificationActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notification from './Notification';
import * as _ from 'lodash';

class Notifications extends Component {
    constructor(props){
        super();
    }

    handleCloseClick = (notificationId) =>{
        this.props.notificationActions.deleteNotification(notificationId);
    }

    notificationsContainer = () =>{
        let ordered = _.orderBy(this.props.notifications.model, ['timestamp'],['desc']);
        return _.map(ordered, note =>{
            return(
                <Notification isAnimate={true} type={note.side} message={note.displayMessage} time={note.timestamp} id={note.notificationId} closeFn={this.handleCloseClick} isFixed={false}/>
            )
        });
    }

    render() {
        return this.props.notifications.model ? (
            <div className="notifications-container flex-container column">
                {this.notificationsContainer()}
            </div>
        ) : null;
    }
 }

function mapStateToProps(state, ownProps){
    return {
        notifications: state.notifications,
    };
}

function mapDispatchToProps(dispatch){
    return {
        notificationActions: bindActionCreators(notificationActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (Notifications);
