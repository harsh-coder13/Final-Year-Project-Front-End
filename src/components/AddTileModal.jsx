import { useState, useEffect } from "react";

export default function AddTileModal({
  formData,
  onChange,
  onClose,
  onFileChange,
  onSubmit,
  onTare,
}) {
  const [currentWeight, setCurrentWeight] = useState(0);
  const [setupStatus, setSetupStatus] = useState("Not Accepted");
  const [tareFeedback, setTareFeedback] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rfidStatus, setRfidStatus] = useState("waiting");

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && !isProcessing) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isProcessing, onClose]);

  const isFormComplete = Boolean(
    formData.tileCode?.trim() &&
      formData.medicineName?.trim() &&
      formData.singleUnitWeight
  );
  const canStartMonitoring = isFormComplete && rfidStatus === "verified";

  const handleTareClick = () => {
    setCurrentWeight(0);
    setTareFeedback(true);
    setTimeout(() => setTareFeedback(false), 600);
    console.log("Tare button clicked - weight reset to 0.00g");
  };

  const handleStartMonitoring = async (e) => {
    e.preventDefault();

    if (!canStartMonitoring) {
      return;
    }

    setIsProcessing(true);

    // Show success toast
    setShowSuccessToast(true);

    // Update status to Accepted
    setSetupStatus("Accepted");

    // Simulate setup completion and auto-close after 1.5 seconds
    setTimeout(() => {
      onSubmit(e);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-y-auto max-h-[90vh]">
        <form onSubmit={handleStartMonitoring} className="p-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-950">
                  Tile Setup Configuration
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Complete all fields to configure and monitor your medicine
                  dispenser tile.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Tile Code */}
            <div>
              <label
                htmlFor="tile-code"
                className="block text-sm font-semibold text-slate-700"
              >
                Tile Code
              </label>
              <input
                id="tile-code"
                name="tileCode"
                type="text"
                value={formData.tileCode || ""}
                onChange={onChange}
                placeholder="e.g. TILE-001"
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-950 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                required
              />
            </div>

            {/* Tile Title */}
            <div>
              <label
                htmlFor="tile-title"
                className="block text-sm font-semibold text-slate-700"
              >
                Tile Title / Display Name
              </label>
              <input
                id="tile-title"
                name="medicineName"
                type="text"
                value={formData.medicineName || ""}
                onChange={onChange}
                placeholder="e.g. Medicine Box"
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-950 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                required
              />
            </div>

            {/* Short Description (Optional) */}
            <div>
              <label
                htmlFor="tile-description"
                className="block text-sm font-semibold text-slate-700"
              >
                Short Description <span className="text-xs text-slate-500">(Optional)</span>
              </label>
              <textarea
                id="tile-description"
                name="description"
                value={formData.description || ""}
                onChange={onChange}
                placeholder="Add a short note about this tracked item."
                rows={3}
                className="mt-2 w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-950 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Item Image */}
            <div>
                <label
                htmlFor="tile-image"
                className="block text-sm font-semibold text-slate-700"
              >
                Item Image
              </label>
              <input
                id="tile-image"
                name="image"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="mt-2 block w-full rounded-lg border border-slate-300 bg-white text-sm text-slate-600 shadow-sm file:mr-4 file:border-0 file:bg-slate-100 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
              />
              {formData.imageUrl ? (
                <div className="mt-3 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-2">
                  <img
                    src={formData.imageUrl}
                    alt="Selected tile preview"
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Selected image
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      This image will appear on the tile dashboard.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Weight Section */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="mb-4 text-sm font-semibold text-slate-900">
                Weight Configuration
              </h3>
              <div className="space-y-4">
                {/* Current Tile Weight with Tare Button */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">
                      Current Tile Weight
                    </label>
                    <button
                      type="button"
                      onClick={handleTareClick}
                      className={`rounded-lg border border-green-300 bg-white px-4 py-1.5 text-xs font-semibold text-green-700 transition-all ${
                        tareFeedback
                          ? "bg-green-100 ring-2 ring-green-400 scale-105"
                          : "hover:bg-green-50"
                      } focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-1`}
                    >
                      Tare
                    </button>
                  </div>
                  <div className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-center">
                    <p className="text-2xl font-bold text-green-600">{currentWeight.toFixed(2)}g</p>
                    <p className="mt-1 text-xs text-slate-600">
                      (Click Tare to reset to zero)
                    </p>
                  </div>
                </div>

                {/* Single Unit Weight */}
                <div>
                  <label
                    htmlFor="unit-weight"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Single Unit Weight (g)
                  </label>
                  <input
                    id="unit-weight"
                    name="singleUnitWeight"
                    type="number"
                    step="0.01"
                    value={formData.singleUnitWeight || ""}
                    onChange={onChange}
                    placeholder="e.g. 5.50"
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-950 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              i
            </span>
            <p className="font-medium">
              Calibration Required: Please ensure only a single quantity of the
              item is placed on the tile initially to accurately register the
              baseline weight of one unit.
            </p>
          </div>

          {/* Success Toast */}
          {showSuccessToast && (
            <div className="mt-6 flex gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-900 animate-pulse">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
                ✓
              </span>
              <p className="font-medium">
                Setup validated successfully! Preparing to start monitoring...
              </p>
            </div>
          )}

          {/* Verification Status */}
          <div className="mt-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Verification Status
              </h3>
            {rfidStatus === "verified" ? (
                <p className="mt-2 text-sm font-bold text-green-700">
                  Box Verified ✅
                </p>
            ) : (
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-500"
                    aria-hidden="true"
                  />
                  Waiting for verifying RFID... Please place the allocated box
                  on the tile.
                </p>
            )}
            </div>
            <button
              type="button"
              onClick={() => setRfidStatus("verified")}
              disabled={rfidStatus === "verified"}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                rfidStatus === "verified"
                  ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                  : "border-green-300 bg-white text-green-700 hover:bg-green-50"
              }`}
            >
              Simulate RFID Scan
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className={`rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors ${
                isProcessing
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-slate-50"
              } focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canStartMonitoring || isProcessing}
              className={`rounded-lg px-8 py-3 text-base font-semibold text-white shadow-md transition-all ${
                canStartMonitoring && setupStatus === "Accepted"
                  ? "bg-green-700 hover:bg-green-800"
                  : canStartMonitoring
                    ? "bg-green-600 hover:bg-green-700"
                    : "cursor-not-allowed bg-slate-400 opacity-60"
              } ${
                isProcessing ? "cursor-wait" : ""
              } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50`}
            >
              {isProcessing ? "Starting..." : "Start Monitoring"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
