import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function MetricsPage() {
  return (
    <div className="p-8 max-w-5xl space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">NYC Bus Route Metrics Explained</h1>
        <Link href="/dashboard" className="text-sm underline hover:text-primary">
          ← Back to Dashboard
        </Link>
      </div>

      {/* ROUTE IDENTIFIERS */}
      <Card>
        <CardHeader>
          <CardTitle>Route Identifiers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <div>
            <strong>Route ID</strong>
            <p>
              Unique identifier for the bus route (e.g., B1, M15, Q44). Routes may appear twice
              if analyzed separately by direction.
            </p>
          </div>

          <div>
            <strong>Direction</strong>
            <p>
              Indicates route direction (e.g., N/S, E/W). Metrics are calculated per direction
              because operational characteristics can differ.
            </p>
          </div>

          <div>
            <strong>Borough</strong>
            <p>
              Borough where the route primarily operates (Brooklyn, Bronx, Manhattan, Queens,
              Staten Island).
            </p>
          </div>

          <div>
            <strong>Type</strong>
            <p>
              Service classification (Local, Express, SBS, etc.). Different types typically have
              different stop spacing and operational characteristics.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* GEOMETRY + STRUCTURE */}
      <Card>
        <CardHeader>
          <CardTitle>Route Geometry & Structure</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <div>
            <strong>Route Length (miles)</strong>
            <p>
              Total distance traveled by the route in one direction. Calculated as the
              sum of segment lengths after merging all route segments:
              <br />
              <code>Route Length = Σ segment lengths</code>
            </p>
          </div>

          <div>
            <strong>Curvature per Mile</strong>
            <p>
              Measures how winding a route is. Calculated as:
              <br />
              <code>Curvature per Mile = (Sum of turn angles along route) / Route Length</code>
              <br />
              Higher values indicate more indirect routing, which can slow buses.
            </p>
          </div>

          <div>
            <strong>Right Angle Turns</strong>
            <p>
              Total number of ~90° turns along the route. Identified from route geometry
              by counting line segment angle changes.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* STOP CHARACTERISTICS */}
      <Card>
        <CardHeader>
          <CardTitle>Stop Characteristics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <div>
            <strong>Stops per Mile</strong>
            <p>
              Average number of stops per mile:
              <br />
              <code>Stops per Mile = Total Stops / Route Length (miles)</code>
            </p>
          </div>

          <div>
            <strong>Mean Stop Spacing (ft)</strong>
            <p>
              Average distance between consecutive stops:
              <br />
              <code>Mean Stop Spacing = Σ distance between stops / (Number of stops - 1)</code>
            </p>
          </div>

          <div>
            <strong>Stop Spacing Std Dev (ft)</strong>
            <p>
              Standard deviation of distances between stops:
              <br />
              <code>Std Dev = sqrt(Σ(distance - mean)² / (n - 1))</code>
              <br />
              High variability indicates inconsistent spacing affecting operational reliability.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* TRAFFIC CONTROLS + STREET ENVIRONMENT */}
      <Card>
        <CardHeader>
          <CardTitle>Street & Traffic Environment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <div>
            <strong>% Bus Lane Coverage</strong>
            <p>
              Percentage of the route that travels in dedicated bus lanes:
              <br />
              <code>% Bus Lane = (Bus Lane Length / Route Length) × 100</code>
              <br />
              Calculated using GIS intersection of route and bus lane geometries.
            </p>
          </div>

          <div>
            <strong>Stop Signs per Mile</strong>
            <p>
              Average number of stop signs along the route per mile:
              <br />
              <code>Stop Signs per Mile = Total Stop Signs / Route Length (miles)</code>
            </p>
          </div>

          <div>
            <strong>Street Lights per Mile</strong>
            <p>
              Number of signalized intersections per mile:
              <br />
              <code>Street Lights per Mile = Total Signalized Intersections / Route Length</code>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SUMMARY CARD FORMULAS */}
      <Card>
        <CardHeader>
          <CardTitle>How Summary Cards Are Calculated</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm leading-relaxed">
          <p>
            Dashboard summary metrics are calculated as the <strong>average</strong> across all
            currently filtered routes. For example:
          </p>
          <ul className="list-disc pl-5">
            <li>
              <strong>Average Stops per Mile</strong> = Σ(Stops per Mile for each filtered route) / Number of filtered routes
            </li>
            <li>
              <strong>Average Bus Lane Coverage</strong> = Σ(% Bus Lane Coverage for each filtered route) / Number of filtered routes
            </li>
            <li>
              <strong>Average Route Curvature</strong> = Σ(Curvature per Mile for each filtered route) / Number of filtered routes
            </li>
            <li>
              <strong>Average Route Length</strong> = Σ(Route Length for each filtered route) / Number of filtered routes
            </li>
            <li>
              <strong>Total Routes</strong> = Count of unique route IDs (collapsed across directions)
            </li>
          </ul>
          <p>
            Filtering by borough or service type dynamically updates these summary metrics.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
