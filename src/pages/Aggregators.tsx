import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Building2 } from "lucide-react";

interface AggregatorVisit {
  id: string;
  name: string;
  className: string;
  instructor: string;
  visitDate: string;
  aggregator: string;
}

const mockAggregatorVisits: AggregatorVisit[] = [
  {
    id: "1",
    name: "Alex Thompson",
    className: "Morning Vinyasa",
    instructor: "Sarah Johnson",
    visitDate: "2024-01-18",
    aggregator: "1Fit",
  },
  {
    id: "2",
    name: "Maria Garcia",
    className: "Power Yoga",
    instructor: "Emma Wilson",
    visitDate: "2024-01-17",
    aggregator: "1Fit",
  },
  {
    id: "3",
    name: "Unknown",
    className: "Yin Yoga",
    instructor: "Michael Chen",
    visitDate: "2024-01-17",
    aggregator: "1Fit",
  },
  {
    id: "4",
    name: "Chris Johnson",
    className: "Gentle Hatha",
    instructor: "Sarah Johnson",
    visitDate: "2024-01-16",
    aggregator: "1Fit",
  },
  {
    id: "5",
    name: "Unknown",
    className: "Morning Vinyasa",
    instructor: "Emma Wilson",
    visitDate: "2024-01-16",
    aggregator: "1Fit",
  },
];

const Aggregators = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVisits = mockAggregatorVisits.filter(
    (visit) =>
      visit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: "name",
      header: "Visitor",
      render: (visit: AggregatorVisit) => (
        <span className={`font-medium ${visit.name === "Unknown" ? "text-muted-foreground italic" : "text-foreground"}`}>
          {visit.name}
        </span>
      ),
    },
    {
      key: "class",
      header: "Class",
      render: (visit: AggregatorVisit) => (
        <div>
          <p className="text-sm font-medium text-foreground">{visit.className}</p>
          <p className="text-xs text-muted-foreground">with {visit.instructor}</p>
        </div>
      ),
    },
    {
      key: "visitDate",
      header: "Visit Date",
      render: (visit: AggregatorVisit) => (
        <span className="text-sm text-muted-foreground">
          {new Date(visit.visitDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "aggregator",
      header: "Source",
      render: (visit: AggregatorVisit) => (
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{visit.aggregator}</span>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Aggregator Visits</h1>
          <p className="text-muted-foreground mt-1">
            Track visits from aggregator platforms like 1Fit.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Log Visit
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat-card">
          <p className="stat-label">This Month</p>
          <p className="stat-value mt-1">47</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">This Week</p>
          <p className="stat-value mt-1">12</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Today</p>
          <p className="stat-value mt-1">3</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search visits..."
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
        data={filteredVisits}
        emptyMessage="No aggregator visits found"
      />
    </AdminLayout>
  );
};

export default Aggregators;
