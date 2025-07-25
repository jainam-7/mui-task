"use client";

import type React from "react";
import { Provider } from "react-redux";
import { demoStore } from "../src/core/store/store.config";

export function DemoProviders({ children }: { children: React.ReactNode }) {
  return <Provider store={demoStore}>{children}</Provider>;
}
