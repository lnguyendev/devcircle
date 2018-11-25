import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import './App.css';

import PrivateRoute from './components/common/PrivateRoute';

import NavBar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import AddExperience from './components/profile/AddExperience';
import AddEducation from './components/profile/AddEducation';
import Profiles from './components/profile/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/common/NotFound';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile/all" component={Profiles} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/profile/create"
                  component={CreateProfile}
                />
                <PrivateRoute
                  exact
                  path="/profile/edit"
                  component={EditProfile}
                />
                <PrivateRoute
                  exact
                  path="/experience/add"
                  component={AddExperience}
                />
                <PrivateRoute
                  exact
                  path="/education/add"
                  component={AddEducation}
                />
                <Route path="/profile/:handle" component={Profile} />
                <Route exact path="/not-found" component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
