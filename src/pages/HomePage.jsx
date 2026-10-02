import { useState } from "react";
import AddTileModal from "../components/AddTileModal";
import TileCard from "../components/TileCard";

const mockTiles = [
  {
    id: "backpack-01",
    name: "Travel Backpack",
    description: "Daily commute bag with tracker attached to the front pocket.",
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "keys-02",
    name: "House Keys",
    description: "Primary key ring tracked for quick location updates.",
    imageUrl:
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "laptop-03",
    name: "Work Laptop",
    description: "Office laptop assigned to the engineering workspace.",
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
  },
];

export default function HomePage() {
  const [tiles, setTiles] = useState(mockTiles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    medicineName: "",
    tileCode: "",
    description: "",
    imageFile: null,
    imageUrl: "",
    currentTileWeight: 0,
    singleUnitWeight: "",
  });

  const resetForm = () => {
    setFormData({
      medicineName: "",
      tileCode: "",
      description: "",
      imageFile: null,
      imageUrl: "",
      currentTileWeight: 0,
      singleUnitWeight: "",
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] ?? null;

    setFormData((currentFormData) => ({
      ...currentFormData,
      imageFile: file,
      imageUrl: file ? URL.createObjectURL(file) : "",
    }));
  };

  const handleTare = () => {
    // Tare button handler - resets the current weight to 0
    console.log("Tare button clicked - resetting weight to 0.00g");
    setFormData((currentFormData) => ({
      ...currentFormData,
      currentTileWeight: 0,
    }));
  };

  const handleAddTile = (event) => {
    event.preventDefault();

    if (
      !formData.tileCode ||
      !formData.medicineName ||
      !formData.singleUnitWeight
    ) {
      console.error("Validation failed - missing required fields");
      return;
    }

    const newTile = {
      id: `tile-${Date.now()}`,
      name: formData.medicineName.trim(),
      tileCode: formData.tileCode.trim(),
      description: formData.description.trim(),
      imageUrl:
        formData.imageUrl ||
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
      currentTileWeight: 0,
      totalWeight: 0,
      singleUnitWeight: parseFloat(formData.singleUnitWeight) || 0,
      setupStatus: "Accepted",
    };

    localStorage.setItem(`tile:${newTile.id}`, JSON.stringify(newTile));

    console.log("New tile submitted with setup status Accepted:", {
      ...newTile,
      imageFile: formData.imageFile,
    });

    setTiles((currentTiles) => [newTile, ...currentTiles]);
    handleCloseModal();
  };

  return (
    <section className="min-h-[calc(100vh-8rem)]">
      <div className="mb-6 flex items-center justify-end">
        <button
          type="button"
          onClick={handleOpenModal}
          className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Add Tile
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => (
          <TileCard key={tile.id} tile={tile} />
        ))}
      </div>

      {isModalOpen ? (
        <AddTileModal
          formData={formData}
          onChange={handleFormChange}
          onClose={handleCloseModal}
          onFileChange={handleFileChange}
          onSubmit={handleAddTile}
          onTare={handleTare}
        />
      ) : null}
    </section>
  );
}
