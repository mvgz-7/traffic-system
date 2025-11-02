"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AlertCircle, TrendingUp, Activity, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function DashboardOverview() {
  const [vehicleData, setVehicleData] = useState([
    { time: "08:00", count: 45 },
    { time: "09:00", count: 120 },
    { time: "10:00", count: 95 },
    { time: "11:00", count: 150 },
    { time: "12:00", count: 200 },
    { time: "13:00", count: 175 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicleData((prev) => {
        const newData = [...prev.slice(1)]
        const hours = new Date().getHours()
        const minutes = new Date().getMinutes()
        const timeStr = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
        newData.push({
          time: timeStr,
          count: Math.floor(Math.random() * 250) + 30,
        })
        return newData
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const trafficFlow = [
    { direction: "Right Lane", vehicles: 450, avg_wait: 32 },
    { direction: "Left Lane", vehicles: 380, avg_wait: 28 },
  ]

  const lightStatus = [
    { name: "Red", value: 15, color: "var(--color-red-traffic)" },
    { name: "Yellow", value: 10, color: "var(--color-yellow-traffic)" },
    { name: "Green", value: 75, color: "var(--color-green-traffic)" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Capitol View Traffic Control System</h1>
          <p className="text-muted-foreground mt-2">City of Malolos, Bulacan - Real-time Traffic Monitoring</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <RefreshCw size={16} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Total Vehicles Today
              <Activity className="w-4 h-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,450</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Avg Wait Time
              <TrendingUp className="w-4 h-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">32s</div>
            <p className="text-xs text-muted-foreground mt-1">Normalized</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-traffic rounded-full animate-pulse-green"></div>
              <span className="text-sm font-medium">Online</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">All systems operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Active Alerts
              <AlertCircle className="w-4 h-4 text-destructive" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle>Vehicle Count Trend</CardTitle>
            <CardDescription>Vehicles counted over the last 6 hours</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ChartContainer
              config={{
                count: {
                  label: "Vehicle Count",
                  color: "hsl(var(--color-primary))",
                },
              }}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vehicleData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-primary)", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Traffic Light Status</CardTitle>
            <CardDescription>Distribution of signal states</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
            <ChartContainer
              config={{
                lights: {
                  label: "Status",
                },
              }}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={lightStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {lightStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Traffic Flow by Direction</CardTitle>
          <CardDescription>Vehicle count and average wait time per direction</CardDescription>
        </CardHeader>
        <CardContent className="w-full h-[calc(100vh-300px)]">
          <ChartContainer
            config={{
              vehicles: {
                label: "Vehicles",
                color: "hsl(var(--color-primary))",
              },
              avg_wait: {
                label: "Avg Wait (s)",
                color: "hsl(var(--color-secondary))",
              },
            }}
            className="w-full h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficFlow} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="direction"
                  stroke="var(--color-muted-foreground)"
                  angle={0}
                  height={80}
                  tick={{ fontSize: 11 }}
                />
                <YAxis stroke="var(--color-muted-foreground)" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="vehicles" fill="var(--color-primary)" />
                <Bar dataKey="avg_wait" fill="var(--color-secondary)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
