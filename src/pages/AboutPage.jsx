export default function AboutPage() {
  return (
    <section className="min-h-[calc(100vh-8rem)] space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-soft">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Project Overview
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            IoT-Enabled Tile for Controlled Substance Inventory Tracking and
            Access Verification
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Smart Tile Tracker is a frontend dashboard for monitoring sensitive
            inventory, access activity, real-time weight readings, and alert
            events from a connected IoT tile system.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <article className="rounded-xl border border-slate-200 bg-white p-8 shadow-soft">
          <h2 className="text-xl font-bold text-slate-950">Synopsis</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Organizations require strict accountability over controlled and
            high-value inventory items. This project proposes a low-cost,
            sensor-fusion-based smart storage tile that automates tracking at
            the point of storage. It combines multi-point load-cell weight
            sensing, RFID verification, IR motion confirmation, environmental
            sensing, camera evidence, and backend alert systems to prevent
            tampering, verify access, and automate inventory counting.
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-8 shadow-soft">
          <h2 className="text-xl font-bold text-slate-950">
            Project Instructions
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            This dashboard is the frontend interface for the ESP32 device and
            backend Node.js server. The frontend displays registered tiles, item
            details, live weight metrics, calculated item counts, access status,
            and administrative actions for managing each tracked tile.
          </p>
        </article>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-bold text-slate-950">Sensing Layer</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            The tile uses load cells with HX711 amplification, RFID modules, an
            IR proximity sensor, an ESP32-CAM module, and a BME280 temperature
            and humidity sensor to capture item movement and storage context.
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-bold text-slate-950">
            Backend Processing
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Sensor readings are sent from the ESP32 to the Node.js and Express
            backend over HTTP, where transaction sessions, item-count
            calculation, threshold checks, alert generation, and database
            storage are handled centrally.
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-bold text-slate-950">
            Dashboard Purpose
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            The React dashboard provides a clean interface for registering
            tiles, viewing inventory quantities, checking real-time weight
            metrics, reviewing alerts, and managing tracked products.
          </p>
        </article>
      </div>
    </section>
  );
}
