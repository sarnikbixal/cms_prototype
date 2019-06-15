import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import CheckOut from './CheckOut';
import OrderConfirm from './OrderConfirm';
import TrackOrder from './TrackOrder';
import Schedule from './Schedule';

const Routes = (props) => {
    return (
        <div className="container">
            <Switch>
                <Route exact path="/" render={(props) => <CheckOut pageTitle={'Check Out'} {...props}/>} >
                    <Route exact path="/checkout" render={(props) => <CheckOut {...props}/>} />
                </Route>
                <Route exact path="/order-confirmation/:id" render={(props) => <OrderConfirm {...props}/>} />
                <Route exact path="/order-status/:id" render={(props) => <TrackOrder {...props}/>} />
                <Route exact path="/schedule-pickup/:id" render={(props) => <Schedule {...props}/>} />
            </Switch>
        </div>
    )
};

export default Routes;