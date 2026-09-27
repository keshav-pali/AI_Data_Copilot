import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showProfile, setShowProfile] =
    useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const pageTitles = {
    "/": "Dashboard",
    "/copilot": "AI Copilot",
    "/upload": "Upload Data",
    "/analytics": "Analytics",
    "/settings": "Settings",
  };

  const title =
    pageTitles[location.pathname] || "Dashboard";

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  return (
    <header className="app-header">

      <div className="header-title">

        <h1>
          {title}
        </h1>

        <p>
          Welcome back, Keshav. Here's what's happening
          with your data.
        </p>

      </div>


      <div className="header-actions">

        {/* SEARCH */}

        <button
          className="header-icon-button"
          aria-label="Search"
        >
          ⌕
        </button>


        {/* NOTIFICATIONS */}

        <div
          className="header-dropdown-wrapper"
          ref={notificationRef}
        >

          <button
            className="header-icon-button notification-button"
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            aria-label="Notifications"
          >

            ♢

            <span className="notification-dot"></span>

          </button>


          {showNotifications && (

            <div className="header-dropdown notification-dropdown">

              <div className="dropdown-header">

                <strong>
                  Notifications
                </strong>

                <button>
                  Mark all read
                </button>

              </div>


              <div className="notification-item">

                <div className="notification-item-icon purple">
                  ✦
                </div>

                <div>
                  <strong>
                    AI insight generated
                  </strong>

                  <p>
                    New sales insight is available.
                  </p>

                  <span>
                    5 min ago
                  </span>
                </div>

              </div>


              <div className="notification-item">

                <div className="notification-item-icon green">
                  ✓
                </div>

                <div>
                  <strong>
                    Dataset processed
                  </strong>

                  <p>
                    Sales_Data.csv is ready.
                  </p>

                  <span>
                    1 hour ago
                  </span>
                </div>

              </div>


              <div className="dropdown-footer">
                View all notifications →
              </div>

            </div>

          )}

        </div>


        {/* PROFILE */}

        <div
          className="header-dropdown-wrapper"
          ref={profileRef}
        >

          <button
            className="header-avatar"
            onClick={() =>
              setShowProfile(!showProfile)
            }
          >
            K
          </button>


          {showProfile && (

            <div className="header-dropdown profile-dropdown">

              <div className="profile-dropdown-user">

                <div className="profile-dropdown-avatar">
                  K
                </div>

                <div>

                  <strong>
                    Keshav Pal
                  </strong>

                  <span>
                    keshav@example.com
                  </span>

                </div>

              </div>


              <div className="dropdown-divider"></div>


              <button
                className="profile-menu-item"
                onClick={() =>
                  navigate("/settings")
                }
              >
                <span>◉</span>
                Profile & Settings
              </button>


              <button
                className="profile-menu-item"
                onClick={() =>
                  navigate("/analytics")
                }
              >
                <span>▥</span>
                Analytics
              </button>


              <div className="dropdown-divider"></div>


              <button
                className="profile-menu-item logout"
                onClick={() =>
                  navigate("/login")
                }
              >
                <span>↪</span>
                Log out
              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}

export default Header;