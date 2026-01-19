import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  User,
} from "lucide-react";

interface ScheduleClass {
  id: string;
  name: string;
  instructor: string;
  startTime: string;
  endTime: string;
  enrolled: number;
  capacity: number;
  type: "vinyasa" | "hatha" | "power" | "yin" | "restorative";
}

const classTypeColors: Record<string, string> = {
  vinyasa: "bg-primary/10 border-primary/20 text-primary",
  hatha: "bg-success/10 border-success/20 text-success",
  power: "bg-accent/10 border-accent/20 text-accent",
  yin: "bg-warning/10 border-warning/20 text-warning",
  restorative: "bg-muted border-muted-foreground/20 text-muted-foreground",
};

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const mockSchedule: Record<string, ScheduleClass[]> = {
  Mon: [
    { id: "1", name: "Morning Vinyasa", instructor: "Sarah J.", startTime: "08:00", endTime: "09:00", enrolled: 12, capacity: 15, type: "vinyasa" },
    { id: "2", name: "Gentle Hatha", instructor: "Michael C.", startTime: "10:00", endTime: "11:15", enrolled: 8, capacity: 12, type: "hatha" },
    { id: "3", name: "Power Yoga", instructor: "Emma W.", startTime: "12:00", endTime: "13:00", enrolled: 15, capacity: 15, type: "power" },
    { id: "4", name: "Yin Yoga", instructor: "Sarah J.", startTime: "17:00", endTime: "18:30", enrolled: 6, capacity: 10, type: "yin" },
  ],
  Tue: [
    { id: "5", name: "Sunrise Flow", instructor: "Emma W.", startTime: "06:30", endTime: "07:30", enrolled: 10, capacity: 12, type: "vinyasa" },
    { id: "6", name: "Restorative", instructor: "Michael C.", startTime: "11:00", endTime: "12:00", enrolled: 5, capacity: 8, type: "restorative" },
    { id: "7", name: "Power Yoga", instructor: "Sarah J.", startTime: "18:00", endTime: "19:00", enrolled: 14, capacity: 15, type: "power" },
  ],
  Wed: [
    { id: "8", name: "Morning Vinyasa", instructor: "Sarah J.", startTime: "08:00", endTime: "09:00", enrolled: 11, capacity: 15, type: "vinyasa" },
    { id: "9", name: "Hatha Flow", instructor: "Emma W.", startTime: "10:30", endTime: "11:45", enrolled: 9, capacity: 12, type: "hatha" },
    { id: "10", name: "Yin Yoga", instructor: "Michael C.", startTime: "19:00", endTime: "20:30", enrolled: 7, capacity: 10, type: "yin" },
  ],
  Thu: [
    { id: "11", name: "Power Yoga", instructor: "Emma W.", startTime: "07:00", endTime: "08:00", enrolled: 13, capacity: 15, type: "power" },
    { id: "12", name: "Gentle Hatha", instructor: "Sarah J.", startTime: "10:00", endTime: "11:15", enrolled: 6, capacity: 12, type: "hatha" },
    { id: "13", name: "Restorative", instructor: "Michael C.", startTime: "17:30", endTime: "18:30", enrolled: 4, capacity: 8, type: "restorative" },
  ],
  Fri: [
    { id: "14", name: "Sunrise Flow", instructor: "Sarah J.", startTime: "06:30", endTime: "07:30", enrolled: 8, capacity: 12, type: "vinyasa" },
    { id: "15", name: "Power Yoga", instructor: "Emma W.", startTime: "12:00", endTime: "13:00", enrolled: 12, capacity: 15, type: "power" },
    { id: "16", name: "Yin Yoga", instructor: "Michael C.", startTime: "18:00", endTime: "19:30", enrolled: 9, capacity: 10, type: "yin" },
  ],
  Sat: [
    { id: "17", name: "Weekend Vinyasa", instructor: "Sarah J.", startTime: "09:00", endTime: "10:15", enrolled: 14, capacity: 15, type: "vinyasa" },
    { id: "18", name: "Hatha Flow", instructor: "Emma W.", startTime: "11:00", endTime: "12:15", enrolled: 10, capacity: 12, type: "hatha" },
  ],
  Sun: [
    { id: "19", name: "Gentle Flow", instructor: "Michael C.", startTime: "10:00", endTime: "11:00", enrolled: 7, capacity: 12, type: "hatha" },
    { id: "20", name: "Restorative", instructor: "Sarah J.", startTime: "16:00", endTime: "17:30", enrolled: 6, capacity: 8, type: "restorative" },
  ],
};

const Schedule = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const getWeekDates = () => {
    const dates: Date[] = [];
    const monday = new Date(currentWeek);
    monday.setDate(monday.getDate() - monday.getDay() + 1);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();
  const today = new Date();

  return (
    <AdminLayout>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Schedule</h1>
          <p className="text-muted-foreground mt-1">
            Manage classes and view the weekly schedule.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Class
        </Button>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const prev = new Date(currentWeek);
              prev.setDate(prev.getDate() - 7);
              setCurrentWeek(prev);
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const next = new Date(currentWeek);
              next.setDate(next.getDate() + 7);
              setCurrentWeek(next);
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" onClick={() => setCurrentWeek(new Date())}>
            Today
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          {weekDates[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          {" – "}
          {weekDates[6].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <span className="text-sm text-muted-foreground">Class types:</span>
        {Object.entries(classTypeColors).map(([type, color]) => (
          <div key={type} className="flex items-center gap-2">
            <div className={cn("w-3 h-3 rounded-full border", color.split(" ").slice(0, 2).join(" "))} />
            <span className="text-sm capitalize">{type}</span>
          </div>
        ))}
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day, index) => {
          const date = weekDates[index];
          const isToday = date.toDateString() === today.toDateString();
          const classes = mockSchedule[day] || [];

          return (
            <div key={day} className="min-w-0">
              {/* Day Header */}
              <div
                className={cn(
                  "text-center p-3 rounded-lg mb-3",
                  isToday ? "bg-primary text-primary-foreground" : "bg-muted"
                )}
              >
                <p className="text-sm font-medium">{day}</p>
                <p className={cn("text-lg font-semibold", !isToday && "text-foreground")}>
                  {date.getDate()}
                </p>
              </div>

              {/* Classes */}
              <div className="space-y-2">
                {classes.map((classItem) => (
                  <Card
                    key={classItem.id}
                    className={cn(
                      "p-3 cursor-pointer transition-all hover:shadow-md border",
                      classTypeColors[classItem.type]
                    )}
                  >
                    <div className="flex items-center gap-1.5 text-xs mb-1.5">
                      <Clock className="w-3 h-3" />
                      <span>
                        {classItem.startTime} – {classItem.endTime}
                      </span>
                    </div>
                    <h4 className="font-medium text-sm leading-tight mb-1.5">
                      {classItem.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs opacity-80">
                      <User className="w-3 h-3" />
                      <span>{classItem.instructor}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs mt-2 opacity-80">
                      <Users className="w-3 h-3" />
                      <span>
                        {classItem.enrolled}/{classItem.capacity}
                      </span>
                      {classItem.enrolled >= classItem.capacity && (
                        <span className="ml-auto text-[10px] font-medium uppercase tracking-wider">
                          Full
                        </span>
                      )}
                    </div>
                  </Card>
                ))}
                {classes.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    No classes
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
};

export default Schedule;
