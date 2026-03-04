import { memo } from "react";

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority?: "low" | "medium" | "high";
  status?: "pending" | "in-progress" | "completed";
}

export interface AssignmentItemProps {
  assignment: Assignment;
  onClick?: (assignment: Assignment) => void;
}

const AssignmentItem = memo(({ assignment, onClick }: AssignmentItemProps) => {
  const priorityStyles = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const statusStyles = {
    pending: "bg-gray-100 text-gray-800",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  return (
    <div
      onClick={() => onClick?.(assignment)}
      className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors hover:border-gray-300 hover:bg-gray-100"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-medium text-gray-900">{assignment.title}</h4>
        {assignment.priority && (
          <span
            className={`rounded px-2 py-0.5 text-xs font-medium ${
              priorityStyles[assignment.priority]
            }`}
          >
            {assignment.priority}
          </span>
        )}
      </div>
      {assignment.description && (
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
          {assignment.description}
        </p>
      )}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-gray-500">Due: {assignment.dueDate}</span>
        {assignment.status && (
          <span
            className={`rounded px-2 py-0.5 text-xs font-medium ${
              statusStyles[assignment.status]
            }`}
          >
            {assignment.status}
          </span>
        )}
      </div>
    </div>
  );
});

AssignmentItem.displayName = "AssignmentItem";

export interface AssignmentsProps {
  assignments?: Assignment[];
  onAssignmentClick?: (assignment: Assignment) => void;
  isLoading?: boolean;
}

const Assignments = ({
  assignments = [],
  onAssignmentClick,
  isLoading = false,
}: AssignmentsProps) => {
  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <span className="text-sm text-gray-500">Loading assignments...</span>
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-lg bg-gray-50">
        <span className="text-sm text-gray-500">No assignments</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {assignments.map((assignment) => (
        <AssignmentItem
          key={assignment.id}
          assignment={assignment}
          onClick={onAssignmentClick}
        />
      ))}
    </div>
  );
};

export default Assignments;
