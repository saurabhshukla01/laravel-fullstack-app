import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!agree) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    try {
      const data = await AuthService.register({ name, email, password });

      if (data.success) {
        const { token, name, email , is_admin } = data && data.data;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("loggedIn", "true");
        console.log(data.message || "Registration successful!");
        if (is_admin === 1) {
          navigate("/");
        } else {
          navigate("/");
        }
        navigate("/");
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError(err.message || "An error occurred during registration.");
    }
  };

  return (
    <div className="app app-signup p-0">
      <div className="row g-0 app-auth-wrapper">
        <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
          <div className="d-flex flex-column align-content-end">
            <div className="app-auth-body mx-auto">
              <div className="app-auth-branding mb-4">
                <Link className="app-logo" to="/">
                  <img className="logo-icon me-2" src="/assets/images/app-logo.svg" alt="logo" />
                </Link>
              </div>
              <h2 className="auth-heading text-center mb-5">Sign up to Portal</h2>
              <div className="auth-form-container text-start">
                <form className="auth-form auth-signup-form" onSubmit={handleSubmit}>
                  {error && <div className="alert alert-danger">{error}</div>}

                  <div className="mb-3">
                    <label htmlFor="signup-name" className="sr-only">Your Name</label>
                    <input
                      id="signup-name"
                      type="text"
                      className="form-control signup-name"
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="signup-email" className="sr-only">Your Email</label>
                    <input
                      id="signup-email"
                      type="email"
                      className="form-control signup-email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="signup-password" className="sr-only">Password</label>
                    <input
                      id="signup-password"
                      type="password"
                      className="form-control signup-password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="extra mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="termsCheckbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        required
                      />
                      <label className="form-check-label" htmlFor="termsCheckbox">
                        I agree to Portal's <Link to="#" className="app-link">Terms of Service</Link> and <Link to="#" className="app-link">Privacy Policy</Link>.
                      </label>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn app-btn-primary w-100 theme-btn mx-auto">
                      Sign Up
                    </button>
                  </div>
                </form>

                <div className="auth-option text-center pt-5">
                  Already have an account? <Link className="text-link" to="/login">Log in</Link>
                </div>
              </div>
            </div>
            <footer className="app-auth-footer">
              <div className="container text-center py-3">
                <small className="copyright">
                  Designed with <i className="fas fa-heart" style={{ color: "#fb866a" }}></i> by{" "}
                  <Link className="app-link" to="http://themes.3rdwavemedia.com" target="_blank">Xiaoying Riley</Link> for developers
                </small>
              </div>
            </footer>
          </div>
        </div>
        <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
          <div className="auth-background-holder"></div>
          <div className="auth-background-mask"></div>
          <div className="auth-background-overlay p-3 p-lg-5">
            <div className="d-flex flex-column align-content-end h-100">
              <div className="h-100"></div>
              <div className="overlay-content p-3 p-lg-4 rounded">
                <h5 className="mb-3 overlay-title">Welcome to Portal</h5>
                <div className="desc-text mb-3">
                  Create your account to access the admin dashboard, manage your settings, and explore powerful tools tailored for developers.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
