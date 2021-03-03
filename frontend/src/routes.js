import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import RegistrationForm from "./containers/Signup";
import ListEmployeeComponent from "./containers/ListEmployeeComponent";


const BaseRouter = () => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route exact path="/" component={RegistrationForm} />
    <Route path="/user-list" component={ListEmployeeComponent} />
  </Hoc>
);

export default BaseRouter;
