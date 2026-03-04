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
  Menu,
  MenuItem,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { PageHeader, SearchInput, StatusChip } from "../components";

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  status: "active" | "draft" | "completed";
  submissions: number;
}

const mockAssignments: Assignment[] = [
  { id: "1", title: "Math Homework 1", dueDate: "2024-03-20", status: "active", submissions: 25 },
  { id: "2", title: "Essay Writing", dueDate: "2024-03-22", status: "active", submissions: 18 },
  { id: "3", title: "Lab Report", dueDate: "2024-03-25", status: "draft", submissions: 0 },
  { id: "4", title: "History Project", dueDate: "2024-03-18", status: "completed", submissions: 30 },
  { id: "5", title: "Programming Task", dueDate: "2024-03-28", status: "active", submissions: 12 },
];

const AdminAssignmentsPage = () => {
  const [assignments] = useState<Assignment[]>(mockAssignments);
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

  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <PageHeader
        title="Assignments"
        subtitle="Manage all assignments in the system"
        actionLabel="Create Assignment"
        onAction={() => console.log("Create assignment")}
      />

      <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
        <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search assignments..."
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Submissions</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAssignments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((assignment) => (
                  <TableRow key={assignment.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {assignment.title}
                      </Typography>
                    </TableCell>
                    <TableCell>{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <StatusChip status={assignment.status} />
                    </TableCell>
                    <TableCell>{assignment.submissions}</TableCell>
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
          count={filteredAssignments.length}
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
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AdminAssignmentsPage;
