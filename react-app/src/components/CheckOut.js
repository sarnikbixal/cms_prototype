import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as orderActions from '../actions/orderActions';
import * as _ from 'lodash';
import Products from './Products';

const Order = (props) =>{
    return (
        <div className="order">
            <Products products={props.order.products} />
        </div>
    )
}

const SubmitOrderButton = (props) =>{
    return (
        <button className="button btn-success btn-block btn-lg" onClick={()=>{props.submitOrderFn()}}>
            PLACE ORDER
        </button>
    )
}

class CheckOut extends Component {
    constructor(props){
        super();
        this.state = {
            isPlaced: false,
            order: {
                "id": 1,
                "placedDate": null,
                "lastUpdateDate": null,
                "user":{
                    "username": "test_user1",
                    "firstName": "justin",
                    "lastName": "sarnik",
                    "email": "justin.sarnik@bixal.com"
                },
                "products":[
                    {
                        "id": 1,
                        "title": "AOC 22\" MONITOR",
                        "desc": "AOC 22\" MONITOR, AOC 22\" MONITOR, AOC 22\" MONITOR, AOC 22\" MONITOR, AOC 22\" MONITOR, AOC 22\" MONITOR"
                    },
                    {
                        "id": 2,
                        "title": "MacBook Keyboard",
                        "desc": "MacBook Keyboard, MacBook Keyboard, MacBook Keyboard, MacBook Keyboard, MacBook Keyboard, MacBook Keyboard"
                    }
                ],
                "steps":[
                    {
                        "id": 1,
                        "status": "Ordered",
                        "timestamp": null,
                        "isPending": true,
                        "isFilled": false
                    },
                    {
                        "id": 2,
                        "status": "Reviewed",
                        "timestamp": null,
                        "isPending": true,
                        "isFilled": false
                    },
                    {
                        "id": 3,
                        "status": "Signed-Off",
                        "timestamp": null,
                        "isPending": true,
                        "isFilled": false
                    },
                    {
                        "id": 4,
                        "status": "Ready For Pickup",
                        "timestamp": null,
                        "isPending": true,
                        "isFilled": false
                    },
                    {
                        "id": 5,
                        "status": "Delivered",
                        "timestamp": null,
                        "isPending": true,
                        "isFilled": false
                    }
                ]
            }
        }
    }

    placeOrder = () =>{
        this.props.orderActions.placeOrder(this.state.order).then(res =>{
            this.setState({
                order: res,
                isPlaced: true
            });
            window.location.href = `/order-confirmation/${res.id}`;
        }).catch(err=>{
            console.log(err)
        })
    }

    render() {
        return(
            <div className="order-container">
                <div className="mt-2 mb-3">
                    <p>We come to you when you're ready. Pick a time and a technician will show up with your order and help you get everything set up.</p>
                    <p>Here are some times that appear to be free on your calendar:</p>
                </div>
                <Order order={this.state.order}></Order>
                <SubmitOrderButton submitOrderFn={this.placeOrder}></SubmitOrderButton>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        order: state.order
    };
  }
 
  function mapDispatchToProps(dispatch){
   return {
     orderActions: bindActionCreators(orderActions, dispatch)
   };
 }

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
