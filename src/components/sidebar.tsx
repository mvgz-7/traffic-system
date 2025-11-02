"use client"

import { Menu, Eye, Car, Zap, BarChart3, AlertCircle, Settings, Database } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeModule: string
  setActiveModule: (module: string) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function Sidebar({ activeModule, setActiveModule, sidebarOpen, setSidebarOpen }: SidebarProps) {
  const modules = [
    { id: "dashboard", label: "Dashboard", icon: Eye },
    { id: "vehicle-counting", label: "Vehicle Counting", icon: Car },
    { id: "traffic-control", label: "Traffic Control", icon: Zap },
    { id: "analytics", label: "Analytics & Reports", icon: BarChart3 },
    { id: "notifications", label: "Notifications", icon: AlertCircle },
    { id: "monitoring", label: "System Monitor", icon: Settings },
    { id: "data-logging", label: "Data Logging", icon: Database },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col fixed md:relative inset-y-0 left-0 z-50`}
      >
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Traffic light housing */}
                <rect x="12" y="2" width="16" height="36" rx="2" fill="hsl(var(--sidebar-primary))" stroke="hsl(var(--sidebar-border))" strokeWidth="1" />
                
                {/* Red light */}
                <circle cx="20" cy="10" r="4.5" fill="#ef4444" />
                <circle cx="20" cy="10" r="3.5" fill="#dc2626" opacity="0.8" />
                
                {/* Yellow light */}
                <circle cx="20" cy="20" r="4.5" fill="#eab308" />
                <circle cx="20" cy="20" r="3.5" fill="#ca8a04" opacity="0.8" />
                
                {/* Green light */}
                <circle cx="20" cy="30" r="4.5" fill="#22c55e" />
                <circle cx="20" cy="30" r="3.5" fill="#16a34a" opacity="0.8" />
                
                {/* Glossy effect */}
                <circle cx="19" cy="9" r="1.5" fill="white" opacity="0.4" />
                <circle cx="19" cy="19" r="1.5" fill="white" opacity="0.4" />
                <circle cx="19" cy="29" r="1.5" fill="white" opacity="0.4" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-sidebar-foreground">Capitol View</div>
              <div className="text-xs text-sidebar-accent">Traffic Control</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {modules.map((module) => {
            const Icon = module.icon
            const isActive = activeModule === module.id
            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/10"
                }`}
              >
                <Icon size={20} className="shrink-0" />
                <span className="text-sm font-medium truncate">{module.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-sidebar-accent mb-2">System Status</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-traffic rounded-full animate-pulse-green"></div>
            <span className="text-xs text-sidebar-foreground">Online</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button - only show when sidebar is closed */}
      {!sidebarOpen && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-30 text-foreground bg-background shadow-lg md:bg-transparent md:shadow-none md:absolute md:left-20"
        >
          <Menu size={20} />
        </Button>
      )}
    </>
  )
}
