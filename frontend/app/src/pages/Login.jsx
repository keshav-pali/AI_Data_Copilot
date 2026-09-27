import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    // Temporary frontend login
    navigate("/");

  };

  return (
    <div className="login-page">

      <div className="login-left">

        <div className="login-brand">

          <div className="logo-icon">
            ✦
          </div>

          <span>
            AI Data Copilot
          </span>

        </div>

        <div className="login-content">

          <span className="eyebrow">
            YOUR DATA. YOUR AI.
          </span>

          <h1>
            Turn your data into
            <span>
              intelligent decisions.
            </span>
          </h1>

          <p>
            Analyze, visualize and understand your data
            with an AI-powered copilot built for modern teams.
          </p>

          <div className="feature-list">

            <div>
              <span>✓</span>
              Ask questions about your data
            </div>

            <div>
              <span>✓</span>
              Generate insights instantly
            </div>

            <div>
              <span>✓</span>
              Build beautiful analytics
            </div>

          </div>

        </div>

      </div>

      <div className="login-right">

        <div className="login-box">

          <div className="mobile-logo">
            ✦
          </div>

          <h2>
            Welcome back
          </h2>

          <p>
            Sign in to continue to your dashboard.
          </p>

          <form onSubmit={handleSubmit}>

            <label>
              Email address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            <div className="form-options">

              <label className="checkbox-label">

                <input type="checkbox" />

                Remember me

              </label>

              <button
                type="button"
                className="forgot-btn"
              >
                Forgot password?
              </button>

            </div>

            <button
              className="login-button"
              type="submit"
            >
              Sign in
            </button>

          </form>

          <div className="divider">
            <span>
              OR
            </span>
          </div>

          <button className="google-button">
            <span>
              G
            </span>

            Continue with Google
          </button>

          <p className="signup-text">

            Don't have an account?

            <button>
              Create account
            </button>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;