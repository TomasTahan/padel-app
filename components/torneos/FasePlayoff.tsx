import { createClient } from "@/lib/supabase/server";
import Semifinales from "./brackets/Semis";
import Cuartos from "./brackets/Cuartos";

type Pareja = {
  parejaId: number;
  jugador1: string;
  jugador2: string;
  grupo: number | null;
  puntos: number | null;
  americanoId: string;
};

type Americano = {
  americanoId: string;
  fecha: Date | null;
  categoria: string;
  parejas: number;
  createdAt: string;
  estado: string;
};

type Partido = {
  partidosId: number;
  pareja1: number;
  pareja2: number;
  set1: string | null;
  set2: string | null;
  set3: string | null;
  americanoId: string;
  tipo: string;
  copa: string;
};

export default async function FasePlayoff({
  data,
  dat2,
}: {
  data: Americano;
  dat2: Pareja[];
}) {
  const supabase = createClient();

  const { data: partidos } = await supabase
    .from("AmericanoPartidos")
    .select()
    .eq("americanoId", data.americanoId)
    .eq("tipo", "Playoff")
    .order("partidosId", { ascending: true });

  const getParejaName = (parejaId: number) => {
    const pareja = dat2.find((p) => p.parejaId === parejaId);
    return pareja ? `${pareja.jugador1}/${pareja.jugador2}` : "";
  };

  const oroCount = partidos?.filter((partido) => partido.copa === "Oro").length;
  const plataCount = partidos?.filter(
    (partido) => partido.copa === "Plata"
  ).length;

  console.log(oroCount, plataCount);

  let semifinalesOro: { pareja1: string; pareja2: string }[] | undefined;
  let semifinalesPlata: { pareja1: string; pareja2: string }[] | undefined;

  if (oroCount === 2) {
    semifinalesOro = partidos
      ?.filter((partido) => partido.copa === "Oro")
      .slice(0, 2)
      .map((partido) => ({
        pareja1: getParejaName(partido.pareja1),
        pareja2: getParejaName(partido.pareja2),
      }));
  } else if (oroCount === 4) {
    semifinalesOro = partidos
      ?.filter((partido) => partido.copa === "Oro")
      .slice(0, 4)
      .map((partido) => ({
        pareja1: getParejaName(partido.pareja1),
        pareja2: getParejaName(partido.pareja2),
      }));
  }

  if (plataCount === 2) {
    semifinalesPlata = partidos
      ?.filter((partido) => partido.copa === "Plata")
      .slice(0, 2)
      .map((partido) => ({
        pareja1: getParejaName(partido.pareja1),
        pareja2: getParejaName(partido.pareja2),
      }));
  } else if (plataCount === 4) {
    semifinalesPlata = partidos
      ?.filter((partido) => partido.copa === "Plata")
      .slice(0, 4)
      .map((partido) => ({
        pareja1: getParejaName(partido.pareja1),
        pareja2: getParejaName(partido.pareja2),
      }));
  }

  console.log(semifinalesOro, semifinalesPlata);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8">
          Fase de Playoffs
        </h2>
        <div className="grid grid-cols-1 gap-8">
          <div className="flex flex-col items-center">
            {semifinalesOro?.length === 2 ? (
              <h3 className="text-xl font-semibold mb-4">Semifinales de Oro</h3>
            ) : (
              <h3 className="text-xl font-semibold mb-4">
                Cuartos de Final Oro
              </h3>
            )}
            {semifinalesOro?.length === 2 && (
              <Semifinales semifinales={semifinalesOro} />
            )}
            {semifinalesOro?.length === 4 && (
              <Cuartos cuartos={semifinalesOro} />
            )}
          </div>
          {semifinalesPlata?.length !== undefined && (
            <div className="flex flex-col items-center">
              {semifinalesPlata?.length === 2 ? (
                <h3 className="text-xl font-semibold mb-4">
                  Semifinales de Plata
                </h3>
              ) : (
                <h3 className="text-xl font-semibold mb-4">
                  Cuartos de Final Plata
                </h3>
              )}
              {semifinalesPlata?.length === 2 && (
                <Semifinales semifinales={semifinalesPlata} />
              )}
              {semifinalesPlata?.length === 4 && (
                <Cuartos cuartos={semifinalesPlata} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
