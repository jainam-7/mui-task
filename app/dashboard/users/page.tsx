"use client"

import { useEffect } from "react"
import { Box, Typography, Grid, Card, CardContent, Avatar, Chip, CircularProgress, Alert, Button } from "@mui/material"
import { Refresh, Person, Business, LocationOn } from "@mui/icons-material"
import { useAppDispatch, useAppSelector } from "../../../src/shared/hooks/redux.hooks"
import { fetchUsers, clearError } from "../../../src/features/user-management/store/user-management.slice"

export default function UsersPage() {
  const dispatch = useAppDispatch()
  const { usersList, isLoading, error } = useAppSelector((state) => state.userManagement)

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: 20 }))
  }, [dispatch])

  const handleRetry = () => {
    dispatch(clearError())
    dispatch(fetchUsers({ page: 1, limit: 20 }))
  }

  if (error) {
    return (
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={handleRetry} startIcon={<Refresh />}>
            Retry
          </Button>
        }
      >
        Error loading users: {error}
      </Alert>
    )
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Users Management
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Browse and manage user profiles
      </Typography>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {usersList.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar src={user.avatar} sx={{ width: 60, height: 60, mr: 2 }}>
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        @{user.username}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Person sx={{ fontSize: 16, mr: 1, color: "text.secondary" }} />
                      <Typography variant="body2">{user.email}</Typography>
                    </Box>

                    {user.company && (
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Business sx={{ fontSize: 16, mr: 1, color: "text.secondary" }} />
                        <Typography variant="body2">{user.company.name}</Typography>
                      </Box>
                    )}

                    {user.address && (
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <LocationOn sx={{ fontSize: 16, mr: 1, color: "text.secondary" }} />
                        <Typography variant="body2">
                          {user.address.city}, {user.address.country}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {user.age && <Chip label={`${user.age} years`} size="small" variant="outlined" />}
                    {user.gender && (
                      <Chip
                        label={user.gender}
                        size="small"
                        color={user.gender === "male" ? "primary" : "secondary"}
                        variant="outlined"
                      />
                    )}
                    <Chip
                      label={user.isActive ? "Active" : "Inactive"}
                      size="small"
                      color={user.isActive ? "success" : "default"}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}
