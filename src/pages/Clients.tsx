import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "frozen" | "archived";
  source: string;
  registrationDate: string;
  subscriptionType: string;
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    phone: "+1 234-567-8901",
    status: "active",
    source: "Online",
    registrationDate: "2024-01-15",
    subscriptionType: "Unlimited Monthly",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@email.com",
    phone: "+1 234-567-8902",
    status: "active",
    source: "Referral",
    registrationDate: "2024-02-20",
    subscriptionType: "10 Class Pack",
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma@email.com",
    phone: "+1 234-567-8903",
    status: "frozen",
    source: "Walk-in",
    registrationDate: "2023-11-10",
    subscriptionType: "Unlimited Monthly",
  },
  {
    id: "4",
    name: "James Brown",
    email: "james@email.com",
    phone: "+1 234-567-8904",
    status: "active",
    source: "Online",
    registrationDate: "2024-03-05",
    subscriptionType: "5 Class Pack",
  },
  {
    id: "5",
    name: "Olivia Davis",
    email: "olivia@email.com",
    phone: "+1 234-567-8905",
    status: "archived",
    source: "Trial",
    registrationDate: "2023-09-20",
    subscriptionType: "—",
  },
];

const Clients = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = mockClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: "name",
      header: "Client",
      render: (client: Client) => (
        <div>
          <p className="font-medium text-foreground">{client.name}</p>
          <p className="text-sm text-muted-foreground">{client.email}</p>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      render: (client: Client) => (
        <span className="text-sm text-foreground">{client.phone}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (client: Client) => <StatusBadge status={client.status} />,
    },
    {
      key: "subscriptionType",
      header: "Subscription",
      render: (client: Client) => (
        <span className="text-sm text-foreground">{client.subscriptionType}</span>
      ),
    },
    {
      key: "source",
      header: "Source",
      render: (client: Client) => (
        <span className="text-sm text-muted-foreground">{client.source}</span>
      ),
    },
    {
      key: "registrationDate",
      header: "Joined",
      render: (client: Client) => (
        <span className="text-sm text-muted-foreground">
          {new Date(client.registrationDate).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Clients</h1>
          <p className="text-muted-foreground mt-1">
            Manage your studio members and their profiles.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Client
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
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
        onRowClick={(client) => navigate(`/clients/${client.id}`)}
        emptyMessage="No clients found"
      />
    </AdminLayout>
  );
};

export default Clients;
