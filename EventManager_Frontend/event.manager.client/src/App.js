import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomeNavbar from './components/Navbar';
import Event from './components/Event';
import {Label, FormControl, Button, ButtonToolbar} from 'react-bootstrap';
import NewEvent from './components/NewEvent';
import NewLecture from './components/NewLecture';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
render() {
  return (
      <div className="App">
        <BrowserRouter>
          <div>
              <Route path='/newEvent' component={NewEvent}/>
              <Route path='/newLecture' component={NewLecture}/>
              <Route exact path='/' component={NewLecture}/>
          </div>
        </BrowserRouter>
      </div>
  );
}
}

export default App;
