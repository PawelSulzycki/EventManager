import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';
import moment from 'moment';
import { TimePicker } from 'antd';
import {Row ,Button, Form, FormControl, ControlLabel, Col, PageHeader} from 'react-bootstrap';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'antd/dist/antd.css';
import NumericInput from 'react-numeric-input';

class EditEvent extends React.Component {
    constructor(){
        super();
        this.state = {
            eventID: null,
            eventName: '',
            eventStartDate: '',
            eventEndDate: '',
            eventStartTime: '',
            eventEndTime: '',
            eventParticipantNumber: null,
            eventDescription: ''
        };
    }

    componentDidMount() {
        this.getEvent();
    }

    onChangeID = (event) =>{
        console.log(event.target);
        this.setState({eventID: event.target.options[event.target.selectedIndex].getAttribute('data-key')})
    }
    
    onChangeName = (event) =>{
        if(event.target.value !== "")
            this.setState({eventName: event.target.value});
    }

    onChangeParticipantNumber = (event) =>{
        if(event.target.value !== "")
            this.setState({eventParticipantNumber: event.target.value});
    }

    onChangeStartDate = (event) =>{
        window.confirm('onChangeStartDate');            
        var startDay = moment(event.target.startDate).format("YYYY-MM-DD").toString();
        this.setState({eventStartDate: startDay + "T" + moment(this.state.eventStartDate).format("HH:MM")}); 
    }

    onChangeEndDate = (event) =>{
        window.confirm('onChangeEndTime');
        var endDay = moment(event.target.endDate).format("YYYY-MM-DD").toString();
        this.setState({eventEndDate: endDay + "T" + moment(this.state.eventEndDate).format("HH:MM")});    
    } 

    onChangeDescription = (event) =>{
        if(event.target.value !== "")
            this.setState({eventDescription: event.target.value})
    }

    editEvent = () => {
        axios.put('/event', {ownerId: 1, id: this.state.eventID, name: this.state.eventName, participantNumber: this.state.eventParticipantNumber, startDate: this.state.eventStartDate, endDate: this.state.eventEndDate, description: this.state.eventDescription })
            .then(()=>{
                window.confirm('Wydarzenie zostało zedytowane poprawnie!');
            })
            .catch((err)=>{
                console.log(err);
            });
    }

    onChangeStartTime = (event) =>{   
        var startTime = moment(event).format("HH:mm:ss").toString();
        this.setState({eventStartDate: moment(this.state.eventStartDate).format("YYYY-MM-DD").toString() 
                        + "T" + startTime});
    }

    onChangeEndTime = (event) =>{      
        var endTime = moment(event).format("HH:mm:ss").toString();
        this.setState({eventEndDate: moment(this.state.eventEndDate).format("YYYY-MM-DD").toString() 
                        + "T" + endTime});
    }

    getEvent() {
        axios.get('/event/' + this.props.match.params.id)
            .then((response) => {
                this.setState({
                    eventID: this.props.match.params.id,
                    eventName: response.data.name,
                    eventStartDate: response.data.startDate,
                    eventEndDate: response.data.endDate,
                    eventParticipantNumber: response.data.participantNumber,
                    eventDescription: response.data.description,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return(

            this.state.eventStartDate && 
            <Form horizontal>

                <Row>
                 <Col sm={2}> </Col>
                 <Col sm={9}> 
                 <PageHeader > Edytuj wydarzenie</PageHeader> 
                 </Col>
                </Row>

                <Row>
                    <Row>
                        <Col componentClass={ControlLabel} sm={2}> Nazwa </Col>
                        <Col sm={9}>
                            <FormControl onBlur={this.onChangeName}
                             defaultValue={this.state.eventName} placeholder={this.state.eventName}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col componentClass={ControlLabel} sm={2}> Liczba uczestników </Col>
                        <Col sm={9}>
                        <NumericInput className="form-control" onBlur={this.onChangeParticipantNumber} min={ 0 }
                         defaultValue={this.state.eventParticipantNumber === null ? "" : this.state.eventParticipantNumber}
                         placeholder={this.state.eventParticipantNumber} />
                    </Col>
                    </Row>

                    <Row>
                        <Col componentClass={ControlLabel} sm={2}> Opis </Col>
                        <Col sm={9}>
                            <FormControl componentClass="textarea"
                                defaultValue={this.state.eventDescription}
                                placeholder={this.state.eventDescription}
                                onBlur={this.onChangeDescription}
                            />
                        </Col> 
                    </Row>

                    <Row>
                        <Col componentClass={ControlLabel} sm={2}> Czas rozpoczęcia  </Col>
                        <Col sm={9}>
                            <TimePicker onChange={this.onChangeStartTime}
                            placeholder={moment(this.state.eventStartDate).format("HH:mm").toString()} 
                            format={"HH:mm"} 
                            minuteStep={5} />
                        </Col>
                    </Row>

                    <Row>
                        <Col componentClass={ControlLabel} sm={2}> Czas zakończenia </Col>
                        <Col sm={9}>
                            <TimePicker onChange={this.onChangeEndTime} 
                            format={"HH:mm"} 
                            placeholder={moment(this.state.eventEndDate).format("HH:mm").toString()}
                            minuteStep={5} />
                        </Col> 
                    </Row>

                    <Row>
                        <Col componentClass={ControlLabel} sm={2}> Data rozpoczęcia oraz zakończenia </Col>
                        <Col sm={9}>
                            <DateRangePicker
                                startDateId = "1"
                                endDateId = "1"
                                displayFormat="YYYY-MM-DD"
                                startDate={moment(this.state.eventStartDate)}
                                endDate={moment(this.state.eventEndDate)}
                                onDatesChange={({startDate, endDate}) => 
                                this.setState({eventStartDate: startDate, eventEndDate: endDate})}
                                focusedInput={this.state.focusedInput}
                                onFocusChange={focusedInput => this.setState({focusedInput})}
                            />
                        </Col>
                    </Row>
                </Row>

                <Row>
                    <br></br>
                    <Col sm={2}></Col>
                    <Button onClick={this.editEvent} className="btn btn-primary">Zapisz</Button>
                    <Link to={"/NewLecture/" + this.state.eventID}>
                        <Button className="btn btn-primary"> Dodaj wykład do wydarzenia </Button>
                    </Link>
                </Row>
            </Form>
        );
    }
}

export default withRouter(EditEvent);