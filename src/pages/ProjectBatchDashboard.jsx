import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function ProjectBatchDashboard() {
  const sampleData = [
    {
      project: "Phoenix ERP",
      batches: [
        {
          batch: "Batch A",
          months: [
            { ym: "2025-01", revenue: 120000, expense: 78000, issues: 34, resolved: 30 },
            { ym: "2025-02", revenue: 128000, expense: 82000, issues: 28, resolved: 25 },
            { ym: "2025-03", revenue: 133000, expense: 86000, issues: 31, resolved: 29 },
            { ym: "2025-04", revenue: 129000, expense: 84000, issues: 26, resolved: 24 },
          ],
        },
      ],
    },
  ];

  const [project, setProject] = useState(sampleData[0].project);
  const [batch, setBatch] = useState(sampleData[0].batches[0].batch);

  const months = sampleData
    .find((p) => p.project === project)
    ?.batches.find((b) => b.batch === batch)?.months;

  const labels = months.map((m) => m.ym);
  const revenue = months.map((m) => m.revenue);
  const expense = months.map((m) => m.expense);
  const issues = months.map((m) => m.issues);
  const resolved = months.map((m) => m.resolved);

  // Chart Data
  const revExpData = {
    labels,
    datasets: [
      { label: "Revenue", data: revenue },
      { label: "Expense", data: expense },
    ],
  };

  const issueData = {
    labels,
    datasets: [
      { label: "Issues", data: issues },
      { label: "Resolved", data: resolved },
    ],
  };

  const resolutionPieData = {
    labels: ["Resolved", "Open"],
    datasets: [
      {
        data: [
          resolved.reduce((a, b) => a + b, 0),
          issues.reduce((a, b) => a + b, 0) - resolved.reduce((a, b) => a + b, 0),
        ],
      },
    ],
  };

  return (
    <div className="p-6 space-y-6 text-white bg-slate-900 min-h-screen">
      <h1 className="text-3xl font-bold">Project / Batch Analytics Dashboard</h1>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap mt-4">
        <select
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="bg-slate-800 border border-slate-700 p-2 rounded-lg"
        >
          {sampleData.map((p) => (
            <option key={p.project}>{p.project}</option>
          ))}
        </select>

        <select
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          className="bg-slate-800 border border-slate-700 p-2 rounded-lg"
        >
          {sampleData
            .find((p) => p.project === project)
            ?.batches.map((b) => (
              <option key={b.batch}>{b.batch}</option>
            ))}
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
          <h3 className="text-sm opacity-70 uppercase">Total Revenue</h3>
          <p className="text-2xl font-bold mt-2">
            ₹{revenue.reduce((a, b) => a + b, 0).toLocaleString()}
          </p>
        </div>

        <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
          <h3 className="text-sm opacity-70 uppercase">Total Expense</h3>
          <p className="text-2xl font-bold mt-2">
            ₹{expense.reduce((a, b) => a + b, 0).toLocaleString()}
          </p>
        </div>

        <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
          <h3 className="text-sm opacity-70 uppercase">Total Issues</h3>
          <p className="text-2xl font-bold mt-2">{issues.reduce((a, b) => a + b, 0)}</p>
        </div>

        <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
          <h3 className="text-sm opacity-70 uppercase">Resolved Issues</h3>
          <p className="text-2xl font-bold mt-2">{resolved.reduce((a, b) => a + b, 0)}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
          <h2 className="mb-4 text-lg opacity-80">Revenue vs Expense</h2>
          <Bar data={revExpData} />
        </div>

        <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
          <h2 className="mb-4 text-lg opacity-80">Issues vs Resolved</h2>
          <Bar data={issueData} />
        </div>

        <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
          <h2 className="mb-4 text-lg opacity-80">Resolution Breakdown</h2>
          <Doughnut data={resolutionPieData} />
        </div>

        <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
          <h2 className="mb-4 text-lg opacity-80">Net Trend (Line)</h2>
          <Line
            data={{
              labels,
              datasets: [
                {
                  label: "Net (Revenue - Expense)",
                  data: revenue.map((r, i) => r - expense[i]),
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}
