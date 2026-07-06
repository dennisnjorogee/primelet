/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (fn) => {
    setLoading(true);
    try {
      return await fn();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err.message ||
        "Something went wrong";
      toast.error(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  //Auth
  const register_user = useCallback(
    ({ firstName, lastName, emailAddress, password }) =>
      request(async () => {
        const { data } = await axios.post(
          `${backend_url}/api/v1/auth/register`,
          { firstName, lastName, emailAddress, password },
          { withCredentials: true },
        );
        toast.success(data.message);
        return data;
      }),
    [backend_url, request],
  );

  const login_user = useCallback(
    ({ emailAddress, password }) =>
      request(async () => {
        const { data } = await axios.post(
          `${backend_url}/api/v1/auth/login`,
          { emailAddress, password },
          { withCredentials: true },
        );
        setAuthUser(data.user);
        toast.success(data.message);
        return data;
      }),
    [backend_url, request],
  );

  const logout_user = useCallback(
    () =>
      request(async () => {
        await axios.post(
          `${backend_url}/api/v1/auth/logout`,
          {},
          { withCredentials: true },
        );
        setAuthUser(null);
        toast.success("Logged out successfully.");
      }),
    [backend_url, request],
  );

  const forgot_password = useCallback(
    ({ emailAddress }) =>
      request(async () => {
        const { data } = await axios.post(
          `${backend_url}/api/v1/auth/forgot-password`,
          { emailAddress },
          { withCredentials: true },
        );
        toast.success(data.message || "Reset link sent — check your inbox.");
        return data;
      }),
    [backend_url, request],
  );

  const verify_email = useCallback(
    ({ verificationToken }) =>
      request(async () => {
        const { data } = await axios.post(
          `${backend_url}/api/v1/auth/verify-email`,
          { verificationToken },
          { withCredentials: true },
        );
        toast.success(data.message || "Email verified successfully!");
        return data;
      }),
    [backend_url, request],
  );

  const get_me = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backend_url}/api/v1/auth/get-me`, {
        withCredentials: true,
      });
      if (data?.status === "success") {
        setAuthUser(data.user);
      }
      return data?.user ?? null;
    } catch {
      setAuthUser(null);
      return null; // silent — no toast
    }
  }, [backend_url]);

  useEffect(() => {
    const fetchUser = async () => {
      await get_me();
    };
    fetchUser();
  }, [get_me]);

  const value = {
    authUser,
    loading,
    register_user,
    verify_email,
    login_user,
    logout_user,
    forgot_password,
    get_me,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
