import { useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import client from "../services/client";
import {
  logInStart,
  logInSuccess,
  logInFailure,
  setUserFromToken,
  clearAuth,
} from "../redux/UserSlice";
const API = import.meta.env.VITE_API_BASE_URL;

export const ME_ENDPOINT = `${API}/auth/profile`;
export const LOGIN_ENDPOINT = `${API}/auth/login`;
export const LOGOUT_ENDPOINT = `${API}/auth/logout`;
export const GOOGLE_ENDPOINT = `${API}/auth/google`;

export const useAuth = () => {
  const dispatch = useDispatch();
  const abortRef = useRef(null);

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

        const { token, user } = res.data;

        localStorage.setItem("token", token);

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

        const appUser = res.data.user || fallbackProfile || null;
        const appToken = res.data.token || null;

        if (appToken) {
          localStorage.setItem("token", appToken);
        }

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
    async ({ name, email, password }) => {
      dispatch(logInStart());
      try {
        const res = await client.post(`${API}/auth/signup`, {
          name,
          email,
          password,
        });

        const { token, user } = res.data || {};

        if (token) {
          localStorage.setItem("token", token);
        }
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
    async (signal) => {
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch(clearAuth());
        return;
      }

      try {
        const res = await client.get(ME_ENDPOINT, {
          signal,
          headers: { Authorization: `Bearer ${token}` },
        });

        const profile = res?.data?.user ?? res?.data ?? null;

        if (profile) {
          dispatch(setUserFromToken(profile));
        } else {
          dispatch(clearAuth());
        }
      } catch (err) {
        localStorage.removeItem("token");
        dispatch(clearAuth());
      }
    },
    [dispatch]
  );

  const triggerValidation = useCallback(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const token = localStorage.getItem("token");
    if(!token){
      dispatch(clearAuth());
    }
    if (!currentUser) validateToken(controller.signal);
  }, [validateToken, currentUser]);

  useEffect(() => {
    triggerValidation();
    return () => abortRef.current?.abort();
  }, [triggerValidation]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "token") triggerValidation();
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [triggerValidation]);

  const logout = useCallback(async () => {
    const token = localStorage.getItem("token");
    localStorage.removeItem("token");
    dispatch(clearAuth());
    if (!token) return;
    try {
      await client.post(
        LOGOUT_ENDPOINT,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
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
  };
};
