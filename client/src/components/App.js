import React from 'react';
import '../styles/App.css';
import OrderView from './OrderView';
import MainView from './MainView';
import { Route, Switch } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <header>
        <NavigationBar/>
      </header>
      <br/>
      <Container>
        <Switch>
            <Route path='/' component={MainView} exact/>
            <Route path='/orders' component={OrderView} exact/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
