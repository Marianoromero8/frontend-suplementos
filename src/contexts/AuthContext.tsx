import { createContext, useContext, useReducer, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthState {
  user: User | null;
}

type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
}

interface AuthContextType {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      dispatch({ type: "LOGIN", payload: JSON.parse(savedUser) });
    }
  }, []);

  const login = (user: User, token: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const isAuthenticated = !!state.user;
  const isAdmin = state.user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout, isAuthenticated, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth dentro de AuthProvider");
  }

  return context;
}
