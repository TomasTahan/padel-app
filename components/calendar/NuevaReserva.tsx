import { useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";

const estadosReserva = [
  { estado: "Disponible", color: "#d6f4d4" },
  { estado: "Reservada", color: "#f8c5c5" },
  { estado: "Tour", color: "#bfecfe" },
  { estado: "Clases", color: "#e5e9f0" },
];

const horas = Array.from({ length: 34 }, (_, i) => {
  const horas = Math.floor(i / 2) + 7; // Comienza a las 7 AM
  const minutos = (i % 2) * 30;
  return `${horas < 10 ? "0" : ""}${horas}:${minutos === 0 ? "00" : minutos}`;
});

const canchas = Array.from({ length: 6 }, (_, i) => i + 1);

function sumarHoraYMedia(hora: any) {
  const [horas, minutos] = hora.split(":").map(Number);
  let nuevaHora = horas;
  let nuevosMinutos = minutos + 30;
  if (nuevosMinutos >= 60) {
    nuevaHora += 1;
    nuevosMinutos -= 60;
  }
  nuevaHora += 1;

  return `${nuevaHora < 10 ? "0" : ""}${nuevaHora}:${
    nuevosMinutos < 10 ? "0" : ""
  }${nuevosMinutos}`;
}

export default function NuevaReserva({ fecha, handleAddReserva }: any) {
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [estadoReserva, setEstadoReserva] = useState("");
  const [cliente, setCliente] = useState("");
  const [cancha, setCancha] = useState(null);

  const handleReservarHora = async () => {
    const nuevaReserva = {
      canchaId: "temporary-id",
      fecha,
      cancha,
      estado: estadoReserva,
      inicio: horaInicio,
      fin: horaFin,
      cliente,
      clubId: 15,
    };

    await handleAddReserva(nuevaReserva);
    setHoraInicio("");
    setHoraFin("");
    setEstadoReserva("");
    setCliente("");
    setCancha(null);
  };

  const handleHoraInicioChange = (hora: any) => {
    setHoraInicio(hora);
    setHoraFin(sumarHoraYMedia(hora));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mr-2">
          <Plus size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reservar Hora</DialogTitle>
        </DialogHeader>
        <DialogDescription className="p-4 rounded-md flex flex-col gap-3">
          {/* Selector de Hora Inicio */}
          <div className="flex items-center gap-8">
            <p className="font-sans text-gray-600 w-28">Hora Inicio</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start shadow-sm"
                >
                  <span className="rounded-full py-1 px-2">
                    {horaInicio || "hh:mm"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-36 overflow-auto">
                {horas.map((hora) => (
                  <DropdownMenuItem
                    key={hora}
                    onSelect={() => handleHoraInicioChange(hora)}
                  >
                    {hora}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Selector de Hora Fin */}
          <div className="flex items-center gap-8">
            <p className="font-sans text-gray-600 w-28">Hora Fin</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start shadow-sm"
                >
                  <span className="rounded-full py-1 px-2">
                    {horaFin || "hh:mm"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-36 overflow-auto">
                {horas.map((hora) => (
                  <DropdownMenuItem
                    key={hora}
                    onSelect={() => setHoraFin(hora)}
                  >
                    {hora}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Selector de Estado */}
          <div className="flex items-center gap-8 justify-between">
            <p className="font-sans text-gray-600 w-28">Estado</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <span
                    className="rounded-full py-1 px-2"
                    style={{
                      backgroundColor:
                        estadosReserva.find((e) => e.estado === estadoReserva)
                          ?.color || "transparent",
                    }}
                  >
                    {estadoReserva || "Seleccionar"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[270px]">
                {estadosReserva.map(({ estado, color }) => (
                  <DropdownMenuItem
                    key={estado}
                    onSelect={() => setEstadoReserva(estado)}
                  >
                    <span
                      className="rounded-full py-1 px-2"
                      style={{ backgroundColor: color }}
                    >
                      {estado}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Campo de Cliente */}
          <div className="flex items-center gap-8">
            <p className="font-sans text-gray-600 w-28">Cliente</p>
            <Input
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            />
          </div>

          {/* Selector de Cancha */}
          <div className="flex items-center gap-8">
            <p className="font-sans text-gray-600 w-28">Cancha</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start shadow-sm"
                >
                  <span className="rounded-full py-1 px-2">
                    {cancha || "Seleccionar"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-36 overflow-auto">
                {canchas.map((cancha) => (
                  <DropdownMenuItem
                    key={cancha}
                    //@ts-ignore
                    onSelect={() => setCancha(cancha)}
                  >
                    {cancha}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleReservarHora}>Guardar Cambios</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
