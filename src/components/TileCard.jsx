import { useNavigate } from "react-router-dom";

export default function TileCard({ tile }) {
  const navigate = useNavigate();

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={tile.imageUrl}
          alt={tile.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-lg font-bold text-slate-950">{tile.name}</h2>
        <p className="mt-2 line-clamp-1 text-sm text-slate-500">
          {tile.description}
        </p>

        <button
          type="button"
          onClick={() => navigate(`/manage/${tile.id}`)}
          className="mt-6 inline-flex items-center justify-center rounded-lg border border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Manage
        </button>
      </div>
    </article>
  );
}
