import React from 'react';
import moment from 'moment';
const tsFormat = (date) => moment(date).format('M/DD/YY hh:mm A').trim();

const Notification = (props) => {
    return (
        <div className="notification">
            <div className="alert alert-info" role="alert">
                <p>{tsFormat(props.time)}</p>
                <p>{props.message}</p>
                <button type="button" className="btn btn-outline-info" onClick={()=>{props.closeFn(props.id)}}>Close</button>
            </div>
        </div>
    )
};

export default Notification;