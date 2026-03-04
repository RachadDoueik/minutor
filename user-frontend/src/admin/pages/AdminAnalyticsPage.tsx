import { Box, Paper, Typography, Grid } from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";

// Simple chart placeholder since we don't have a charting library
const ChartPlaceholder = ({ title, height = 300 }: { title: string; height?: number }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      borderRadius: 3,
      border: "1px solid",
      borderColor: "divider",
      height,
    }}
  >
    <Typography variant="h6" fontWeight={600} gutterBottom>
      {title}
    </Typography>
    <Box
      sx={{
        height: height - 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "action.hover",
        borderRadius: 2,
      }}
    >
      <Typography color="text.secondary">Chart visualization would go here</Typography>
    </Box>
  </Paper>
);

interface StatBoxProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
}

const StatBox = ({ title, value, change, positive, icon }: StatBoxProps) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      borderRadius: 3,
      border: "1px solid",
      borderColor: "divider",
    }}
  >
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight={700}>
          {value}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
          <TrendingUpIcon
            fontSize="small"
            sx={{ color: positive ? "success.main" : "error.main" }}
          />
          <Typography
            variant="body2"
            sx={{ color: positive ? "success.main" : "error.main" }}
          >
            {change}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            vs last month
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          backgroundColor: "primary.light",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "primary.main",
        }}
      >
        {icon}
      </Box>
    </Box>
  </Paper>
);

const AdminAnalyticsPage = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Analytics
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        View system-wide analytics and statistics
      </Typography>

      {/* Stats Row */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatBox
            title="Total Users"
            value="1,234"
            change="+12.5%"
            positive={true}
            icon={<PeopleIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatBox
            title="Active Courses"
            value="28"
            change="+8.2%"
            positive={true}
            icon={<SchoolIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatBox
            title="Submissions"
            value="856"
            change="+23.1%"
            positive={true}
            icon={<AssignmentIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatBox
            title="Completion Rate"
            value="87%"
            change="-2.4%"
            positive={false}
            icon={<TrendingUpIcon />}
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <ChartPlaceholder title="User Growth Over Time" height={350} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <ChartPlaceholder title="User Distribution" height={350} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartPlaceholder title="Course Enrollments" height={300} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartPlaceholder title="Assignment Submissions" height={300} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminAnalyticsPage;
