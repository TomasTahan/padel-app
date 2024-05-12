import { Button } from "@/components/ui/button";
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
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const estadosReserva = [
  { estado: "Disponible", color: "#d6f4d4" },
  { estado: "Reservada", color: "#f8c5c5" },
  { estado: "Tour", color: "#bfecfe" },
  { estado: "Clases", color: "#e5e9f0" },
];

export default function Reserva({ reserva, fecha }: any) {
  const [estadoReserva, setEstadoReserva] = useState(reserva.estado);
  const [clienteReserva, setClienteReserva] = useState(reserva.cliente);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEstadoReserva(reserva.estado);
  }, [reserva.estado]);

  useEffect(() => {
    setClienteReserva(reserva.cliente);
  }, [reserva.cliente]);

  const handleChange = (e: any) => {
    setClienteReserva(e.target.value);
  };

  const handleReservar = async (reserva: any) => {
    setIsLoading(true);
    try {
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
            cancha: reserva.cancha,
            estado: estadoReserva,
            inicio: reserva.inicio,
            fin: reserva.fin,
            cliente: clienteReserva,
            clubId: 15,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Failed to make reservation:", error);
    } finally {
      setIsLoading(false); // Finalizar carga
    }
  };

  const handleEliminar = async (reserva: any) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://ttxvolraillgucvjjsen.supabase.co/rest/v1/Canchas?canchaId=eq.${reserva.canchaId}`,
        {
          method: "DELETE",
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0eHZvbHJhaWxsZ3Vjdmpqc2VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0NjUzNTQsImV4cCI6MjAyNzA0MTM1NH0.fq2q6d5b6WGZ8jbQfAckJIjdACMg1gWsiff1sTHMUyk",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0eHZvbHJhaWxsZ3Vjdmpqc2VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0NjUzNTQsImV4cCI6MjAyNzA0MTM1NH0.fq2q6d5b6WGZ8jbQfAckJIjdACMg1gWsiff1sTHMUyk",
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
        }
      );

      if (res.ok) {
        // La reserva fue eliminada exitosamente
        console.log("Reserva eliminada exitosamente");
        // Aquí podrías, por ejemplo, cerrar el popover o actualizar el estado para reflejar el cambio
      } else {
        // Hubo un error al eliminar la reserva
        console.error("Error al eliminar la reserva");
      }
    } catch (error) {
      console.error("Failed to make reservation:", error);
    } finally {
      setIsLoading(false); // Finalizar carga
    }
  };

  const handleEditar = async (reserva: any) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://ttxvolraillgucvjjsen.supabase.co/rest/v1/Canchas?canchaId=eq.${reserva.canchaId}`,
        {
          method: "PATCH",
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
            cancha: reserva.cancha,
            estado: estadoReserva,
            inicio: reserva.inicio,
            fin: reserva.fin,
            cliente: clienteReserva,
            clubId: 15,
          }),
        }
      );

      if (res.ok) {
        // La reserva fue eliminada exitosamente
        console.log("Reserva eliminada exitosamente");
        // Aquí podrías, por ejemplo, cerrar el popover o actualizar el estado para reflejar el cambio
      } else {
        // Hubo un error al eliminar la reserva
        console.error("Error al eliminar la reserva");
      }
    } catch (error) {
      console.error("Failed to make reservation:", error);
    } finally {
      setIsLoading(false); // Finalizar carga
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer w-full h-full">
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
                onClick={() => handleEditar(reserva)}
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
                onClick={() => handleEliminar(reserva)}
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
              onClick={() => handleReservar(reserva)}
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
