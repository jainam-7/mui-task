"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
  Button,
  TablePagination,
  Tabs,
  Tab,
} from "@mui/material";
import { Refresh, TableChart, BarChart } from "@mui/icons-material";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line } from "recharts";
import { useAppDispatch, useAppSelector } from "../../../src/shared/hooks/redux.hooks";
import { fetchUsers, clearError } from "../../../src/features/user-management/store/user-management.slice";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`analytics-tabpanel-${index}`} aria-labelledby={`analytics-tab-${index}`} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `analytics-tab-${index}`,
    "aria-controls": `analytics-tabpanel-${index}`,
  };
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d", "#ffc658"];

export default function DashboardAnalyticsPage() {
  const dispatch = useAppDispatch();
  const { usersList, pagination, isLoading, error } = useAppSelector((state) => state.userManagement);
  const [tabValue, setTabValue] = useState(0);

  console.log("usersList", usersList);

  useEffect(() => {
    // fetch users on component
    dispatch(fetchUsers({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("Tab changed to:", newValue); 
    setTabValue(newValue);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(fetchUsers({ page: newPage + 1, limit: pagination.itemsPerPage }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = Number.parseInt(event.target.value, 10);
    dispatch(fetchUsers({ page: 1, limit: newLimit }));
  };

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchUsers({ page: pagination.currentPage, limit: pagination.itemsPerPage }));
  };

  // prepare chart data
  const genderData = usersList?.reduce((acc: Record<string, number>, user) => {
    const gender = user.gender || "Unknown";
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {});

  const genderChartData = Object.entries(genderData).map(([name, value]) => ({
    name,
    value,
  }));

  const ageGroupData = usersList?.reduce((acc: Record<string, number>, user) => {
    const age = user.age || 0;
    let ageGroup = "Unknown";
    if (age >= 18 && age < 25) ageGroup = "18-24";
    else if (age >= 25 && age < 35) ageGroup = "25-34";
    else if (age >= 35 && age < 45) ageGroup = "35-44";
    else if (age >= 45 && age < 55) ageGroup = "45-54";
    else if (age >= 55) ageGroup = "55+";

    acc[ageGroup] = (acc[ageGroup] || 0) + 1;
    return acc;
  }, {});

  const ageGroupChartData = Object.entries(ageGroupData).map(([name, value]) => ({
    name,
    value: value as number,
  }));

  const companyData = usersList?.reduce((acc: Record<string, number>, user) => {
    const company = user.company?.name || "Unknown";
    acc[company] = (acc[company] || 0) + 1;
    return acc;
  }, {});

  const companyChartData = Object.entries(companyData)
    .map(([name, value]) => ({ name, value: value as number }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10); 
  if (error) {
    return (
      <Box>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={handleRetry} startIcon={<Refresh />}>
              Retry
            </Button>
          }
        >
          Error loading data: {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Analytics Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          User data fetched from DummyJSON API with pagination and visualizations
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
                {pagination.totalItems}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="success.main" sx={{ fontWeight: 600 }}>
                {usersList?.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Current Page
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="warning.main" sx={{ fontWeight: 600 }}>
                {pagination.totalPages}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Pages
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="info.main" sx={{ fontWeight: 600 }}>
                API
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Data Source
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="analytics tabs" variant="fullWidth" sx={{ minHeight: 48 }}>
            <Tab label="Data Table" icon={<TableChart />} iconPosition="start" {...a11yProps(0)} sx={{ minHeight: 48 }} />
            <Tab label="Charts & Graphs" icon={<BarChart />} iconPosition="start" {...a11yProps(1)} sx={{ minHeight: 48 }} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tabValue} index={0}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Users Data Table
            </Typography>

            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: "grey.50" }}>
                        <TableCell>Avatar</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Company</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {usersList?.map((user) => (
                        <TableRow key={user.id} hover>
                          <TableCell>
                            <Avatar src={user.avatar} sx={{ width: 40, height: 40 }}>
                              {user.firstName[0]}
                            </Avatar>
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2">
                              {user.firstName} {user.lastName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              @{user.username}
                            </Typography>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.age || "N/A"}</TableCell>
                          <TableCell>
                            <Chip
                              label={user.gender || "Unknown"}
                              size="small"
                              color={user.gender === "male" ? "primary" : user.gender === "female" ? "secondary" : "default"}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>{user.company?.name || "N/A"}</TableCell>
                          <TableCell>
                            <Chip label={user.isActive ? "Active" : "Inactive"} size="small" color={user.isActive ? "success" : "default"} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={pagination.totalItems}
                  rowsPerPage={pagination.itemsPerPage}
                  page={pagination.currentPage - 1}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
          </CardContent>
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Data Visualizations
            </Typography>

            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
              </Box>
            ) : usersList?.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No data available for charts
                </Typography>
              </Box>
            ) : (
              <>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, height: 400 }}>
                    <Typography variant="h6" gutterBottom>
                      Gender Distribution
                    </Typography>
                    <ResponsiveContainer width="100%" height="85%">
                      <PieChart>
                        <Pie
                          data={genderChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {genderChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, height: 400 }}>
                    <Typography variant="h6" gutterBottom>
                      Age Groups Distribution
                    </Typography>
                    <ResponsiveContainer width="100%" height="85%">
                      <RechartsBarChart data={ageGroupChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper sx={{ p: 3, height: 400 }}>
                    <Typography variant="h6" gutterBottom>
                      Top Companies by User Count
                    </Typography>
                    <ResponsiveContainer width="100%" height="85%">
                      <LineChart data={companyChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} interval={0} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} dot={{ fill: "#8884d8", strokeWidth: 2, r: 6 }} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
              </>
            )}
          </CardContent>
        </CustomTabPanel>
      </Card>
    </Box>
  );
}
