"use client";

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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

const estadosReserva = [
  { estado: "Disponible", color: "#d6f4d4" },
  { estado: "Reservada", color: "#f8c5c5" },
];

export default function Horario({ reserva }: any) {
  const [estadoReserva, setEstadoReserva] = useState(reserva.estado);

  const colorEstado =
    estadosReserva.find((e) => e.estado === estadoReserva)?.color ||
    "transparent";
  return (
    <div className="cursor-pointer w-full h-full">
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex flex-col w-full h-full">
            <div className="flex gap-1">
              <p className="font-bold">{`${reserva.cancha}`}</p>
              <div className="font-sans font-light">{`${reserva.estado} - ${reserva.titulo}`}</div>
            </div>
            <div className="text-xs">{`${reserva.inicio} - ${reserva.fin}`}</div>
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
                    style={{ backgroundColor: colorEstado }}
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
            <Input />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
