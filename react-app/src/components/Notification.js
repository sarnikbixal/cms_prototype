import React from 'react';
import moment from 'moment';
const tsFormat = (date) => moment(date).format('M/DD/YY hh:mm A').trim();

const Notification = (props) => {
    let typeClass = props.type ? props.type.toLowerCase() : '';
    return (
        <div className={`notification-container ${typeClass} ${props.isAnimate ? 'slide' : ''} ${props.isFixed ? 'fixed' : ''}`}>
           <div className="notification-bg"></div>
           <div className="close-button" onClick={()=>{props.closeFn(props.id)}}>&#10006;</div>
           <div className={`notification-content`}>
                <div className="flex-container column">
                    <div className="flex-item timestamp">{tsFormat(props.time)}</div>
                    <div className={`flex-item message`}>{props.message}</div>
               </div>
           </div>
        </div>
    )
};

export default Notification;