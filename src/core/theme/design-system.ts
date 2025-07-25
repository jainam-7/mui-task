"use client";

import { createTheme } from "@mui/material/styles";

export const DESIGN_TOKENS = {
  colors: {
    primary: {
      50: "#f0f4ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1", // main primary
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81",
    },
    secondary: {
      50: "#fdf4ff",
      100: "#fae8ff",
      200: "#f5d0fe",
      300: "#f0abfc",
      400: "#e879f9",
      500: "#d946ef", // main   secondary
      600: "#c026d3",
      700: "#a21caf",
      800: "#86198f",
      900: "#701a75",
    },
    success: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
    },
    warning: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
    },
    error: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
    },
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
    background: {
      primary: "#fafbfc",
      secondary: "#ffffff",
      tertiary: "#f8fafc",
      dark: "#0f172a",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: {
      primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      secondary: '"JetBrains Mono", "Fira Code", Consolas, monospace',
    },
    fontSize: {
      xs: "0.75rem", 
      sm: "0.875rem", 
      base: "1rem", 
      lg: "1.125rem", 
      xl: "1.25rem", 
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem", 
      "5xl": "3rem", 
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    "2xl": 48,
    "3xl": 64,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    "2xl": 24,
    full: 9999,
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
} as const;

export const demoTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: DESIGN_TOKENS.colors.primary[500],
      light: DESIGN_TOKENS.colors.primary[400],
      dark: DESIGN_TOKENS.colors.primary[600],
      contrastText: "#ffffff",
    },
    secondary: {
      main: DESIGN_TOKENS.colors.secondary[500],
      light: DESIGN_TOKENS.colors.secondary[400],
      dark: DESIGN_TOKENS.colors.secondary[600],
      contrastText: "#ffffff",
    },
    success: {
      main: DESIGN_TOKENS.colors.success[500],
      light: DESIGN_TOKENS.colors.success[400],
      dark: DESIGN_TOKENS.colors.success[600],
    },
    warning: {
      main: DESIGN_TOKENS.colors.warning[500],
      light: DESIGN_TOKENS.colors.warning[400],
      dark: DESIGN_TOKENS.colors.warning[600],
    },
    error: {
      main: DESIGN_TOKENS.colors.error[500],
      light: DESIGN_TOKENS.colors.error[400],
      dark: DESIGN_TOKENS.colors.error[600],
    },
    background: {
      default: DESIGN_TOKENS.colors.background.primary,
      paper: DESIGN_TOKENS.colors.background.paper,
    },
    text: {
      primary: DESIGN_TOKENS.colors.neutral[900],
      secondary: DESIGN_TOKENS.colors.neutral[600],
    },
  },
  typography: {
    fontFamily: DESIGN_TOKENS.typography.fontFamily.primary,
    h1: {
      fontSize: DESIGN_TOKENS.typography.fontSize["5xl"],
      fontWeight: DESIGN_TOKENS.typography.fontWeight.bold,
      lineHeight: 1.2,
      letterSpacing: "-0.025em",
    },
    h2: {
      fontSize: DESIGN_TOKENS.typography.fontSize["4xl"],
      fontWeight: DESIGN_TOKENS.typography.fontWeight.bold,
      lineHeight: 1.3,
      letterSpacing: "-0.025em",
    },
    h3: {
      fontSize: DESIGN_TOKENS.typography.fontSize["3xl"],
      fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: DESIGN_TOKENS.typography.fontSize["2xl"],
      fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: DESIGN_TOKENS.typography.fontSize.xl,
      fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: DESIGN_TOKENS.typography.fontSize.lg,
      fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: DESIGN_TOKENS.typography.fontSize.base,
      fontWeight: DESIGN_TOKENS.typography.fontWeight.normal,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: DESIGN_TOKENS.typography.fontSize.sm,
      fontWeight: DESIGN_TOKENS.typography.fontWeight.normal,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: DESIGN_TOKENS.typography.fontSize.xs,
      fontWeight: DESIGN_TOKENS.typography.fontWeight.medium,
      lineHeight: 1.4,
    },
  },
  shape: {
    borderRadius: DESIGN_TOKENS.borderRadius.md,
  },
  shadows: [
    "none",
    DESIGN_TOKENS.shadows.sm,
    DESIGN_TOKENS.shadows.md,
    DESIGN_TOKENS.shadows.lg,
    DESIGN_TOKENS.shadows.xl,
    DESIGN_TOKENS.shadows.xl,
    DESIGN_TOKENS.shadows.xl,
    DESIGN_TOKENS.shadows.xl,
    DESIGN_TOKENS.shadows.xl,
    DESIGN_TOKENS.shadows.xl,
    DESIGN_TOKENS.shadows.xl,
    DESIGN_TOKENS.shadows.xl,
    DESIGN_TOKENS.shadows.xl,
    DESIGN_TOKENS.shadows.xl,
    DESIGN_TOKENS.shadows.xl,
    DESIGN_TOKENS.shadows.xl,
    DESIGN_TOKENS.shadows.xl,
    DESIGN_TOKENS.shadows.xl,
    DESIGN_TOKENS.shadows.xl,
    DESIGN_TOKENS.shadows.xl,
    DESIGN_TOKENS.shadows.xl,
    DESIGN_TOKENS.shadows.xl,
    DESIGN_TOKENS.shadows.xl,
    DESIGN_TOKENS.shadows.xl,
    DESIGN_TOKENS.shadows.xl,
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: DESIGN_TOKENS.borderRadius.lg,
          textTransform: "none",
          fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold,
          fontSize: DESIGN_TOKENS.typography.fontSize.sm,
          padding: "12px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: DESIGN_TOKENS.shadows.md,
          },
        },
        contained: {
          background: `linear-gradient(135deg, ${DESIGN_TOKENS.colors.primary[500]} 0%, ${DESIGN_TOKENS.colors.primary[600]} 100%)`,
          "&:hover": {
            background: `linear-gradient(135deg, ${DESIGN_TOKENS.colors.primary[600]} 0%, ${DESIGN_TOKENS.colors.primary[700]} 100%)`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: DESIGN_TOKENS.borderRadius.xl,
          boxShadow: DESIGN_TOKENS.shadows.sm,
          border: `1px solid ${DESIGN_TOKENS.colors.neutral[200]}`,
          "&:hover": {
            boxShadow: DESIGN_TOKENS.shadows.md,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: DESIGN_TOKENS.borderRadius.xl,
          boxShadow: DESIGN_TOKENS.shadows.sm,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: DESIGN_TOKENS.colors.background.secondary,
          borderRight: `1px solid ${DESIGN_TOKENS.colors.neutral[200]}`,
          boxShadow: DESIGN_TOKENS.shadows.lg,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: DESIGN_TOKENS.colors.background.secondary,
          color: DESIGN_TOKENS.colors.neutral[900],
          boxShadow: DESIGN_TOKENS.shadows.sm,
          borderBottom: `1px solid ${DESIGN_TOKENS.colors.neutral[200]}`,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: DESIGN_TOKENS.borderRadius.lg,
          fontWeight: DESIGN_TOKENS.typography.fontWeight.medium,
        },
      },
    },
  },
});

export default demoTheme;
