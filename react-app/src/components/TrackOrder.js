import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as orderActions from '../actions/orderActions';
import * as notificationActions from '../actions/notificationActions';
import * as _ from 'lodash';
import * as moment from 'moment';
const tsFormat = (date) => moment(date).format('M/DD/YY hh:mm A').trim();

const Steps = (props) =>{
    let index = 0;
    return _.map(props.steps, (step)=>{
        index++;
        let isLast = index === props.steps.length;
        return (
            <Step step={step} isLast={isLast} key={step.id} submitTicketFn={props.submitTicketFn}></Step>
        )
    });
}

const Spacer = (props) =>{
    return (
        <div className="flex-container">
            <div className={`flex-item spacer ${props.type}`}></div>
        </div>
    )
}

const Step = (props) =>{
    let isBlocked = (props.step.timestamp && !props.step.isFilled) || (!props.step.isFilled && !props.step.isPending),
    type = props.step.isFilled ? 'full' : 'half';
    return (
        <div>
            <div className={`step flex-container ${props.step.isFilled ? 'filled' : ''} ${isBlocked ? 'blocked' : ''}`}>
                <div className={`flex-item`}>
                    <div className="step-box"></div>
                </div>
                <div className="flex-item">-</div>
                <div className="flex-item step-info">
                    <span className="step-status">{props.step.status}</span>
                    {props.step.timestamp ? <span className="step-date"> - {tsFormat(props.step.timestamp)}</span> : null}
                </div>
            </div>
            {isBlocked ? 
                <div className="flex-container">
                    <div className="flex-item">This step is taking longer than average to proceed. </div>
                    <div className="flex-item">
                        {props.step.ticket && !props.step.ticket.isResolved ?
                            <span>Ticket Submitted: {tsFormat(props.step.ticket.timestamp)}</span>
                        :
                            <div className="link-button" onClick={()=>props.submitTicketFn(props.step.id)}>Submit Ticket</div>
                        }
                    </div>
                </div>
            : null}
            {!props.isLast ? <Spacer type={type}></Spacer> : null}
        </div>
    )
}

class TrackOrder extends Component {
    constructor(props){
        super();
        this.orderId = props.match.params.id;
        this.state = {}
    }

    componentDidMount = () =>{
        if(_.isEmpty(this.props.order)){
            this.props.orderActions.getOrder(this.orderId).then(res =>{
                this.fillStepsTimer(2, 4);
            }).catch(err=>{
                console.log(err)
            })
        }
    }

    componentDidUpdate = (prevProps) =>{
        if(prevProps.order.steps !== this.props.order.steps){
           if(_.findIndex(this.props.order.steps, {isFilled: false}) === -1){
               this.setAllFilled();
           }
        }
    }

    setAllFilled(){
        this.setState({
            isReadyForPickup: true
        })
    }

    fillStepsTimer = (startStepId, unFilledStep) =>{
        let stepId = startStepId,
        interval = setInterval(()=>{
            let _steps = _.cloneDeep(this.props.order.steps),
            step = _.find(_steps, {'id': stepId}),
            prevStep = _.find(_steps, {'id': stepId-1});

            if(stepId <= _steps.length && prevStep.isFilled){
                step.isPending = false;
                step.isFilled = unFilledStep && unFilledStep === stepId ? false : true;
                step.timestamp = new Date().getTime();
                this.props.orderActions.updateOrderStatus(_steps);
                stepId++;
            }else{
                clearInterval(interval);
            }
        }, 500) 
    }

    submitTicket = (stepId) =>{
        let _steps = _.cloneDeep(this.props.order.steps),
        step = _.find(_steps, {'id': stepId});
        step.ticket = {
            timestamp: new Date().getTime(),
            isResolved: false
        }
        this.props.orderActions.updateOrderStatus(_steps);
        this.props.notificationActions.mockTicketNotification(this.props.order, stepId);

        setTimeout(()=>{
            let _steps = _.cloneDeep(this.props.order.steps),
            step = _.find(_steps, {'id': stepId});

            step.ticket.isResolved = true;
            step.isFilled = true;
            this.props.orderActions.updateOrderStatus(_steps);
            this.fillStepsTimer(stepId + 1, null);
        }, 1000);
    }

    render() {
        return(
            <div className="status-container">
                <div className="steps-container">
                    <Steps steps={this.props.order.steps} submitTicketFn={this.submitTicket}></Steps>
                    {this.state.isReadyForPickup ? 
                        <div className="button-container">
                            <a href={`/schedule-pickup/${this.props.order.id}`}>schedule pick-up</a>
                        </div>
                    : null}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        order: state.order,
        notifications: state.notifications
    };
  }
 
  function mapDispatchToProps(dispatch){
   return {
     orderActions: bindActionCreators(orderActions, dispatch),
     notificationActions: bindActionCreators(notificationActions, dispatch),
   };
 }

export default connect(mapStateToProps, mapDispatchToProps)(TrackOrder);
