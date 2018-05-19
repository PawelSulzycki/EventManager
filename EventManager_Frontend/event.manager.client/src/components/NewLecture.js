import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class NewLecture extends React.Component {
    constructor()
    {
        super();
        this.state = {
            name: '',
            startdate: '',
            endDate: '',
            participantNumber:null,
            description: '',
            eventId: null
        };
    }

    onChangeName = (event) =>{
        this.setState({name: event.target.value})
    }

    onChangeParticipantNumber = (event) =>{
        this.setState({participantNumber: event.target.value})
    }

    onChangeStartDate = (event) =>{
        this.setState({startdate: event.target.value})
    }

    onChangeEndDate = (event) =>{
        this.setState({endDate: event.target.value})
    }

    onChangeDescription = (event) =>{
        this.setState({description: event.target.value})
    }
    onChangeEventId = (event) =>{
        this.setState({eventId: event.target.value})
    }

    addEvent = () => {
        axios.post('/lecture', {ownerId: 1, eventId: this.state.eventId, name: this.state.name, participantNumber: this.state.participantNumber, startDate: this.state.startdate, endDate: this.state.endDate, description: this.state.description})
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
                    <h1>Dodawanie wykładu</h1>
                    <input onChange={this.onChangeName} value={this.state.name} placeholder="Podaj nazwę wykładu" className="form-control"/>
                    <input onChange={this.onChangeParticipantNumber} value={this.state.participantNumber} placeholder="Podaj liczbę uczestników" className="form-control"/>
                    <input onChange={this.onChangeStartDate} value={this.state.startdate} placeholder="Podaj datę startu" className="form-control"/>
                    <input onChange={this.onChangeEndDate} value={this.state.endDate} placeholder="Podaj datę zakończenia" className="form-control"/>
                    <input onChange={this.onChangeDescription} value={this.state.description} placeholder="Podaj opis" className="form-control"/>
                    <input onChange={this.onChangeEventId} value={this.state.eventId} placeholder="Podaj id wydarzenia" className="form-control"/>
                    <button onClick={this.addEvent} className="btn btn-info">Dodaj wykład!</button>
                </div>
                <div className="container-fluid">
                </div>
            </div>
        );
    }
}

export default withRouter(NewLecture);