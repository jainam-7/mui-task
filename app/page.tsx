"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux.hooks";
import { restoreSession } from "@/features/authentication/store/authentication.slice";
import { ROUTE_PATHS, STORAGE_KEYS } from "@/core/constants/app-constants";

export default function HomePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.authentication);

  useEffect(() => {
    // try  to restore session from local storage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem(STORAGE_KEYS.user);
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          dispatch(restoreSession(user));
          return;
        } catch (error) {
          console.error("Failed to restore session:", error);
          localStorage.removeItem(STORAGE_KEYS.user);
        }
      }
    }

    // redirect to login page
    router.push(ROUTE_PATHS.auth.login);
  }, [dispatch, router]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROUTE_PATHS.dashboard.home);
    }
  }, [isAuthenticated, router]);

  return null;
}
