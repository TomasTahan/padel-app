import NuevoTorneo from "@/components/torneos/NuevoTorneo";
import { createClient } from "@/lib/supabase/server";
import { QrCode } from "lucide-react";
import Link from "next/link";

export default async function TorneosPage({
  searchParams,
}: {
  searchParams: { tipo: string; num: number; cat: string };
}) {
  const supabase = createClient();

  const { data: torneos } = await supabase.from("Americanos").select("*");

  console.log(torneos);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-12">
        <div className="text-3xl font-bold">Torneos</div>
        <NuevoTorneo
          tipo={searchParams.tipo}
          num={searchParams.num}
          cat={searchParams.cat}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {torneos
          ?.sort((a, b) => {
            if (a.finalizado && !b.finalizado) return 1;
            if (!a.finalizado && b.finalizado) return -1;
            return 0;
          })
          .map((torneo) => (
            <TorneoCard key={torneo.americanoId} torneo={torneo} />
          ))}
      </div>
    </div>
  );
}

interface Torneo {
  americanoId: string;
  fecha: string;
  categoria: string;
  parejas: number;
  estado: string; // nueva propiedad
}

interface TorneoCardProps {
  torneo: Torneo;
}

const TorneoCard: React.FC<TorneoCardProps> = ({ torneo }) => {
  return (
    <div className="bg-white p-4 rounded border shadow-md relative">
      <h2 className="text-lg font-bold">Americano {torneo.categoria}</h2>
      <p>{torneo.fecha ? `${torneo.fecha}` : "Sin fecha"}</p>
      <p className="mb-4">Parejas: {torneo.parejas}</p>
      <span className="finalizado-badge">{torneo.estado}</span>
      <div className="flex justify-between">
        <Link
          className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded `}
          href={`/torneos/${torneo.americanoId}`}
        >
          {torneo.estado ? "Ver" : "Editar"}
        </Link>
        <div className="self-end">
          <QrCode size={24} />
        </div>
      </div>
    </div>
  );
};

// const torneos: Torneo[] = [
//   {
//     id: 1,
//     nombre: "Americano 14 Abril",
//     fechaInicio: "2023-06-01",
//     fechaFin: "2023-06-30",
//     premios: "",
//     finalizado: true,
//   },
//   {
//     id: 2,
//     nombre: "Torneo de otoño",
//     fechaInicio: "2023-09-01",
//     fechaFin: "2023-09-30",
//     premios: "2000 €",
//     finalizado: true,
//   },
//   {
//     id: 3,
//     nombre: "Torneo de invierno",
//     fechaInicio: "2023-12-01",
//     fechaFin: "2023-12-31",
//     premios: "3000 €",
//     finalizado: true,
//   },
//   {
//     id: 4,
//     nombre: "Torneo de primavera",
//     fechaInicio: "2024-03-01",
//     fechaFin: "2024-03-31",
//     premios: "4000 €",
//     finalizado: false,
//   },
//   {
//     id: 5,
//     nombre: "Torneo de verano 2",
//     fechaInicio: "2024-06-01",
//     fechaFin: "2024-06-30",
//     premios: "5000 €",
//     finalizado: true,
//   },
//   {
//     id: 6,
//     nombre: "Torneo de otoño 2",
//     fechaInicio: "2024-09-01",
//     fechaFin: "2024-09-30",
//     premios: "6000 €",
//     finalizado: true,
//   },
//   // ...
// ];
