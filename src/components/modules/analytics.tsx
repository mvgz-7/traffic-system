"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Download, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export function AnalyticsModule() {
  const [hourlyData, setHourlyData] = useState([
    { hour: "00:00", vehicles: 120, avg_wait: 28, throughput: 85 },
    { hour: "06:00", vehicles: 95, avg_wait: 24, throughput: 78 },
    { hour: "09:00", vehicles: 320, avg_wait: 42, throughput: 95 },
    { hour: "12:00", vehicles: 450, avg_wait: 58, throughput: 110 },
    { hour: "15:00", vehicles: 380, avg_wait: 45, throughput: 105 },
    { hour: "18:00", vehicles: 520, avg_wait: 68, throughput: 125 },
    { hour: "21:00", vehicles: 280, avg_wait: 38, throughput: 92 },
  ])

  const dailyTrends = [
    { date: "Mon", total: 4820, avg_wait: 35, incidents: 2 },
    { date: "Tue", total: 5120, avg_wait: 38, incidents: 3 },
    { date: "Wed", total: 4950, avg_wait: 36, incidents: 1 },
    { date: "Thu", total: 5450, avg_wait: 42, incidents: 4 },
    { date: "Fri", total: 6200, avg_wait: 48, incidents: 5 },
    { date: "Sat", total: 3850, avg_wait: 28, incidents: 1 },
    { date: "Sun", total: 3200, avg_wait: 22, incidents: 0 },
  ]

  const vehicleTypeAnalysis = [
    { type: "Motorcycles", count: 1245, percentage: 25 },
    { type: "Cars", count: 2650, percentage: 53 },
    { type: "Trucks", count: 800, percentage: 16 },
    { type: "Buses", count: 305, percentage: 6 },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setHourlyData((prev) =>
        prev.map((data) => ({
          ...data,
          vehicles: Math.max(50, data.vehicles + (Math.random() - 0.5) * 30),
          avg_wait: Math.max(15, data.avg_wait + (Math.random() - 0.5) * 5),
          throughput: Math.max(50, data.throughput + (Math.random() - 0.5) * 10),
        })),
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-2">Comprehensive traffic data analysis and insights</p>
        </div>
        <Button className="gap-2">
          <Download size={18} />
          Export Report
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Vehicles Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24,570</div>
            <p className="text-xs text-green-traffic mt-1 flex items-center gap-1">
              <TrendingUp size={14} /> +18% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Avg Wait Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42s</div>
            <p className="text-xs text-green-traffic mt-1 flex items-center gap-1">
              <TrendingUp size={14} /> -8% improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18:00</div>
            <p className="text-xs text-muted-foreground mt-1">520 vehicles/hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">99.8%</div>
            <p className="text-xs text-green-traffic mt-1">Excellent</p>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Hourly Traffic Metrics</CardTitle>
          <CardDescription>Vehicles, wait times, and throughput throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
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
              throughput: {
                label: "Throughput",
                color: "hsl(var(--color-accent))",
              },
            }}
            className="h-64 w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVehicles" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="hour" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="vehicles"
                  stroke="var(--color-primary)"
                  fillOpacity={1}
                  fill="url(#colorVehicles)"
                />
                <Line type="monotone" dataKey="avg_wait" stroke="var(--color-secondary)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Trends</CardTitle>
            <CardDescription>Daily vehicle volume and incidents</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                total: {
                  label: "Total Vehicles",
                  color: "hsl(var(--color-primary))",
                },
                incidents: {
                  label: "Incidents",
                  color: "hsl(var(--color-destructive))",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="total" fill="var(--color-primary)" />
                  <Bar dataKey="incidents" fill="var(--color-destructive)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Vehicle Type Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Classification Report</CardTitle>
            <CardDescription>Distribution of vehicle types detected</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {vehicleTypeAnalysis.map((vehicle) => (
              <div key={vehicle.type} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{vehicle.type}</span>
                    <span className="text-sm text-muted-foreground">{vehicle.count}</span>
                  </div>
                  <div className="w-full bg-card rounded-full h-2 border border-border overflow-hidden">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${vehicle.percentage}%` }}></div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{vehicle.percentage}%</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
