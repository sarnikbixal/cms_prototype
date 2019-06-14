import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as orderActions from '../actions/orderActions';
import * as _ from 'lodash';
import Products from './Products';

class OrderConfirm extends Component {
    constructor(props){
        super();
        this.orderId = props.match.params.id;
        this.state = {
            
        }
    }

    componentDidMount = () =>{
        this.props.orderActions.getOrder(this.orderId).then(res =>{
            console.log(res);
            this.setState({
                order: res
            });
        }).catch(err=>{
            console.log(err)
        })
    }

    render() {
        return(
            <div className="order-confirm-container">
                <div>Confirm Order</div>
                <div>Your Order Has Been Placed: </div>
                <Products products={this.props.order.products}></Products>
                <a href={`/order-status/${this.props.order.id}`}>track order</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirm);
