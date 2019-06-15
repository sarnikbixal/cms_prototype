"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express'),
_ = require('lodash'),
fs = require('fs'),
path = require('path'),
mime = require('mime'),
moment = require('moment');

function configure(app) {
    var router = express.Router();
    app.use('/api', router);

    router.post('/placeOrder', placeOrder);
    router.post('/getOrder', getOrder);
    router.post('/createICS', createICS);
    router.get('/downloadICS', downloadICS);
   
    function placeOrder(req, res, next){
        res.status(200);
        try{

            let api = require('./api.json'),
            now = new Date().getTime(),
            order = req.body.params.order

            order.placedDate = now;
            order.lastUpdateDate = now;

            let step = _.find(order.steps, {'id': 1});
            step.timestamp = now;
            step.isPending = false;
            step.isFilled = true;
            api.orders[`order_${order.id}`] = order;

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

    function downloadICS(req, res, next){
        let file = __dirname + '/event.ics',
        filename = path.basename(file),
        mimetype = mime.getType(file),
        filestream = fs.createReadStream(file);
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);
        filestream.pipe(res);

        res.download(`${__dirname}/event.ics`);
    }

    function createICS(req, res, next){
        res.status(200);
        try{
            let order = req.body.params.order,
            date = moment(req.body.params.date),
            productDesc = 'Items:';

            _.each(order.products, (product) => {
                productDesc += ` ${product.title};`;
            });
            
            const ics = require('ics')
            const event = {
            start: [date.year(), date.format('M'), date.format('D'), date.format('h'), date.format('m')],
            duration: { hours: 0, minutes: 30 },
            title: `Pickup For Order #: ${order.id}`,
            description: `Pickup For Order #: ${order.id}: ${productDesc}`,
            location: 'CMS IT Service Desk - 3rd floor',
            url: '',
            geo: {},
            categories: ['cms', 'pickup', 'prototype'],
            status: 'CONFIRMED',
            organizer: { name: 'Admin', email: order.user.email },
            attendees: [
                    { name: `${order.user.username} (${order.user.lastName}, ${order.user.firstName})`, email: order.user.email, rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' }
                ]
            }
            
            ics.createEvent(event, (error, value) => {
            if (error) {
                return res.json({error: error});
            }else{
                const { writeFileSync } = require('fs');
                const filePath = `${__dirname}/event.ics`;
                writeFileSync(filePath, value);
                res.json({filePath: filePath});
            }

            });
        }catch(ex){
            console.log(ex);
            res.json({error: ex});
        }
    }
}
exports.configure = configure;