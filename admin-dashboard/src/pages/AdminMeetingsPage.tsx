import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Avatar,
  AvatarGroup,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Videocam as VideocamIcon,
} from "@mui/icons-material";
import { PageHeader, SearchInput, StatusChip } from "@org/ui";

interface Meeting {
  id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  participants: number;
}

const mockMeetings: Meeting[] = [
  { id: "1", title: "Team Standup", organizer: "John Doe", date: "2024-03-20", time: "09:00", status: "scheduled", participants: 8 },
  { id: "2", title: "Project Review", organizer: "Jane Smith", date: "2024-03-20", time: "14:00", status: "scheduled", participants: 5 },
  { id: "3", title: "Client Call", organizer: "Mike Johnson", date: "2024-03-21", time: "10:00", status: "scheduled", participants: 3 },
  { id: "4", title: "Training Session", organizer: "Sarah Wilson", date: "2024-03-19", time: "15:00", status: "completed", participants: 12 },
  { id: "5", title: "Sprint Planning", organizer: "Tom Brown", date: "2024-03-22", time: "11:00", status: "scheduled", participants: 6 },
];

const AdminMeetingsPage = () => {
  const [meetings] = useState<Meeting[]>(mockMeetings);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const filteredMeetings = meetings.filter(
    (meeting) =>
      meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.organizer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <PageHeader
        title="Meetings"
        subtitle="Manage all scheduled meetings"
        actionLabel="Schedule Meeting"
        onAction={() => console.log("Schedule meeting")}
      />

      <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
        <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search meetings..."
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Meeting</TableCell>
                <TableCell>Organizer</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Participants</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMeetings
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((meeting) => (
                  <TableRow key={meeting.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
                          <VideocamIcon fontSize="small" />
                        </Avatar>
                        <Typography variant="body2" fontWeight={500}>
                          {meeting.title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{meeting.organizer}</TableCell>
                    <TableCell>
                      {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
                    </TableCell>
                    <TableCell>
                      <StatusChip status={meeting.status} />
                    </TableCell>
                    <TableCell>
                      <AvatarGroup max={4} sx={{ "& .MuiAvatar-root": { width: 28, height: 28, fontSize: 12 } }}>
                        {Array.from({ length: meeting.participants }).map((_, i) => (
                          <Avatar key={i} sx={{ width: 28, height: 28 }}>
                            {String.fromCharCode(65 + i)}
                          </Avatar>
                        ))}
                      </AvatarGroup>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={handleMenuOpen}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredMeetings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>
          <VisibilityIcon fontSize="small" sx={{ mr: 1 }} /> View
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: "error.main" }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Cancel
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AdminMeetingsPage;
