import { render, screen, fireEvent, waitFor } from "../../../utils/test-utils"
import { mockUnauthenticatedState } from "../../../utils/test-utils"
import { LoginForm } from "../../../../features/authentication/components/login-form.component"
import jest from "jest" // Import jest to declare the variable

// Mock next/navigation
const mockPush = jest.fn()
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders all form elements", () => {
    render(<LoginForm />, { initialState: mockUnauthenticatedState })

    expect(screen.getByText("Welcome Back")).toBeInTheDocument()
    expect(screen.getByText("Sign in to access Demo Analytics")).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument()
  })

  it("validates required fields", async () => {
    render(<LoginForm />, { initialState: mockUnauthenticatedState })

    const submitButton = screen.getByRole("button", { name: /sign in/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument()
      expect(screen.getByText("Password is required")).toBeInTheDocument()
    })
  })

  it("validates email format", async () => {
    render(<LoginForm />, { initialState: mockUnauthenticatedState })

    const emailInput = screen.getByLabelText(/email address/i)
    const submitButton = screen.getByRole("button", { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: "invalid-email" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument()
    })
  })

  it("validates password length", async () => {
    render(<LoginForm />, { initialState: mockUnauthenticatedState })

    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole("button", { name: /sign in/i })

    fireEvent.change(passwordInput, { target: { value: "123" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText("Password must be at least 6 characters")).toBeInTheDocument()
    })
  })

  it("clears validation errors when user starts typing", async () => {
    render(<LoginForm />, { initialState: mockUnauthenticatedState })

    const emailInput = screen.getByLabelText(/email address/i)
    const submitButton = screen.getByRole("button", { name: /sign in/i })

    // Trigger validation error
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument()
    })

    // Start typing to clear error
    fireEvent.change(emailInput, { target: { value: "test@example.com" } })

    await waitFor(() => {
      expect(screen.queryByText("Email is required")).not.toBeInTheDocument()
    })
  })

  it("fills demo credentials when button is clicked", () => {
    render(<LoginForm />, { initialState: mockUnauthenticatedState })

    const demoButton = screen.getByText("Use Demo Credentials")
    fireEvent.click(demoButton)

    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement

    expect(emailInput.value).toBe("admin@demo.com")
    expect(passwordInput.value).toBe("demo2024")
  })

  it("toggles password visibility", () => {
    render(<LoginForm />, { initialState: mockUnauthenticatedState })

    const passwordInput = screen.getByLabelText(/password/i)
    const toggleButton = screen.getByLabelText("toggle password visibility")

    expect(passwordInput).toHaveAttribute("type", "password")

    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute("type", "text")

    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute("type", "password")
  })

  it("displays loading state during submission", async () => {
    const loadingState = {
      ...mockUnauthenticatedState,
      authentication: {
        ...mockUnauthenticatedState.authentication,
        isLoading: true,
      },
    }

    render(<LoginForm />, { initialState: loadingState })

    expect(screen.getByText("Signing In...")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /signing in/i })).toBeDisabled()
  })

  it("displays error message when authentication fails", () => {
    const errorState = {
      ...mockUnauthenticatedState,
      authentication: {
        ...mockUnauthenticatedState.authentication,
        error: "Invalid credentials",
      },
    }

    render(<LoginForm />, { initialState: errorState })

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument()
  })
})
