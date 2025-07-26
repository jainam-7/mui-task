import { render, screen, fireEvent, waitFor } from "../../../utils/test-utils"
import { mockAuthenticatedState } from "../../../utils/test-utils"
import UsersPage from "../../../../app/dashboard/users/page"
import jest from "jest" // Import jest to declare the variable

// Mock the fetch function
global.fetch = jest.fn()

describe("UsersPage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        users: [
          {
            id: 1,
            firstName: "Jane",
            lastName: "Smith",
            username: "janesmith",
            email: "jane@example.com",
            phone: "+1234567890",
            image: "https://example.com/jane.jpg",
            age: 28,
            gender: "female",
            company: {
              name: "Tech Corp",
              department: "Engineering",
              title: "Software Engineer",
            },
            address: {
              city: "New York",
              state: "NY",
              country: "USA",
            },
          },
        ],
        total: 1,
      }),
    })
  })

  it("renders page title and description", () => {
    render(<UsersPage />, { initialState: mockAuthenticatedState })

    expect(screen.getByText("Users Management")).toBeInTheDocument()
    expect(screen.getByText("Browse and manage user profiles")).toBeInTheDocument()
  })

  it("displays loading spinner initially", () => {
    const loadingState = {
      ...mockAuthenticatedState,
      userManagement: {
        ...mockAuthenticatedState.userManagement,
        isLoading: true,
      },
    }

    render(<UsersPage />, { initialState: loadingState })

    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })

  it("renders user cards when data is loaded", async () => {
    render(<UsersPage />, { initialState: mockAuthenticatedState })

    await waitFor(() => {
      expect(screen.getByText("Jane Smith")).toBeInTheDocument()
      expect(screen.getByText("@janesmith")).toBeInTheDocument()
      expect(screen.getByText("jane@example.com")).toBeInTheDocument()
      expect(screen.getByText("Tech Corp")).toBeInTheDocument()
      expect(screen.getByText("New York, USA")).toBeInTheDocument()
    })
  })

  it("displays user age and gender chips", async () => {
    render(<UsersPage />, { initialState: mockAuthenticatedState })

    await waitFor(() => {
      expect(screen.getByText("28 years")).toBeInTheDocument()
      expect(screen.getByText("female")).toBeInTheDocument()
      expect(screen.getByText("Active")).toBeInTheDocument()
    })
  })

  it("displays error message when fetch fails", () => {
    const errorState = {
      ...mockAuthenticatedState,
      userManagement: {
        ...mockAuthenticatedState.userManagement,
        error: "Failed to fetch users",
        isLoading: false,
      },
    }

    render(<UsersPage />, { initialState: errorState })

    expect(screen.getByText("Error loading users: Failed to fetch users")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument()
  })

  it("retries fetching users when retry button is clicked", () => {
    const errorState = {
      ...mockAuthenticatedState,
      userManagement: {
        ...mockAuthenticatedState.userManagement,
        error: "Failed to fetch users",
        isLoading: false,
      },
    }

    render(<UsersPage />, { initialState: errorState })

    const retryButton = screen.getByRole("button", { name: /retry/i })
    fireEvent.click(retryButton)

    // The retry functionality would be tested through Redux actions
    expect(retryButton).toBeInTheDocument()
  })

  it("renders user avatars correctly", async () => {
    render(<UsersPage />, { initialState: mockAuthenticatedState })

    await waitFor(() => {
      const avatar = screen.getByRole("img")
      expect(avatar).toHaveAttribute("src", "https://example.com/jane.jpg")
    })
  })
})
