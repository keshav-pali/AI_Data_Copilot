import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/",
      icon: "⌂",
    },
    {
      label: "AI Copilot",
      path: "/copilot",
      icon: "✦",
    },
    {
      label: "Upload Data",
      path: "/upload",
      icon: "↑",
    },
    {
      label: "Analytics",
      path: "/analytics",
      icon: "▥",
    },
    {
      label: "Settings",
      path: "/settings",
      icon: "⚙",
    },
  ];

  return (
    <aside className="app-sidebar">

      {/* LOGO */}

      <div
        className="sidebar-brand"
        onClick={() => navigate("/")}
      >

        <div className="sidebar-logo">
          ✦
        </div>

        <div className="sidebar-brand-text">

          <strong>
            AI Data
          </strong>

          <span>
            Copilot
          </span>

        </div>

      </div>


      {/* MENU */}

      <div className="sidebar-menu-label">
        MENU
      </div>


      <nav className="sidebar-nav">

        {menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `sidebar-link ${
                isActive ? "active" : ""
              }`
            }
          >

            <span className="sidebar-link-icon">
              {item.icon}
            </span>

            <span>
              {item.label}
            </span>

          </NavLink>

        ))}

      </nav>


      {/* UPGRADE */}

      <div className="sidebar-bottom">

        <div className="upgrade-card">

          <div className="upgrade-icon">
            ✦
          </div>

          <h4>
            Upgrade to Pro
          </h4>

          <p>
            Unlock advanced analytics and AI
            features.
          </p>

          <button>
            Upgrade
          </button>

        </div>


        {/* USER */}

        <div className="sidebar-user">

          <div className="sidebar-user-avatar">
            K
          </div>

          <div className="sidebar-user-info">

            <strong>
              Keshav
            </strong>

            <span>
              Free Plan
            </span>

          </div>

          <button
            className="sidebar-logout"
            onClick={() =>
              navigate("/login")
            }
            aria-label="Logout"
          >
            ↪
          </button>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;