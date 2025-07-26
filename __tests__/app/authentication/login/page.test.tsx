import { render, screen, fireEvent, waitFor } from "../../../utils/test-utils"
import { mockUnauthenticatedState } from "../../../utils/test-utils"
import LoginPage from "../../../../app/authentication/login/page"

describe("LoginPage", () => {
  it("renders login form", () => {
    render(<LoginPage />, { initialState: mockUnauthenticatedState })

    expect(screen.getByText("Welcome Back")).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument()
  })

  it("displays demo credentials section", () => {
    render(<LoginPage />, { initialState: mockUnauthenticatedState })

    expect(screen.getByText("Demo Credentials")).toBeInTheDocument()
    expect(screen.getByText("admin@demo.com")).toBeInTheDocument()
    expect(screen.getByText("demo2024")).toBeInTheDocument()
  })

  it("fills demo credentials when button is clicked", async () => {
    render(<LoginPage />, { initialState: mockUnauthenticatedState })

    const useDemoButton = screen.getByText("Use Demo Credentials")
    fireEvent.click(useDemoButton)

    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement

    expect(emailInput.value).toBe("admin@demo.com")
    expect(passwordInput.value).toBe("demo2024")
  })

  it("shows validation errors for empty fields", async () => {
    render(<LoginPage />, { initialState: mockUnauthenticatedState })

    const submitButton = screen.getByRole("button", { name: /sign in/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument()
      expect(screen.getByText("Password is required")).toBeInTheDocument()
    })
  })

  it("shows validation error for invalid email", async () => {
    render(<LoginPage />, { initialState: mockUnauthenticatedState })

    const emailInput = screen.getByLabelText(/email address/i)
    const submitButton = screen.getByRole("button", { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: "invalid-email" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument()
    })
  })

  it("shows validation error for short password", async () => {
    render(<LoginPage />, { initialState: mockUnauthenticatedState })

    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole("button", { name: /sign in/i })

    fireEvent.change(passwordInput, { target: { value: "123" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText("Password must be at least 6 characters")).toBeInTheDocument()
    })
  })

  it("toggles password visibility", () => {
    render(<LoginPage />, { initialState: mockUnauthenticatedState })

    const passwordInput = screen.getByLabelText(/password/i)
    const toggleButton = screen.getByLabelText("toggle password visibility")

    expect(passwordInput).toHaveAttribute("type", "password")

    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute("type", "text")

    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute("type", "password")
  })
})
