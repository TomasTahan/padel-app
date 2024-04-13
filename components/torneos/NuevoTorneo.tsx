import { crearAmericano } from "@/actions/actions";
import { Button } from "../ui/button";
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

export default function NuevoTorneo() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Nuevo Torneo</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear Americano</DialogTitle>
          </DialogHeader>
          <DialogDescription className="p-4 rounded-md flex flex-col gap-3">
            <div></div>
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>
            <DialogClose asChild>
              <form action={crearAmericano}>
                <Button type="submit">Crear</Button>
              </form>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
