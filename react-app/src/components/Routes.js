import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import CheckOut from './CheckOut';
import OrderConfirm from './OrderConfirm';
import TrackOrder from './TrackOrder';
// import Schedule from './Schedule';
// import PickupConfirm from './PickupConfirm';

const Routes = (props) => {
    return (
        <div className='main-content'>
            <Switch>
                <Route exact path="/" render={(props) => <CheckOut {...props}/>} >
                    <Route exact path="/checkout" render={(props) => <CheckOut {...props}/>} />
                </Route>
                <Route exact path="/order-confirmation/:id" render={(props) => <OrderConfirm {...props}/>} />
                <Route exact path="/order-status/:id" render={(props) => <TrackOrder {...props}/>} />
                {/*
            
                <Route exact path="/schedule-pickup" render={(props) => <Schedule {...props}/>} />
                <Route exact path="/confirm-pickup" render={(props) => <PickupConfirm {...props}/>} />
                <Redirect to="/" />
                */}
            </Switch>
        </div>
    )
};

export default Routes;