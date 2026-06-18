import axios from "axios";

const API =
  "http://localhost:8000/api/security";

export const getAlerts = async (
  company
) => {
  const response = await axios.get(
    `${API}/${company}`
  );

  return response.data;
};