import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Clock, Bell, Shield, Palette } from "lucide-react";

const Settings = () => {
  return (
    <AdminLayout>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure global parameters and preferences.
          </p>
        </div>
      </div>

      <div className="grid gap-6 max-w-3xl">
        {/* Booking Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">Booking Settings</CardTitle>
                <CardDescription>Configure booking and cancellation rules.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cutoff">Booking Cutoff (hours before class)</Label>
                <Input id="cutoff" type="number" defaultValue="2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cancel">Cancellation Window (hours)</Label>
                <Input id="cancel" type="number" defaultValue="4" />
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Allow waitlist</p>
                <p className="text-sm text-muted-foreground">
                  Enable waitlist when classes are full
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Auto-deduct sessions</p>
                <p className="text-sm text-muted-foreground">
                  Automatically deduct sessions on check-in
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Bell className="w-5 h-5 text-accent" />
              </div>
              <div>
                <CardTitle className="text-base">Notifications</CardTitle>
                <CardDescription>Configure admin notification preferences.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">New client registration</p>
                <p className="text-sm text-muted-foreground">
                  Notify when a new client registers
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Subscription expiring</p>
                <p className="text-sm text-muted-foreground">
                  Notify when subscriptions are about to expire
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Class fully booked</p>
                <p className="text-sm text-muted-foreground">
                  Notify when a class reaches capacity
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Shield className="w-5 h-5 text-success" />
              </div>
              <div>
                <CardTitle className="text-base">Security</CardTitle>
                <CardDescription>Manage access and security settings.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Two-factor authentication</p>
                <p className="text-sm text-muted-foreground">
                  Require 2FA for all admin accounts
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Session timeout</p>
                <p className="text-sm text-muted-foreground">
                  Automatically log out after inactivity
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="timeout">Session timeout (minutes)</Label>
              <Input id="timeout" type="number" defaultValue="60" className="max-w-[200px]" />
            </div>
          </CardContent>
        </Card>

        {/* Studio Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Palette className="w-5 h-5 text-warning" />
              </div>
              <div>
                <CardTitle className="text-base">Studio Information</CardTitle>
                <CardDescription>Update your studio details.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studioName">Studio Name</Label>
              <Input id="studioName" defaultValue="Serenity Yoga Studio" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue="+1 234-567-8900" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue="hello@serenity.yoga" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="123 Wellness Street, Harmony City" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
