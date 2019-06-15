import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as orderActions from '../actions/orderActions';
import * as pageActions from '../actions/pageActions';
import * as _ from 'lodash';
import Products from './Products';

const Order = (props) =>{
    let subTotal = parseFloat(_.sumBy(props.order.products, 'price')),
    fees = 7.43,
    total = parseFloat(subTotal) + fees;

    return (
        <div className="">
            <Products products={props.order.products} />
            <dl className="row">
            <dt className="col-sm-3">Delivery</dt>
                <dd className="col-sm-3">Your Desk</dd>
                <dd className="col-sm"><a href="#"><small>Change</small></a></dd>
            </dl>
            
            <dl className="row">
            <dt className="col-sm-3">Installation</dt>
                <dd className="col-sm-3">Contractor Provided</dd>
                <dd className="col-sm"><a href="#"><small>Change</small></a></dd>
            </dl>

            <p>
                <a className="" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    Approval & Contract Details
                </a> 
            </p>
        
            <div className="collapse" id="collapseExample">
                <dl className="row">
                <dt className="col-sm-3">Approval</dt>
                <dd className="col-sm">Manager Only</dd>
                </dl>
                
                <dl className="row">
                <dt className="col-sm-3">Contract</dt>
                <dd className="col-sm">CIO-CS</dd>
                </dl>
            </div>
                
            <p>
                <a className="" data-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample2">
                    Subtotal & Delivery Details
                </a> 
            </p>
                
            <div className="collapse" id="collapseExample2">
                <dl className="row">
                    <dt className="col-sm-3">Subtotal</dt>
                    <dd className="col-sm">${subTotal}</dd>
                </dl>
            
                <dl className="row">
                    <dt className="col-sm-3">Delivery & Installation</dt>
                    <dd className="col-sm">${fees}</dd>
                </dl>
            </div>
                
            <dl className="row mt-3">
                <dt className="col-sm-3">Total</dt>
                <dd className="col-sm"><strong className="text-success">${total.toFixed(2)}</strong></dd>
            </dl>
        </div>
    )
}

const SubmitOrderButton = (props) =>{
    return (
        <div className="mt-3">
            <button type="button" className="btn btn-primary btn-block btn-lg" onClick={()=>{props.submitOrderFn()}}>Place Order</button>
            <p className="mt-3">Forgot something? <a href="#">Continue shopping</a></p>  
        </div>
    )
}

class CheckOut extends Component {
    constructor(props){
        super();
        props.pageActions.setPageInfo({
            title: 'Your Cart',
            status: ''
        });
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
                        "title": "LG 24M47VQ 24-Inch LED-lit Monitor",
                        "desc": "Fulfilled by Acme Tech Inc.",
                        "price": 149.99,
                        "qty": 1
                    },
                    // {
                    //     "id": 2,
                    //     "title": "LG 26M47VQ 26-Inch LED-lit Monitor",
                    //     "desc": "Fulfilled by Acme Tech Inc.",
                    //     "price": 199.99,
                    //     "qty": 1
                    // }
                ],
                "steps":[
                    {
                        "id": 1,
                        "status": "Order placed",
                        "authority": "test_user1",
                        "timestamp": null,
                        "isPending": true,
                        "isFilled": false
                    },
                    {
                        "id": 2,
                        "status": "Manager Approved",
                        "authority": "Shaun Hernandez",
                        "timestamp": null,
                        "isPending": true,
                        "isFilled": false
                    },
                    {
                        "id": 3,
                        "status": "Contractor Fulfilled",
                        "authority": "Acme Tech Inc.",
                        "timestamp": null,
                        "isPending": true,
                        "isFilled": false
                    },
                    {
                        "id": 4,
                        "status": "Arrived for delivery and installation",
                        "authority": "CMS IT Depot",
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
            <div className="">
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
     orderActions: bindActionCreators(orderActions, dispatch),
     pageActions: bindActionCreators(pageActions, dispatch)
   };
 }

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
