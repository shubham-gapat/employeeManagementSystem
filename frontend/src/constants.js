const localhost = "http://127.0.0.1:8000";

const apiURL = "/user";

export const endpoint = `${localhost}${apiURL}`;

export const employeesListURL = `${endpoint}/employees/`;
export const employeeURL = id => `${endpoint}/employee/${id}/`;
export const employeeCreateURL = `${endpoint}/employee-create/`;