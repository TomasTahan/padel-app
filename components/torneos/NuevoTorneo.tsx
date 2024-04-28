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
import SelectorCompentecia from "./SelectorCompentecia";

export default function NuevoTorneo({
  tipo,
  num,
  cat,
}: {
  tipo: string;
  num: number;
  cat: string;
}) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Nuevo Torneo</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Crear Competencia</DialogTitle>
          </DialogHeader>
          <DialogDescription className="p-4 rounded-md flex flex-col gap-3">
            <SelectorCompentecia />
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>

            <form action={crearAmericano}>
              <input type="hidden" name="tipo" value={tipo} />
              <input type="hidden" name="num" value={num} />
              <input type="hidden" name="cat" value={cat} />
              <Button type="submit" disabled={!tipo && !num && !cat}>
                Crear
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
