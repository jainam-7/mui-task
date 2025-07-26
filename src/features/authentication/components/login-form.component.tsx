"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Container,
  CircularProgress,
} from "@mui/material"
import { Email, Lock, Visibility, VisibilityOff, LoginOutlined } from "@mui/icons-material"
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux.hooks"
import { authenticateUser, clearAuthError } from "../store/authentication.slice"
import { APP_CONFIG, ROUTE_PATHS } from "../../../core/constants/app-constants"

export const LoginForm: React.FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isLoading, error } = useAppSelector((state) => state.authentication)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.email) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      errors.password = "Password is required"
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (field: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))

    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }

    // Clear auth error
    if (error) {
      dispatch(clearAuthError())
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!validateForm()) return

    try {
      const result = await dispatch(authenticateUser(formData)).unwrap()
      if (result) {
        router.push(ROUTE_PATHS.dashboard.home)
      }
    } catch (error) {
      // Error is handled by the slice
      console.error("Login failed:", error)
    }
  }

  const fillDemoCredentials = () => {
    setFormData({
      email: APP_CONFIG.demo.email,
      password: APP_CONFIG.demo.password,
    })
    setValidationErrors({})
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={24}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  mb: 2,
                  boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                }}
              >
                <LoginOutlined sx={{ fontSize: 40, color: "white" }} />
              </Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: "#2d3748" }}>
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Sign in to access {APP_CONFIG.name}
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  "& .MuiAlert-message": {
                    fontSize: "0.95rem",
                  },
                }}
              >
                {error}
              </Alert>
            )}

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange("email")}
                error={!!validationErrors.email}
                helperText={validationErrors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "white",
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange("password")}
                error={!!validationErrors.password}
                helperText={validationErrors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 4,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "white",
                    },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{
                  height: 56,
                  mb: 3,
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                    boxShadow: "0 12px 40px rgba(102, 126, 234, 0.4)",
                    transform: "translateY(-2px)",
                  },
                  "&:disabled": {
                    background: "rgba(102, 126, 234, 0.6)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {isLoading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <CircularProgress size={24} color="inherit" />
                    <span>Signing In...</span>
                  </Box>
                ) : (
                  "Sign In"
                )}
              </Button>
            </Box>

            {/* Demo Credentials */}
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                Demo Access
              </Typography>
            </Divider>

            <Box
              sx={{
                p: 3,
                backgroundColor: "rgba(102, 126, 234, 0.05)",
                borderRadius: 2,
                border: "1px solid rgba(102, 126, 234, 0.1)",
                textAlign: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                Demo Credentials
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontFamily: "monospace", mb: 0.5 }}>
                  <strong>Email:</strong> {APP_CONFIG.demo.email}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                  <strong>Password:</strong> {APP_CONFIG.demo.password}
                </Typography>
              </Box>
              <Button
                size="small"
                variant="outlined"
                onClick={fillDemoCredentials}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 500,
                  borderColor: "rgba(102, 126, 234, 0.3)",
                  color: "#667eea",
                  "&:hover": {
                    borderColor: "#667eea",
                    backgroundColor: "rgba(102, 126, 234, 0.05)",
                  },
                }}
              >
                Use Demo Credentials
              </Button>
            </Box>

            {/* Footer */}
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="caption" color="text.secondary">
                © 2025 {APP_CONFIG.name}. All rights reserved.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
