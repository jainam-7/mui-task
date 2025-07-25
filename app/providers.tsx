"use client"

import type React from "react"
import { Provider } from "react-redux"
import { demoStore } from "../src/core/store/store.config"
import { ErrorBoundary } from "../src/shared/components/ui/error-boundary.component"

export function DemoProviders({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Provider store={demoStore}>{children}</Provider>
    </ErrorBoundary>
  )
}
