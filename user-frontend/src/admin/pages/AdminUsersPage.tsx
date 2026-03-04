import { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { PageHeader, SearchInput, StatusChip } from "../components";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "instructor" | "student";
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  avatar?: string;
}

// Mock data
const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin", status: "active", createdAt: "2024-01-15" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "instructor", status: "active", createdAt: "2024-02-20" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", role: "student", status: "active", createdAt: "2024-03-10" },
  { id: "4", name: "Sarah Wilson", email: "sarah@example.com", role: "student", status: "inactive", createdAt: "2024-03-15" },
  { id: "5", name: "Tom Brown", email: "tom@example.com", role: "instructor", status: "active", createdAt: "2024-04-01" },
  { id: "6", name: "Emily Davis", email: "emily@example.com", role: "student", status: "suspended", createdAt: "2024-04-10" },
  { id: "7", name: "Chris Lee", email: "chris@example.com", role: "student", status: "active", createdAt: "2024-05-05" },
  { id: "8", name: "Anna White", email: "anna@example.com", role: "instructor", status: "active", createdAt: "2024-05-20" },
];

const getRoleColor = (role: string) => {
  switch (role) {
    case "admin": return "error";
    case "instructor": return "primary";
    case "student": return "default";
    default: return "default";
  }
};

const AdminUsersPage = () => {
  const [users] = useState<User[]>(mockUsers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setEditMode(false);
    setDialogOpen(true);
  };

  const handleEditUser = () => {
    setEditMode(true);
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleViewUser = () => {
    console.log("View user:", selectedUser);
    handleMenuClose();
  };

  const handleDeleteUser = () => {
    console.log("Delete user:", selectedUser);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <PageHeader
        title="Users Management"
        subtitle="Manage all users in the system"
        actionLabel="Add User"
        onAction={handleAddUser}
      />

      <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
        {/* Search Bar */}
        <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search users..."
          />
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar src={user.avatar} sx={{ width: 36, height: 36 }}>
                          {user.name.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" fontWeight={500}>
                          {user.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        size="small"
                        color={getRoleColor(user.role) as "error" | "primary" | "default"}
                      />
                    </TableCell>
                    <TableCell>
                      <StatusChip status={user.status} />
                    </TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={(e) => handleMenuOpen(e, user)}>
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
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleViewUser}>
          <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
          View
        </MenuItem>
        <MenuItem onClick={handleEditUser}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteUser} sx={{ color: "error.main" }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? "Edit User" : "Add New User"}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Full Name"
              fullWidth
              defaultValue={selectedUser?.name || ""}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              defaultValue={selectedUser?.email || ""}
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label="Role" defaultValue={selectedUser?.role || "student"}>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="instructor">Instructor</MenuItem>
                <MenuItem value="student">Student</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label="Status" defaultValue={selectedUser?.status || "active"}>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="suspended">Suspended</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleDialogClose}>
            {editMode ? "Save Changes" : "Add User"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminUsersPage;
