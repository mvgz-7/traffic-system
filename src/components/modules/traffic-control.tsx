"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, TrendingDown, TrendingUp } from "lucide-react"

export function TrafficControlModule() {
  const [autoMode, setAutoMode] = useState(true)
  const [directions, setDirections] = useState([
    {
      id: "right",
      name: "Right Lane",
      light: "green",
      timeRemaining: 45,
      queueLength: 12,
      vehicleFlow: 85,
    },
    {
      id: "left",
      name: "Left Lane",
      light: "red",
      timeRemaining: 0,
      queueLength: 28,
      vehicleFlow: 0,
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setDirections((prev) =>
        prev.map((dir) => ({
          ...dir,
          queueLength: Math.max(0, dir.queueLength + (Math.random() - 0.5) * 3),
          vehicleFlow: Math.random() > 0.3 ? Math.floor(Math.random() * 100) : 0,
          timeRemaining: Math.max(0, dir.timeRemaining - 1),
        })),
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const rlMetrics = [
    { metric: "Average Wait Time", value: "32s", change: "-8%" },
    { metric: "Throughput", value: "2,450/hour", change: "+15%" },
    { metric: "Queue Length", value: "18.25 avg", change: "-12%" },
  ]

  const getLightColor = (light: string) => {
    switch (light) {
      case "green":
        return "bg-green-traffic animate-pulse-green"
      case "yellow":
        return "bg-yellow-traffic"
      case "red":
        return "bg-red-traffic animate-pulse-red"
      default:
        return "bg-muted"
    }
  }

  const getLightBorderColor = (light: string) => {
    switch (light) {
      case "green":
        return "border-green-traffic"
      case "yellow":
        return "border-yellow-traffic"
      case "red":
        return "border-red-traffic"
      default:
        return "border-border"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dynamic Traffic Control</h1>
        <p className="text-muted-foreground mt-2">AI-powered traffic light optimization using reinforcement learning</p>
      </div>

      {/* Control Mode */}
      <Card>
        <CardHeader>
          <CardTitle>Control Mode</CardTitle>
          <CardDescription>Switch between automatic and manual control</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button variant={autoMode ? "default" : "outline"} onClick={() => setAutoMode(true)} className="gap-2">
              <CheckCircle size={18} />
              Automatic (RL Model)
            </Button>
            <Button variant={!autoMode ? "default" : "outline"} onClick={() => setAutoMode(false)} className="gap-2">
              <AlertCircle size={18} />
              Manual Control
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Traffic Light Status */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time Traffic Light Status</CardTitle>
          <CardDescription>
            {autoMode ? "AI automatically optimizing traffic flow" : "Manual control of traffic signals"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {directions.map((dir) => (
              <div key={dir.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm uppercase">{dir.name}</h3>
                  <div
                    className={`w-8 h-8 rounded-full ${getLightColor(dir.light)} border-2 ${getLightBorderColor(dir.light)}`}
                  ></div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Signal:</span>
                    <span className="font-medium capitalize">{dir.light}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Left:</span>
                    <span className="font-medium">{Math.round(dir.timeRemaining)}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Queue:</span>
                    <span className="font-medium">{Math.round(dir.queueLength)} vehicles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Flow:</span>
                    <span className="font-medium">{Math.round(dir.vehicleFlow)} v/min</span>
                  </div>
                </div>

                {autoMode ? (
                  <div className="bg-green-traffic/10 border border-green-traffic/20 rounded-md p-2 text-center">
                    <p className="text-xs text-green-traffic font-medium">AI Controlled</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-green-traffic/10 hover:bg-green-traffic/20 border-green-traffic/30"
                      onClick={() => {
                        setDirections((prev) =>
                          prev.map((d) => (d.id === dir.id ? { ...d, light: "green", timeRemaining: 60 } : d)),
                        )
                      }}
                    >
                      G
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-yellow-traffic/10 hover:bg-yellow-traffic/20 border-yellow-traffic/30"
                      onClick={() => {
                        setDirections((prev) =>
                          prev.map((d) => (d.id === dir.id ? { ...d, light: "yellow", timeRemaining: 3 } : d)),
                        )
                      }}
                    >
                      Y
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-red-traffic/10 hover:bg-red-traffic/20 border-red-traffic/30"
                      onClick={() => {
                        setDirections((prev) =>
                          prev.map((d) => (d.id === dir.id ? { ...d, light: "red", timeRemaining: 0 } : d)),
                        )
                      }}
                    >
                      R
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* RL Model Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Reinforcement Learning Model</CardTitle>
          <CardDescription>AI model performance and optimization metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rlMetrics.map((metric) => (
              <div key={metric.metric} className="bg-card p-3 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground mb-1">{metric.metric}</p>
                <p className="text-xl font-bold">{metric.value}</p>
                <p
                  className={`text-xs mt-1 flex items-center gap-1 ${metric.change.startsWith("-") ? "text-green-traffic" : "text-red-traffic"}`}
                >
                  {metric.change.startsWith("-") ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                  {metric.change}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
