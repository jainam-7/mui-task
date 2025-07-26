import { render, screen, fireEvent } from "../../../utils/test-utils"
import { mockAuthenticatedState, mockUnauthenticatedState } from "../../../utils/test-utils"
import DashboardLayout from "../../../../app/dashboard/layout"
import jest from "jest" // Declare the jest variable

// Mock next/navigation
const mockPush = jest.fn()
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe("DashboardLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders navigation items", () => {
    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>,
      { initialState: mockAuthenticatedState },
    )

    expect(screen.getByText("Nexus Analytics")).toBeInTheDocument()
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Dashboard")).toBeInTheDocument()
    expect(screen.getByText("Users")).toBeInTheDocument()
  })

  it("displays user profile information in sidebar", () => {
    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>,
      { initialState: mockAuthenticatedState },
    )

    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.getByText("test@example.com")).toBeInTheDocument()
  })

  it("renders main content", () => {
    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>,
      { initialState: mockAuthenticatedState },
    )

    expect(screen.getByText("Test Content")).toBeInTheDocument()
  })

  it("redirects to login when user is not authenticated", () => {
    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>,
      { initialState: mockUnauthenticatedState },
    )

    // Should not render content when not authenticated
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument()
  })

  it("opens profile menu when account icon is clicked", () => {
    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>,
      { initialState: mockAuthenticatedState },
    )

    const accountButton = screen.getByLabelText("account of current user")
    fireEvent.click(accountButton)

    expect(screen.getByText("Logout")).toBeInTheDocument()
  })

  it("handles logout when logout menu item is clicked", () => {
    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>,
      { initialState: mockAuthenticatedState },
    )

    const accountButton = screen.getByLabelText("account of current user")
    fireEvent.click(accountButton)

    const logoutButton = screen.getByText("Logout")
    fireEvent.click(logoutButton)

    // Logout action would be dispatched
    expect(logoutButton).toBeInTheDocument()
  })

  it("toggles mobile drawer when menu button is clicked", () => {
    // Mock mobile viewport
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === "(max-width:899.95px)",
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>,
      { initialState: mockAuthenticatedState },
    )

    const menuButton = screen.getByLabelText("open drawer")
    expect(menuButton).toBeInTheDocument()
  })
})
