"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Badge } from "./badge"

type Props = {
  avgStops: string
  avgBusLane: string
  avgCurvature: string
  avgRouteLength: string   // <-- added
  totalRoutes: number
}

export function SectionCards({
  avgStops,
  avgBusLane,
  avgCurvature,
  avgRouteLength,
  totalRoutes,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Avg Stops per Mile</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">{avgStops}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Avg Bus Lane Coverage</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">{avgBusLane}%</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Avg Curvature per Mile</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">{avgCurvature}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Avg Route Length (miles)</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">{avgRouteLength}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Routes</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">{totalRoutes}</CardContent>
      </Card>
    </div>
  )
}
