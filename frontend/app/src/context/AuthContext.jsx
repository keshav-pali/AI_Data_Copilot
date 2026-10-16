import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser
      ? JSON.parse(storedUser)
      : null;
  });

  const [loading, setLoading] = useState(true);

  const isAuthenticated = Boolean(
    localStorage.getItem("token")
  );

  useEffect(() => {
    const verifyAuthentication = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();

        const currentUser =
          response.user ||
          response.data?.user ||
          response.data ||
          null;

        if (currentUser) {
          setUser(currentUser);
          localStorage.setItem(
            "user",
            JSON.stringify(currentUser)
          );
        }
      } catch (error) {
        console.error(
          "Authentication verification failed:",
          error.message
        );

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyAuthentication();
  }, []);

  const login = async (email, password) => {
    const response = await loginUser(
      email,
      password
    );

    const token =
      response.token ||
      response.data?.token;

    const loggedInUser =
      response.user ||
      response.data?.user ||
      null;

    if (!token) {
      throw new Error(
        "Login successful but no authentication token was returned."
      );
    }

    localStorage.setItem("token", token);

    if (loggedInUser) {
      localStorage.setItem(
        "user",
        JSON.stringify(loggedInUser)
      );

      setUser(loggedInUser);
    }

    return response;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}