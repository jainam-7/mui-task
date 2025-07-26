import { render, screen, waitFor } from "../utils/test-utils"
import { mockAuthenticatedState, mockUnauthenticatedState } from "../utils/test-utils"
import HomePage from "../../app/page"
import jest from "jest" // Import jest to fix the undeclared variable error

// Mock next/navigation
const mockPush = jest.fn()
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  it("renders loading spinner initially", () => {
    render(<HomePage />)

    expect(screen.getByText("Loading...")).toBeInTheDocument()
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })

  it("redirects to login when user is not authenticated", async () => {
    render(<HomePage />, { initialState: mockUnauthenticatedState })

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/authentication/login")
    })
  })

  it("redirects to dashboard when user is authenticated", async () => {
    render(<HomePage />, { initialState: mockAuthenticatedState })

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dashboard/overview")
    })
  })

  it("restores session from localStorage", async () => {
    const mockUser = {
      id: "test-user",
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
    }

    localStorage.getItem = jest.fn().mockReturnValue(JSON.stringify(mockUser))

    render(<HomePage />)

    expect(localStorage.getItem).toHaveBeenCalledWith("demo_user")
  })

  it("handles invalid localStorage data gracefully", async () => {
    localStorage.getItem = jest.fn().mockReturnValue("invalid-json")
    const consoleSpy = jest.spyOn(console, "error").mockImplementation()

    render(<HomePage />)

    expect(consoleSpy).toHaveBeenCalledWith("Failed to restore session:", expect.any(Error))
    expect(localStorage.removeItem).toHaveBeenCalledWith("demo_user")

    consoleSpy.mockRestore()
  })
})
