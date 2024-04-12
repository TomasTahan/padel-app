import { Plus } from "lucide-react";
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

export default function NuevaReserva({ fecha }: any) {
  // Estados para manejar las selecciones del usuario
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [estadoReserva, setEstadoReserva] = useState("");
  const [cliente, setCliente] = useState("");
  const [cancha, setCancha] = useState<number | null>(null);

  // Aquí deberías reemplazar estos arrays con tus datos dinámicos si es necesario
  const horas = Array.from({ length: 34 }, (_, i) => {
    const horas = Math.floor(i / 2) + 7; // Comienza en 7
    const minutos = (i % 2) * 30;
    return `${horas < 10 ? "0" : ""}${horas}:${minutos === 0 ? "00" : minutos}`;
  });

  const canchas = Array.from({ length: 6 }, (_, i) => i + 1);

  const handleReservarHora = async () => {
    const res = await fetch(
      "https://ttxvolraillgucvjjsen.supabase.co/rest/v1/Canchas",
      {
        method: "POST",
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0eHZvbHJhaWxsZ3Vjdmpqc2VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0NjUzNTQsImV4cCI6MjAyNzA0MTM1NH0.fq2q6d5b6WGZ8jbQfAckJIjdACMg1gWsiff1sTHMUyk",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0eHZvbHJhaWxsZ3Vjdmpqc2VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0NjUzNTQsImV4cCI6MjAyNzA0MTM1NH0.fq2q6d5b6WGZ8jbQfAckJIjdACMg1gWsiff1sTHMUyk",
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          fecha: fecha,
          cancha: cancha,
          estado: estadoReserva,
          inicio: horaInicio,
          fin: horaFin,
          cliente: cliente,
        }),
      }
    );

    if (res.ok) {
      setHoraInicio("");
      setHoraFin("");
      setEstadoReserva("");
      setCliente("");
      setCancha(null);
    } else {
      console.error("Error al realizar la reserva");
    }
  };

  const estadosReserva = [
    { estado: "Disponible", color: "#d6f4d4" },
    { estado: "Reservada", color: "#f8c5c5" },
    { estado: "Tour", color: "#bfecfe" },
    { estado: "Clases", color: "#e5e9f0" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mr-4">
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
              <DropdownMenuContent className=" max-h-36 overflow-auto">
                {horas.map((hora) => (
                  <DropdownMenuItem
                    key={hora}
                    onSelect={() => setHoraInicio(hora)}
                  >
                    {hora}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-8">
            <p className=" font-sans text-gray-600 w-28">Hora Fin</p>
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
              <DropdownMenuContent className=" max-h-36 overflow-auto">
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
          <div className="flex items-center gap-8 justify-between">
            <p className=" font-sans text-gray-600 w-28">Estado</p>
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
          <div className="flex items-center gap-8">
            <p className="font-sans text-gray-600 w-28">Cliente</p>
            <Input
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            />
          </div>
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
              <DropdownMenuContent className=" max-h-36 overflow-auto">
                {canchas.map((cancha) => (
                  <DropdownMenuItem
                    key={cancha}
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
