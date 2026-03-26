export default function Loading() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-brand-purple-500/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-purple-500 animate-spin" />
        </div>
        <p className="text-sm text-gray-500 animate-pulse">Cargando...</p>
      </div>
    </div>
  );
}
