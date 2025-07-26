import { render, screen, fireEvent, waitFor } from "../../../utils/test-utils"
import { mockAuthenticatedState } from "../../../utils/test-utils"
import DashboardAnalyticsPage from "../../../../app/dashboard/analytics/page"
import jest from "jest" // Declare the jest variable

// Mock recharts
jest.mock("recharts", () => ({
  BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => <div data-testid="bar" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
  PieChart: ({ children }: any) => <div data-testid="pie-chart">{children}</div>,
  Pie: () => <div data-testid="pie" />,
  Cell: () => <div data-testid="cell" />,
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
}))

describe("DashboardAnalyticsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders page title and description", () => {
    render(<DashboardAnalyticsPage />, { initialState: mockAuthenticatedState })

    expect(screen.getByText("Analytics Dashboard")).toBeInTheDocument()
    expect(
      screen.getByText("User data fetched from DummyJSON API with pagination and visualizations"),
    ).toBeInTheDocument()
  })

  it("renders statistics cards", () => {
    render(<DashboardAnalyticsPage />, { initialState: mockAuthenticatedState })

    expect(screen.getByText("Total Users")).toBeInTheDocument()
    expect(screen.getByText("Current Page")).toBeInTheDocument()
    expect(screen.getByText("Total Pages")).toBeInTheDocument()
    expect(screen.getByText("Data Source")).toBeInTheDocument()
  })

  it("renders tabs for data table and charts", () => {
    render(<DashboardAnalyticsPage />, { initialState: mockAuthenticatedState })

    expect(screen.getByText("Data Table")).toBeInTheDocument()
    expect(screen.getByText("Charts & Graphs")).toBeInTheDocument()
  })

  it("switches between tabs when clicked", async () => {
    render(<DashboardAnalyticsPage />, { initialState: mockAuthenticatedState })

    const chartsTab = screen.getByText("Charts & Graphs")
    fireEvent.click(chartsTab)

    await waitFor(() => {
      expect(screen.getByText("Data Visualizations")).toBeInTheDocument()
    })
  })

  it("renders data table with user information", () => {
    render(<DashboardAnalyticsPage />, { initialState: mockAuthenticatedState })

    expect(screen.getByText("Users Data Table")).toBeInTheDocument()
    expect(screen.getByText("Avatar")).toBeInTheDocument()
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("Email")).toBeInTheDocument()
    expect(screen.getByText("Age")).toBeInTheDocument()
    expect(screen.getByText("Gender")).toBeInTheDocument()
    expect(screen.getByText("Company")).toBeInTheDocument()
    expect(screen.getByText("Status")).toBeInTheDocument()
  })

  it("displays user data in table rows", () => {
    render(<DashboardAnalyticsPage />, { initialState: mockAuthenticatedState })

    expect(screen.getByText("Jane Smith")).toBeInTheDocument()
    expect(screen.getByText("@janesmith")).toBeInTheDocument()
    expect(screen.getByText("jane@example.com")).toBeInTheDocument()
    expect(screen.getByText("Tech Corp")).toBeInTheDocument()
  })

  it("renders charts when charts tab is selected", async () => {
    render(<DashboardAnalyticsPage />, { initialState: mockAuthenticatedState })

    const chartsTab = screen.getByText("Charts & Graphs")
    fireEvent.click(chartsTab)

    await waitFor(() => {
      expect(screen.getByText("Gender Distribution")).toBeInTheDocument()
      expect(screen.getByText("Age Groups Distribution")).toBeInTheDocument()
      expect(screen.getByText("Top Companies by User Count")).toBeInTheDocument()
    })
  })

  it("displays loading spinner when data is loading", () => {
    const loadingState = {
      ...mockAuthenticatedState,
      userManagement: {
        ...mockAuthenticatedState.userManagement,
        isLoading: true,
      },
    }

    render(<DashboardAnalyticsPage />, { initialState: loadingState })

    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })

  it("displays error message when fetch fails", () => {
    const errorState = {
      ...mockAuthenticatedState,
      userManagement: {
        ...mockAuthenticatedState.userManagement,
        error: "Failed to fetch data",
        isLoading: false,
      },
    }

    render(<DashboardAnalyticsPage />, { initialState: errorState })

    expect(screen.getByText("Error loading data: Failed to fetch data")).toBeInTheDocument()
  })

  it("handles pagination correctly", () => {
    render(<DashboardAnalyticsPage />, { initialState: mockAuthenticatedState })

    // Check if pagination component is rendered
    expect(screen.getByText("Rows per page:")).toBeInTheDocument()
  })
})
