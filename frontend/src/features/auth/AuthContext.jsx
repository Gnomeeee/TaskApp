import { useState } from "react";
import { AuthContext } from "./auth.context.js";
import { getToken, setToken, removeToken } from "../../utils/storage.js";
import * as authApi from "../../services/api/auth.api.js";

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getToken());

  async function register(username, email, password) {
    const user = await authApi.register({ username, email, password });
    return user;
  }

  async function login(email, password) {
    const { token } = await authApi.login({ email, password });
    setToken(token);
    setTokenState(token);
  }

  async function logout() {
    try {
      await authApi.logout();
    } catch (err) {
      console.error("Logout request failed:", err.message);
    }
    removeToken();
    setTokenState(null);
  }

  const value = { token, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
