import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import client from "../services/client";
import {
  logInStart,
  logInSuccess,
  logInFailure,
  setUserFromToken,
  clearAuth,
} from "../redux/UserSlice";

const API = import.meta.env.VITE_API_BASE;

export const PROFILE_ENDPOINT = `${API}/auth/users/profile`;
export const LOGIN_ENDPOINT = `${API}/auth/users/login`;
export const LOGOUT_ENDPOINT = `${API}/auth/users/logout`;
export const GOOGLE_ENDPOINT = `${API}/auth/google`;

export const useAuth = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const isLoggedIn = !!currentUser;

  const login = useCallback(
    async (email, password) => {
      dispatch(logInStart());

      try {
        const res = await client.post(LOGIN_ENDPOINT, {
          email,
          password,
        });

        const user = res.data;
        dispatch(logInSuccess(user));

        return user;
      } catch (err) {
        const message =
          err?.response?.data?.message || "Login failed. Please try again.";
        dispatch(logInFailure(message));
        throw err;
      }
    },
    [dispatch]
  );

  const loginWithGoogle = useCallback(
    async (idToken, fallbackProfile) => {
      dispatch(logInStart());
      try {
        const res = await client.post(GOOGLE_ENDPOINT, { idToken });

        const appUser = res.data || fallbackProfile || null;
        dispatch(logInSuccess(appUser));

        return appUser;
      } catch (err) {
        const message =
          err?.response?.data?.message || "Google sign-in failed.";
        dispatch(logInFailure(message));
        throw err;
      }
    },
    [dispatch]
  );

  const signup = useCallback(
    async ({ username, email, password }) => {
      dispatch(logInStart());
      try {
        const res = await client.post(`${API}/auth/users/register`, {
          username,
          email,
          password,
        });

        const user = res.data?.user ?? null;

        if (user) {
          dispatch(logInSuccess(user));
        } else {
          dispatch(logInSuccess(null));
        }

        return res.data;
      } catch (err) {
        const message =
          err?.response?.data?.message || "Sign up failed. Please try again.";
        dispatch(logInFailure(message));
        throw err;
      }
    },
    [dispatch]
  );

  const validateToken = useCallback(
    async () => {
      try {
        const res = await client.get(PROFILE_ENDPOINT);

        const profile = res?.data?.user ?? res?.data ?? null;

        if (profile) {
          dispatch(setUserFromToken(profile));
        } else {
          dispatch(clearAuth());
        }
      } catch (err) {
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          console.warn("[useAuth] Token invalid or expired. Clearing auth.");
          dispatch(clearAuth());
        } else if (err.code !== "ERR_CANCELED") {
          console.error(
            "[useAuth] Token validation failed but keeping current user:",
            err
          );
        }
      }
    },
    [dispatch]
  );

  const refreshSession = useCallback(() => {
    validateToken();
  }, [validateToken]);

  const logout = useCallback(async () => {
    dispatch(clearAuth());
    try {
      await client.post(
        LOGOUT_ENDPOINT,
        {},
        {
          timeout: 2000,
        }
      );
    } catch {
      // ignore
    }
  }, [dispatch]);

  return {
    currentUser,
    isLoggedIn,
    loading,
    error,
    login,
    loginWithGoogle,
    signup,
    logout,
    refreshSession,
  };
};
