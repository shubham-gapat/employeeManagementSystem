import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import RegistrationForm from "./containers/Signup";
import ListEmployeeComponent from "./containers/ListEmployeeComponent";
import WrappedForm from "./containers/Checkout"

const BaseRouter = () => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route exact path="/" component={RegistrationForm} />
    <Route path="/user-list" component={ListEmployeeComponent} />
    <Route path="/checkout" component={WrappedForm} />
  </Hoc>
);

export default BaseRouter;
