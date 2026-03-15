import {
  DashboardCard,
  UpcomingMeetings,
  Notifications,
  Assignments,
} from "@org/ui";
import type { Meeting, Notification, Assignment } from "../components/dashboard";

// Sample data - in a real app, this would come from an API
const sampleMeetings: Meeting[] = [];
const sampleNotifications: Notification[] = [];
const sampleAssignments: Assignment[] = [];

const HomePage = () => {
  const handleMeetingClick = (meeting: Meeting) => {
    console.log("Meeting clicked:", meeting);
  };

  const handleNotificationClick = (notification: Notification) => {
    console.log("Notification clicked:", notification);
  };

  const handleAssignmentClick = (assignment: Assignment) => {
    console.log("Assignment clicked:", assignment);
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard title="Upcoming Meetings">
          <UpcomingMeetings
            meetings={sampleMeetings}
            onMeetingClick={handleMeetingClick}
          />
        </DashboardCard>

        <DashboardCard title="Notifications">
          <Notifications
            notifications={sampleNotifications}
            onNotificationClick={handleNotificationClick}
          />
        </DashboardCard>

        <DashboardCard title="Assignments">
          <Assignments
            assignments={sampleAssignments}
            onAssignmentClick={handleAssignmentClick}
          />
        </DashboardCard>
      </div>
    </div>
  );
};

export default HomePage;
