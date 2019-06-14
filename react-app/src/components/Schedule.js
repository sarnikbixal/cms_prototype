import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as orderActions from '../actions/orderActions';
import * as notificationActions from '../actions/notificationActions';
import * as _ from 'lodash';
import * as moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';

const tsFormat = (date) => moment(date).format('M/DD/YY hh:mm A').trim();
const tsFormatDay = (date) => moment(date).format('dddd - M/DD/YY').trim();
const tsTimeFormat = (date) => {
       return `${moment(date).format('h').trim()} - ${moment(date).add(30, 'minutes').format('hh:mm A').trim()}`;
}

const DatePicker = (props) =>{
    return (
        <MuiPickersUtilsProvider utils={props.utils}>
            <Grid container className={props.classes} justify="space-around">
                <KeyboardDatePicker
                    margin="normal"
                    id="mui-pickers-date"
                    label="Select Date"
                    value={props.selectedDate}
                    onChange={props.handleDateChange}
                    KeyboardButtonProps={{
                    'aria-label': 'select date',
                    }}
                />
                <KeyboardTimePicker
                    margin="normal"
                    id="mui-pickers-time"
                    label="Select Time"
                    value={props.selectedDate}
                    onChange={props.handleDateChange}
                    KeyboardButtonProps={{
                    'aria-label': 'select time',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    )
}

const Radios = (props) =>{
    let times = [
        new Date('2019-06-25 12:00:00 PM'),
        new Date('2019-06-25 3:00:00 PM'),
        new Date('2019-06-26 9:00:00 AM')
    ];
    return _.map(times, (time)=>{
        return(
            <label className="btn btn-outline-secondary btn-block text-left font-weight-bolder" key={time.getTime()}>
            <input type="radio" autoComplete="off" name="time" id="time1" onClick={()=>{props.handleDateChange(time)}} /> {tsFormatDay(time)} <br/>
                    <small className="font-weight-normal pl-4">{tsTimeFormat(time)}</small>
            </label>
        )
    })
}

class Schedule extends Component {
    constructor(props){
        super(props);
        this.orderId = props.match.params.id;
        this.state = {
            selectedDate: new Date().getTime()
        }
        this.classes = makeStyles({
            grid: {
              width: '60%',
            },
          });
    }


    componentDidMount = () =>{
        if(_.isEmpty(this.props.order)){
            this.props.orderActions.getOrder(this.orderId).then(res =>{

            }).catch(err=>{

            })
        }
    }

    handleDateChange = (date) =>{
        this.setState({
            selectedDate: date
        })
    }

    handleConfirm = () =>{
        this.props.orderActions.createICS(this.props.order, this.state.selectedDate).then(res => {
            this.setState({
                isReadyForDownload: true
            })
        }).catch(err => {

        })
    }

    handleDownloadICS = () =>{
        window.location.href = `http://localhost:3001/api/downloadICS`;
    }

    handleChooseDate = () =>{
        this.setState({
            isShowDatePicker: true
        })
    }

    render() {
        console.log(this.state.selectedDate)
        return(
            <div className="schedule-container">

                <div className="mt-2 mb-3">
                    <p>We come to you when you're ready. Pick a time and a technician will show up with your order and help you get everything set up.</p>
                    <p>Here are some times that appear to be free on your calendar:</p>
                    <p>{tsFormat(this.state.selectedDate)}</p>
                </div>
                
                
                <div>
                    <Radios handleDateChange={this.handleDateChange}></Radios>
                </div>
                        
                    
                <div className="container">
                    {this.state.isShowDatePicker ?
                        <DatePicker utils={DateFnsUtils} classes={this.classes} selectedDate={this.state.selectedDate} handleDateChange={this.handleDateChange}></DatePicker>
                    : null}
                    {this.state.isReadyForDownload ?
                        <button  type="button" className="btn btn-primary btn-block btn-lg" onClick={()=>{this.handleDownloadICS()}}>Download ICS</button>
                    : <button type="button" className="btn btn-primary btn-block btn-lg" onClick={()=>{this.handleConfirm()}}>Set Delivery Time</button>}
                    <p className="mt-3">None of these work? <a href="#" onClick={()=>{this.handleChooseDate()}}>Find another time</a></p>  
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        order: state.order,
        notifications: state.notifications
    };
  }
 
  function mapDispatchToProps(dispatch){
   return {
     orderActions: bindActionCreators(orderActions, dispatch),
     notificationActions: bindActionCreators(notificationActions, dispatch),
   };
 }

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
