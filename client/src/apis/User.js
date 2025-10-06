import axios from "axios";
export const CheckEmail = (email) =>
  axios.get(`http://localhost:8080/users?email=${email}`);
export const LoginUser = (email, password) =>
  axios.get(`http://localhost:8080/users?email=${email}&password=${password}`);
export const addUser = (user) => {
  console.log(user);
  user["role"] = "user";
  return axios.post(`http://localhost:8080/users`, user);
};
