import PartidosCard from "@/components/torneos/PartidosCard";
import { createClient } from "@/lib/supabase/server";

export default async function TorneoId({ params }: any) {
  const id = params.torneoId;

  const supabase = createClient();

  const { data, error } = await supabase
    .from("vista_partidos_por_categoria")
    .select("*")
    .eq("americanoId", id)
    .or("tipo.is.null,tipo.neq.Playoffs");

  // const { data, error } = await supabase
  // .from("vista_partidos_por_categoria")
  // .select("*")
  // .eq("americanoId", id)  // Filtra por el ID del evento americano
  // .eq("tipo", "Playoffs");

  //   const data = [
  //     {
  //       partido_id: 13,
  //       categoria: "4",
  //       grupo_pareja1: 1,
  //       grupo_pareja2: 1,
  //       americanoId: 1,
  //       jugador1_pareja1: "Carlos Ruiz",
  //       jugador2_pareja1: "Diana Mora",
  //       jugador1_pareja2: "Elena Núñez",
  //       jugador2_pareja2: "Fernando Ponce",
  //       set1: "6/4",
  //       set2: "4/6",
  //       set3: "6/4",
  //     },
  //     {
  //       partido_id: 14,
  //       categoria: "4",
  //       grupo_pareja1: 1,
  //       grupo_pareja2: 1,
  //       americanoId: 1,
  //       jugador1_pareja1: "Carlos Ruiz",
  //       jugador2_pareja1: "Diana Mora",
  //       jugador1_pareja2: "Laura Sanz",
  //       jugador2_pareja2: "Miguel Ángel Reyes",
  //       set1: "6/4",
  //       set2: "4/6",
  //       set3: null,
  //     },
  //     {
  //       partido_id: 15,
  //       categoria: "4",
  //       grupo_pareja1: 1,
  //       grupo_pareja2: 1,
  //       americanoId: 1,
  //       jugador1_pareja1: "Carlos Ruiz",
  //       jugador2_pareja1: "Diana Mora",
  //       jugador1_pareja2: "Gloria Esteban",
  //       jugador2_pareja2: "Héctor Juárez",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //     {
  //       partido_id: 16,
  //       categoria: "4",
  //       grupo_pareja1: 1,
  //       grupo_pareja2: 1,
  //       americanoId: 1,
  //       jugador1_pareja1: "Elena Núñez",
  //       jugador2_pareja1: "Fernando Ponce",
  //       jugador1_pareja2: "Laura Sanz",
  //       jugador2_pareja2: "Miguel Ángel Reyes",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //     {
  //       partido_id: 17,
  //       categoria: "4",
  //       grupo_pareja1: 1,
  //       grupo_pareja2: 1,
  //       americanoId: 1,
  //       jugador1_pareja1: "Elena Núñez",
  //       jugador2_pareja1: "Fernando Ponce",
  //       jugador1_pareja2: "Gloria Esteban",
  //       jugador2_pareja2: "Héctor Juárez",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //     {
  //       partido_id: 18,
  //       categoria: "4",
  //       grupo_pareja1: 1,
  //       grupo_pareja2: 1,
  //       americanoId: 1,
  //       jugador1_pareja1: "Laura Sanz",
  //       jugador2_pareja1: "Miguel Ángel Reyes",
  //       jugador1_pareja2: "Gloria Esteban",
  //       jugador2_pareja2: "Héctor Juárez",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //     {
  //       partido_id: 19,
  //       categoria: "4",
  //       grupo_pareja1: 2,
  //       grupo_pareja2: 2,
  //       americanoId: 1,
  //       jugador1_pareja1: "Irene Campos",
  //       jugador2_pareja1: "Jorge Martín",
  //       jugador1_pareja2: "Patricia Solis",
  //       jugador2_pareja2: "Rafael Bernal",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //     {
  //       partido_id: 20,
  //       categoria: "4",
  //       grupo_pareja1: 2,
  //       grupo_pareja2: 2,
  //       americanoId: 1,
  //       jugador1_pareja1: "Irene Campos",
  //       jugador2_pareja1: "Jorge Martín",
  //       jugador1_pareja2: "Nora Vidal",
  //       jugador2_pareja2: "Oscar Lira",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //     {
  //       partido_id: 21,
  //       categoria: "4",
  //       grupo_pareja1: 2,
  //       grupo_pareja2: 2,
  //       americanoId: 1,
  //       jugador1_pareja1: "Irene Campos",
  //       jugador2_pareja1: "Jorge Martín",
  //       jugador1_pareja2: "Ana Torres",
  //       jugador2_pareja2: "Beto Gómez",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //     {
  //       partido_id: 22,
  //       categoria: "4",
  //       grupo_pareja1: 2,
  //       grupo_pareja2: 2,
  //       americanoId: 1,
  //       jugador1_pareja1: "Patricia Solis",
  //       jugador2_pareja1: "Rafael Bernal",
  //       jugador1_pareja2: "Nora Vidal",
  //       jugador2_pareja2: "Oscar Lira",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //     {
  //       partido_id: 23,
  //       categoria: "4",
  //       grupo_pareja1: 2,
  //       grupo_pareja2: 2,
  //       americanoId: 1,
  //       jugador1_pareja1: "Patricia Solis",
  //       jugador2_pareja1: "Rafael Bernal",
  //       jugador1_pareja2: "Ana Torres",
  //       jugador2_pareja2: "Beto Gómez",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //     {
  //       partido_id: 24,
  //       categoria: "4",
  //       grupo_pareja1: 2,
  //       grupo_pareja2: 2,
  //       americanoId: 1,
  //       jugador1_pareja1: "Nora Vidal",
  //       jugador2_pareja1: "Oscar Lira",
  //       jugador1_pareja2: "Ana Torres",
  //       jugador2_pareja2: "Beto Gómez",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //     {
  //       partido_id: 25,
  //       categoria: "D",
  //       grupo_pareja1: 1,
  //       grupo_pareja2: 1,
  //       americanoId: 1,
  //       jugador1_pareja1: "Elena Núñez",
  //       jugador2_pareja1: "Fernando Ponce",
  //       jugador1_pareja2: "Laura Sanz",
  //       jugador2_pareja2: "Miguel Ángel Reyes",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //     {
  //       partido_id: 26,
  //       categoria: "D",
  //       grupo_pareja1: 1,
  //       grupo_pareja2: 1,
  //       americanoId: 1,
  //       jugador1_pareja1: "Elena Núñez",
  //       jugador2_pareja1: "Fernando Ponce",
  //       jugador1_pareja2: "Irene Campos",
  //       jugador2_pareja2: "Jorge Martín",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //     {
  //       partido_id: 27,
  //       categoria: "D",
  //       grupo_pareja1: 1,
  //       grupo_pareja2: 1,
  //       americanoId: 1,
  //       jugador1_pareja1: "Elena Núñez",
  //       jugador2_pareja1: "Fernando Ponce",
  //       jugador1_pareja2: "Carlos Ruiz",
  //       jugador2_pareja2: "Diana Mora",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //     {
  //       partido_id: 28,
  //       categoria: "D",
  //       grupo_pareja1: 1,
  //       grupo_pareja2: 1,
  //       americanoId: 1,
  //       jugador1_pareja1: "Laura Sanz",
  //       jugador2_pareja1: "Miguel Ángel Reyes",
  //       jugador1_pareja2: "Irene Campos",
  //       jugador2_pareja2: "Jorge Martín",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //     {
  //       partido_id: 29,
  //       categoria: "D",
  //       grupo_pareja1: 1,
  //       grupo_pareja2: 1,
  //       americanoId: 1,
  //       jugador1_pareja1: "Laura Sanz",
  //       jugador2_pareja1: "Miguel Ángel Reyes",
  //       jugador1_pareja2: "Carlos Ruiz",
  //       jugador2_pareja2: "Diana Mora",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //     {
  //       partido_id: 30,
  //       categoria: "D",
  //       grupo_pareja1: 1,
  //       grupo_pareja2: 1,
  //       americanoId: 1,
  //       jugador1_pareja1: "Irene Campos",
  //       jugador2_pareja1: "Jorge Martín",
  //       jugador1_pareja2: "Carlos Ruiz",
  //       jugador2_pareja2: "Diana Mora",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //     {
  //       partido_id: 31,
  //       categoria: "D",
  //       grupo_pareja1: 2,
  //       grupo_pareja2: 2,
  //       americanoId: 1,
  //       jugador1_pareja1: "Ana Torres",
  //       jugador2_pareja1: "Beto Gómez",
  //       jugador1_pareja2: "Patricia Solis",
  //       jugador2_pareja2: "Rafael Bernal",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //     {
  //       partido_id: 32,
  //       categoria: "D",
  //       grupo_pareja1: 2,
  //       grupo_pareja2: 2,
  //       americanoId: 1,
  //       jugador1_pareja1: "Ana Torres",
  //       jugador2_pareja1: "Beto Gómez",
  //       jugador1_pareja2: "Gloria Esteban",
  //       jugador2_pareja2: "Héctor Juárez",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //     {
  //       partido_id: 33,
  //       categoria: "D",
  //       grupo_pareja1: 2,
  //       grupo_pareja2: 2,
  //       americanoId: 1,
  //       jugador1_pareja1: "Ana Torres",
  //       jugador2_pareja1: "Beto Gómez",
  //       jugador1_pareja2: "Nora Vidal",
  //       jugador2_pareja2: "Oscar Lira",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //     {
  //       partido_id: 34,
  //       categoria: "D",
  //       grupo_pareja1: 2,
  //       grupo_pareja2: 2,
  //       americanoId: 1,
  //       jugador1_pareja1: "Patricia Solis",
  //       jugador2_pareja1: "Rafael Bernal",
  //       jugador1_pareja2: "Gloria Esteban",
  //       jugador2_pareja2: "Héctor Juárez",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //     {
  //       partido_id: 35,
  //       categoria: "D",
  //       grupo_pareja1: 2,
  //       grupo_pareja2: 2,
  //       americanoId: 1,
  //       jugador1_pareja1: "Patricia Solis",
  //       jugador2_pareja1: "Rafael Bernal",
  //       jugador1_pareja2: "Nora Vidal",
  //       jugador2_pareja2: "Oscar Lira",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //     {
  //       partido_id: 36,
  //       categoria: "D",
  //       grupo_pareja1: 2,
  //       grupo_pareja2: 2,
  //       americanoId: 1,
  //       jugador1_pareja1: "Gloria Esteban",
  //       jugador2_pareja1: "Héctor Juárez",
  //       jugador1_pareja2: "Nora Vidal",
  //       jugador2_pareja2: "Oscar Lira",
  //       set1: null,
  //       set2: null,
  //       set3: null,
  //     },
  //   ];

  const categorias = ["4"];
  const partidosPorCategoria = categorias.map((categoria) => ({
    categoria,
    grupos: [1, 2, 3, 4].map((grupo) => ({
      grupo,
      // @ts-ignore
      partidos: data.filter(
        (partido) =>
          partido.categoria === categoria && partido.grupo_pareja1 === grupo
      ),
    })),
  }));
  return (
    <div className="max-w-[1250px] mx-auto p-2 md:p-4">
      {partidosPorCategoria.map((categoria, indexCategoria) => (
        <div key={indexCategoria} className="mb-8">
          <h2 className="text-xl font-bold mb-4">
            Categoría: {categoria.categoria}
          </h2>
          <div className="flex flex-wrap justify-between">
            {categoria.grupos.map((grupo, indexGrupo) => (
              <div key={indexGrupo} className="w-full md:w-1/2 p-2">
                <h3 className="text-lg font-semibold mb-3">
                  Grupo {grupo.grupo}
                </h3>
                {grupo.partidos.length > 0 ? (
                  grupo.partidos.map((partido, indexPartido) => (
                    <PartidosCard key={indexPartido} partido={partido} />
                  ))
                ) : (
                  <div className="text-center text-gray-500">
                    No hay partidos para mostrar en este grupo.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
