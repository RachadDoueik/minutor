import { Box, Grid, Paper, Typography, Avatar, Stack, LinearProgress } from "@mui/material";
import {
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon,
} from "@mui/icons-material";
import { PageHeader, StatCard } from "@org/ui";

interface RecentActivity {
  id: string;
  user: string;
  action: string;
  time: string;
}

const recentActivities: RecentActivity[] = [
  { id: "1", user: "John Doe", action: "Created new assignment", time: "2 min ago" },
  { id: "2", user: "Jane Smith", action: "Updated user profile", time: "5 min ago" },
  { id: "3", user: "Mike Johnson", action: "Scheduled a meeting", time: "10 min ago" },
  { id: "4", user: "Sarah Wilson", action: "Submitted assignment", time: "15 min ago" },
  { id: "5", user: "Tom Brown", action: "Joined a meeting", time: "30 min ago" },
];

const AdminDashboard = () => {
  const stats = {
    totalUsers: 1234,
    activeAssignments: 56,
    upcomingMeetings: 12,
  };

  return (
    <Box>
      <PageHeader
        title="Dashboard Overview"
        subtitle="Welcome to your admin dashboard. Here's what's happening today."
      />

      {/* Stats Grid */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<PeopleIcon />}
            color="#3b82f6"
            trend="+12%"
            trendUp={true}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <StatCard
            title="Active Assignments"
            value={stats.activeAssignments}
            icon={<AssignmentIcon />}
            color="#10b981"
            trend="+8%"
            trendUp={true}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <StatCard
            title="Upcoming Meetings"
            value={stats.upcomingMeetings}
            icon={<EventIcon />}
            color="#f59e0b"
            trend="+5%"
            trendUp={true}
          />
        </Grid>
      </Grid>

      {/* Content Grid */}
      <Grid container spacing={3}>
        {/* Recent Activity */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Recent Activity
            </Typography>
            <Stack spacing={2} mt={2}>
              {recentActivities.map((activity) => (
                <Box
                  key={activity.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "action.hover",
                  }}
                >
                  <Avatar sx={{ width: 40, height: 40 }}>
                    {activity.user.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {activity.user}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.action}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {activity.time}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* System Status */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              height: "100%",
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              System Status
            </Typography>
            <Stack spacing={3} mt={2}>
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2">Server Load</Typography>
                  <Typography variant="body2" fontWeight={500}>45%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={45} sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2">Memory Usage</Typography>
                  <Typography variant="body2" fontWeight={500}>62%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={62} color="warning" sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2">Storage</Typography>
                  <Typography variant="body2" fontWeight={500}>28%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={28} color="success" sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2">API Requests</Typography>
                  <Typography variant="body2" fontWeight={500}>78%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={78} color="info" sx={{ height: 8, borderRadius: 4 }} />
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
