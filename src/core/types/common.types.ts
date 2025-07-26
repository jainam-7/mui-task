export interface BaseEntity {
  id: string | number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile extends BaseEntity {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  avatar?: string;
  website?: string;

  age?: number;
  gender?: "male" | "female" | "other";
  birthDate?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;

  company?: CompanyInfo;
  address?: AddressInfo;

  isActive: boolean;
  lastLoginAt?: string;
}

export interface CompanyInfo {
  name: string;
  department: string;
  title: string;
  address?: AddressInfo;
}

export interface AddressInfo {
  street?: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  permissions: Permission[];
}

export type UserRole = "admin" | "user" | "viewer";
export type Permission = "read" | "write" | "delete" | "admin";
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationInfo;
  total: number;
}

export interface PaginationInfo {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  metadata?: Record<string, any>;
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string;
  borderWidth?: number;
}
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  lastUpdated?: string;
}

export interface NotificationState {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  duration?: number;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  action: () => void;
  variant?: "text" | "outlined" | "contained";
}
export interface FormField<T = any> {
  name: keyof T;
  label: string;
  type: "text" | "email" | "password" | "number" | "select" | "checkbox";
  required?: boolean;
  validation?: ValidationRule[];
  options?: SelectOption[];
}

export interface ValidationRule {
  type: "required" | "email" | "minLength" | "maxLength" | "pattern";
  value?: any;
  message: string;
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}
export type BreakpointKey = "xs" | "sm" | "md" | "lg" | "xl";

export interface ResponsiveValue<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}
