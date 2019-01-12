import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../actions/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isLoggedIn()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object
};

export default PrivateRoute;