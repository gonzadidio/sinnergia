import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-[8rem] md:text-[12rem] font-display font-bold text-gradient-animated leading-none">
          404
        </h1>
        <p className="text-xl text-gray-400 mt-4 mb-2">Perdidos en el void</p>
        <p className="text-sm text-gray-600 mb-8">La pagina que buscas no existe o fue movida.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-brand text-white font-medium hover:shadow-lg hover:shadow-brand-purple-500/25 transition-all duration-300"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
