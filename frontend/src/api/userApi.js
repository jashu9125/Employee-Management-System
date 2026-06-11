import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/users";

export const signupUser = async (userData) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Signup failed");
  }

  return data;
};

export const getMembers = async () => {
  console.log("Calling:", `${API_URL}/members`);

  const response = await fetch(`${API_URL}/members`);

  console.log("Status:", response.status);

  const data = await response.json();

  console.log("Data:", data);

  return data;
};
export const loginUser = async (email, password) => {
  const response = await fetch(
    "http://127.0.0.1:8000/api/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail);
  }

  return data;
};