"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

type Props = {
  boroughs: string[]
  types: string[]
  onChange: (filters: { borough?: string; type?: string }) => void
}

export function Filters({ boroughs, types, onChange }: Props) {
  const [selectedBorough, setSelectedBorough] = useState("All")
  const [selectedType, setSelectedType] = useState("All")

  const handleBoroughChange = (value: string) => {
    setSelectedBorough(value)
    onChange({
      borough: value === "All" ? undefined : value,
      type: selectedType === "All" ? undefined : selectedType,
    })
  }

  const handleTypeChange = (value: string) => {
    setSelectedType(value)
    onChange({
      borough: selectedBorough === "All" ? undefined : selectedBorough,
      type: value === "All" ? undefined : value,
    })
  }

  return (
    <div className="flex gap-4 mb-4">
      <Select onValueChange={handleBoroughChange} defaultValue="All">
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select Borough" /> {/* remove value prop */}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          {boroughs.map((b) => (
            <SelectItem key={b} value={b}>
              {b}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={handleTypeChange} defaultValue="All">
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select Type" /> {/* remove value prop */}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          {types.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
