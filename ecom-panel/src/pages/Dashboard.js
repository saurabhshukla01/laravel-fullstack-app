import { Link, useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

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
                    <div>Portal is a free Bootstrap 5 admin dashboard template. The design is simple, clean and modular so it&apos;s a great base for building any modern web app.</div>
                  </div>
                </div>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
              </div>
            </div>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-6 col-lg-3">
              <div className="app-card app-card-stat shadow-sm h-100">
                <div className="app-card-body p-3 p-lg-4">
                  <h4 className="stats-type mb-1">Total Sales</h4>
                  <div className="stats-figure">$12,628</div>
                  <div className="stats-meta text-success">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                    </svg>
                    20%
                  </div>
                </div>
                <Link className="app-card-link-mask" to="/" />
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div className="app-card app-card-stat shadow-sm h-100">
                <div className="app-card-body p-3 p-lg-4">
                  <h4 className="stats-type mb-1">Expenses</h4>
                  <div className="stats-figure">$2,250</div>
                  <div className="stats-meta text-success">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                    </svg>
                    5%
                  </div>
                </div>
                <Link className="app-card-link-mask" to="/" />
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="app-card app-card-stat shadow-sm h-100">
                <div className="app-card-body p-3 p-lg-4">
                  <h4 className="stats-type mb-1">Projects</h4>
                  <div className="stats-figure">23</div>
                  <div className="stats-meta">
                    Open
                  </div>
                </div>
                <Link className="app-card-link-mask" to="/" />
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="app-card app-card-stat shadow-sm h-100">
                <div className="app-card-body p-3 p-lg-4">
                  <h4 className="stats-type mb-1">Invoices</h4>
                  <div className="stats-figure">6</div>
                  <div className="stats-meta">New</div>
                </div>
                <Link className="app-card-link-mask" to="/" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Dashboard;
