import { useEffect } from "react";

import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";

// Axios private hook for adding authorization to server calls for protected routes 
function useAxiosPrivate() {
  const { auth } = useAuth();

  // Called whenever auth is changed (either when user logs in or logs out)
  useEffect(() => {
    // Intercepts an outgoing request called using axiosPrivate handle and adds Authorization header (with accessToken)
    // in its header
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Cleaning up the interceptors at the time when the component is getting unmounted
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [auth]);

  return axiosPrivate;
}

export default useAxiosPrivate;
