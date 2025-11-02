"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Database } from "lucide-react"
import { useState, useEffect } from "react"

export function DataLoggingModule() {
  const [analyticsData, setAnalyticsData] = useState([
    { time: "12:00", queue_length: 12, waiting_time: 28, throughput: 85 },
    { time: "12:15", queue_length: 15, waiting_time: 32, throughput: 82 },
    { time: "12:30", queue_length: 18, waiting_time: 38, throughput: 80 },
    { time: "12:45", queue_length: 22, waiting_time: 45, throughput: 92 },
    { time: "13:00", queue_length: 28, waiting_time: 52, throughput: 105 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalyticsData((prev) => {
        const newData = [...prev.slice(1)]
        const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
        newData.push({
          time,
          queue_length: Math.floor(Math.random() * 30),
          waiting_time: Math.floor(Math.random() * 60),
          throughput: Math.floor(Math.random() * 120),
        })
        return newData
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Logging & Analytics</h1>
        <p className="text-muted-foreground mt-2">Traffic data storage, analysis, and performance metrics</p>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Database size={18} className="text-primary" />
              Total Data Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">342.1 GB</div>
            <p className="text-xs text-muted-foreground mt-1">Logged this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Queue Length</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18.2</div>
            <p className="text-xs text-muted-foreground mt-1">Avg vehicles in queue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Waiting Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">39s</div>
            <p className="text-xs text-muted-foreground mt-1">Avg wait time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Throughput</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">93</div>
            <p className="text-xs text-muted-foreground mt-1">Vehicles/minute</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Traffic Analytics Timeline</CardTitle>
          <CardDescription>Queue length, waiting time, and throughput metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              queue_length: {
                label: "Queue Length (vehicles)",
                color: "hsl(var(--color-primary))",
              },
              waiting_time: {
                label: "Waiting Time (seconds)",
                color: "hsl(var(--color-secondary))",
              },
              throughput: {
                label: "Throughput (v/min)",
                color: "hsl(var(--color-accent))",
              },
            }}
            className="h-64 w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="queue_length" stroke="var(--color-primary)" strokeWidth={2} />
                <Line type="monotone" dataKey="waiting_time" stroke="var(--color-secondary)" strokeWidth={2} />
                <Line type="monotone" dataKey="throughput" stroke="var(--color-accent)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      
    </div>
  )
}
