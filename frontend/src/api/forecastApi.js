import axios from "axios";

const BASE_URL =
  "http://localhost:8000";

export const getDemandForecast =
  async () => {

    const response =
      await axios.get(
        `${BASE_URL}/api/forecasts/demand`
      );

    return response.data;
};

export const getCategoryForecast =
  async () => {

    const response =
      await axios.get(
        `${BASE_URL}/api/forecasts/category`
      );

    return response.data;
};

export const getProductForecast =
  async () => {

    const response =
      await axios.get(
        `${BASE_URL}/api/forecasts/product`
      );

    return response.data;
};

export const exportForecast =
  async () => {

    const response =
      await fetch(
        "http://localhost:8000/api/forecasts/export"
      );

    const blob =
      await response.blob();

    const url =
      window.URL.createObjectURL(
        blob
      );

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "forecast_report.csv";

    link.click();
};

export const getCategoryProducts =
  async category => {

    const response =
      await axios.get(
        `http://localhost:8000/api/forecasts/category/${category}`
      );

    return response.data;
};

export const getProductDetails =
  async product => {

    const response =
      await axios.get(
        `http://localhost:8000/api/forecasts/product/${product}`
      );

    return response.data;
};
