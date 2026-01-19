import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Plus, Calendar, Clock, Award } from "lucide-react";

interface Instructor {
  id: string;
  name: string;
  specializations: string[];
  status: "active" | "archived";
  classesThisWeek: number;
  totalClasses: number;
  rating: number;
  avatar: string;
}

const mockInstructors: Instructor[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    specializations: ["Vinyasa", "Yin Yoga", "Restorative"],
    status: "active",
    classesThisWeek: 8,
    totalClasses: 342,
    rating: 4.9,
    avatar: "SJ",
  },
  {
    id: "2",
    name: "Michael Chen",
    specializations: ["Hatha", "Yin Yoga", "Meditation"],
    status: "active",
    classesThisWeek: 6,
    totalClasses: 218,
    rating: 4.8,
    avatar: "MC",
  },
  {
    id: "3",
    name: "Emma Wilson",
    specializations: ["Power Yoga", "Vinyasa", "Hatha"],
    status: "active",
    classesThisWeek: 7,
    totalClasses: 456,
    rating: 4.9,
    avatar: "EW",
  },
  {
    id: "4",
    name: "David Kim",
    specializations: ["Ashtanga", "Power Yoga"],
    status: "archived",
    classesThisWeek: 0,
    totalClasses: 89,
    rating: 4.7,
    avatar: "DK",
  },
];

const Instructors = () => {
  return (
    <AdminLayout>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Instructors</h1>
          <p className="text-muted-foreground mt-1">
            Manage your yoga instructors and their schedules.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Instructor
        </Button>
      </div>

      {/* Instructors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockInstructors.map((instructor) => (
          <Card
            key={instructor.id}
            className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-semibold text-primary">
                    {instructor.avatar}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-foreground truncate">
                      {instructor.name}
                    </h3>
                    <StatusBadge status={instructor.status} />
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {instructor.specializations.map((spec) => (
                      <span
                        key={spec}
                        className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-lg font-semibold">{instructor.classesThisWeek}</p>
                  <p className="text-xs text-muted-foreground">This week</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-lg font-semibold">{instructor.totalClasses}</p>
                  <p className="text-xs text-muted-foreground">Total classes</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-lg font-semibold">{instructor.rating}</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  View Schedule
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Instructors;
