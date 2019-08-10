import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (auth.loading) return <div>loading...</div>
      else if (!auth.isAuthenticated) return <Redirect to="/dashboard" />;
      else return <Component {...props} />;
    }}
  />
);

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps)(PrivateRoute);
