"use client"

import { useState, useMemo } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import { Badge } from "./badge"

/* ===============================
   TYPES
=================================*/

type BusRoute = {
  route_id: string
  direction: string
  route_length_miles?: number
  stops_per_mile?: number
  mean_stop_spacing_ft?: number
  stop_spacing_std_ft?: number
  pct_buslane?: number
  stop_signs_per_mile?: number
  street_lights_per_mile?: number
  right_angle_turns?: number
  curvature_per_mile?: number
  borough: string
  type: string
}

type Props = {
  data: BusRoute[]
}

type SortKey = keyof BusRoute

/* ===============================
   HELPER
=================================*/

const formatNumber = (value?: number, decimals = 2) =>
  value !== undefined && value !== null ? value.toFixed(decimals) : "0"

/* ===============================
   COMPONENT
=================================*/

export function RoutesTable({ data }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("route_id")
  const [ascending, setAscending] = useState(true)

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setAscending(!ascending) // toggle direction
    } else {
      setSortKey(key)
      setAscending(true)
    }
  }

  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      const valA = a[sortKey]
      const valB = b[sortKey]

      if (valA === undefined) return 1
      if (valB === undefined) return -1

      if (typeof valA === "number" && typeof valB === "number") {
        return ascending ? valA - valB : valB - valA
      }

      return ascending
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA))
    })

    return sorted
  }, [data, sortKey, ascending])

  if (!data || data.length === 0) return <div>No data available</div>

  const SortHeader = ({
    label,
    column,
  }: {
    label: string
    column: SortKey
  }) => (
    <TableHead
      onClick={() => handleSort(column)}
      className="cursor-pointer select-none hover:text-primary"
    >
      {label}
      {sortKey === column && (
        <span className="ml-1">{ascending ? "▲" : "▼"}</span>
      )}
    </TableHead>
  )

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <SortHeader label="Route ID" column="route_id" />
          <SortHeader label="Direction" column="direction" />
          <SortHeader label="Route Length (miles)" column="route_length_miles" />
          <SortHeader label="Stops per Mile" column="stops_per_mile" />
          <SortHeader label="Mean Stop Spacing (ft)" column="mean_stop_spacing_ft" />
          <SortHeader label="Stop Spacing Std Dev (ft)" column="stop_spacing_std_ft" />
          <SortHeader label="% Bus Lane Coverage" column="pct_buslane" />
          <SortHeader label="Stop Signs per Mile" column="stop_signs_per_mile" />
          <SortHeader label="Street Lights per Mile" column="street_lights_per_mile" />
          <SortHeader label="Right Angle Turns" column="right_angle_turns" />
          <SortHeader label="Curvature per Mile" column="curvature_per_mile" />
          <SortHeader label="Borough" column="borough" />
          <SortHeader label="Type" column="type" />
        </TableRow>
      </TableHeader>

      <TableBody>
        {sortedData.map((row, idx) => (
          <TableRow key={idx}>
            <TableCell>{row.route_id}</TableCell>
            <TableCell>{row.direction}</TableCell>
            <TableCell>{formatNumber(row.route_length_miles)}</TableCell>
            <TableCell>{formatNumber(row.stops_per_mile)}</TableCell>
            <TableCell>{formatNumber(row.mean_stop_spacing_ft)}</TableCell>
            <TableCell>{formatNumber(row.stop_spacing_std_ft)}</TableCell>
            <TableCell>{formatNumber(row.pct_buslane)}</TableCell>
            <TableCell>{formatNumber(row.stop_signs_per_mile)}</TableCell>
            <TableCell>{formatNumber(row.street_lights_per_mile)}</TableCell>
            <TableCell>{formatNumber(row.right_angle_turns, 0)}</TableCell>
            <TableCell>{formatNumber(row.curvature_per_mile)}</TableCell>
            <TableCell>
              <Badge variant="secondary">{row.borough}</Badge>
            </TableCell>
            <TableCell>{row.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
