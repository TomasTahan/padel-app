import { subirResultado } from "@/actions/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ResultadoPartido({ partido, parejas }: any) {
  // @ts-ignore
  const pareja1 = parejas.find((p) => p.parejaId === partido.pareja1);
  // @ts-ignore
  const pareja2 = parejas.find((p) => p.parejaId === partido.pareja2);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Input
            className="text-center w-12 self-center cursor-pointer px-3"
            value={partido.set1 || ""}
            readOnly
          />
        </DialogTrigger>

        <DialogContent className="w-full max-w-md p-5">
          <DialogHeader>
            <DialogTitle>Ingresa el resultado del partido</DialogTitle>
          </DialogHeader>
          <DialogDescription className="p-4 rounded-md flex flex-col items-center gap-3">
            <div>
              <div className="flex justify-between gap-4 mb-3">
                <h4 className="font-semibold">Pareja 1</h4>
                <h4 className="font-semibold">Pareja 2</h4>
              </div>

              <form action={subirResultado}>
                <input
                  className="hidden"
                  value={partido.partidosId}
                  name="partidoId"
                />
                <input
                  className="hidden"
                  value={partido.americanoId}
                  name="americanoId"
                />
                <div className="flex justify-center items-center gap-8  mt-6 w-full">
                  <p>
                    {pareja1.jugador1} / {pareja1.jugador2}
                  </p>
                  <Input className="text-center w-16 self-center" name="set1" />
                  <p>
                    {pareja2.jugador1} / {pareja2.jugador2}
                  </p>
                </div>
                <DialogClose asChild>
                  <Button type="submit" className="mt-8 self-end w-full">
                    Aceptar
                  </Button>
                </DialogClose>
              </form>
            </div>
          </DialogDescription>
          {/* <DialogDescription>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pareja 1: {pareja1.jugador1} / {pareja1.jugador2}
                </label>
                <Input
                  className="mt-1 block w-full"
                  type="text"
                  name="resultadoPareja1"
                  placeholder="Resultado Pareja 1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pareja 2: {pareja2.jugador1} / {pareja2.jugador2}
                </label>
                <Input
                  className="mt-1 block w-full"
                  type="text"
                  name="resultadoPareja2"
                  placeholder="Resultado Pareja 2"
                />
              </div>
            </div>
          </DialogDescription> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
