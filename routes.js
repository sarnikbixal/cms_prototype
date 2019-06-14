"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express'),
_ = require('lodash'),
fs = require('fs'),
path = require('path');

function configure(app) {
    var router = express.Router();
    app.use('/api', router);

    router.post('/placeOrder', placeOrder);
    router.post('/getOrder', getOrder);
   
    function placeOrder(req, res, next){
        res.status(200);
        try{

            let api = require('./api.json'),
            now = new Date().getTime(),
            order = req.body.params.order

            order.placedDate = now;
            order.lastUpdateDate = now;

            let step = _.find(order.steps, {'status': 'Ordered'});
            step.timestamp = now;
            step.isPending = false;
            step.isFilled = true;
            api.orders[`order_${order.id}`] = order;

            // api.orders[`order_${order.id}`] = order = {
            //     id: 1,
            //     placedDate: null,
            //     lastUpdateDate: null,
            //     user:{
            //         username: 'test_user1',
            //         firstName: 'test',
            //         lastName: 'user',
            //         email: 'test_user@email.com'
            //     },
            //     products:[
            //         {
            //             id: 1,
            //             title: 'AOC 22" MONITOR',
            //             desc: 'AOC 22" MONITOR, AOC 22" MONITOR, AOC 22" MONITOR, AOC 22" MONITOR, AOC 22" MONITOR, AOC 22" MONITOR'
            //         },
            //         {
            //             id: 2,
            //             title: 'MacBook Keyboard',
            //             desc: 'MacBook Keyboard, MacBook Keyboard, MacBook Keyboard, MacBook Keyboard, MacBook Keyboard, MacBook Keyboard'
            //         }
            //     ],
            //     steps:[
                    
            //     ]
            // }

            fs.writeFile(path.join(__dirname, '/api.json'), JSON.stringify(api), (err) => {  
                if (err){
                    res.json({error: err});
                }else{
                    res.json(order);
                }
            });
        }
        catch(ex){
            console.log(ex);
            res.json({error: ex});
        }
    };

    function getOrder(req, res, next){
        res.status(200);
        let api = require('./api.json'),
        order = api.orders[req.body.params.orderId];

        if(order){
            res.json(order);
        }else{
            res.json({error: 'No Order Found'});
        }
    };
}
exports.configure = configure;