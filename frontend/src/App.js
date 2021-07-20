import React from 'react';
import Navbar  from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Sights from './components/pages/Sights.js';
import Events from './components/pages/Events';
import SignUp from './components/pages/SignUp';


function App() {
  return (
    <> 
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/sights' exact component={Sights} />
        <Route path='/events' exact component={Events} />
        <Route path='/signup' exact component={SignUp} />
      </Switch>
    </Router>     
      
    </>
  );
}

export default App;
