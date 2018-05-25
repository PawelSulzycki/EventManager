import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';
import {Form, FormGroup, FormControl, ControlLabel, Col, PageHeader} from 'react-bootstrap';

class NewEvent extends React.Component {
    constructor()
    {
        super();
        this.state = {
            name: '',
            startDate: '',
            endDate: '',
            startTime: '',
            endTime: '',
            participantNumber: null,
            description: '',
            focusedInput: null
        };
    }


    onChangeName = (event) =>{
        this.setState({name: event.target.value})
    }

    onChangeParticipantNumber = (event) =>{
        this.setState({participantNumber: event.target.value})
    }

    onChangeStartTime = (event) =>{
        this.setState({startTime: moment(event).format("HH:mm:ss").toString()});
    }

    onChangeEndTime = (event) =>{
        this.setState({endTime: moment(event).format("HH:mm:ss").toString()});
    }

    onChangeDescription = (event) =>{
        this.setState({description: event.target.value})
    }


    addEvent = () => {
        if( this.state.startTime==="" || this.state.startDate==="" || this.state.endTime===""|| this.state.endDate===""){
            window.confirm("Należy wypełnić wszystkie pola!");
        }

        let startTmp = (moment(this.state.startDate).format("YYYY-MM-DD").toString() + "T" + this.state.startTime);
        let endTmp =  (moment(this.state.endDate).format("YYYY-MM-DD").toString() + "T" + this.state.endTime);

        axios.post('/event', {ownerId: 1, name: this.state.name, participantNumber: this.state.participantNumber, startDate: startTmp, endDate: endTmp, description: this.state.description })
            .then(()=>{
                window.confirm('Wydarzenie zostało utworzone poprawnie!');
            })
            .catch((err)=>{
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <Form horizontal>
                    <FormGroup>
                        <Col sm={2}> </Col>
                        <Col sm={9}>
                            <PageHeader > Dodawanie wydarzenia:</PageHeader>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}> Nazwa </Col>
                        <Col sm={9}>
                            <FormControl onBlur={this.onChangeName} defaultValue={this.state.name} placeholder={this.state.name}/>
                        </Col>

                        <Col componentClass={ControlLabel} sm={2}> Liczba uczestników </Col>
                        <Col sm={9}>
                            <FormControl onBlur={this.onChangeParticipantNumber}
                                         defaultValue={this.state.participantNumber === null ? "" : this.state.participantNumber}
                                         placeholder={this.state.participantNumber}
                            />
                        </Col>

                        <Col componentClass={ControlLabel} sm={2}> Opis </Col>
                        <Col sm={9}>
                            <FormControl componentClass="textarea"
                                         placeholder={this.state.description}
                                         onBlur={this.onChangeDescription}
                            />
                        </Col>

                        <Col componentClass={ControlLabel} sm={2}> Czas rozpoczęcia  </Col>
                        <Col sm={9}>
                                <TimePicker onChange={this.onChangeStartTime} defaultValue={moment('12:08', "HH:mm")} format={"HH:mm"} minuteStep={5} />
                        </Col>

                        <Col componentClass={ControlLabel} sm={2}> Czas zakończenia </Col>
                        <Col sm={9}>
                                <TimePicker onChange={this.onChangeEndTime} defaultValue={moment('12:08', "HH:mm")} format={"HH:mm"} minuteStep={5} />
                        </Col>

                        <Col componentClass={ControlLabel} sm={2}> Data rozpoczęcia oraz zakończenia </Col>
                        <Col sm={9}>
                            <DateRangePicker
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onDatesChange={({ startDate, endDate }) => this.setState({startDate, endDate})}
                                focusedInput={this.state.focusedInput}
                                onFocusChange={focusedInput => this.setState({ focusedInput })}
                            />
                        </Col>

                    </FormGroup>

                    <FormGroup>
                        <Col sm={2}></Col>
                        <Col sm={4}>
                            <button onClick={this.addEvent} className="btn btn-info">Dodaj wydarzenie!</button>
                        </Col>
                        <Col sm={1}></Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default withRouter(NewEvent);
