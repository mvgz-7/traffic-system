"use client"

import { DashboardOverview } from "./modules/dashboard-overview.tsx"
import { VehicleCountingModule } from "./modules/vehicle-counting.tsx"
import { TrafficControlModule } from "./modules/traffic-control.tsx"
import { AnalyticsModule } from "./modules/analytics.tsx"
import { NotificationsModule } from "./modules/notifications.tsx"
import { MonitoringModule } from "./modules/monitoring.tsx"
import { DataLoggingModule } from "./modules/data-logging.tsx"

interface DashboardProps {
  activeModule: string
}

export function Dashboard({ activeModule }: DashboardProps) {
  return (
    <div className="p-4 sm:p-6">
      {activeModule === "dashboard" && <DashboardOverview />}
      {activeModule === "vehicle-counting" && <VehicleCountingModule />}
      {activeModule === "traffic-control" && <TrafficControlModule />}
      {activeModule === "analytics" && <AnalyticsModule />}
      {activeModule === "notifications" && <NotificationsModule />}
      {activeModule === "monitoring" && <MonitoringModule />}
      {activeModule === "data-logging" && <DataLoggingModule />}
    </div>
  )
}
