import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import {
  getProductDetails
} from "../../api/forecastApi";

function ProductForecast() {

  const { product } =
    useParams();

  const [data,
    setData] =
    useState(null);

  useEffect(() => {

    loadProduct();

  }, []);

  const loadProduct =
    async () => {

      const response =
        await getProductDetails(
          product
        );

      setData(response);
    };

  if (!data)
    return <h2>Loading...</h2>;

  return (

    <div
      className="dashboard-container"
    >

      <h1>
        Product Forecast
      </h1>

      <div
        className="stat-card"
      >

        <h2>
          {data.product}
        </h2>

        <p>
          Category:
          {" "}
          {data.category}
        </p>

        <p>
          Predicted Demand:
          {" "}
          {
            data.predicted_demand
          }
        </p>

        <p>
          Confidence:
          {" "}
          {
            data.confidence
          }%
        </p>

      </div>

    </div>
  );
}

export default ProductForecast;