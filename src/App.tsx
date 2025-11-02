import './App.css'
import { useState } from "react"
import { Dashboard } from "@/components/dashboard.tsx"
import { Sidebar } from "@/components/sidebar.tsx"

export default function Home() {
  const [activeModule, setActiveModule] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <main className="flex-1 overflow-auto">
        <Dashboard activeModule={activeModule} />
      </main>
    </div>
  )
}