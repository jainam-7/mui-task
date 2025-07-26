"use client"

import React from "react"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
  Divider,
  Stack,
  Paper,
} from "@mui/material"
import {
  TrendingUp,
  TrendingDown,
  People,
  Speed,
  Security,
  CloudDone,
  Assessment,
  DataUsage,
  VerifiedUser,
  Timeline,
  Insights,
  AutoGraph,
  PieChart,
  RefreshOutlined,
  MoreVert,
} from "@mui/icons-material"
import { useAppSelector } from "@/shared/hooks/redux.hooks"
import { useResponsive } from "@/shared/hooks/responsive.hooks"
import { DESIGN_TOKENS } from "@/core/theme/design-system"
import { APP_CONFIG } from "@/core/constants/app-constants"

interface AnalyticsCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: number
    isPositive: boolean
    period: string
  }
  icon: ReactNode
  color: keyof typeof DESIGN_TOKENS.colors
  progress?: number
  actionButton?: boolean
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  color,
  progress,
  actionButton = false,
}) => {
  const { isMobile } = useResponsive()
  const colorPalette = DESIGN_TOKENS.colors[color]

  return (
    <Card
      sx={{
        height: "100%",
        background: `linear-gradient(135deg, ${colorPalette[50]} 0%, ${colorPalette[100]} 100%)`,
        border: `1px solid ${colorPalette[200]}`,
        position: "relative",
        overflow: "visible",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: DESIGN_TOKENS.shadows.xl,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      }}
    >
      <CardContent sx={{ padding: DESIGN_TOKENS.spacing.lg, position: "relative" }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 2 }}>
          <Box
            sx={{
              width: isMobile ? 48 : 56,
              height: isMobile ? 48 : 56,
              borderRadius: DESIGN_TOKENS.borderRadius.xl,
              background: `linear-gradient(135deg, ${colorPalette[500]} 0%, ${colorPalette[600]} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 8px 16px ${colorPalette[500]}40`,
            }}
          >
            {React.cloneElement(icon as React.ReactElement, {
              sx: { fontSize: isMobile ? 24 : 28, color: "white" },
            })}
          </Box>
          {actionButton && (
            <IconButton size="small" sx={{ color: colorPalette[600] }}>
              <MoreVert />
            </IconButton>
          )}
        </Box>

        {/* Main Content */}
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{
            fontWeight: DESIGN_TOKENS.typography.fontWeight.bold,
            color: colorPalette[800],
            mb: 0.5,
            lineHeight: 1.2,
          }}
        >
          {value}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: colorPalette[600],
            fontWeight: DESIGN_TOKENS.typography.fontWeight.medium,
            mb: subtitle || trend ? 1.5 : 0,
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography variant="caption" sx={{ color: colorPalette[500], display: "block", mb: 1 }}>
            {subtitle}
          </Typography>
        )}

        {/* Trend Indicator */}
        {trend && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              icon={trend.isPositive ? <TrendingUp /> : <TrendingDown />}
              label={`${trend.isPositive ? "+" : ""}${trend.value}%`}
              size="small"
              sx={{
                backgroundColor: trend.isPositive ? DESIGN_TOKENS.colors.success[100] : DESIGN_TOKENS.colors.error[100],
                color: trend.isPositive ? DESIGN_TOKENS.colors.success[700] : DESIGN_TOKENS.colors.error[700],
                fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold,
                "& .MuiChip-icon": {
                  color: trend.isPositive ? DESIGN_TOKENS.colors.success[600] : DESIGN_TOKENS.colors.error[600],
                },
              }}
            />
            <Typography variant="caption" color="text.secondary">
              vs {trend.period}
            </Typography>
          </Box>
        )}

        {/* Progress Bar */}
        {progress !== undefined && (
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 6,
                borderRadius: DESIGN_TOKENS.borderRadius.full,
                backgroundColor: colorPalette[200],
                "& .MuiLinearProgress-bar": {
                  backgroundColor: colorPalette[500],
                  borderRadius: DESIGN_TOKENS.borderRadius.full,
                },
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

interface QuickStatsCardProps {
  title: string
  stats: Array<{
    label: string
    value: string
    color: string
  }>
  icon: ReactNode
}

const QuickStatsCard: React.FC<QuickStatsCardProps> = ({ title, stats, icon }) => {
  return (
    <Card
      sx={{
        height: "100%",
        background: `linear-gradient(135deg, ${DESIGN_TOKENS.colors.neutral[50]} 0%, ${DESIGN_TOKENS.colors.neutral[100]} 100%)`,
        border: `1px solid ${DESIGN_TOKENS.colors.neutral[200]}`,
      }}
    >
      <CardContent sx={{ padding: DESIGN_TOKENS.spacing.lg }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: DESIGN_TOKENS.borderRadius.lg,
              backgroundColor: DESIGN_TOKENS.colors.primary[100],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
            }}
          >
            {React.cloneElement(icon as React.ReactElement, {
              sx: { fontSize: 20, color: DESIGN_TOKENS.colors.primary[600] },
            })}
          </Box>
          <Typography variant="h6" sx={{ fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold }}>
            {title}
          </Typography>
        </Box>

        <Stack spacing={2}>
          {stats.map((stat, index) => (
            <Box key={index} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold,
                  color: stat.color,
                }}
              >
                {stat.value}
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

interface ActivityTimelineProps {
  activities: Array<{
    id: string
    title: string
    description: string
    time: string
    type: "success" | "warning" | "info" | "error"
  }>
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return DESIGN_TOKENS.colors.success[500]
      case "warning":
        return DESIGN_TOKENS.colors.warning[500]
      case "error":
        return DESIGN_TOKENS.colors.error[500]
      default:
        return DESIGN_TOKENS.colors.primary[500]
    }
  }

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ padding: DESIGN_TOKENS.spacing.lg }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold }}>
            Recent Activity
          </Typography>
          <IconButton size="small">
            <RefreshOutlined />
          </IconButton>
        </Box>

        <Stack spacing={3}>
          {activities.map((activity, index) => (
            <Box key={activity.id} sx={{ display: "flex", gap: 2 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: getTypeColor(activity.type),
                  mt: 1,
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: DESIGN_TOKENS.typography.fontWeight.medium,
                    mb: 0.5,
                  }}
                >
                  {activity.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
                  {activity.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {activity.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

export const OverviewPage: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.authentication)
  const { isMobile, isTablet } = useResponsive()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const analyticsData = [
    {
      title: "Total Users",
      value: "12,847",
      subtitle: "Active platform users",
      trend: { value: 12.5, isPositive: true, period: "last month" },
      icon: <People />,
      color: "primary" as const,
      progress: 78,
    },
    {
      title: "Revenue",
      value: "$847.2K",
      subtitle: "Monthly recurring revenue",
      trend: { value: 8.2, isPositive: true, period: "last quarter" },
      icon: <TrendingUp />,
      color: "success" as const,
      progress: 92,
    },
    {
      title: "Conversion Rate",
      value: "24.8%",
      subtitle: "Visitor to customer rate",
      trend: { value: 3.1, isPositive: false, period: "last week" },
      icon: <Assessment />,
      color: "warning" as const,
      progress: 65,
    },
    {
      title: "System Uptime",
      value: "99.97%",
      subtitle: "Last 30 days availability",
      trend: { value: 0.1, isPositive: true, period: "last month" },
      icon: <CloudDone />,
      color: "success" as const,
      progress: 99,
    },
    {
      title: "Active Sessions",
      value: "3,247",
      subtitle: "Current online users",
      icon: <Speed />,
      color: "secondary" as const,
      actionButton: true,
    },
    {
      title: "Data Processing",
      value: "1.2TB",
      subtitle: "Daily data processed",
      trend: { value: 15.3, isPositive: true, period: "yesterday" },
      icon: <DataUsage />,
      color: "primary" as const,
      progress: 84,
    },
    {
      title: "Security Score",
      value: "A+",
      subtitle: "Platform security rating",
      icon: <Security />,
      color: "success" as const,
      progress: 96,
    },
    {
      title: "API Requests",
      value: "847K",
      subtitle: "Requests handled today",
      trend: { value: 22.1, isPositive: true, period: "yesterday" },
      icon: <Timeline />,
      color: "secondary" as const,
      progress: 73,
    },
  ]

  const quickStats = [
    {
      title: "Performance Metrics",
      icon: <AutoGraph />,
      stats: [
        { label: "Response Time", value: "127ms", color: DESIGN_TOKENS.colors.success[600] },
        { label: "Error Rate", value: "0.02%", color: DESIGN_TOKENS.colors.success[600] },
        { label: "Throughput", value: "2.4K/s", color: DESIGN_TOKENS.colors.primary[600] },
        { label: "CPU Usage", value: "34%", color: DESIGN_TOKENS.colors.warning[600] },
      ],
    },
    {
      title: "User Analytics",
      icon: <Insights />,
      stats: [
        { label: "New Users", value: "+247", color: DESIGN_TOKENS.colors.success[600] },
        { label: "Returning", value: "68%", color: DESIGN_TOKENS.colors.primary[600] },
        { label: "Bounce Rate", value: "23%", color: DESIGN_TOKENS.colors.warning[600] },
        { label: "Avg. Session", value: "4m 32s", color: DESIGN_TOKENS.colors.primary[600] },
      ],
    },
    {
      title: "Business Intelligence",
      icon: <PieChart />,
      stats: [
        { label: "Conversion", value: "24.8%", color: DESIGN_TOKENS.colors.success[600] },
        { label: "Churn Rate", value: "2.1%", color: DESIGN_TOKENS.colors.error[600] },
        { label: "LTV", value: "$2,847", color: DESIGN_TOKENS.colors.success[600] },
        { label: "CAC", value: "$127", color: DESIGN_TOKENS.colors.primary[600] },
      ],
    },
  ]

  const recentActivities = [
    {
      id: "1",
      title: "New user registration spike",
      description: "247 new users registered in the last hour",
      time: "2 minutes ago",
      type: "success" as const,
    },
    {
      id: "2",
      title: "System maintenance scheduled",
      description: "Planned maintenance window starts at 2:00 AM UTC",
      time: "15 minutes ago",
      type: "warning" as const,
    },
    {
      id: "3",
      title: "API rate limit exceeded",
      description: "Client 'mobile-app-v2' exceeded rate limits",
      time: "32 minutes ago",
      type: "error" as const,
    },
    {
      id: "4",
      title: "Database backup completed",
      description: "Daily backup completed successfully (2.4GB)",
      time: "1 hour ago",
      type: "success" as const,
    },
    {
      id: "5",
      title: "New feature deployment",
      description: "Analytics dashboard v2.1 deployed to production",
      time: "2 hours ago",
      type: "info" as const,
    },
  ]

  return (
    <Box sx={{ padding: { xs: DESIGN_TOKENS.spacing.md, sm: DESIGN_TOKENS.spacing.lg } }}>
      {/* Header Section */}
      <Paper
        sx={{
          padding: DESIGN_TOKENS.spacing.xl,
          marginBottom: DESIGN_TOKENS.spacing.xl,
          background: `linear-gradient(135deg, ${DESIGN_TOKENS.colors.primary[500]} 0%, ${DESIGN_TOKENS.colors.secondary[500]} 100%)`,
          color: "white",
          borderRadius: DESIGN_TOKENS.borderRadius["2xl"],
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "200px",
            height: "200px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            transform: "translate(50%, -50%)",
          },
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar
                src={currentUser?.avatar}
                sx={{
                  width: isMobile ? 60 : 80,
                  height: isMobile ? 60 : 80,
                  mr: 3,
                  border: "3px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                {currentUser?.firstName?.[0]}
                {currentUser?.lastName?.[0]}
              </Avatar>
              <Box>
                <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", mb: 0.5 }}>
                  Welcome back, {currentUser?.firstName}!
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Here's what's happening with your {APP_CONFIG.name} today
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 0.5 }}>
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", fontFamily: "monospace" }}>
                {currentTime.toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Analytics Cards Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {analyticsData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <AnalyticsCard {...card} />
          </Grid>
        ))}
      </Grid>

      {/* Quick Stats and Activity Section */}
      <Grid container spacing={3}>
        {/* Quick Stats Cards */}
        {quickStats.map((stat, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <QuickStatsCard {...stat} />
          </Grid>
        ))}

        {/* Activity Timeline */}
        <Grid item xs={12} lg={8}>
          <ActivityTimeline activities={recentActivities} />
        </Grid>

        {/* Additional Metrics */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ padding: DESIGN_TOKENS.spacing.lg }}>
              <Typography variant="h6" sx={{ fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold, mb: 3 }}>
                System Health
              </Typography>

              <Stack spacing={3}>
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">CPU Usage</Typography>
                    <Typography variant="body2" color="text.secondary">
                      34%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={34}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: DESIGN_TOKENS.colors.neutral[200],
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: DESIGN_TOKENS.colors.success[500],
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">Memory Usage</Typography>
                    <Typography variant="body2" color="text.secondary">
                      67%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={67}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: DESIGN_TOKENS.colors.neutral[200],
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: DESIGN_TOKENS.colors.warning[500],
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">Disk Usage</Typography>
                    <Typography variant="body2" color="text.secondary">
                      23%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={23}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: DESIGN_TOKENS.colors.neutral[200],
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: DESIGN_TOKENS.colors.success[500],
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">Network I/O</Typography>
                    <Typography variant="body2" color="text.secondary">
                      89%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={89}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: DESIGN_TOKENS.colors.neutral[200],
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: DESIGN_TOKENS.colors.error[500],
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Overall System Status
                </Typography>
                <Chip
                  label="Healthy"
                  color="success"
                  icon={<VerifiedUser />}
                  sx={{
                    fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold,
                    px: 2,
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
