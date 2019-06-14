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
                <div className="flex-item" key={`note_${note.notificationId}`}>
                    <Notification isAnimate={true} type={note.side} message={`SIDE: ${note.side}`} time={note.timestamp} id={note.notificationId} closeFn={this.handleCloseClick} isFixed={false}/>
                </div>
            )
        });
    }

    render() {
        console.log(this.props.notifications.model)
        return this.props.notifications.model ? (
            <div className="trade-notifications-container flex-container column">
                {!_.isEmpty(this.props.notifications.model) ? 
                    <div className="flex-item link-button" onClick={()=>{this.handleCloseClick(-1)}}>
                        clear all notifications
                    </div> 
                : null}
                {this.notificationsContainer()}
               <div className="button confirm fill test-notification-button" onClick={()=>{this.props.notificationActions.testNotification()}}> 
                    TEST NOTIFICATION
                </div>
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
