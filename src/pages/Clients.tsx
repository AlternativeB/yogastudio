import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
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

const Clients = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 загрузка клиентов при открытии страницы
  useEffect(() => {
    const loadClients = async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("registrationDate", { ascending: false });

      if (error) {
        console.error("Load clients error:", error);
        return;
      }

      setClients(data || []);
    };

    loadClients();
  }, []);

  // 🔹 добавление тестового клиента
  const addTestClient = async () => {
    setLoading(true);

    const { error } = await supabase.from("clients").insert([
      {
        name: "Test Client",
        email: `test${Date.now()}@mail.com`,
        phone: "+123456789",
        status: "active",
        source: "Manual",
        registrationDate: new Date().toISOString(),
        subscriptionType: "Trial",
      },
    ]);

    if (error) {
      console.error("Insert error:", error);
      setLoading(false);
      return;
    }

    // обновляем список
    const { data } = await supabase.from("clients").select("*");
    setClients(data || []);
    setLoading(false);
  };

  const filteredClients = clients.filter(
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
          <p className="font-medium">{client.name}</p>
          <p className="text-sm text-muted-foreground">{client.email}</p>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      render: (client: Client) => <span>{client.phone}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (client: Client) => <StatusBadge status={client.status} />,
    },
    {
      key: "subscriptionType",
      header: "Subscription",
      render: (client: Client) => <span>{client.subscriptionType}</span>,
    },
    {
      key: "source",
      header: "Source",
      render: (client: Client) => (
        <span className="text-muted-foreground">{client.source}</span>
      ),
    },
    {
      key: "registrationDate",
      header: "Joined",
      render: (client: Client) => (
        <span className="text-muted-foreground">
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

        <Button
          className="gap-2"
          onClick={addTestClient}
          disabled={loading}
        >
          <Plus className="w-4 h-4" />
          {loading ? "Adding..." : "Add Client"}
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

