"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, Clock, MapPin, Trash2, Bell } from "lucide-react"
import { useState, useEffect } from "react"

export function NotificationsModule() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "warning",
      title: "High Traffic Alert",
      message: "Heavy traffic detected on McArthur Highway (northbound). Queue length exceeds 25 vehicles.",
      location: "McArthur Highway (northbound)",
      time: "2 minutes ago",
    },
    {
      id: 2,
      type: "critical",
      title: "Incident Report",
      message: "Vehicle collision detected at Capitol Road and Park Road intersection. Emergency response initiated.",
      location: "Capitol Road & Park Road",
      time: "5 minutes ago",
    },
    {
      id: 3,
      type: "info",
      title: "System Update",
      message: "Traffic control model updated. AI optimization continues...",
      location: "System",
      time: "15 minutes ago",
    },
    {
      id: 4,
      type: "success",
      title: "Traffic Flow Normalized",
      message: "Traffic flow has been restored to normal levels on McArthur Highway (southbound).",
      location: "McArthur Highway (southbound)",
      time: "1 hour ago",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const types = ["info", "warning", "success"]
      const locations = [
        "McArthur Highway (northbound)",
        "McArthur Highway (southbound)",
        "Capitol Road (westbound)",
        "Park Road (northbound)",
      ]
      const randomType = types[Math.floor(Math.random() * types.length)]
      const randomLocation = locations[Math.floor(Math.random() * locations.length)]

      if (Math.random() > 0.7) {
        const newNotif = {
          id: Date.now(),
          type: randomType,
          title:
            randomType === "warning" ? "Traffic Alert" : randomType === "success" ? "Flow Restored" : "System Update",
          message: `Update from ${randomLocation}`,
          location: randomLocation,
          time: "Just now",
        }
        setNotifications((prev) => [newNotif, ...prev].slice(0, 6))
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertCircle className="w-5 h-5 text-red-traffic" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-traffic" />
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-traffic" />
      default:
        return <Clock className="w-5 h-5 text-primary" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "critical":
        return "border-red-traffic bg-red-traffic/5"
      case "warning":
        return "border-yellow-traffic bg-yellow-traffic/5"
      case "success":
        return "border-green-traffic bg-green-traffic/5"
      default:
        return "border-primary bg-primary/5"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Traffic Notifications</h1>
        <p className="text-muted-foreground mt-2">Real-time alerts and system notifications</p>
      </div>

      {/* Notification Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{notifications.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-traffic">
              {notifications.filter((n) => n.type === "critical").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-traffic">
              {notifications.filter((n) => n.type === "warning").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Monitor</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-traffic">
              {notifications.filter((n) => n.type === "success").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Cleared</p>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell size={20} />
            Active Notifications
          </CardTitle>
          <CardDescription>All system and traffic alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border rounded-lg p-4 flex items-start gap-4 ${getNotificationColor(notification.type)}`}
                >
                  <div className="shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm mb-1">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {notification.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {notification.time}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissNotification(notification.id)}
                    className="shrink-0"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-traffic mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No notifications at this time</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
