import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionIcon?: React.ReactNode;
  onAction?: () => void;
}

const PageHeader = ({
  title,
  subtitle,
  actionLabel,
  actionIcon = <AddIcon />,
  onAction,
}: PageHeaderProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
      <Box>
        <Typography variant="h4" fontWeight={700} gutterBottom={!!subtitle}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body1" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
      {actionLabel && onAction && (
        <Button
          variant="contained"
          startIcon={actionIcon}
          onClick={onAction}
          sx={{ borderRadius: 2 }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default PageHeader;
