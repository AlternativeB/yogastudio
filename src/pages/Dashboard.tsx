import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { UpcomingClasses } from "@/components/dashboard/UpcomingClasses";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Users, Calendar, CreditCard, TrendingUp } from "lucide-react";

const Dashboard = () => {
  return (
    <AdminLayout>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Active Clients"
          value="247"
          change="+12 this month"
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="Today's Classes"
          value="8"
          change="3 fully booked"
          changeType="neutral"
          icon={Calendar}
          iconColor="bg-accent/10 text-accent"
        />
        <StatCard
          title="Active Subscriptions"
          value="189"
          change="+8% from last month"
          changeType="positive"
          icon={CreditCard}
          iconColor="bg-success/10 text-success"
        />
        <StatCard
          title="This Week's Revenue"
          value="$4,280"
          change="+15% from last week"
          changeType="positive"
          icon={TrendingUp}
          iconColor="bg-warning/10 text-warning"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingClasses />
        <RecentActivity />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
