import { createContext, useContext, useReducer, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
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

function getInitialUser(): User | null {
  try {
    const savedUser = localStorage.getItem("user");
    return savedUser ? (JSON.parse(savedUser) as User) : null;
  } catch {
    return null;
  }
}
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, { user: getInitialUser() });

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
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  const isAuthenticated = !!state.user;
  const isAdmin = state.user?.role === "ADMIN";

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
