import axios from "axios";

const API =
  "http://localhost:8000/api/security";

export const getAlerts = async (
  company,
  role
) => {

  const response =
    await axios.get(
      `${API}/${company}?role=${role}`
    );

  return response.data;
};

export const unauthorizedAccess =
async (data) => {

  return axios.post(
    "http://localhost:8000/api/users/unauthorized-access",
    data
  );
};