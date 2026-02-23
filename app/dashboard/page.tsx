"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Components
import { SectionCards } from "@/components/ui/SectionCards"
import { Filters } from "@/components/ui/Filters"
import { RoutesTable } from "@/components/ui/RoutesTable"

/* ===============================
   TYPES
=================================*/

type RawRoute = {
  "Route ID": string
  Direction: string
  "Route Length (miles)": number
  "Stops per Mile": number
  "Mean Stop Spacing (ft)": number
  "Stop Spacing Std Dev (ft)": number
  "% Bus Lane Coverage": number
  "Stop Signs per Mile": number
  "Street Lights per Mile": number
  "Right Angle Turns": number
  "Curvature per Mile": number
  Borough: string
  Type: string
}

type BusRoute = {
  route_id: string
  direction: string
  route_length_miles: number
  stops_per_mile: number
  mean_stop_spacing_ft: number
  stop_spacing_std_ft: number
  pct_buslane: number
  stop_signs_per_mile: number
  street_lights_per_mile: number
  right_angle_turns: number
  curvature_per_mile: number
  borough: string
  type: string
}

/* ===============================
   COMPONENT
=================================*/

export default function Dashboard() {
  const [data, setData] = useState<BusRoute[]>([])
  const [filtered, setFiltered] = useState<BusRoute[]>([])
  const [loading, setLoading] = useState(true)

  /* ===============================
     FETCH DATA
  =================================*/
  useEffect(() => {
    fetch("/data/bus_routes.json")
      .then((res) => res.json())
      .then((raw: RawRoute[]) => {
        const cleaned: BusRoute[] = raw
          .filter((r) => r.Borough && r.Borough !== "Unknown")
          .map((r) => ({
            route_id: r["Route ID"],
            direction: r["Direction"],
            route_length_miles: r["Route Length (miles)"] ?? 0,
            stops_per_mile: r["Stops per Mile"] ?? 0,
            mean_stop_spacing_ft: r["Mean Stop Spacing (ft)"] ?? 0,
            stop_spacing_std_ft: r["Stop Spacing Std Dev (ft)"] ?? 0,
            pct_buslane: r["% Bus Lane Coverage"] ?? 0,
            stop_signs_per_mile: r["Stop Signs per Mile"] ?? 0,
            street_lights_per_mile: r["Street Lights per Mile"] ?? 0,
            right_angle_turns: r["Right Angle Turns"] ?? 0,
            curvature_per_mile: r["Curvature per Mile"] ?? 0,
            borough: r["Borough"],
            type: r["Type"],
          }))

        setData(cleaned)
        setFiltered(cleaned)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error loading data:", err)
        setLoading(false)
      })
  }, [])

  /* ===============================
     FILTER HANDLER
  =================================*/
  const handleFilter = (filters: { borough?: string; type?: string }) => {
    let filteredData = [...data]
    if (filters.borough) {
      filteredData = filteredData.filter((r) => r.borough === filters.borough)
    }
    if (filters.type) {
      filteredData = filteredData.filter((r) => r.type === filters.type)
    }
    setFiltered(filteredData)
  }

  /* ===============================
     DOWNLOAD HANDLER
  =================================*/
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(filtered, null, 2)], {
      type: "application/json",
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "nyc_bus_routes_filtered.json"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  /* ===============================
     SUMMARY METRICS
  =================================*/
  const avgStops =
    filtered.length > 0
      ? (
          filtered.reduce((sum, r) => sum + r.stops_per_mile, 0) /
          filtered.length
        ).toFixed(2)
      : "0"

  const avgBusLane =
    filtered.length > 0
      ? (
          filtered.reduce((sum, r) => sum + r.pct_buslane, 0) /
          filtered.length
        ).toFixed(1)
      : "0"

  const avgCurvature =
    filtered.length > 0
      ? (
          filtered.reduce((sum, r) => sum + r.curvature_per_mile, 0) /
          filtered.length
        ).toFixed(1)
      : "0"

  const avgRouteLength =
    filtered.length > 0
      ? (
          filtered.reduce((sum, r) => sum + r.route_length_miles, 0) /
          filtered.length
        ).toFixed(2)
      : "0"

  const totalRoutes = filtered.length / 2 // because each route has two directions

  const boroughs = Array.from(new Set(data.map((r) => r.borough)))
  const types = Array.from(new Set(data.map((r) => r.type)))

  /* ===============================
     RENDER
  =================================*/
  if (loading) {
    return <div className="p-8 text-lg">Loading dashboard...</div>
  }

  return (
    <div className="p-8 space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold">NYC Bus Route Performance Dashboard</h1>

      {/* Download + Filters Row */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        {/* Download Button on Left */}
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Download Filtered JSON
        </button>

        {/* Filters on Right */}
        <Filters boroughs={boroughs} types={types} onChange={handleFilter} />
      </div>

      {/* Summary Cards */}
      <SectionCards
        avgStops={avgStops}
        avgBusLane={avgBusLane}
        avgCurvature={avgCurvature}
        avgRouteLength={avgRouteLength}
        totalRoutes={totalRoutes}
      />

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Route Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <RoutesTable data={filtered.slice(0, 200)} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
