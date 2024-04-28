import {
  eliminarPareja,
  generarGrupos,
  inscribirAmericano,
} from "@/actions/actions";
import FaseGrupos from "@/components/torneos/FaseGrupos";
import FasePlayoff from "@/components/torneos/FasePlayoff";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/server";
import { Trash } from "lucide-react";

type Pareja = {
  parejaId: number;
  jugador1: string;
  jugador2: string;
  grupo: number | null;
  puntos: number | null;
  americanoId: string;
};

export default async function InscripcionPage({
  params: { torneoId },
}: {
  params: { torneoId: string };
}) {
  const supabase = createClient();

  const { data } = await supabase
    .from("Americanos")
    .select()
    .eq("americanoId", torneoId)
    .single();

  // console.log(data);

  const { data: dat2 } = await supabase
    .from("AmericanoParejas")
    .select()
    .eq("americanoId", torneoId)
    .order("puntos", { ascending: false });

  // console.log(dat2);

  // const dat2 = [
  //   {
  //     parejaId: 95,
  //     jugador1: "Aguilar",
  //     jugador2: "Barragan",
  //     grupo: 1,
  //     puntos: null,
  //     americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //   },
  //   {
  //     parejaId: 96,
  //     jugador1: "Corrales",
  //     jugador2: "Duarte",
  //     grupo: 1,
  //     puntos: null,
  //     americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //   },
  //   {
  //     parejaId: 97,
  //     jugador1: "Espino",
  //     jugador2: "Fajardo",
  //     grupo: 1,
  //     puntos: null,
  //     americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //   },
  //   {
  //     parejaId: 98,
  //     jugador1: "Gallego",
  //     jugador2: "Herrera",
  //     grupo: 1,
  //     puntos: null,
  //     americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //   },
  //   {
  //     parejaId: 99,
  //     jugador1: "Iglesias",
  //     jugador2: "Jimenez",
  //     grupo: 2,
  //     puntos: null,
  //     americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //   },
  //   {
  //     parejaId: 100,
  //     jugador1: "Lorenzo",
  //     jugador2: "Moya",
  //     grupo: 2,
  //     puntos: null,
  //     americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //   },
  //   {
  //     parejaId: 101,
  //     jugador1: "Del Canto",
  //     jugador2: "Mayr",
  //     grupo: 2,
  //     puntos: null,
  //     americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //   },
  //   {
  //     parejaId: 102,
  //     jugador1: "Tahan",
  //     jugador2: "Rebolledo",
  //     grupo: 2,
  //     puntos: null,
  //     americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //   },
  //   {
  //     parejaId: 103,
  //     jugador1: "Gonzales",
  //     jugador2: "Prado",
  //     grupo: 3,
  //     puntos: null,
  //     americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //   },
  //   {
  //     parejaId: 104,
  //     jugador1: "Cristobal",
  //     jugador2: "Muñoz",
  //     grupo: 3,
  //     puntos: null,
  //     americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //   },
  //   {
  //     parejaId: 105,
  //     jugador1: "Navarro",
  //     jugador2: "Ochoa",
  //     grupo: 3,
  //     puntos: null,
  //     americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //   },
  //   {
  //     parejaId: 106,
  //     jugador1: "Peralta",
  //     jugador2: "Quezada",
  //     grupo: 3,
  //     puntos: null,
  //     americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //   },
  //   {
  //     parejaId: 107,
  //     jugador1: "Ramos",
  //     jugador2: "Solano",
  //     grupo: 4,
  //     puntos: null,
  //     americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //   },
  //   {
  //     parejaId: 108,
  //     jugador1: "Toledo",
  //     jugador2: "Uribe",
  //     grupo: 4,
  //     puntos: null,
  //     americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //   },
  //   {
  //     parejaId: 109,
  //     jugador1: "Varela",
  //     jugador2: "Wagner",
  //     grupo: 4,
  //     puntos: null,
  //     americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //   },
  //   {
  //     parejaId: 110,
  //     jugador1: "Ximenez",
  //     jugador2: "Ybarra",
  //     grupo: 4,
  //     puntos: null,
  //     americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //   },
  // ];

  // const data = {
  //   americanoId: "272ba6d2-e595-4712-9a10-a8712b6e818a",
  //   fecha: null,
  //   categoria: "4",
  //   parejas: 16,
  //   createdAt: "2024-04-25T18:55:30.209508+00:00",
  //   estado: "Grupo",
  // };

  return (
    <div className="container mx-auto p-4">
      {data?.estado === "Inscripcion" && (
        <>
          <h1 className="text-2xl font-bold text-center mb-6">
            Americano {data.categoria}
          </h1>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold">Inscripción</h2>
            <div className="ml-4 py-1 px-3 bg-blue-100 text-blue-800 rounded-full">
              <p className="font-semibold">
                Parejas restantes: {data.parejas - (dat2?.length || 0)}
              </p>
            </div>
          </div>
          <div className=" flex items-center gap-4">
            <form className="" action={inscribirAmericano}>
              <div className="flex gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      className="hidden"
                      value={data.americanoId}
                      name="americanoId"
                      readOnly
                    />
                    <Input
                      name="jugador1"
                      placeholder="Jugador 1"
                      required
                      className="flex-1"
                    />
                    <span className="mx-2">/</span>
                    <Input
                      name="jugador2"
                      placeholder="Jugador 2"
                      required
                      className="flex-1"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={data.parejas == dat2?.length}>
                  Inscribir
                </Button>
              </div>
            </form>
            <form action={generarGrupos}>
              <input
                className="hidden"
                value={data.americanoId}
                name="americanoId"
                readOnly
              />
              <Button type="submit" disabled={data.parejas !== dat2?.length}>
                Generar Grupos
              </Button>
            </form>
          </div>
          <div className=" border rounded-lg h-[1px] w-ful mt-8" />

          <h2 className="text-xl font-bold text-cente mt-8">Inscritos</h2>
          <ol className=" space-y-2">
            {dat2?.map((pareja, index) => (
              <li
                key={index}
                className=" grid grid-cols-2"
                style={{ gridTemplateColumns: "190px 1fr" }}
              >
                <p className="clamp w-fit self-center">
                  {pareja.jugador1} / {pareja.jugador2}
                </p>
                <form action={eliminarPareja} className="flex items-center">
                  <input
                    type="hidden"
                    value={pareja.parejaId}
                    name="parejaId"
                    readOnly
                  />
                  <input
                    type="hidden"
                    value={torneoId}
                    name="americanoId"
                    readOnly
                  />
                  <Button className="" variant="outline">
                    <Trash className="w-5 h-5" />
                  </Button>
                </form>
              </li>
            ))}
          </ol>
        </>
      )}
      {data.estado === "Grupo" && (
        <FaseGrupos data={data} dat2={dat2 as Pareja[]} />
      )}
      {data.estado === "Playoffs" && (
        <FasePlayoff data={data} dat2={dat2 as Pareja[]} />
      )}
      {data.estado === "Finalizado" && (
        <div className="text-center font-semibold text-lg">Finalizado</div>
      )}
    </div>
  );
}
