"use client"

import React from "react"
import { Box, Typography, Button, Card, CardContent } from "@mui/material"
import { ErrorOutline, Refresh } from "@mui/icons-material"
import { DESIGN_TOKENS } from "../../../core/theme/design-system"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<ErrorFallbackProps>
}

interface ErrorFallbackProps {
  error: Error
  resetError: () => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "400px",
      padding: DESIGN_TOKENS.spacing.lg,
    }}
  >
    <Card
      sx={{
        maxWidth: 500,
        textAlign: "center",
        border: `1px solid ${DESIGN_TOKENS.colors.error[200]}`,
        backgroundColor: DESIGN_TOKENS.colors.error[50],
      }}
    >
      <CardContent sx={{ padding: DESIGN_TOKENS.spacing.xl }}>
        <ErrorOutline
          sx={{
            fontSize: 64,
            color: DESIGN_TOKENS.colors.error[500],
            marginBottom: DESIGN_TOKENS.spacing.md,
          }}
        />
        <Typography variant="h5" gutterBottom color="error">
          Something went wrong
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: DESIGN_TOKENS.spacing.lg }}>
          {error.message || "An unexpected error occurred. Please try again."}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Refresh />}
          onClick={resetError}
          sx={{
            backgroundColor: DESIGN_TOKENS.colors.error[500],
            "&:hover": {
              backgroundColor: DESIGN_TOKENS.colors.error[600],
            },
          }}
        >
          Try Again
        </Button>
      </CardContent>
    </Card>
  </Box>
)

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />
    }

    return this.props.children
  }
}
