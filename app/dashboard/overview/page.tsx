"use client";
import { Box, Typography, Grid, Card, CardContent, Avatar, Chip, Button } from "@mui/material";
import { TrendingUp, People, Assessment, Speed } from "@mui/icons-material";
import { useAppSelector } from "../../../src/shared/hooks/redux.hooks";
import { useRouter } from "next/navigation";

export default function DashboardOverviewPage() {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.authentication);

  const stats = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+12%",
      icon: <People />,
      color: "primary",
    },
    {
      title: "Revenue",
      value: "$847.2K",
      change: "+8.2%",
      icon: <TrendingUp />,
      color: "success",
    },
    {
      title: "Conversion",
      value: "24.8%",
      change: "-3.1%",
      icon: <Assessment />,
      color: "warning",
    },
    {
      title: "Performance",
      value: "99.9%",
      change: "+0.1%",
      icon: <Speed />,
      color: "info",
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Welcome back, {currentUser?.firstName}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your business today.
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: `${stat.color}.light`,
                      color: `${stat.color}.main`,
                      mr: 2,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
                <Chip label={stat.change} size="small" color={stat.change.startsWith("+") ? "success" : "error"} variant="outlined" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Navigate to different sections of your dashboard
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Button variant="contained" onClick={() => router.push("/dashboard/analytics")}>
                  View Analytics
                </Button>
                <Button variant="outlined" onClick={() => router.push("/dashboard/users")}>
                  Manage Users
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Profile
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar src={currentUser?.avatar} sx={{ width: 60, height: 60, mr: 2 }}>
                  {currentUser?.firstName?.[0]}
                  {currentUser?.lastName?.[0]}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {currentUser?.firstName} {currentUser?.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentUser?.email}
                  </Typography>
                  <Chip label={currentUser?.role} size="small" color="primary" variant="outlined" sx={{ mt: 0.5 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
