import { render, screen, fireEvent } from "../../../utils/test-utils"
import { mockAuthenticatedState } from "../../../utils/test-utils"
import DashboardOverviewPage from "../../../../app/dashboard/overview/page"
import jest from "jest" // Import jest to fix the undeclared variable error

// Mock next/navigation
const mockPush = jest.fn()
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe("DashboardOverviewPage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders welcome message with user name", () => {
    render(<DashboardOverviewPage />, { initialState: mockAuthenticatedState })

    expect(screen.getByText("Welcome back, John! 👋")).toBeInTheDocument()
    expect(screen.getByText("Here's what's happening with your business today.")).toBeInTheDocument()
  })

  it("renders all statistics cards", () => {
    render(<DashboardOverviewPage />, { initialState: mockAuthenticatedState })

    expect(screen.getByText("Total Users")).toBeInTheDocument()
    expect(screen.getByText("12,847")).toBeInTheDocument()
    expect(screen.getByText("Revenue")).toBeInTheDocument()
    expect(screen.getByText("$847.2K")).toBeInTheDocument()
    expect(screen.getByText("Conversion")).toBeInTheDocument()
    expect(screen.getByText("24.8%")).toBeInTheDocument()
    expect(screen.getByText("Performance")).toBeInTheDocument()
    expect(screen.getByText("99.9%")).toBeInTheDocument()
  })

  it("renders quick actions section", () => {
    render(<DashboardOverviewPage />, { initialState: mockAuthenticatedState })

    expect(screen.getByText("Quick Actions")).toBeInTheDocument()
    expect(screen.getByText("Navigate to different sections of your dashboard")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "View Analytics" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Manage Users" })).toBeInTheDocument()
  })

  it("renders user profile section", () => {
    render(<DashboardOverviewPage />, { initialState: mockAuthenticatedState })

    expect(screen.getByText("User Profile")).toBeInTheDocument()
    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.getByText("test@example.com")).toBeInTheDocument()
    expect(screen.getByText("admin")).toBeInTheDocument()
  })

  it("navigates to analytics page when View Analytics is clicked", () => {
    render(<DashboardOverviewPage />, { initialState: mockAuthenticatedState })

    const analyticsButton = screen.getByRole("button", { name: "View Analytics" })
    fireEvent.click(analyticsButton)

    expect(mockPush).toHaveBeenCalledWith("/dashboard/analytics")
  })

  it("navigates to users page when Manage Users is clicked", () => {
    render(<DashboardOverviewPage />, { initialState: mockAuthenticatedState })

    const usersButton = screen.getByRole("button", { name: "Manage Users" })
    fireEvent.click(usersButton)

    expect(mockPush).toHaveBeenCalledWith("/dashboard/users")
  })

  it("displays trend indicators correctly", () => {
    render(<DashboardOverviewPage />, { initialState: mockAuthenticatedState })

    expect(screen.getByText("+12%")).toBeInTheDocument()
    expect(screen.getByText("+8.2%")).toBeInTheDocument()
    expect(screen.getByText("-3.1%")).toBeInTheDocument()
    expect(screen.getByText("+0.1%")).toBeInTheDocument()
  })
})
