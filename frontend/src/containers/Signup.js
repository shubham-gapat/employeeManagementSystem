import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Link, Redirect} from "react-router-dom";
import { authSignup } from "../store/actions/auth";

class RegistrationForm extends React.Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address:"",
    dob:"",
    company:""
  };

  handleSubmit = e => {
    e.preventDefault();
    const { firstname,lastname,email,password,address,dob,company } = this.state;
    this.props.signup(firstname,lastname,email,password,address,dob,company);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { firstname,lastname,email,password,address,dob,company } = this.state;
    const { error, loading,status_code  } = this.props;
    if (status_code) {
      return <Redirect to="/login" />;
    }
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Signup to your account
          </Header>
          {error && <p>{this.props.error.message}</p>}

          <React.Fragment>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  onChange={this.handleChange}
                  value={firstname}
                  name="firstname"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Enter first name"
                />
                <Form.Input
                  onChange={this.handleChange}
                  value={lastname}
                  name="lastname"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Eter last name"
                />
                <Form.Input
                  onChange={this.handleChange}
                  value={email}
                  name="email"
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="Enter E-mail address"
                />
                <Form.Input
                  onChange={this.handleChange}
                  fluid
                  value={password}
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Enter Password"
                  type="password"
                />
                <Form.Input
                  onChange={this.handleChange}
                  fluid
                  value={address}
                  name="address"
                  icon="home"
                  iconPosition="left"
                  placeholder="Enter Address"
                />
                <Form.Input
                  onChange={this.handleChange}
                  fluid
                  value={dob}
                  name="dob"
                  icon="calendar"
                  iconPosition="left"
                  placeholder="Enter Date of Birth"
                />
                <Form.Input
                  onChange={this.handleChange}
                  fluid
                  value={company}
                  name="company"
                  icon="industry"
                  iconPosition="left"
                  placeholder="Enter Company Name"
                />
                <Button
                  color="teal"
                  fluid
                  size="large"
                  loading={loading}
                  disabled={loading}
                >
                  Signup
                </Button>
                
              </Segment>
            </Form>
            <Message>
              Already have an account? <NavLink to="/login">Login</NavLink>
            </Message>
          </React.Fragment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    status_code: state.auth.status_code  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (firstname,lastname,email,password,address,dob,company) =>
      dispatch(authSignup(firstname,lastname,email,password,address,dob,company))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm);
