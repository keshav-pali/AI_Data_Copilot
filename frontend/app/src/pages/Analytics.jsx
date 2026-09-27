import { useState } from "react";

function Analytics() {
  const [timeRange, setTimeRange] = useState("Last 30 days");

  const metrics = [
    {
      title: "Total Revenue",
      value: "$124.8K",
      change: "18.4%",
      icon: "$",
    },
    {
      title: "Total Orders",
      value: "2,840",
      change: "12.6%",
      icon: "▤",
    },
    {
      title: "Average Order",
      value: "$43.94",
      change: "6.8%",
      icon: "◈",
    },
    {
      title: "Conversion Rate",
      value: "8.42%",
      change: "2.4%",
      icon: "%",
    },
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
  ];

  const revenue = [
    45,
    58,
    52,
    72,
    65,
    92,
  ];

  const categories = [
    {
      name: "Electronics",
      value: 42,
      amount: "$52.4K",
    },
    {
      name: "Clothing",
      value: 27,
      amount: "$33.7K",
    },
    {
      name: "Home & Living",
      value: 18,
      amount: "$22.4K",
    },
    {
      name: "Sports",
      value: 13,
      amount: "$16.3K",
    },
  ];

  const topProducts = [
    {
      name: "Wireless Headphones",
      category: "Electronics",
      sales: "$18,420",
      orders: "412",
      growth: "+24.5%",
    },
    {
      name: "Smart Watch Pro",
      category: "Electronics",
      sales: "$15,280",
      orders: "286",
      growth: "+18.2%",
    },
    {
      name: "Running Shoes",
      category: "Sports",
      sales: "$12,840",
      orders: "243",
      growth: "+14.8%",
    },
    {
      name: "Premium Hoodie",
      category: "Clothing",
      sales: "$9,620",
      orders: "198",
      growth: "+11.3%",
    },
  ];

  return (
    <div className="analytics-page analytics-page-v2">

      {/* ================= HEADER ================= */}

      <div className="analytics-header">

        <div className="page-title">

          <span className="page-eyebrow">
            DATA INSIGHTS
          </span>

          <h2>
            Analytics
          </h2>

          <p>
            Understand your data through interactive insights
            and visualizations.
          </p>

        </div>


        <div className="analytics-actions">

          <button className="export-button">
            ↓ Export
          </button>

          <select
            value={timeRange}
            onChange={(e) =>
              setTimeRange(e.target.value)
            }
          >
            <option>
              Last 7 days
            </option>

            <option>
              Last 30 days
            </option>

            <option>
              Last 90 days
            </option>

            <option>
              This year
            </option>
          </select>

        </div>

      </div>


      {/* ================= KPI CARDS ================= */}

      <div className="analytics-kpi-grid">

        {metrics.map((metric) => (

          <div
            className="analytics-kpi"
            key={metric.title}
          >

            <div className="analytics-kpi-top">

              <div className="analytics-kpi-icon">
                {metric.icon}
              </div>

              <span className="analytics-growth">
                ↑ {metric.change}
              </span>

            </div>

            <p>
              {metric.title}
            </p>

            <h3>
              {metric.value}
            </h3>

          </div>

        ))}

      </div>


      {/* ================= MAIN CHARTS ================= */}

      <div className="analytics-main-grid">

        {/* REVENUE */}

        <div className="analytics-card revenue-card">

          <div className="analytics-card-header">

            <div>
              <h3>
                Revenue Overview
              </h3>

              <p>
                Revenue performance over time
              </p>
            </div>

            <div className="chart-legend">
              <span>
                <i></i>
                Revenue
              </span>
            </div>

          </div>


          <div className="revenue-chart">

            <div className="revenue-y-axis">

              <span>
                $100K
              </span>

              <span>
                $75K
              </span>

              <span>
                $50K
              </span>

              <span>
                $25K
              </span>

              <span>
                $0
              </span>

            </div>


            <div className="revenue-chart-area">

              <div className="revenue-grid">

                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

              </div>


              <div className="revenue-bars">

                {revenue.map((value, index) => (

                  <div
                    className="revenue-bar-wrapper"
                    key={months[index]}
                  >

                    <div
                      className="revenue-tooltip"
                    >
                      ${value}K
                    </div>

                    <div
                      className="revenue-bar"
                      style={{
                        height: `${value}%`,
                      }}
                    ></div>

                    <span>
                      {months[index]}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>


        {/* CATEGORY DISTRIBUTION */}

        <div className="analytics-card category-card">

          <div className="analytics-card-header">

            <div>
              <h3>
                Sales by Category
              </h3>

              <p>
                Distribution of total sales
              </p>
            </div>

          </div>


          <div className="category-chart">

            <div className="category-donut">

              <div>
                <strong>
                  $124.8K
                </strong>

                <span>
                  Total Sales
                </span>
              </div>

            </div>

          </div>


          <div className="category-list">

            {categories.map((category, index) => (

              <div
                className="category-item"
                key={category.name}
              >

                <div className="category-name">

                  <span
                    className={`category-dot dot-${index}`}
                  ></span>

                  <span>
                    {category.name}
                  </span>

                </div>

                <strong>
                  {category.amount}
                </strong>

                <span>
                  {category.value}%
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* ================= AI INSIGHTS ================= */}

      <div className="analytics-ai-insight">

        <div className="analytics-ai-icon">
          ✦
        </div>

        <div className="analytics-ai-content">

          <span>
            AI GENERATED INSIGHT
          </span>

          <h3>
            Electronics is driving your revenue growth.
          </h3>

          <p>
            Electronics currently contributes 42% of total
            revenue. Wireless Headphones and Smart Watch Pro
            are your strongest performing products, together
            generating over $33K in sales.
          </p>

        </div>

        <button>
          Ask Copilot →
        </button>

      </div>


      {/* ================= PRODUCTS ================= */}

      <div className="analytics-card products-card">

        <div className="analytics-card-header">

          <div>
            <h3>
              Top Performing Products
            </h3>

            <p>
              Products generating the most revenue
            </p>
          </div>

          <button className="view-all-button">
            View all →
          </button>

        </div>


        <div className="products-table-wrapper">

          <table className="products-table">

            <thead>

              <tr>
                <th>
                  PRODUCT
                </th>

                <th>
                  CATEGORY
                </th>

                <th>
                  REVENUE
                </th>

                <th>
                  ORDERS
                </th>

                <th>
                  GROWTH
                </th>
              </tr>

            </thead>


            <tbody>

              {topProducts.map((product, index) => (

                <tr key={product.name}>

                  <td>

                    <div className="product-cell">

                      <div className="product-rank">
                        {index + 1}
                      </div>

                      <strong>
                        {product.name}
                      </strong>

                    </div>

                  </td>

                  <td>
                    <span className="product-category">
                      {product.category}
                    </span>
                  </td>

                  <td>
                    <strong className="product-revenue">
                      {product.sales}
                    </strong>
                  </td>

                  <td>
                    {product.orders}
                  </td>

                  <td>
                    <span className="product-growth">
                      ↑ {product.growth}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Analytics;