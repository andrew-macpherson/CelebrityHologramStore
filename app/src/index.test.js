import React from 'react';
import ReactDOM from 'react-dom';
import {Route,Redirect} from 'react-router-dom';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';

// Import Store
import configureStore from './store/configureStore';

//Import History Component
import history from './utils/history';


//Import Page Components
import Index from 'pages/index.js';
import Login from 'pages/login.js';

import Dashboard from 'pages/dashboard/index.js';

let store = configureStore();


class App extends React.Component {

  render() {
    return (
      <div>
        <Route exact={true} path="/" component={Index} />
        <Route exact={true} path="/login" component={Login} />

        <PrivateRoute exact={false} path="/dashboard" component={Dashboard}/>
      </div>
    )
  }
}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    //auth.loggedIn() ? (
      <Component {...props}/>
    //) : (
    //  <Redirect to={{
    //    pathname: '/'
    //  }}/>
    //)
  )}/>
)


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}>
    <Router history={history}>
        <App />
    </Router>
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});