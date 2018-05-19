import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomeNavbar from './components/Navbar';
import Event from './components/Event';
import {Label, FormControl, Button, ButtonToolbar} from 'react-bootstrap';
import NewEvent from './components/NewEvent';
import NewLecture from './components/NewLecture';
import NewReview from './components/NewReview';
import EditLecture from './components/EditLecture';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
render() {
  return (
      <div className="App">
        <BrowserRouter>
          <div>
              <Route path='/newEvent' component={NewEvent}/>
              <Route path='/newLecture' component={NewLecture}/>
              <Route path='/newReview' component={NewReview}/>
              <Route path='/editLecture' component={EditLecture}/>
              <Route exact path='/' component={Event}/>
          </div>
        </BrowserRouter>
      </div>
  );
}
}

export default App;
