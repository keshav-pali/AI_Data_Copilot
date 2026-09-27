import { useState } from "react";
import { useTheme } from "../components/ThemeContext";

function Settings() {
  const { theme, setTheme } = useTheme();

  const [fullName, setFullName] =
    useState("Keshav Pal");

  const [email, setEmail] =
    useState("keshav@example.com");

  const [notifications, setNotifications] =
    useState(true);

  const [aiSuggestions, setAiSuggestions] =
    useState(true);

  const [weeklyAnalytics, setWeeklyAnalytics] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="settings-page settings-page-v2">

      {/* HEADER */}

      <div className="settings-page-header">

        <span className="page-eyebrow">
          ACCOUNT
        </span>

        <h2>
          Settings
        </h2>

        <p>
          Manage your profile, preferences and
          account settings.
        </p>

      </div>


      {/* PROFILE */}

      <section className="settings-section">

        <div className="settings-section-title">

          <div>

            <h3>
              Profile
            </h3>

            <p>
              Update your personal information.
            </p>

          </div>

        </div>


        <div className="settings-profile-card">

          <div className="settings-avatar-large">
            K
          </div>

          <div className="settings-profile-info">

            <h3>
              Keshav Pal
            </h3>

            <p>
              Free Plan
            </p>

            <button className="change-avatar-button">
              Change avatar
            </button>

          </div>

        </div>


        <div className="settings-form-grid">

          <div className="settings-field">

            <label>
              Full Name
            </label>

            <input
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
            />

          </div>


          <div className="settings-field">

            <label>
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

        </div>


        <div className="settings-save-row">

          <button
            className="settings-save-button"
            onClick={handleSave}
          >
            Save Changes
          </button>

          {saved && (
            <span className="settings-saved-message">
              ✓ Changes saved
            </span>
          )}

        </div>

      </section>


      {/* PREFERENCES */}

      <section className="settings-section">

        <div className="settings-section-title">

          <div>

            <h3>
              Preferences
            </h3>

            <p>
              Customize how AI Data Copilot
              works for you.
            </p>

          </div>

        </div>


        <div className="settings-options">

          <div className="settings-option">

            <div className="settings-option-icon">
              ✉
            </div>

            <div className="settings-option-content">

              <h4>
                Email Notifications
              </h4>

              <p>
                Receive important updates and
                account notifications.
              </p>

            </div>

            <button
              className={`toggle-button ${
                notifications
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setNotifications(
                  !notifications
                )
              }
            >
              <span></span>
            </button>

          </div>


          <div className="settings-option">

            <div className="settings-option-icon ai">
              ✦
            </div>

            <div className="settings-option-content">

              <h4>
                AI Suggestions
              </h4>

              <p>
                Allow Copilot to suggest
                insights and questions.
              </p>

            </div>

            <button
              className={`toggle-button ${
                aiSuggestions
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setAiSuggestions(
                  !aiSuggestions
                )
              }
            >
              <span></span>
            </button>

          </div>


          <div className="settings-option">

            <div className="settings-option-icon chart">
              ▥
            </div>

            <div className="settings-option-content">

              <h4>
                Weekly Analytics
              </h4>

              <p>
                Get a weekly summary of your
                data performance.
              </p>

            </div>

            <button
              className={`toggle-button ${
                weeklyAnalytics
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setWeeklyAnalytics(
                  !weeklyAnalytics
                )
              }
            >
              <span></span>
            </button>

          </div>

        </div>

      </section>


      {/* APPEARANCE */}

      <section className="settings-section">

        <div className="settings-section-title">

          <div>

            <h3>
              Appearance
            </h3>

            <p>
              Choose how AI Data Copilot looks.
            </p>

          </div>

        </div>


        <div className="appearance-options">

          <button
            className={`appearance-card ${
              theme === "light"
                ? "selected"
                : ""
            }`}
            onClick={() =>
              setTheme("light")
            }
          >

            <div className="appearance-preview light-preview">

              <div className="preview-sidebar"></div>

              <div className="preview-content">
                <span></span>
                <span></span>
                <span></span>
              </div>

            </div>

            <div className="appearance-label">

              <span>
                Light
              </span>

              {theme === "light" && (
                <b>✓</b>
              )}

            </div>

          </button>


          <button
            className={`appearance-card ${
              theme === "dark"
                ? "selected"
                : ""
            }`}
            onClick={() =>
              setTheme("dark")
            }
          >

            <div className="appearance-preview dark-preview">

              <div className="preview-sidebar"></div>

              <div className="preview-content">
                <span></span>
                <span></span>
                <span></span>
              </div>

            </div>

            <div className="appearance-label">

              <span>
                Dark
              </span>

              {theme === "dark" && (
                <b>✓</b>
              )}

            </div>

          </button>


          <button
            className={`appearance-card ${
              theme === "system"
                ? "selected"
                : ""
            }`}
            onClick={() =>
              setTheme("system")
            }
          >

            <div className="appearance-preview system-preview">

              <div className="system-half light-half">
                <div></div>
              </div>

              <div className="system-half dark-half">
                <div></div>
              </div>

            </div>

            <div className="appearance-label">

              <span>
                System
              </span>

              {theme === "system" && (
                <b>✓</b>
              )}

            </div>

          </button>

        </div>

      </section>


      {/* SECURITY */}

      <section className="settings-section">

        <div className="settings-section-title">

          <div>

            <h3>
              Security
            </h3>

            <p>
              Manage your password and account security.
            </p>

          </div>

        </div>


        <div className="security-list">

          <div className="security-item">

            <div className="security-icon">
              🔒
            </div>

            <div>

              <h4>
                Password
              </h4>

              <p>
                Last updated recently
              </p>

            </div>

            <button>
              Change Password →
            </button>

          </div>


          <div className="security-item">

            <div className="security-icon">
              ◉
            </div>

            <div>

              <h4>
                Active Sessions
              </h4>

              <p>
                1 active session on this device
              </p>

            </div>

            <button>
              View Sessions →
            </button>

          </div>

        </div>

      </section>


      {/* DANGER */}

      <section className="settings-section danger-section">

        <div className="settings-section-title">

          <div>

            <h3>
              Danger Zone
            </h3>

            <p>
              These actions can permanently
              affect your account.
            </p>

          </div>

        </div>


        <div className="danger-card">

          <div>

            <h4>
              Delete Account
            </h4>

            <p>
              Permanently delete your account
              and associated datasets.
            </p>

          </div>

          <button>
            Delete Account
          </button>

        </div>

      </section>


      <div className="settings-footer">

        <span>
          AI Data Copilot
        </span>

        <span>
          Version 1.0.0
        </span>

      </div>

    </div>
  );
}

export default Settings;