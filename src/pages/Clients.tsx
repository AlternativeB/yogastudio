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
  registration_date: string;
  subscription_type: string;
}

const Clients = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 единая функция загрузки
  const loadClients = async () => {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("registration_date", { ascending: false });

    if (error) {
      console.error("❌ Load clients error:", error);
      return;
    }

    setClients(data || []);
  };

  useEffect(() => {
    loadClients();
  }, []);

  // 🔹 добавление клиента
  const addTestClient = async () => {
    setLoading(true);

    const { error } = await supabase.from("clients").insert({
      name: "Test Client",
      email: `test${Date.now()}@mail.com`,
      phone: "+123456789",
      status: "active",
      source: "Manual",
      registration_date: new Date().toISOString(),
      subscription_type: "Trial",
    });

    if (error) {
      console.error("❌ Insert error:", error);
      setLoading(false);
      return;
    }

    await loadClients();
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
      key: "subscription_type",
      header: "Subscription",
      render: (client: Client) => <span>{client.subscription_type}</span>,
    },
    {
      key: "source",
      header: "Source",
      render: (client: Client) => (
        <span className="text-muted-foreground">{client.source}</span>
      ),
    },
    {
      key: "registration_date",
      header: "Joined",
      render: (client: Client) => (
        <span className="text-muted-foreground">
          {new Date(client.registration_date).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="page-header">
        <div>
          <h1 className="page-title">Clients</h1>
          <p className="text-muted-foreground mt-1">
            Manage your studio members and their profiles.
          </p>
        </div>

        <Button onClick={addTestClient} disabled={loading} className="gap-2">
          <Plus className="w-4 h-4" />
          {loading ? "Adding..." : "Add Client"}
        </Button>
      </div>

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


