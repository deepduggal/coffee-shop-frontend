import { authAxios } from "./index.js";

export async function login(email="capstone@example.com", password="notagreatpassword") {
  try {
    const res = await authAxios.post("/login", {
      email,
      password,
    });
    
    return res.data;
  } catch (err) {
    console.error('Failed to login', err);
  }
}