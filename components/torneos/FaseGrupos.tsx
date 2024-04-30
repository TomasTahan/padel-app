import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/server";
import { RefreshCcw } from "lucide-react";
import {
  generarPartidos,
  generarPayoffs,
  generarPuntos,
  refresh,
} from "@/actions/actions";
import ResultadoPartido from "./ResultadoPartido";
import { ActionButton } from "../ActionButton";

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

export default async function FaseGrupos({
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
    .eq("americanoId", data.americanoId);
  // .order("partidosId", { ascending: false });

  console.log(partidos);

  //   const partidos = [
  //     {
  //       partidosId: 113,
  //       pareja1: 95,
  //       pareja2: 96,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 114,
  //       pareja1: 95,
  //       pareja2: 97,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 115,
  //       pareja1: 95,
  //       pareja2: 98,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 116,
  //       pareja1: 96,
  //       pareja2: 97,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 117,
  //       pareja1: 96,
  //       pareja2: 98,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 118,
  //       pareja1: 97,
  //       pareja2: 98,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 119,
  //       pareja1: 103,
  //       pareja2: 104,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 120,
  //       pareja1: 103,
  //       pareja2: 105,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 121,
  //       pareja1: 103,
  //       pareja2: 106,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 122,
  //       pareja1: 104,
  //       pareja2: 105,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 123,
  //       pareja1: 104,
  //       pareja2: 106,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 124,
  //       pareja1: 105,
  //       pareja2: 106,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 125,
  //       pareja1: 107,
  //       pareja2: 108,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 126,
  //       pareja1: 107,
  //       pareja2: 109,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 127,
  //       pareja1: 107,
  //       pareja2: 110,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 128,
  //       pareja1: 108,
  //       pareja2: 109,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 129,
  //       pareja1: 108,
  //       pareja2: 110,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 130,
  //       pareja1: 109,
  //       pareja2: 110,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 131,
  //       pareja1: 99,
  //       pareja2: 100,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 132,
  //       pareja1: 99,
  //       pareja2: 101,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 133,
  //       pareja1: 99,
  //       pareja2: 102,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 134,
  //       pareja1: 100,
  //       pareja2: 101,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 135,
  //       pareja1: 100,
  //       pareja2: 102,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //     {
  //       partidosId: 136,
  //       pareja1: 101,
  //       pareja2: 102,
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //       americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //     },
  //   ];

  const maxGrupo = Math.max(...dat2.map((pareja) => pareja.grupo ?? 0));
  const grupos = Array.from({ length: maxGrupo }, (_, i) => i + 1);

  return (
    <>
      <div className="px-4 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg">
        <form action={refresh}>
          <button
            type="submit"
            className="w-6 h-6 text-gray-500  fixed top-10 right-1 cursor-pointer md:hidden"
          >
            <RefreshCcw className="w-6 h-6" />
          </button>
        </form>
        <h2 className="text-3xl font-bold text-center">
          Fase de Grupos - Americano {data.categoria}
        </h2>
      </div>
      <Tabs defaultValue="grupo" className="w-full">
        <div className="flex justify-center mt-4">
          <TabsList className="w-full">
            <TabsTrigger value="grupo" className="w-full">
              Grupos
            </TabsTrigger>
            <TabsTrigger value="partidos" className="w-full">
              Partidos
            </TabsTrigger>
          </TabsList>

          <form
            action={generarPuntos}
            className="ml-2 self-center hidden md:block"
          >
            <input
              type="hidden"
              name="americanoId"
              value={data.americanoId}
              readOnly
            />
            <ActionButton size="sm">Generar Puntos</ActionButton>
          </form>
          <form
            action={generarPayoffs}
            className="ml-2 self-center hidden md:block"
          >
            <input
              type="hidden"
              name="americanoId"
              value={data.americanoId}
              readOnly
            />
            <ActionButton size="sm" variant="outline">
              Playoffs
            </ActionButton>
          </form>
        </div>

        <TabsContent value="grupo">
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 py-4">
            {grupos.map((grupo) => (
              <div
                key={grupo}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  Grupo {grupo}
                </h3>
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 font-semibold">Jugador 1</th>
                      <th className="px-4 py-2 font-semibold">Jugador 2</th>
                      <th className="px-4 py-2 font-semibold text-center">
                        Puntos
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {dat2
                      .filter((pareja) => pareja.grupo === grupo)
                      .map((pareja, index) => (
                        <tr
                          key={pareja.parejaId}
                          className={`${index % 2 ? "bg-gray-50" : "bg-white"}`}
                        >
                          <td className="px-4 py-2 font-medium text-gray-900">
                            {pareja.jugador1}
                          </td>
                          <td className="px-4 py-2 font-medium text-gray-900">
                            {pareja.jugador2}
                          </td>
                          <td className="px-4 py-2 text-center font-medium">
                            {pareja.puntos ?? "0"}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="partidos">
          {partidos && partidos.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 py-4">
              {grupos.map((grupo) => (
                <div
                  key={`partidos-grupo-${grupo}`}
                  className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-700">
                    Partidos del Grupo {grupo}
                  </h3>
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 font-semibold">Pareja 1</th>
                        <th className="px-4 py-2 font-semibold text-center">
                          Sets
                        </th>
                        <th className="px-4 py-2 font-semibold text-end">
                          Pareja 2
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {partidos
                        .filter((partido) => {
                          const pareja1Grupo = dat2.find(
                            (p) => p.parejaId === partido.pareja1
                          )?.grupo;
                          const pareja2Grupo = dat2.find(
                            (p) => p.parejaId === partido.pareja2
                          )?.grupo;
                          return (
                            pareja1Grupo === grupo && pareja2Grupo === grupo
                          );
                        })
                        .map((partido, index) => (
                          <tr
                            key={partido.partidosId}
                            className={`${
                              index % 2 ? "bg-gray-50" : "bg-white"
                            }`}
                          >
                            <td className="px-4 py-2 font-medium text-gray-900">
                              {
                                dat2.find((p) => p.parejaId === partido.pareja1)
                                  ?.jugador1
                              }
                              {" / "}
                              {
                                dat2.find((p) => p.parejaId === partido.pareja1)
                                  ?.jugador2
                              }
                            </td>
                            <td className="py-2 flex justify-center">
                              <ResultadoPartido
                                partido={partido}
                                parejas={dat2}
                              />
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 text-end">
                              {
                                dat2.find((p) => p.parejaId === partido.pareja2)
                                  ?.jugador1
                              }
                              {" / "}
                              {
                                dat2.find((p) => p.parejaId === partido.pareja2)
                                  ?.jugador2
                              }
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-gray-300 rounded-lg mt-4">
              <p className="text-lg text-gray-700 font-semibold mb-4">
                No hay partidos programados aún en este Americano.
              </p>
              <form action={generarPartidos}>
                <input
                  type="hidden"
                  name="americanoId"
                  value={data.americanoId}
                  readOnly
                />
                <ActionButton>Programar Partidos</ActionButton>
              </form>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
