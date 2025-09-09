import type { User } from "../types";
import API from "./axios";


export const login = async (email: string, password: string) => {
  const res = await API.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.token);  
  return res.data;
};

export const signup = async (fullName: string, email: string, password: string) => {
  const res = await API.post("/auth/signup", { fullName, email, password });
  localStorage.setItem("token", res.data.token); 
  return res.data;
};



export const getProfile = async (): Promise<User> => {
  const res = await API.get("/auth/me");
  return res.data;
};
