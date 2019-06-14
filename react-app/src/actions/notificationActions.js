import * as types from './actionTypes';
import * as _ from 'lodash';

export function deleteNotificationSuccess(id){
    return {type: types.DELETE_NOTIFICATION_SUCCESS, id};
}

export function deleteNotification(notificationId){
    return function(dispatch){
        dispatch(deleteNotificationSuccess(notificationId));
    }
}

export function newNotificationSuccess(notification){
    return {type: 'NEW_NOTIFICATION_SUCCESS', notification};
}

export function mockTicketNotification(order, stepId){
    return function(dispatch){
        let step = _.find(order.steps, {'id': stepId}),
        note = {
            notificationType: 'ticket',
            displayMessage: `Ticket Submitted: Order #:${order.id} | Blocked-Action: ${step.status}`,
            timestamp: new Date(),
            notificationId: new Date().getTime()
        };
        dispatch(newNotificationSuccess(note));
    }
}