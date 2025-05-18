import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    sessionStorage.setItem("loggedIn", "true");
    navigate("/");
  };

  return (
    <>
      <div className="app app-login p-0">
        <div className="row g-0 app-auth-wrapper">
          <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
            <div className="d-flex flex-column align-content-end">
              <div className="app-auth-body mx-auto">
                <div className="app-auth-branding mb-4"><Link className="app-logo" to="/"><img className="logo-icon me-2" src="/assets/images/app-logo.svg" alt="logo" /></Link></div>
                <h2 className="auth-heading text-center mb-5">Log in to Portal</h2>
                <div className="auth-form-container text-start">
                  <form className="auth-form login-form">
                    <div className="email mb-3">
                      <label className="sr-only" for="signin-email">Email</label>
                      <input id="signin-email" name="signin-email" type="email" className="form-control signin-email" placeholder="Email address" required="required" />
                    </div>
                    <div className="password mb-3">
                      <label className="sr-only" for="signin-password">Password</label>
                      <input id="signin-password" name="signin-password" type="password" className="form-control signin-password" placeholder="Password" required="required" />
                      <div className="extra mt-3 row justify-content-between">
                        <div className="col-6">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="RememberPassword" />
                            <label className="form-check-label" for="RememberPassword">
                              Remember me
                            </label>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="forgot-password text-end">
                            <Link to="/reset-password">Forgot password?</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <button type="submit" onClick={handleLogin} className="btn app-btn-primary w-100 theme-btn mx-auto">Log In</button>
                    </div>
                  </form>

                  <div className="auth-option text-center pt-5">No Account? Sign up <Link className="text-link" to="/register" >here</Link>.</div>
                </div>

              </div>
              <footer className="app-auth-footer">
                <div className="container text-center py-3">
                  <small className="copyright">Designed with <span className="sr-only">love</span><i className="fas fa-heart" style={{ color: ' #fb866a' }}></i> by <Link className="app-link" to="http://themes.3rdwavemedia.com" target="_blank">Xiaoying Riley</Link> for developers</small>

                </div>
              </footer>
            </div>
          </div>
          <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
            <div className="auth-background-holder">
            </div>
            <div className="auth-background-mask"></div>
            <div className="auth-background-overlay p-3 p-lg-5">
              <div className="d-flex flex-column align-content-end h-100">
                <div className="h-100"></div>
                <div className="overlay-content p-3 p-lg-4 rounded">
                  <h5 className="mb-3 overlay-title">Welcome Back to Portal</h5>
                  <div className="desc-text mb-3">
                    Sign in to your account to access the admin dashboard, manage your settings, and explore powerful tools tailored for developers.
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
export default Login;
