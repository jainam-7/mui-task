export const APP_CONFIG = {
  name: "Demo Analytics",
  version: "2.0.0",
  description: "Advanced analytics dashboard platform",
  author: "Demo Team",
  //navigation
  navigation: {
    drawer: {
      width: 280,
      mobileBreakpoint: "md",
    },
    appBar: {
      height: 64,
    },
  },
  // api
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com",
    endpoints: {
      users: "/users",
      auth: "/auth",
    },
    pagination: {
      defaultLimit: 8,
      maxLimit: 50,
    },
  },
  //credential
  demo: {
    email: "admin@demo.com",
    password: "demo2024",
  },
} as const;

export const ROUTE_PATHS = {
  root: "/",
  auth: {
    login: "/authentication/login",
    logout: "/authentication/logout",
  },
  dashboard: {
    home: "/dashboard/overview",
    analytics: "/dashboard/analytics",
    users: "/dashboard/users",
  },
} as const;

export const STORAGE_KEYS = {
  user: "demo_user",
  theme: "demo_theme",
  preferences: "demo_preferences",
} as const;
