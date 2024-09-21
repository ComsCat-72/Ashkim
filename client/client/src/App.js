import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/chat';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/chat/:groupId" component={Chat} />
          <Route path="/" exact component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
