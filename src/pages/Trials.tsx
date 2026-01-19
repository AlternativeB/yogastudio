import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, UserPlus } from "lucide-react";

interface TrialClient {
  id: string;
  name: string;
  phone: string;
  visitDate: string;
  source: string;
  comment: string;
  converted: boolean;
}

const mockTrialClients: TrialClient[] = [
  {
    id: "1",
    name: "Jennifer Lee",
    phone: "+1 555-0101",
    visitDate: "2024-01-18",
    source: "Instagram",
    comment: "Interested in morning classes",
    converted: false,
  },
  {
    id: "2",
    name: "Robert Taylor",
    phone: "+1 555-0102",
    visitDate: "2024-01-17",
    source: "Walk-in",
    comment: "Tried Power Yoga, loved it",
    converted: true,
  },
  {
    id: "3",
    name: "Amanda Martinez",
    phone: "+1 555-0103",
    visitDate: "2024-01-16",
    source: "Referral",
    comment: "Referred by Sarah Johnson",
    converted: false,
  },
  {
    id: "4",
    name: "David Wilson",
    phone: "+1 555-0104",
    visitDate: "2024-01-15",
    source: "Website",
    comment: "Interested in beginner classes",
    converted: false,
  },
];

const Trials = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = mockTrialClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (client: TrialClient) => (
        <span className="font-medium text-foreground">{client.name}</span>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      render: (client: TrialClient) => (
        <span className="text-sm text-foreground">{client.phone}</span>
      ),
    },
    {
      key: "visitDate",
      header: "Visit Date",
      render: (client: TrialClient) => (
        <span className="text-sm text-muted-foreground">
          {new Date(client.visitDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "source",
      header: "Source",
      render: (client: TrialClient) => (
        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
          {client.source}
        </span>
      ),
    },
    {
      key: "comment",
      header: "Notes",
      render: (client: TrialClient) => (
        <span className="text-sm text-muted-foreground line-clamp-1">
          {client.comment}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (client: TrialClient) => (
        <div className="flex justify-end gap-2">
          {client.converted ? (
            <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
              Converted
            </span>
          ) : (
            <Button variant="outline" size="sm" className="gap-1.5">
              <UserPlus className="w-3.5 h-3.5" />
              Convert
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
          <h1 className="page-title">Trial Clients</h1>
          <p className="text-muted-foreground mt-1">
            Track trial visitors and convert them to members.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Trial
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat-card">
          <p className="stat-label">This Month's Trials</p>
          <p className="stat-value mt-1">24</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Converted</p>
          <p className="stat-value mt-1">8</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Conversion Rate</p>
          <p className="stat-value mt-1">33%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search trial clients..."
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
        data={filteredClients}
        emptyMessage="No trial clients found"
      />
    </AdminLayout>
  );
};

export default Trials;
