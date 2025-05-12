import axios from "axios";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VfaWQiOiJkYmZlZjQyMWMxMTMxZjM3IiwiZW1haWwiOiJuZ2hpYWR0QHZudS5lZHUudm4iLCJyb2xlIjoidGVhY2hlciIsInNpZCI6IjIxMDIwMzY2IiwidWlkIjoiYjc0NzE3YmUtOGE0YS00ZjIzLWE3NjMtMjYyMDU2NzJmOTczIn0.ZW0PKHw9NRKG7SspC6lFUrJh7bTdeulzlcQagyfRHWo";

export const fetcher = axios.create({
  baseURL: "http://localhost:1234",
  // headers: {
  //   // Authorization: "Bearer " + localStorage.getItem("token"),
  //   Authorization: "Bearer " + token,
  // },
  withCredentials: true,
});
