import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { ThemeProvider } from "./components/ThemeContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Copilot from "./pages/Copilot";
import UploadData from "./pages/UploadData";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

import "./App.css";

function Layout({ children }) {
  return (
    <div className="app-shell">

      <Sidebar />

      <div className="main-area">

        <Header />

        <main className="page-container">
          {children}
        </main>

      </div>

    </div>
  );
}

function App() {
  return (
    <ThemeProvider>

      <BrowserRouter>

        <Routes>

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />

          <Route
            path="/copilot"
            element={
              <Layout>
                <Copilot />
              </Layout>
            }
          />

          <Route
            path="/upload"
            element={
              <Layout>
                <UploadData />
              </Layout>
            }
          />

          <Route
            path="/analytics"
            element={
              <Layout>
                <Analytics />
              </Layout>
            }
          />

          <Route
            path="/settings"
            element={
              <Layout>
                <Settings />
              </Layout>
            }
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

        </Routes>

      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;