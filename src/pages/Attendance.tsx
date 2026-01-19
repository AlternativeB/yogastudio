import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, CheckCircle, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface AttendanceRecord {
  id: string;
  clientName: string;
  className: string;
  instructor: string;
  date: string;
  time: string;
  status: "attended" | "no-show" | "cancelled" | "upcoming";
}

const mockAttendance: AttendanceRecord[] = [
  {
    id: "1",
    clientName: "Sarah Johnson",
    className: "Morning Vinyasa",
    instructor: "Emma Wilson",
    date: "2024-01-18",
    time: "08:00",
    status: "attended",
  },
  {
    id: "2",
    clientName: "Michael Chen",
    className: "Power Yoga",
    instructor: "Sarah Johnson",
    date: "2024-01-18",
    time: "12:00",
    status: "attended",
  },
  {
    id: "3",
    clientName: "Emma Wilson",
    className: "Yin Yoga",
    instructor: "Michael Chen",
    date: "2024-01-18",
    time: "17:00",
    status: "upcoming",
  },
  {
    id: "4",
    clientName: "James Brown",
    className: "Gentle Hatha",
    instructor: "Emma Wilson",
    date: "2024-01-17",
    time: "10:00",
    status: "no-show",
  },
  {
    id: "5",
    clientName: "Olivia Davis",
    className: "Morning Vinyasa",
    instructor: "Sarah Johnson",
    date: "2024-01-17",
    time: "08:00",
    status: "cancelled",
  },
];

const statusConfig = {
  attended: { icon: CheckCircle, label: "Attended", className: "text-success" },
  "no-show": { icon: XCircle, label: "No-show", className: "text-destructive" },
  cancelled: { icon: XCircle, label: "Cancelled", className: "text-muted-foreground" },
  upcoming: { icon: Clock, label: "Upcoming", className: "text-warning" },
};

const Attendance = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAttendance = mockAttendance.filter(
    (record) =>
      record.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: "client",
      header: "Client",
      render: (record: AttendanceRecord) => (
        <span className="font-medium text-foreground">{record.clientName}</span>
      ),
    },
    {
      key: "class",
      header: "Class",
      render: (record: AttendanceRecord) => (
        <div>
          <p className="text-sm font-medium text-foreground">{record.className}</p>
          <p className="text-xs text-muted-foreground">with {record.instructor}</p>
        </div>
      ),
    },
    {
      key: "datetime",
      header: "Date & Time",
      render: (record: AttendanceRecord) => (
        <div>
          <p className="text-sm text-foreground">
            {new Date(record.date).toLocaleDateString()}
          </p>
          <p className="text-xs text-muted-foreground">{record.time}</p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (record: AttendanceRecord) => {
        const config = statusConfig[record.status];
        const Icon = config.icon;
        return (
          <div className={cn("flex items-center gap-2", config.className)}>
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{config.label}</span>
          </div>
        );
      },
    },
    {
      key: "actions",
      header: "",
      render: (record: AttendanceRecord) => (
        <div className="flex justify-end">
          {record.status === "upcoming" && (
            <Button variant="outline" size="sm">
              Check In
            </Button>
          )}
          {record.status === "no-show" && (
            <Button variant="outline" size="sm">
              Mark Attended
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Attendance</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage class attendance records.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <p className="stat-label">Today's Check-ins</p>
          <p className="stat-value mt-1">47</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Upcoming</p>
          <p className="stat-value mt-1">23</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">No-shows Today</p>
          <p className="stat-value mt-1">2</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Attendance Rate</p>
          <p className="stat-value mt-1">94%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search attendance..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredAttendance}
        emptyMessage="No attendance records found"
      />
    </AdminLayout>
  );
};

export default Attendance;
