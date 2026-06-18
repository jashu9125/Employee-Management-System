import axios from "axios";

const API =
"http://localhost:8000/api/subscription";

export const getSubscription =
(company) =>
axios
.get(`${API}/${company}`)
.then(res => res.data);

export const changePlan =
(company, plan) =>
axios
.put(`${API}/${company}`, {
  plan
})
.then(res => res.data);

export const getUsage =
(company) =>
axios
.get(`${API}/usage/${company}`)
.then(res => res.data);