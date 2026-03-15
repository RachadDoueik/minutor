import { Paper, Typography, Avatar, Chip, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
  trendUp?: boolean;
}

const StatCard = ({ title, value, icon, color, trend, trendUp }: StatCardProps) => (
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
    <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight={700}>
          {value}
        </Typography>
        {trend && (
          <Chip
            size="small"
            icon={trendUp ? <TrendingUpIcon sx={{ fontSize: 14 }} /> : <TrendingDownIcon sx={{ fontSize: 14 }} />}
            label={trend}
            sx={{
              mt: 1,
              backgroundColor: trendUp ? "success.light" : "error.light",
              color: trendUp ? "success.dark" : "error.dark",
              "& .MuiChip-icon": {
                color: trendUp ? "success.dark" : "error.dark",
              },
            }}
          />
        )}
      </Box>
      <Avatar
        sx={{
          backgroundColor: `${color}20`,
          color: color,
          width: 56,
          height: 56,
        }}
      >
        {icon}
      </Avatar>
    </Box>
  </Paper>
);

export default StatCard;
