export function useAuth() {
  const isAuthenticated = false;
  const user = isAuthenticated ? { id: 1, name: "Juli" } : null;
  return { isAuthenticated, user };
}
