type Filters = {
  minRent?: number
  maxRent?: number
  propertyType?: string
  tenantPreference?: string
}

type Props = {
  filters: Filters
  onChange: (filters: Filters) => void
}

export default function Filters({ filters, onChange }: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        marginBottom: 20,
      }}
    >
      {/* Min Rent */}
      <input
        type="number"
        placeholder="Min Rent"
        value={filters.minRent ?? ""}
        onChange={(e) =>
          onChange({ ...filters, minRent: Number(e.target.value) || undefined })
        }
        style={{ padding: 8 }}
      />

      {/* Max Rent */}
      <input
        type="number"
        placeholder="Max Rent"
        value={filters.maxRent ?? ""}
        onChange={(e) =>
          onChange({ ...filters, maxRent: Number(e.target.value) || undefined })
        }
        style={{ padding: 8 }}
      />

      {/* Property Type */}
      <select
        value={filters.propertyType ?? ""}
        onChange={(e) =>
          onChange({ ...filters, propertyType: e.target.value || undefined })
        }
      >
        <option value="">Property Type</option>
        <option value="1BHK">1 BHK</option>
        <option value="2BHK">2 BHK</option>
        <option value="3BHK">3 BHK</option>
        <option value="1Bed">1 Bed</option>
      </select>

      {/* Tenant Preference */}
      <select
        value={filters.tenantPreference ?? ""}
        onChange={(e) =>
          onChange({
            ...filters,
            tenantPreference: e.target.value || undefined,
          })
        }
      >
        <option value="">Tenant</option>
        <option value="Bachelor">Bachelor</option>
        <option value="Family">Family</option>
        <option value="Girls">Girls</option>
        <option value="Working">Working</option>
      </select>
    </div>
  )
}
