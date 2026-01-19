import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";

interface Subscription {
  id: string;
  clientName: string;
  clientEmail: string;
  type: string;
  status: "active" | "frozen" | "expired";
  sessionsRemaining: number | null;
  startDate: string;
  endDate: string;
  price: number;
}

const mockSubscriptions: Subscription[] = [
  {
    id: "1",
    clientName: "Sarah Johnson",
    clientEmail: "sarah@email.com",
    type: "Unlimited Monthly",
    status: "active",
    sessionsRemaining: null,
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    price: 149,
  },
  {
    id: "2",
    clientName: "Michael Chen",
    clientEmail: "michael@email.com",
    type: "10 Class Pack",
    status: "active",
    sessionsRemaining: 7,
    startDate: "2024-01-10",
    endDate: "2024-04-10",
    price: 120,
  },
  {
    id: "3",
    clientName: "Emma Wilson",
    clientEmail: "emma@email.com",
    type: "Unlimited Monthly",
    status: "frozen",
    sessionsRemaining: null,
    startDate: "2024-01-01",
    endDate: "2024-02-01",
    price: 149,
  },
  {
    id: "4",
    clientName: "James Brown",
    clientEmail: "james@email.com",
    type: "5 Class Pack",
    status: "active",
    sessionsRemaining: 2,
    startDate: "2024-01-20",
    endDate: "2024-03-20",
    price: 70,
  },
  {
    id: "5",
    clientName: "Olivia Davis",
    clientEmail: "olivia@email.com",
    type: "10 Class Pack",
    status: "expired",
    sessionsRemaining: 0,
    startDate: "2023-10-01",
    endDate: "2024-01-01",
    price: 120,
  },
];

const Subscriptions = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSubscriptions = mockSubscriptions.filter(
    (sub) =>
      sub.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: "client",
      header: "Client",
      render: (sub: Subscription) => (
        <div>
          <p className="font-medium text-foreground">{sub.clientName}</p>
          <p className="text-sm text-muted-foreground">{sub.clientEmail}</p>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (sub: Subscription) => (
        <span className="text-sm font-medium text-foreground">{sub.type}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (sub: Subscription) => (
        <StatusBadge
          status={sub.status === "expired" ? "archived" : sub.status}
          label={sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
        />
      ),
    },
    {
      key: "sessionsRemaining",
      header: "Sessions Left",
      render: (sub: Subscription) => (
        <span className="text-sm text-foreground">
          {sub.sessionsRemaining !== null ? sub.sessionsRemaining : "Unlimited"}
        </span>
      ),
    },
    {
      key: "startDate",
      header: "Start Date",
      render: (sub: Subscription) => (
        <span className="text-sm text-muted-foreground">
          {new Date(sub.startDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "endDate",
      header: "End Date",
      render: (sub: Subscription) => (
        <span className="text-sm text-muted-foreground">
          {new Date(sub.endDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (sub: Subscription) => (
        <span className="text-sm font-medium text-foreground">${sub.price}</span>
      ),
    },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Subscriptions</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all client subscriptions.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Subscription
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <p className="stat-label">Active Subscriptions</p>
          <p className="stat-value mt-1">189</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Frozen</p>
          <p className="stat-value mt-1">12</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Expiring This Week</p>
          <p className="stat-value mt-1">8</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Monthly Revenue</p>
          <p className="stat-value mt-1">$12,450</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search subscriptions..."
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
        data={filteredSubscriptions}
        emptyMessage="No subscriptions found"
      />
    </AdminLayout>
  );
};

export default Subscriptions;
