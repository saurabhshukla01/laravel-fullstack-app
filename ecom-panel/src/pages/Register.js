import { Link } from "react-router-dom";

// src/pages/Register.js
function Register() {
  return (
     <>
      <div className="app app-signup p-0">
        <div className="row g-0 app-auth-wrapper">
          <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
            <div className="d-flex flex-column align-content-end">
              <div className="app-auth-body mx-auto">
                <div className="app-auth-branding mb-4"><Link className="app-logo" to="/"><img className="logo-icon me-2" src="/assets/images/app-logo.svg" alt="logo" /></Link></div>
                <h2 className="auth-heading text-center mb-5">Sign up to Portal</h2>
                <div className="auth-form-container text-start">
                 <form className="auth-form auth-signup-form">         
							<div className="email mb-3">
								<label className="sr-only" for="signup-email">Your Name</label>
								<input id="signup-name" name="signup-name" type="text" className="form-control signup-name" placeholder="Full name" required="required" />
							</div>
							<div className="email mb-3">
								<label className="sr-only" for="signup-email">Your Email</label>
								<input id="signup-email" name="signup-email" type="email" className="form-control signup-email" placeholder="Email" required="required" />
							</div>
							<div className="password mb-3">
								<label className="sr-only" for="signup-password">Password</label>
								<input id="signup-password" name="signup-password" type="password" className="form-control signup-password" placeholder="Create a password" required="required" />
							</div>
							<div className="extra mb-3">
								<div className="form-check">
									<input className="form-check-input" type="checkbox" value="" id="RememberPassword" />
									<label className="form-check-label" for="RememberPassword">
									I agree to Portal's <Link to="#" className="app-link">Terms of Service</Link> and <Link to="#" className="app-link">Privacy Policy</Link>.
									</label>
								</div>
							</div>
							
							<div className="text-center">
								<button type="submit" className="btn app-btn-primary w-100 theme-btn mx-auto">Sign Up</button>
							</div>
						</form>
						
						<div className="auth-option text-center pt-5">Already have an account? <Link className="text-link" to="login.html" >Log in</Link></div>
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
export default Register;
