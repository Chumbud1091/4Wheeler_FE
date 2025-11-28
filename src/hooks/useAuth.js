import { useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../services/apiClient";
import { clearAuth, setUserFromToken } from "../redux/UserSlice";
import axios from "axios";

const ME_ENDPOINT = "/api/auth/profile";
const LOGOUT_ENDPOINT = "/api/auth/logout";

export const useAuth = () => {
  const dispatch = useDispatch();
  const abortRef = useRef(null);

  const currentUser = useSelector((state) => state.user.currentUser);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const validateToken = useCallback(
    async (signal) => {
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch(clearAuth());
        return;
      }

      try {
        const res = await apiClient.get(ME_ENDPOINT, {
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
        if (
          axios.isAxiosError(err) &&
          err.response &&
          err.response.status === 401
        ) {
          localStorage.removeItem("token");
          dispatch(clearAuth());
        } else {
          dispatch(clearAuth());
        }
      }
    },
    [dispatch]
  );

  const logout = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await apiClient.post(
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
    }

    localStorage.removeItem("token");
    dispatch(clearAuth());
  }, [dispatch]);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;
    validateToken(controller.signal);

    return () => {
      try {
        controller.abort();
      } catch {}
      abortRef.current = null;
    };
  }, [validateToken]);

  useEffect(() => {
    const handleStorageChange = (ev) => {
      if (ev.key === "token") {
        if (abortRef.current) {
          try {
            abortRef.current.abort();
          } catch {
            // ignore
          }
        }
        const controller = new AbortController();
        abortRef.current = controller;
        validateToken(controller.signal);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [validateToken]);

  return {
    currentUser,
    isLoggedIn,
    loading,
    error,
    validateToken, 
    logout,
  };
};
