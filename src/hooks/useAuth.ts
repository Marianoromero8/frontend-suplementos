export function useAuth() {
  // TODO: Sustituir por estado global/SDK real
  const isAuthenticated = false;
  const user = isAuthenticated ? { id: 1, name: "Juli" } : null;
  return { isAuthenticated, user };
}
