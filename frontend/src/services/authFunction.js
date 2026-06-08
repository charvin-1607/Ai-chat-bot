const BASE_URL = "http://localhost:5000/api/auth";

import { AUTH_ROUTE } from "../config/api";


//  Signup API
export const signupAPI = async (formData) => {
  try {
    const res = await fetch(`${AUTH_ROUTE}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
      const data = await res.json();
      console.log("in signup function = ",data);
  
      return data;
  
  } catch (error) {
    console.error("Signup API error:", error);
    throw new Error(error.message || "Something went wrong during signup");
    
  }
}

//Login api



export const loginAPI = async (email,password) => {

  try {
    
    const res = await fetch(`${AUTH_ROUTE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // for cookie 
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("in login function = ",data);
  
    return data;

  } catch (error) {
    console.error("Login API error:", error);
    throw new Error(error.message || "Something went wrong during login");
    
  }
}


// get me
export const getMeAPI = async () => {

  try {

    const response = await fetch(
      `${AUTH_ROUTE}/me`,
      {
        method: "GET",
        credentials: "include"
      }
    );

    const data = await response.json();
    return data;

  } catch (error) {

    return {
      error: true,
      message: error.message
    };

  }

};
 