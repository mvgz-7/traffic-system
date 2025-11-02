"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Camera, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function VehicleCountingModule() {
  const [isCounting, setIsCounting] = useState(false)
  const [selectedCamera, setSelectedCamera] = useState("camera-1")
  const [vehicleCount] = useState(245)
  const [detectionRate] = useState(98.5)
  const videoRef = useRef<HTMLVideoElement>(null)

  const cameras = [
    { id: "camera-1", name: "Right Lane", status: "active" },
    { id: "camera-2", name: "Left Lane", status: "active" },
  ]

  const vehicleClassification = [
    { type: "Motorcycle", count: 45, percentage: 18 },
    { type: "Car", count: 130, percentage: 53 },
    { type: "Truck", count: 50, percentage: 20 },
    { type: "Bus", count: 20, percentage: 8 },
  ]

  const toggleCounting = () => {
    setIsCounting(!isCounting)
  }

  useEffect(() => {
    if (videoRef.current) {
      if (isCounting) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isCounting])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Automated Vehicle Counting</h1>
        <p className="text-muted-foreground mt-2">Real-time vehicle detection and classification using YOLO model</p>
      </div>

      {/* Camera Selection and Control */}
      <Card>
        <CardHeader>
          <CardTitle>Camera Selection & Control</CardTitle>
          <CardDescription>Select camera input and configure counting parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Active Camera</label>
              <select
                value={selectedCamera}
                onChange={(e) => setSelectedCamera(e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
              >
                {cameras.map((cam) => (
                  <option key={cam.id} value={cam.id}>
                    {cam.name} ({cam.status})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-2">
              <Button
                onClick={toggleCounting}
                variant={isCounting ? "destructive" : "default"}
                className="flex-1 gap-2"
              >
                {isCounting ? (
                  <>
                    <Pause size={18} />
                    Stop Counting
                  </>
                ) : (
                  <>
                    <Play size={18} />
                    Start Counting
                  </>
                )}
              </Button>
            </div>
          </div>

          {isCounting && (
            <Alert className="border-green-traffic bg-green-traffic/10">
              <CheckCircle className="h-4 w-4 text-green-traffic" />
              <AlertDescription>
                Vehicle counting is active on {cameras.find((c) => c.id === selectedCamera)?.name}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Live Feed Simulation */}
      <Card>
        <CardHeader>
          <CardTitle>Live CCTV Feed</CardTitle>
          <CardDescription>Real-time camera stream from selected intersection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative bg-black rounded-lg overflow-hidden aspect-video border border-border">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
            >
              <source src="/traffic-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {!isCounting && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center">
                  <Camera size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                  <p className="text-muted-foreground text-sm">Camera Feed Paused</p>
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-card p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Vehicles Detected</p>
              <p className="text-2xl font-bold text-primary animate-pulse-green">{vehicleCount}</p>
            </div>
            <div className="bg-card p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Detection Rate</p>
              <p className="text-2xl font-bold text-primary">{detectionRate}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Classification */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Classification</CardTitle>
          <CardDescription>Breakdown of detected vehicle types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {vehicleClassification.map((vehicle) => (
              <div key={vehicle.type} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{vehicle.type}</span>
                    <span className="text-sm text-muted-foreground">{vehicle.count} vehicles</span>
                  </div>
                  <div className="w-full bg-card rounded-full h-2 border border-border">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${vehicle.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{vehicle.percentage}% of total</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Counting Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Counting Configuration</CardTitle>
          <CardDescription>Configure YOLO model and detection parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Model Version</label>
              <select className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground">
                <option>YOLOv8 (Active)</option>
                <option>YOLOv7</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Confidence Threshold</label>
              <input type="range" min="0" max="100" defaultValue="75" className="w-full" />
              <span className="text-xs text-muted-foreground">75%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
