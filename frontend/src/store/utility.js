import axios from "axios";
import { endpoint } from "../constants";


export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const authAxios = axios.create({
  baseURL: endpoint,
  headers: {
    'Authorization': "JWT " + localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
  }
});
