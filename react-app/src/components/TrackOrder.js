import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as orderActions from '../actions/orderActions';
import * as pageActions from '../actions/pageActions';
import * as _ from 'lodash';
import * as moment from 'moment';
const timeAgo = (date) => {
    let a = moment(new Date()),
    b = moment(date),
    timeAgo = {
        d: a.diff(b, 'days'),
        h: a.diff(b, 'hours'),
        m: a.diff(b, 'minutes'),
        s: a.diff(b, 'seconds')
    };    
    return `${timeAgo.d ? `${timeAgo.d} days ago` : timeAgo.h ? `${timeAgo.h} hours ago` : timeAgo.m ? `${timeAgo.m} minutes ago` : timeAgo.s ? `${timeAgo.s} seconds ago` : '0 seconds ago'}`;
};

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
    type = props.step.isFilled ? 'full' : 'half',
    icon = props.step.isFilled ? 'fa-check-square-o' : isBlocked ? 'fa-times' : 'fa-square-o';

    return (
        <div>
            <div className="media">
                <div className="h2">
                    <i className={`${icon} ${props.step.isFilled ? 'text-success' : 'text-secondary'} ${isBlocked ? 'text-failure' : ''} fa`} aria-hidden="true"></i>
                </div>
                <div className="media-body ml-3">
                    <h5 className="mt-1 mb-0">{props.step.status}</h5>
                    <span className="text-muted">{props.step.authority}{props.step.timestamp ? `, ${timeAgo(props.step.timestamp)}` : ''}</span>
                </div>

                
            </div>
            
            {isBlocked ? 
                    <div className="alert alert-warning">"Oops! We've hit a snag here."<br/>
              
                    {props.step.ticket && !props.step.ticket.isResolved ?
                        <button className="btn btn-link"><i className="fa fa-comment"></i> Connecting...</button>
                    :
                        <button className="btn btn-link" onClick={()=>props.submitTicketFn(props.step.id)}><i className="fa fa-comment"></i> Chat with HelpDesk</button>
                    }
                </div>
                : null}
            
            {!props.isLast ? <Spacer type={type}></Spacer> : null}
        </div>
    )
}

const ProductPreview = (props) =>{
    return _.map(props.products, product => {
        return (
            <div className="media mt-2 mb-3" key={product.id}>
                <img src="https://images-na.ssl-images-amazon.com/images/I/91jzIGu5N-L._AC_AA100_.jpg" className="mr-3" alt="monitor"/>
                <div className="media-body">
                    <h5 className="mt-0"><a href="#">{product.title}</a></h5>
                    {product.desc}
                </div>
            </div>
        )
    });
}

class TrackOrder extends Component {
    constructor(props){
        super();
        props.pageActions.setPageInfo({
            title: 'Your Order Status',
            status: 'Pending'
        });
        this.orderId = props.match.params.id;
        this.state = {}
    }

    componentDidMount = () =>{
        if(_.isEmpty(this.props.order)){
            this.props.orderActions.getOrder(this.orderId).then(res =>{
                this.fillStepsTimer(2, 3);
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
        this.props.pageActions.setPageInfo({
            title: 'Your Order Status',
            status: 'Arrived'
        });
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

        setTimeout(()=>{
            let _steps = _.cloneDeep(this.props.order.steps),
            step = _.find(_steps, {'id': stepId});

            step.ticket.isResolved = true;
            step.isFilled = true;
            this.props.orderActions.updateOrderStatus(_steps);
            this.fillStepsTimer(stepId + 1, null);
        }, 1000);
    }

    handlePickupClick = () =>{
        window.location.href = `/schedule-pickup/${this.props.order.id}`;
    }

    render() {
        let products = this.props.order.products ? this.props.order.products : null;
        return products ? (
            <div className="status-container">
                <ProductPreview products={products}></ProductPreview>
                <div className="steps-container">
                    <Steps steps={this.props.order.steps} submitTicketFn={this.submitTicket}></Steps>
                    {this.state.isReadyForPickup ? 
                        <div className="mt-2 mb-3">
                            <button type="button" className="btn btn-primary btn-block btn-lg" onClick={()=>{this.handlePickupClick()}}>Schedule Pickup Date</button>
                        </div>
                    : null}
                </div>
            </div>
        ) : null
    }
}

function mapStateToProps(state, ownProps){
    return {
        order: state.order
    };
  }
 
  function mapDispatchToProps(dispatch){
   return {
     orderActions: bindActionCreators(orderActions, dispatch),
     pageActions: bindActionCreators(pageActions, dispatch)
   };
 }

export default connect(mapStateToProps, mapDispatchToProps)(TrackOrder);
