import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  getCategoryProducts
} from "../../api/forecastApi";

function CategoryForecast() {

  const { category } =
    useParams();

  const navigate =
    useNavigate();

  const [products,
    setProducts] =
    useState([]);

  useEffect(() => {

    loadProducts();

  }, []);

  const loadProducts =
    async () => {

      const data =
        await getCategoryProducts(
          category
        );

      setProducts(data);
    };

  return (

    <div
      className="dashboard-container"
    >

      <h1>
        {category}
        {" "}
        Forecast
      </h1>

      <table
        className="table"
      >

        <thead>
          <tr>
            <th>
              Product
            </th>
            <th>
              Demand
            </th>
            <th>
              Confidence
            </th>
          </tr>
        </thead>

        <tbody>

          {products.map(
            (
              product,
              index
            ) => (

              <tr
                key={index}
                onClick={() =>
                  navigate(
                    `/forecasting/product/${product.product}`
                  )
                }
              >

                <td>
                  {
                    product.product
                  }
                </td>

                <td>
                  {
                    product.predicted_demand
                  }
                </td>

                <td>
                  {
                    product.confidence
                  }%
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}

export default CategoryForecast;