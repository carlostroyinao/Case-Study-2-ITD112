import React, { useEffect, useState } from "react";
import { getAgeGroups } from "../../services/emigrants_Age";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
} from "recharts";

const AgeDashboard = () => {
  const [ageGroups, setAgeGroups] = useState([]);
  const [chartType, setChartType] = useState("bar"); // 'bar' | 'span'
  const [filteredYear, setFilteredYear] = useState("All");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");

  const placeholders = {
    below14: "14 & Below",
    "15-19": "15–19",
    "20-24": "20–24",
    "25-29": "25–29",
    "30-34": "30–34",
    "35-39": "35–39",
    "40-44": "40–44",
    "45-49": "45–49",
    "50-54": "50–54",
    "55-59": "55–59",
    "60-64": "60–64",
    "65-69": "65–69",
    above70: "70 & Above",
    notReported: "Not Reported",
  };

  const ageKeys = Object.keys(placeholders);
  const getColor = (index) => `hsl(${(index * 35) % 360}, 60%, 55%)`;

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAgeGroups();
      setAgeGroups(data);
    };
    fetchData();
  }, []);

  const years = Array.from(new Set(ageGroups.map((item) => item.year))).sort();

  const filteredData = ageGroups.filter((row) => {
    const matchSpecificYear =
      filteredYear === "All" || row.year === Number(filteredYear);
    const matchRange =
      (!yearFrom || row.year >= Number(yearFrom)) &&
      (!yearTo || row.year <= Number(yearTo));
    return matchSpecificYear && matchRange;
  });

  // Sort and prepare data
  const chartData = filteredData
    .slice()
    .sort((a, b) => a.year - b.year)
    .map((row) => {
      const counts = ageKeys.map((key) => row[key] || 0);
      return {
        year: row.year,
        min: Math.min(...counts),
        max: Math.max(...counts),
        avg: counts.reduce((a, b) => a + b, 0) / counts.length,
      };
    });

  const totalCounts = ageKeys.map((key, index) => ({
    ageGroup: placeholders[key],
    count: filteredData.reduce((sum, row) => sum + (row[key] || 0), 0),
    color: getColor(index),
  }));

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
        Emigrant Distribution by Age Group
      </h2>

      {/* --- Filters Section --- */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "20px",
          justifyContent: "center",
        }}
      >
        <div>
          <label style={{ fontWeight: "bold" }}>Filter by Year:</label>
          <select
            value={filteredYear}
            onChange={(e) => setFilteredYear(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            <option value="All">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontWeight: "bold" }}>Year Range:</label>
          <input
            type="number"
            placeholder="From"
            value={yearFrom}
            onChange={(e) => setYearFrom(e.target.value)}
            style={{ width: "90px", margin: "0 5px", padding: "5px" }}
          />
          <input
            type="number"
            placeholder="To"
            value={yearTo}
            onChange={(e) => setYearTo(e.target.value)}
            style={{ width: "90px", padding: "5px" }}
          />
        </div>
      </div>

      {/* --- Chart Type Buttons --- */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => setChartType("bar")}
          style={{
            backgroundColor: chartType === "bar" ? "#007bff" : "#ccc",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Histogram Graph
        </button>

        <button
          onClick={() => setChartType("span")}
          style={{
            backgroundColor: chartType === "span" ? "#007bff" : "#ccc",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Density Plot
        </button>
      </div>

      {/* --- Summary --- */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "20px",
          gap: "10px",
        }}
      >
        {totalCounts.map((item, index) => (
          <div
            key={item.ageGroup}
            style={{
              background:
                chartType === "bar" ? item.color : getColor(index),
              color: "white",
              padding: "8px 12px",
              borderRadius: "20px",
              fontSize: "14px",
            }}
          >
            {item.ageGroup}: {item.count}
          </div>
        ))}
      </div>

      {/* --- Chart Section --- */}
      <ResponsiveContainer width="100%" height={450}>
        {chartType === "bar" ? (
          <BarChart data={totalCounts} barCategoryGap="0%">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ageGroup" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count">
              {totalCounts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        ) : (
          // ✅ Span Chart using AreaChart
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="max"
              stroke="#007bff"
              fill="#007bff"
              fillOpacity={0.3}
              name="Maximum"
            />
            <Area
              type="monotone"
              dataKey="min"
              stroke="#ff5252"
              fill="#ff5252"
              fillOpacity={0.3}
              name="Minimum"
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default AgeDashboard;
