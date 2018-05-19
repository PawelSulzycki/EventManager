import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class NewReview extends React.Component {
    constructor()
    {
        super();
        this.state = {
            nickname: '',
            rate:0,
            comment: '',
            lectureId:0,
            reviewerId: 0
        };
    }

    onChangeName = (review) =>{
        this.setState({nickname: review.target.value})
    }

    onChangeRate = (review) =>{
        this.setState({rate: review.target.value})
    }

    onChangeComment = (review) =>{
        this.setState({comment: review.target.value})
    }

    onChangeLectureId = (review) =>{
        this.setState({lectureId: review.target.value})
    }


    addReview = () => {
        axios.post('/review', {nickname: this.state.nickname, rate: this.state.rate, comment: this.state.comment, lectureId: this.state.lectureId, reviewerId: this.state.reviewerId})
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
                    <h1>Dodawanie opinii</h1>
                    <input onChange={this.onChangeName} value={this.state.nickname} placeholder="Podaj swoj nick" className="form-control"/>
                    <input onChange={this.onChangeRate} value={this.state.rate} placeholder="Podaj ocene w skali 1-10" className="form-control"/>
                    <input onChange={this.onChangeComment} value={this.state.comment} placeholder="Podaj komentarz" className="form-control"/>
                    <input onChange={this.onChangeLectureId} value={this.state.lectureId} placeholder="Podaj id wykladu" className="form-control"/>
                    <button onClick={this.addReview} className="btn btn-info">Dodaj opinie!</button>
                </div>
                <div className="container-fluid">
                </div>
            </div>
        );
    }
}

export default withRouter(NewReview);