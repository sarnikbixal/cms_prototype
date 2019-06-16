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
            res.json({error: 'No Request Found'});
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
            const uuidv1 = require('uuid/v1');
            let order = req.body.params.order,
            date = moment(req.body.params.date),
            productDesc = '';

            _.each(order.products, (product) => {
                productDesc += ` ${product.title}`;
            });

            let guid = uuidv1(),
            summary = `Delivery for Request #${order.id}`,
            desc = `Glenda Rahman will deliver and install your item: ${productDesc}`,
            location = 'Your Desk',
            categories = 'cms,delivery,prototype',
            timestamp = `${moment(new Date()).utc().format('YYYYMMDDTHHmm00')}Z`,
            startDate = `${date.utc().format('YYYYMMDDTHHmm00')}Z`,
            duration = '30M';

            let template =
            'BEGIN:VCALENDAR\r\n' + 
            'VERSION:2.0\r\n' + 
            'CALSCALE:GREGORIAN\r\n' + 
            'PRODID:bixal/ics\r\n' + 
            'METHOD:PUBLISH\r\n' + 
            'X-PUBLISHED-TTL:PT1H\r\n' + 
            'BEGIN:VEVENT\r\n' + 
            `UID:${guid}\r\n` + 
            'X-WR-TIMEZONE:America/Los_Angeles\r\n' + 
            'TZID:America/New_York\r\n' + 
            `SUMMARY:${summary}\r\n` + 
            `DTSTAMP:${timestamp}\r\n` + 
            `DTSTART:${startDate}\r\n` + 
            `DESCRIPTION:${desc}\r\n` + 
            `LOCATION:${location}\r\n` + 
            'STATUS:CONFIRMED\r\n' + 
            `CATEGORIES:${categories}\r\n` + 
            'ORGANIZER;CN=Admin:mailto:justin.sarnik@bixal.com\r\n' + 
            `ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=${order.user.username} (${order.user.lastName}, ${order.user.firstName}):mailto:${order.user.email}\r\n` + 
            `DURATION:PT${duration}\r\n` + 
            'END:VEVENT\r\n' + 
            'END:VCALENDAR\r\n'
            ;

            const { writeFileSync } = require('fs');
            const filePath = `${__dirname}/event.ics`;
            writeFileSync(filePath, template);
            res.json({filePath: filePath});
        }catch(ex){
            console.log(ex);
            res.json({error: ex});
        }
    }
}
exports.configure = configure;