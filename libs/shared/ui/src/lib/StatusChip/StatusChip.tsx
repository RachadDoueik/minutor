import { Chip } from "@mui/material";
import type { ChipProps } from "@mui/material";

type StatusType = "active" | "inactive" | "suspended" | "draft" | "completed" | "pending" | "scheduled" | "in_progress" | "cancelled";

export interface StatusChipProps {
  status: StatusType | string;
  size?: "small" | "medium";
}

const getStatusColor = (status: string): ChipProps["color"] => {
  switch (status) {
    case "active":
    case "completed":
      return "success";
    case "inactive":
    case "draft":
      return "default";
    case "suspended":
    case "cancelled":
      return "error";
    case "pending":
    case "scheduled":
      return "info";
    case "in_progress":
      return "warning";
    default:
      return "default";
  }
};

const formatStatus = (status: string): string => {
  return status.replace(/_/g, " ");
};

const StatusChip = ({ status, size = "small" }: StatusChipProps) => {
  return (
    <Chip
      label={formatStatus(status)}
      size={size}
      color={getStatusColor(status)}
      sx={{ textTransform: "capitalize" }}
    />
  );
};

export default StatusChip;
