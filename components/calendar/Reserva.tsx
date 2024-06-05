import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";

const estadosReserva = [
  { estado: "Disponible", color: "#d6f4d4" },
  { estado: "Reservada", color: "#f8c5c5" },
  { estado: "Tour", color: "#bfecfe" },
  { estado: "Clases", color: "#e5e9f0" },
];

export default function Reserva({
  reserva,
  onAddReserva,
  onDeleteReserva,
  onEditReserva,
  fecha,
}: any) {
  const [estadoReserva, setEstadoReserva] = useState(reserva.estado);
  const [clienteReserva, setClienteReserva] = useState(reserva.cliente);
  const [isLoading, setIsLoading] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    setEstadoReserva(reserva.estado);
  }, [reserva.estado]);

  useEffect(() => {
    setClienteReserva(reserva.cliente);
  }, [reserva.cliente]);

  const handleChange = (e: any) => {
    setClienteReserva(e.target.value);
  };

  const handleReservar = async () => {
    setIsLoading(true);
    const nuevaReserva = {
      ...reserva,
      canchaId: "temporary-id",
      estado: estadoReserva,
      cliente: clienteReserva,
      clubId: 15,
      fecha: fecha,
    };

    onAddReserva(nuevaReserva);
    setIsLoading(false);
    setPopoverOpen(false);
  };

  const handleEliminar = async () => {
    onDeleteReserva(reserva.canchaId);
    setPopoverOpen(false);
  };

  const handleEditar = async () => {
    setIsLoading(true);
    const reservaActualizada = {
      ...reserva,
      estado: estadoReserva,
      cliente: clienteReserva,
    };

    onEditReserva(reservaActualizada);
    setIsLoading(false);
    setPopoverOpen(false);
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <div
          className="cursor-pointer w-full h-full"
          onClick={() => setPopoverOpen(true)}
        >
          <div className="flex flex-col w-full h-full">
            <div className="flex gap-1">
              <p className="font-bold">{`${reserva.cancha}`}</p>
              <div className="font-sans font-light">
                {`${reserva.estado}${
                  reserva.cliente !== "Disponible"
                    ? ` - ${reserva.cliente}`
                    : ""
                }`}
              </div>
            </div>
            <div className="text-xs">{`${reserva.inicio} - ${reserva.fin}`}</div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-4 bg-white shadow-lg rounded-md flex flex-col gap-3">
        <div className="flex items-center gap-8">
          <p className=" font-sans text-gray-600">Estado</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[270px] justify-start">
                <span
                  className="rounded-full py-1 px-2"
                  style={{
                    backgroundColor:
                      estadosReserva.find((e) => e.estado === estadoReserva)
                        ?.color || "transparent",
                  }}
                >
                  {estadoReserva}
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
          <p className=" font-sans text-gray-600">Cliente</p>
          {reserva.cliente !== "Disponible" ? (
            <Input value={clienteReserva} onChange={handleChange} />
          ) : (
            <Input onChange={handleChange} />
          )}
        </div>

        <div className=" flex flex-row-reverse justify-between ">
          {reserva.cliente !== "Disponible" ? (
            <>
              <Button
                variant="outline"
                onClick={handleEditar}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
                ) : (
                  "Aceptar"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleEliminar}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
                ) : (
                  "Eliminar"
                )}
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              onClick={handleReservar}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
              ) : (
                "Aceptar"
              )}
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
