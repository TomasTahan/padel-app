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
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function PartidosCard({ partido }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          key={partido.partidoId}
          className="bg-white shadow rounded-lg p-4 mb-4 cursor-pointer"
        >
          <div className="flex justify-between gap-4 mb-3">
            <div>
              <h4 className="font-semibold">Pareja 1</h4>
              <div>{partido.jugador1_pareja1}</div>
              <div>{partido.jugador2_pareja1}</div>
            </div>
            {partido.set3 ? (
              <div className="flex gap-3 items-center mt-6 max-w-56">
                <Input
                  className="text-center"
                  value={partido.set1 || ""}
                  readOnly
                />
                <p className="self-center">-</p>
                <Input
                  className="text-center"
                  value={partido.set2 || ""}
                  readOnly
                />

                <p className="self-center">-</p>
                <Input
                  className="text-center"
                  value={partido.set3 || ""}
                  readOnly
                />
              </div>
            ) : (
              <div className="flex gap-3 items-center mt-6 max-w-36">
                <Input
                  className="text-center"
                  value={partido.set1 || ""}
                  readOnly
                />
                <p className="self-center">-</p>
                <Input
                  className="text-center"
                  value={partido.set2 || ""}
                  readOnly
                />
              </div>
            )}

            <div>
              <h4 className="font-semibold text-end">Pareja 2</h4>
              <div>{partido.jugador1_pareja2}</div>
              <div>{partido.jugador2_pareja2}</div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="hidden sm:max-w-[425px] md:flex md:flex-col">
        <DialogHeader>
          <DialogTitle className="text-center">
            Ingresa el resultado
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="p-4 rounded-md flex flex-col items-center gap-3">
          <div>
            <div className="flex justify-between gap-4 mb-3">
              <h4 className="font-semibold">Pareja 1</h4>
              <h4 className="font-semibold">Pareja 2</h4>
            </div>

            <form action={subirResultado}>
              <div className="flex gap-3  mt-6 max-w-64">
                <input
                  className="hidden"
                  value={partido.partido_id}
                  name="partidoId"
                />
                <Input className="text-center" name="set1" />
                <p className="self-center">-</p>
                <Input className="text-center" name="set2" />
                <p className="self-center">-</p>
                <Input className="text-center" name="set3" />
              </div>
              <DialogClose asChild>
                <Button type="submit" className="mt-8 self-end w-full">
                  Aceptar
                </Button>
              </DialogClose>
            </form>
          </div>
        </DialogDescription>
        {/* <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <form action="">
              <Button type="submit">Crear</Button>
            </form>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
