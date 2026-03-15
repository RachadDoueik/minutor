import { memo } from "react";

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  participants?: string[];
}

export interface MeetingItemProps {
  meeting: Meeting;
  onClick?: (meeting: Meeting) => void;
}

const MeetingItem = memo(({ meeting, onClick }: MeetingItemProps) => {
  return (
    <div
      onClick={() => onClick?.(meeting)}
      className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors hover:border-gray-300 hover:bg-gray-100"
    >
      <h4 className="font-medium text-gray-900">{meeting.title}</h4>
      <p className="mt-1 text-sm text-gray-600">
        {meeting.date} • {meeting.time}
      </p>
      {meeting.participants && meeting.participants.length > 0 && (
        <p className="mt-1 text-xs text-gray-500">
          {meeting.participants.length} participant
          {meeting.participants.length > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
});

MeetingItem.displayName = "MeetingItem";

export interface UpcomingMeetingsProps {
  meetings?: Meeting[];
  onMeetingClick?: (meeting: Meeting) => void;
  isLoading?: boolean;
}

const UpcomingMeetings = ({
  meetings = [],
  onMeetingClick,
  isLoading = false,
}: UpcomingMeetingsProps) => {
  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <span className="text-sm text-gray-500">Loading meetings...</span>
      </div>
    );
  }

  if (meetings.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50">
        <span className="text-sm text-gray-500">No upcoming meetings</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {meetings.map((meeting) => (
        <MeetingItem
          key={meeting.id}
          meeting={meeting}
          onClick={onMeetingClick}
        />
      ))}
    </div>
  );
};

export default UpcomingMeetings;
