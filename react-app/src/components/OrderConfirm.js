import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as orderActions from '../actions/orderActions';
import * as pageActions from '../actions/pageActions';
import * as _ from 'lodash';

class OrderConfirm extends Component {
    constructor(props){
        super();
        props.pageActions.setPageInfo({
            title: 'Order Confirmation',
            status: ''
        });
        this.orderId = props.match.params.id;
        this.state = {
            
        }
    }

    componentDidMount = () =>{
        this.props.orderActions.getOrder(this.orderId).then(res =>{
            this.setState({
                order: res
            });
        }).catch(err=>{
            console.log(err)
        })
    }

    handleButtonClick = () => {
        window.location.href = `/order-status/${this.props.order.id}`;
    }

    render() {
        return(
          <div className="">
           
            <div className="mt-2 mb-3">
                <p className="lead">Woot! Your order has been placed.</p>
            </div>
            
            <div className="text-center mb-3">
              <div className="row">
              <div className="col display-3">
               <i className="fa fa-thumbs-o-up text-success"></i>
              </div>
              <div className="col">
                <img src="https://images-na.ssl-images-amazon.com/images/I/91jzIGu5N-L._AC_AA100_.jpg" className="mr-3" alt="monitor"/>
              </div>
            </div>
            
          </div>
            
            <h2>What happens next?</h2>
            <ol>
              <li>You'll receieve an email with confirmation of your order.</li>
              <li>The email will include a link for you to <a href="#" onClick={()=>{this.handleButtonClick()}}>check the status</a> of your order.</li>
              <li>We'll let you know when your order is ready for delivery and installation.</li>
            </ol>
            
            <p className="mt-3">Have a question or need to change something? <a href="">Contact our Delivery & Installation team</a></p>
            
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirm);
