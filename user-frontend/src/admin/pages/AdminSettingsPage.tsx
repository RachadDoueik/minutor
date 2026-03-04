import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Tab,
  Tabs,
  Stack,
  Grid,
} from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminSettingsPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [saved, setSaved] = useState(false);

  // Profile settings
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@example.com");

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  // System settings
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [registrationEnabled, setRegistrationEnabled] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Manage your account and system settings
      </Typography>

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}

      <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}
        >
          <Tab label="Profile" />
          <Tab label="Notifications" />
          <Tab label="System" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {/* Profile Settings */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Full Name"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Change Password
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField label="Current Password" type="password" fullWidth />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField label="New Password" type="password" fullWidth />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField label="Confirm Password" type="password" fullWidth />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Notification Settings */}
          <TabPanel value={tabValue} index={1}>
            <Stack spacing={3}>
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                    />
                  }
                  label="Email Notifications"
                />
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", ml: 6 }}>
                  Receive notifications about important updates via email
                </Typography>
              </Box>

              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={pushNotifications}
                      onChange={(e) => setPushNotifications(e.target.checked)}
                    />
                  }
                  label="Push Notifications"
                />
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", ml: 6 }}>
                  Receive push notifications in your browser
                </Typography>
              </Box>

              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={weeklyDigest}
                      onChange={(e) => setWeeklyDigest(e.target.checked)}
                    />
                  }
                  label="Weekly Digest"
                />
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", ml: 6 }}>
                  Receive a weekly summary of activity
                </Typography>
              </Box>
            </Stack>
          </TabPanel>

          {/* System Settings */}
          <TabPanel value={tabValue} index={2}>
            <Stack spacing={3}>
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={maintenanceMode}
                      onChange={(e) => setMaintenanceMode(e.target.checked)}
                    />
                  }
                  label="Maintenance Mode"
                />
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", ml: 6 }}>
                  When enabled, only admins can access the system
                </Typography>
              </Box>

              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={registrationEnabled}
                      onChange={(e) => setRegistrationEnabled(e.target.checked)}
                    />
                  }
                  label="User Registration"
                />
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", ml: 6 }}>
                  Allow new users to register
                </Typography>
              </Box>

              <Alert severity="info" sx={{ mt: 2 }}>
                System settings changes may require a restart to take effect.
              </Alert>
            </Stack>
          </TabPanel>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              Save Changes
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminSettingsPage;
