"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, AreaChart, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { CheckCircle, HardDrive, Cpu, MemoryStick } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState, useEffect } from "react"

export function MonitoringModule() {
  const [performanceData, setPerformanceData] = useState([
    { time: "12:00", cpu: 45, gpu: 32, ram: 62, storage: 58 },
    { time: "12:15", cpu: 52, gpu: 38, ram: 65, storage: 58 },
    { time: "12:30", cpu: 48, gpu: 35, ram: 63, storage: 59 },
    { time: "12:45", cpu: 62, gpu: 48, ram: 72, storage: 59 },
    { time: "13:00", cpu: 58, gpu: 42, ram: 68, storage: 60 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceData((prev) => {
        const newData = [...prev.slice(1)]
        const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
        newData.push({
          time,
          cpu: Math.floor(Math.random() * 100),
          gpu: Math.floor(Math.random() * 100),
          ram: Math.floor(Math.random() * 100),
          storage: Math.floor(Math.random() * 100),
        })
        return newData
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const systemStats = [
    { name: "CPU Usage", current: 58, max: 100, unit: "%", icon: Cpu, color: "text-blue-500" },
    { name: "GPU Load", current: 42, max: 100, unit: "%", icon: Cpu, color: "text-purple-500" },
    { name: "RAM Usage", current: 68, max: 128, unit: "GB", icon: MemoryStick, color: "text-green-500" },
    { name: "Storage Used", current: 420, max: 500, unit: "GB", icon: HardDrive, color: "text-yellow-500" },
  ]

  const modelStats = [
    { metric: "Model Version", value: "YOLOv8n" },
    { metric: "Inference Time", value: "45ms per frame" },
    { metric: "FPS", value: "22 frames/sec" },
    { metric: "Detection Accuracy", value: "98.5%" },
  ]

  const cameraFeeds = [
    { name: "Camera 1 - Right Lane", status: "Active", fps: 30, resolution: "1920x1080" },
    { name: "Camera 2 - Left Lane", status: "Active", fps: 30, resolution: "1920x1080" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System Monitoring</h1>
        <p className="text-muted-foreground mt-2">Hardware, software, and application performance metrics</p>
      </div>

      {/* System Status Alert */}
      <Alert className="border-green-traffic bg-green-traffic/10">
        <CheckCircle className="h-4 w-4 text-green-traffic" />
        <AlertDescription>All systems operational. Average CPU: 58%, GPU: 42%, RAM: 68%</AlertDescription>
      </Alert>

      {/* Hardware Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStats.map((stat) => {
          const Icon = stat.icon
          const percentage = Math.round((stat.current / stat.max) * 100)
          return (
            <Card key={stat.name}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Icon size={18} className={stat.color} />
                  {stat.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold">
                  {stat.current}
                  <span className="text-sm text-muted-foreground ml-1">{stat.unit}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Usage</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="w-full bg-card rounded-full h-2 border border-border overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${percentage > 80 ? "bg-red-traffic" : "bg-primary"}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Performance Metrics Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics Over Time</CardTitle>
          <CardDescription>CPU, GPU, RAM, and storage usage trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              cpu: {
                label: "CPU %",
                color: "hsl(var(--color-primary))",
              },
              gpu: {
                label: "GPU %",
                color: "hsl(var(--color-secondary))",
              },
              ram: {
                label: "RAM %",
                color: "hsl(var(--color-accent))",
              },
            }}
            className="h-64 w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Area type="monotone" dataKey="cpu" stroke="var(--color-primary)" fill="url(#colorCpu)" />
                <Line type="monotone" dataKey="gpu" stroke="var(--color-secondary)" strokeWidth={2} />
                <Line type="monotone" dataKey="ram" stroke="var(--color-accent)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>AI Model Statistics</CardTitle>
            <CardDescription>YOLO model and inference performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {modelStats.map((stat) => (
              <div
                key={stat.metric}
                className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
              >
                <span className="text-sm font-medium text-muted-foreground">{stat.metric}</span>
                <span className="text-sm font-bold text-foreground">{stat.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Camera Feed Status */}
        <Card>
          <CardHeader>
            <CardTitle>Camera Feed Status</CardTitle>
            <CardDescription>Real-time camera feed information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {cameraFeeds.map((camera) => (
              <div
                key={camera.name}
                className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
              >
                <div>
                  <p className="text-sm font-medium">{camera.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {camera.resolution} @ {camera.fps} FPS
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-traffic rounded-full animate-pulse-green"></div>
                  <span className="text-xs font-medium text-green-traffic">{camera.status}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
