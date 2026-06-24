import { useEffect, useState } from "react";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";

import {
  getDemandForecast,
  getCategoryForecast,
  getProductForecast
} from "../../api/forecastApi";

import "../../assets/styles/demandForecasting.css";

import {
  useNavigate
} from "react-router-dom";

function DemandForecasting() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const navigate =
  useNavigate();


  const [summary, setSummary] =
    useState(null);

  const [categories, setCategories] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [selectedCategory,
    setSelectedCategory] =
    useState("All Categories");

  const [selectedProduct,
    setSelectedProduct] =
    useState("All Products");

  useEffect(() => {

    loadData();

  }, []);

    <Pie
  data={categories}
  dataKey="predicted_demand"
  nameKey="category"
  onClick={item =>
    navigate(
      `/forecasting/category/${item.category}`
    )
  }
/>

  const loadData = async () => {
  try {
    const demand =
      await getDemandForecast();

    const categoryData =
      await getCategoryForecast();

    const productData =
      await getProductForecast();

    

    console.log(
      "Demand:",
      demand
    );

    console.log(
      "Categories:",
      categoryData
    );

    console.log(
      "Products:",
      productData
    );

    setSummary(demand);
    setCategories(categoryData);
    setProducts(productData);

  } catch (error) {
    console.error(
      "Forecast Load Error:",
      error
    );
  }
};

  const COLORS = [
    "#2563eb",
    "#7c3aed",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#8b5cf6"
  ];

 const trendData = products.map((item) => ({
  day: item.product,
  forecast: Number(item.predicted_demand),
  historical: Math.round(
    Number(item.predicted_demand) * 0.85
  )
}));

  const filteredProducts =
  selectedCategory === "All Categories"
    ? products
    : products.filter(
        (product) =>
          product.category
            ?.trim()
            .toLowerCase() ===
          selectedCategory
            ?.trim()
            .toLowerCase()
      );

  const exportCSV = () => {

    let csv =
      "Product,Category,Predicted Demand,Confidence\n";

    filteredProducts.forEach(
      item => {

        csv +=
          `${item.product},${item.category},${item.predicted_demand},${item.confidence}\n`;

      }
    );

    const blob =
      new Blob(
        [csv],
        {
          type:
            "text/csv"
        }
      );

    const url =
      window.URL
        .createObjectURL(blob);

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download =
      "forecast-report.csv";

    link.click();
  };

  return (
    <>
      <Navbar
        onMenuClick={() =>
          setSidebarOpen(true)
        }
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <div
        className="dashboard-container"
      >

        <div
          className="dashboard-header"
        >

          <div>

            <h1>
              Demand Forecasting
            </h1>

            <p>
              Predict future
              demand for your
              products and
              categories
            </p>

          </div>

          <button
            className="btn-primary"
            onClick={exportCSV}
          >
            Export
          </button>

        </div>

        {/* Filters */}

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom:
              "30px"
          }}
        >

          <div>

            <label>
              Category
            </label>

            <br />

            <select
              value={
                selectedCategory
              }
              onChange={e =>
                setSelectedCategory(
                  e.target.value
                )
              }
            >

              <option>
                All Categories
              </option>

              {categories.map(
                (
                  category,
                  index
                ) => (
                  <option
                    key={index}
                    value={
                      category.category
                    }
                  >
                    {
                      category.category
                    }
                  </option>
                )
              )}

            </select>

          </div>

          <div>

            <label>
              Product
            </label>

            <br />

            <select
              value={
                selectedProduct
              }
              onChange={e =>
                setSelectedProduct(
                  e.target.value
                )
              }
            >

              <option>
                All Products
              </option>

              {filteredProducts.map(
                (
                  product,
                  index
                ) => (
                  <option
                    key={index}
                    value={
                      product.product
                    }
                  >
                    {
                      product.product
                    }
                  </option>
                )
              )}

            </select>

          </div>

        </div>

        {/* Summary */}

        <div
          className="stats-grid"
        >

          <div
            className="stat-card"
          >
            <h3>
              Next 30 Days Forecast
            </h3>

            <h2>
              {
                summary?.predicted_demand
              }
            </h2>

            <span>
              Total predicted
              units
            </span>

          </div>

          <div
            className="stat-card"
          >
            <h3>
              Avg. Confidence
            </h3>

            <h2>
              {
                summary?.confidence
              }
              %
            </h2>

            <span>
              Forecast
              reliability
            </span>

          </div>

          <div
            className="stat-card"
          >
            <h3>
              Products Tracked
            </h3>

            <h2>
              {
                products.length
              }
            </h2>

            <span>
              Active SKUs
            </span>

          </div>

          <div
            className="stat-card"
          >
            <h3>
              Categories
            </h3>

            <h2>
              {
                categories.length
              }
            </h2>

            <span>
              Product
              Categories
            </span>

          </div>

        </div>

        {/* Charts */}

        <div
          className="charts-row"
        >

          <div
            className="chart-card"
          >

            <h2>
              Demand Trends
            </h2>

            <ResponsiveContainer width="100%" height={350}>
  <LineChart data={trendData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="day" />
    <YAxis />
    <Tooltip />
    <Legend />

    <Line
      type="monotone"
      dataKey="forecast"
      stroke="#10b981"
      strokeWidth={2}
      name="Forecast"
    />

    <Line
      type="monotone"
      dataKey="historical"
      stroke="#2563eb"
      strokeWidth={2}
      name="Historical"
    />
  </LineChart>
</ResponsiveContainer>

          </div>

          <div
            className="chart-card"
          >

            <h2>
              Demand by Category
            </h2>


            <ResponsiveContainer
  width="100%"
  height={350}
>
  <PieChart>
    <Pie
      data={categories}
      dataKey="predicted_demand"
      nameKey="category"
      cx="50%"
      cy="50%"
      outerRadius={120}
      label
      onClick={(item) =>
        navigate(
          `/forecasting/category/${item.category}`
        )
      }
    >
      {categories.map(
        (entry, index) => (
          <Cell
            key={index}
            fill={
              COLORS[
                index %
                COLORS.length
              ]
            }
          />
        )
      )}
    </Pie>

    <Tooltip />
    <Legend />
  </PieChart>
</ResponsiveContainer>

          </div>

        </div>

        <div
          className="charts-row"
        >

          <div
            className="chart-card"
          >

            <h2>
              Top Products by Forecasted Demand
            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <BarChart
                data={
                  filteredProducts
                    .sort(
                      (
                        a,
                        b
                      ) =>
                        b.predicted_demand -
                        a.predicted_demand
                    )
                    .slice(
                      0,
                      10
                    )
                }
                layout="vertical"
              >

                <XAxis
                  type="number"
                />

                <YAxis
                  dataKey="product"
                  type="category"
                />

                <Tooltip />

                <Bar
                  dataKey="predicted_demand"
                  fill="#7c3aed"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          <div
            className="chart-card"
          >

            <h2>
              Forecast Details
            </h2>

            <div
              style={{
                maxHeight:
                  "350px",
                overflowY:
                  "auto"
              }}
            >

              <table className="table">
  <thead>
    <tr>
      <th style={{ width: "30%" }}>Product</th>
      <th style={{ width: "35%" }}>Category</th>
      <th style={{ width: "15%" }}>Demand</th>
      <th style={{ width: "20%" }}>Confidence</th>
    </tr>
  </thead>

                <tbody>

                  {filteredProducts.map(
                    (
                      item,
                      index
                    ) => (

                      <tr
  key={index}
  style={{
    cursor: "pointer"
  }}
  onClick={() =>
    navigate(
      `/forecasting/product/${item.product}`
    )
  }
>

                        <td>
                          {
                            item.product
                          }
                        </td>

                        <td>
                          {
                            item.category
                          }
                        </td>

                        <td>
                          {
                            item.predicted_demand
                          }
                        </td>

                        <td>
                          {
                            item.confidence
                          }
                          %
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default DemandForecasting;

