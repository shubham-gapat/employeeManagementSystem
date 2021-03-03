import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/user/login/", {
        email: email,
        password: password
      })
      .then(res => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        dispatch(authSuccess(token));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (firstname,lastname,email,password,address,dob,company) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/user/", {
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:password,
        address:address,
        dob:dob,
        company:company
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token === undefined || token === '') {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } 
    }
  };
};
