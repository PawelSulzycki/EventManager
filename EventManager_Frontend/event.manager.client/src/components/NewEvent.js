import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import {BASE_URL} from '../constants';

class NewEvent extends React.Component {
    constructor()
    {
        super();
        this.state = {
            name: '',
            startDate: '',
            endDate: '',
            participantNumber:0,
            description: '',
            eventId:0,
        };
    }

    onChangeName = (event) =>{
        this.setState({name: event.target.value})
    }

    onChangeParticipantNumber = (event) =>{
        this.setState({participantNumber: event.target.value})
    }

    onChangeStartDate = (event) =>{
        this.setState({startDate: event.target.value})
    }

    onChangeEndDate = (event) =>{
        this.setState({endDate: event.target.value})
    }

    onChangeDescription = (event) =>{
        this.setState({description: event.target.value})
    }

    addEvent = () => {
        axios.post('/event', {eventId: this.state.eventId ,ownerId: 1, name: this.state.name, participantNumber: this.state.participantNumber, startDate: this.state.startDate, endDate: this.state.endDate, description: this.state.description })
            .then(()=>{
            })
            .catch((err)=>{
                console.log(err);
            });
    }


    render() {
        return (
            <div>
                <div>
                    <h1>Dodawanie wydarzenia</h1>
                    <input onChange={this.onChangeName} value={this.state.name} placeholder="Podaj nazwę konferencji" className="form-control"/>
                    <input onChange={this.onChangeParticipantNumber} value={this.state.participantNumber} placeholder="Podaj liczbę uczestników" className="form-control"/>
                    <input onChange={this.onChangeStartDate} value={this.state.startDate} placeholder="Podaj datę startu" className="form-control"/>
                    <input onChange={this.onChangeEndDate} value={this.state.endDate} placeholder="Podaj endDate" className="form-control"/>
                    <input onChange={this.onChangeDescription} value={this.state.description} placeholder="Podaj opis" className="form-control"/>
                    <button onClick={this.addEvent} className="btn btn-info">Dodaj wydarzenie!</button>
                </div>
                <div className="container-fluid">
                </div>
            </div>
        );
    }
}

export default withRouter(NewEvent);
