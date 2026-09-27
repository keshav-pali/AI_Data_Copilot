import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      {/* ================= WELCOME ================= */}

      <section className="welcome-banner">

        <div className="welcome-content">

          <span className="welcome-label">
            GOOD EVENING, KESHAV 👋
          </span>

          <h2>
            Ready to explore your data?
          </h2>

          <p>
            Upload a dataset or ask your AI Copilot a question.
          </p>

        </div>

        <button
          onClick={() => navigate("/upload")}
          className="primary-white-button"
        >
          <span>+</span>
          Upload Dataset
        </button>

      </section>


      {/* ================= STATS ================= */}

      <section className="stats-grid">

        <StatCard
          title="Total Datasets"
          value="24"
          change="12.5%"
          icon="▤"
        />

        <StatCard
          title="Total Rows"
          value="30.4K"
          change="8.2%"
          icon="▥"
        />

        <StatCard
          title="AI Queries"
          value="1,284"
          change="18.4%"
          icon="✦"
        />

        <StatCard
          title="Insights Generated"
          value="356"
          change="15.7%"
          icon="◈"
        />

      </section>


      {/* ================= MAIN GRID ================= */}

      <section className="dashboard-grid">

        {/* DATA ACTIVITY */}

        <div className="chart-card">

          <div className="card-heading">

            <div>
              <h3>
                Data Activity
              </h3>

              <p>
                Dataset activity over the last 7 days
              </p>
            </div>

            <select>
              <option>
                Last 7 days
              </option>

              <option>
                Last 30 days
              </option>

              <option>
                Last 90 days
              </option>
            </select>

          </div>


          <div className="activity-chart">

            <div className="chart-y-axis">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            <div className="chart-area">

              <div className="chart-grid-lines">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="chart-bars">

                <div
                  className="chart-bar"
                  style={{ height: "42%" }}
                ></div>

                <div
                  className="chart-bar"
                  style={{ height: "58%" }}
                ></div>

                <div
                  className="chart-bar"
                  style={{ height: "48%" }}
                ></div>

                <div
                  className="chart-bar"
                  style={{ height: "72%" }}
                ></div>

                <div
                  className="chart-bar"
                  style={{ height: "63%" }}
                ></div>

                <div
                  className="chart-bar"
                  style={{ height: "84%" }}
                ></div>

                <div
                  className="chart-bar"
                  style={{ height: "96%" }}
                ></div>

              </div>

              <div className="chart-labels">

                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>

              </div>

            </div>

          </div>

        </div>


        {/* AI COPILOT */}

        <div className="ai-card">

          <div className="ai-card-header">

            <div className="ai-card-icon">
              ✦
            </div>

            <span>
              AI COPILOT
            </span>

          </div>

          <h3>
            Ask anything about your data.
          </h3>

          <p>
            Get instant answers, insights and visualizations
            from your datasets using natural language.
          </p>

          <button
            onClick={() => navigate("/copilot")}
            className="ai-start-button"
          >
            Start chatting
            <span>→</span>
          </button>

          <div className="ai-prompt">

            <span>
              ✦
            </span>

            What are my top performing products?

          </div>

        </div>

      </section>


      {/* ================= QUICK ACTIONS ================= */}

      <section className="quick-section">

        <div className="section-heading">

          <div>
            <h3>
              Quick Actions
            </h3>

            <p>
              Get started with AI Data Copilot
            </p>
          </div>

        </div>


        <div className="quick-grid">

          <button
            onClick={() => navigate("/upload")}
            className="quick-card"
          >

            <div className="quick-icon upload">
              ↑
            </div>

            <div>
              <strong>
                Upload Data
              </strong>

              <span>
                Import CSV, Excel or JSON
              </span>
            </div>

            <b>
              →
            </b>

          </button>


          <button
            onClick={() => navigate("/copilot")}
            className="quick-card"
          >

            <div className="quick-icon copilot">
              ✦
            </div>

            <div>
              <strong>
                Ask AI
              </strong>

              <span>
                Ask questions about your data
              </span>
            </div>

            <b>
              →
            </b>

          </button>


          <button
            onClick={() => navigate("/analytics")}
            className="quick-card"
          >

            <div className="quick-icon analytics">
              ◈
            </div>

            <div>
              <strong>
                View Analytics
              </strong>

              <span>
                Explore your data visually
              </span>
            </div>

            <b>
              →
            </b>

          </button>

        </div>

      </section>


      {/* ================= DATA TABLE ================= */}

      <DataTable />

    </div>
  );
}

export default Dashboard;