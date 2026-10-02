import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const tileDetails = {
  "backpack-01": {
    name: "Travel Backpack",
    description: "Daily commute bag with tracker attached to the front pocket.",
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    singleUnitWeight: 50,
    totalWeight: 500,
  },
  "keys-02": {
    name: "House Keys",
    description: "Primary key ring tracked for quick location updates.",
    imageUrl:
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=900&q=80",
    singleUnitWeight: 35,
    totalWeight: 210,
  },
  "laptop-03": {
    name: "Work Laptop",
    description: "Office laptop assigned to the engineering workspace.",
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
    singleUnitWeight: 1200,
    totalWeight: 1200,
  },
};

const fallbackTile = {
  name: "Tracked Tile",
  description: "Live monitoring dashboard for this registered IoT tile.",
  imageUrl:
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
  singleUnitWeight: 50,
  totalWeight: 500,
};

const transactionLogs = [
  {
    time: "10:42",
    person: "Aditya",
    action: "Removed",
    quantity: "2",
    status: "🟢 Normal",
    temperature: "24°C",
  },
  {
    time: "10:15",
    person: "Rahul",
    action: "Added",
    quantity: "5",
    status: "🟢 Normal",
    temperature: "22.5°C",
  },
  {
    time: "09:51",
    person: "Unknown",
    action: "Access",
    quantity: "—",
    status: "🔴 Anomaly",
    temperature: "25°C",
  },
];

const transactionFilters = ["All", "Normal", "Anomaly", "Unauthorized"];

function MetricCard({ label, value, helper, valueClassName = "text-slate-950" }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </p>
      <p
        className={`mt-2 text-xl font-bold leading-tight tracking-tight sm:text-2xl ${valueClassName}`}
      >
        {value}
      </p>
      {helper ? <p className="mt-1 text-xs leading-5 text-slate-500">{helper}</p> : null}
    </div>
  );
}

function LogDetailsModal({ log, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="log-details-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Transaction record
            </p>
            <h2
              id="log-details-title"
              className="mt-1 text-2xl font-bold tracking-tight text-slate-950"
            >
              Log Details
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close log details"
            className="rounded-lg p-2 text-xl leading-none text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            &times;
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            ["Time", log.time],
            ["Person", log.person],
            ["Action", log.action],
            ["Quantity", log.quantity],
            ["Status", log.status],
            ["Temperature", log.temperature],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {label}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-slate-700">
            Photograph / Evidence
          </p>
          <div className="mt-2 flex h-40 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-100 text-center">
            <div>
              <div className="text-4xl" aria-hidden="true">
                📷
              </div>
              <p className="mt-2 text-sm font-medium text-slate-500">
                Camera capture placeholder
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Evidence image unavailable in mock data
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ManagePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  let savedTile = null;

  try {
    const savedTileData = localStorage.getItem(`tile:${id}`);
    savedTile = savedTileData ? JSON.parse(savedTileData) : null;
  } catch {
    savedTile = null;
  }

  const tile = savedTile ?? tileDetails[id] ?? fallbackTile;
  const currentItemCount = Math.round(tile.totalWeight / tile.singleUnitWeight);
  const tileCode = tile.tileCode ?? id ?? "unknown-tile";
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedLog, setSelectedLog] = useState(null);
  const visibleTransactions = transactionLogs.filter(
    (transaction) =>
      activeFilter === "All" || transaction.status.includes(activeFilter)
  );

  const handleDeleteTile = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this tile?"
    );

    if (confirmed) {
      navigate("/");
    }
  };

  return (
    <section className="min-h-[calc(100vh-8rem)] space-y-8">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Monitoring &amp; Logs
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            {tile.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            {tile.description}
          </p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Live monitoring active
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(240px,320px)_minmax(0,1fr)]">
        <div className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-soft">
          <div className="aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
            <img
              src={tile.imageUrl}
              alt={`${tile.name} tile image`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="Tile Code"
            value={tileCode}
            helper="Registered device identifier"
          />
          <MetricCard
            label="Tile Name"
            value={tile.name}
            helper="Assigned tracking item"
          />
          <MetricCard
            label="Single Unit Weight"
            value={`${tile.singleUnitWeight}g`}
            helper="Registered baseline weight per unit"
          />
          <MetricCard
            label="Current Total Quantities"
            value={`${currentItemCount} units`}
            helper="Estimated from current weight"
          />
          <MetricCard
            label="Current Total Weight"
            value={`${tile.totalWeight}g`}
            helper="Latest sensor reading"
          />
          <MetricCard
            label="Monitoring Status"
            value="Normal"
            helper="No active alerts"
            valueClassName="text-emerald-600"
          />
          <MetricCard
            label="Temperature / Humidity"
            value="23.4°C / 48%"
            helper="Latest environment reading"
          />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-soft">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">
            Transaction Logs
          </h2>
          <div
            className="mt-4 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Transaction log filters"
          >
            {transactionFilters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                    isActive
                      ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-h-96 overflow-x-auto overflow-y-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="sticky top-0 bg-slate-50">
              <tr>
                {[
                  "Time",
                  "Person",
                  "Action",
                  "Quantity",
                  "Status",
                  "Temperature",
                ].map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="whitespace-nowrap px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 sm:px-6"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {visibleTransactions.length > 0 ? (
                visibleTransactions.map((transaction) => (
                  <tr
                    key={`${transaction.time}-${transaction.person}`}
                    className="cursor-pointer transition-colors hover:bg-emerald-50/50 focus-within:bg-emerald-50/50"
                    tabIndex="0"
                    onClick={() => setSelectedLog(transaction)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedLog(transaction);
                      }
                    }}
                  >
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-700 sm:px-6">
                      {transaction.time}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700 sm:px-6">
                      {transaction.person}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700 sm:px-6">
                      {transaction.action}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700 sm:px-6">
                      {transaction.quantity}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-700 sm:px-6">
                      {transaction.status}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700 sm:px-6">
                      {transaction.temperature}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-10 text-center text-sm text-slate-500 sm:px-6"
                  >
                    No transactions found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end border-t border-slate-200 pt-2">
        <button
          type="button"
          onClick={handleDeleteTile}
          className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete Tile
        </button>
      </div>

      {selectedLog ? (
        <LogDetailsModal
          log={selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      ) : null}
    </section>
  );
}
