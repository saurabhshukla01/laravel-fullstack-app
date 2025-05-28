import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);

  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setDashboardData(response.data.data);
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const renderCard = (title, value, change) => (
    <div className="col-6 col-lg-3" key={title}>
      <div className="app-card app-card-stat shadow-sm h-100">
        <div className="app-card-body p-3 p-lg-4">
          <h4 className="stats-type mb-1">{title}</h4>
          <div className="stats-figure">{value}</div>
          <div className={`stats-meta ${change >= 0 ? "text-success" : "text-danger"}`}>
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d={change >= 0 
                ? "M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                : "M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"} />
            </svg>
            {Math.abs(change)}%
          </div>
        </div>
        <Link className="app-card-link-mask" to="/" />
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="app-content pt-3 p-md-3 p-lg-4">
        <div className="container-xl">
          <h1 className="app-page-title">Overview</h1>

          <div className="app-card alert alert-dismissible shadow-sm mb-4 border-left-decoration" role="alert">
            <div className="inner">
              <div className="app-card-body p-3 p-lg-4">
                <h3 className="mb-3">Welcome, developer!</h3>
                <div className="row gx-5 gy-3">
                  <div className="col-12 col-lg-9">
                    <div>This is your admin dashboard with live stats.</div>
                  </div>
                </div>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
              </div>
            </div>
          </div>

          <div className="row g-4 mb-4">
            {dashboardData &&
              Object.entries(dashboardData).map(([key, value]) => {
                if (key === "posts") {
                  return (
                    <>
                      {renderCard("Total Posts", value.count, value.percentage_change)}
                      {renderCard("Draft Posts", value.draft, 0)}
                      {renderCard("Published Posts", value.published, 0)}
                    </>
                  );
                } else {
                  const title = key.charAt(0).toUpperCase() + key.slice(1);
                  return renderCard(title, value.count, value.percentage_change);
                }
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
