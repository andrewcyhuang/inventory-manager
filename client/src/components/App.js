import React from 'react';
import '../styles/App.css';
import MainPage from './pages/MainPage';
import OrderPage from './pages/OrderPage';
import { Route, Switch } from 'react-router-dom';
import NavigationBar from './common/NavigationBar';
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
            <Route path='/' component={MainPage} exact/>
            <Route path='/orders' component={OrderPage} exact/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
