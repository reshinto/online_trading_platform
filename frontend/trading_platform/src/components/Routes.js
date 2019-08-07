import React from "react";
import { Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Chart from "../pages/Chart";
import Company from "../pages/Company";
import Financials from "../pages/Financials";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/Dashboard" component={Dashboard} />
    <Route exact path="/Chart" component={Chart} />
    <Route exact path="/Company" component={Company} />
    <Route exact path="/Financials" component={Financials} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
  </div>
);

export default BaseRouter;
