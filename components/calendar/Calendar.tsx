"use client";

import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";
import Grilla from "./Grilla";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Plus,
  RotateCcw,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "../ui/use-toast";
import { refresh } from "@/actions/actions";
import { Button } from "../ui/button";
import NuevaReserva from "./NuevaReserva";

interface Reserva {
  canchaId: string;
  fecha: string;
  inicio: string;
  fin: string;
  cancha: number;
  cliente: string;
  estado: string;
  clubId: number;
}

export default function Test({ data }: any) {
  const { toast } = useToast();

  const [reservas, setReservas] = useState<Reserva[]>(data);
  const [reservasFiltradas, setReservasFiltradas] = useState<Reserva[]>([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(moment());

  useEffect(() => {
    const fechaGuardada = sessionStorage.getItem("fechaHoy");
    if (fechaGuardada) {
      setFechaSeleccionada(moment(fechaGuardada));
    } else {
      const fechaHoy = moment().format("YYYY-MM-DD");
      sessionStorage.setItem("fechaHoy", fechaHoy);
      setFechaSeleccionada(moment(fechaHoy));
    }
  }, []);

  useEffect(() => {
    const fechaHoy = fechaSeleccionada.format("YYYY-MM-DD");
    sessionStorage.setItem("fechaHoy", fechaHoy);
    const filtradas = reservas.filter(
      (reserva: any) => reserva.fecha === fechaHoy
    );
    setReservasFiltradas(filtradas);
  }, [reservas, fechaSeleccionada]);

  const supabase = createClient();

  useEffect(() => {
    toast({
      title: "Conectando...",
      description: "Estableciendo conexión con la base de datos.",
      duration: 2000,
    });

    console.log("Subscribing to changes");
    const channels = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Canchas" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            console.log("Insert received!");
            const nuevaReserva = payload.new as Reserva;
            setReservas((prevReservas) => {
              return prevReservas.map((reserva) =>
                reserva.canchaId === "temporary-id" ? nuevaReserva : reserva
              );
            });
          } else if (payload.eventType === "UPDATE") {
            console.log("Update received!");
            const reservaActualizada = payload.new as Reserva;
            setReservas((prevReservas) =>
              prevReservas.map((reserva) =>
                reserva.canchaId === reservaActualizada.canchaId
                  ? reservaActualizada
                  : reserva
              )
            );
          } else if (payload.eventType === "DELETE") {
            console.log("Delete received!");
            const reservaEliminada = payload.old as Reserva;
            setReservas((prevReservas) =>
              prevReservas.filter(
                (reserva) => reserva.canchaId !== reservaEliminada.canchaId
              )
            );
          }
          console.log("Change received!");
        }
      )
      .subscribe();

    toast({
      title: "Conectado",
      description: "Conexión establecida con la base de datos.",
      variant: "success",
      duration: 2000,
    });

    return () => {
      supabase.removeChannel(channels);
    };
  }, [supabase]);

  function handlePrevDay() {
    setFechaSeleccionada(fechaSeleccionada.clone().subtract(1, "day"));
  }

  function handleNextDay() {
    setFechaSeleccionada(fechaSeleccionada.clone().add(1, "day"));
  }

  function setHoy() {
    setFechaSeleccionada(moment());
  }

  function handleRevalidate() {
    refresh();
  }

  async function handleAddReserva(nuevaReserva: Reserva) {
    toast({
      //@ts-ignore
      title: (
        <div className="flex justify-between w-full gap-4">
          Reservando...
          <Loader2 size={22} className=" animate-spin" />
        </div>
      ),
      duration: 9000,
    });

    // Eliminar el campo canchaId
    const { canchaId, ...reservaSinId } = nuevaReserva;

    setReservas((prevReservas) => [...prevReservas, nuevaReserva]);

    const { data, error } = await supabase
      .from("Canchas")
      .insert([reservaSinId]);
    if (error) {
      console.error("Error inserting new reservation", error);
      toast({
        title: "Error",
        description: "Hubo un error al reservar. Inténtalo de nuevo.",
        variant: "destructive",
        duration: 2000,
      });
    } else {
      console.log("New reservation inserted", data);
      toast({
        title: "Éxito",
        description: "La reserva se ha realizado con éxito.",
        variant: "success",
        duration: 2000,
      });
    }
  }

  async function handleDeleteReserva(reservaId: string) {
    toast({
      //@ts-ignore
      title: (
        <div className="flex justify-between w-full gap-4">
          Eliminando...
          <Loader2 size={22} className=" animate-spin" />
        </div>
      ),
      duration: 2000,
    });

    const { data, error } = await supabase
      .from("Canchas")
      .delete()
      .eq("canchaId", reservaId);
    if (error) {
      console.error("Error deleting reservation", error);
      toast({
        title: "Error",
        description:
          "Hubo un error al eliminar la reserva. Inténtalo de nuevo.",
        variant: "destructive",
        duration: 2000,
      });
    } else {
      setReservas((prevReservas) =>
        prevReservas.filter((reserva) => reserva.canchaId !== reservaId)
      );
      console.log("Reservation deleted", data);
      toast({
        title: "Éxito",
        description: "La reserva se ha eliminado con éxito.",
        variant: "success",
        duration: 2000,
      });
    }
  }

  async function handleEditReserva(reservaActualizada: Reserva) {
    toast({
      //@ts-ignore
      title: (
        <div className="flex justify-between w-full gap-4">
          Actualizando...
          <Loader2 size={22} className=" animate-spin" />
        </div>
      ),
      duration: 2000,
    });

    const { data, error } = await supabase
      .from("Canchas")
      .update(reservaActualizada)
      .eq("canchaId", reservaActualizada.canchaId);
    if (error) {
      console.error("Error updating reservation", error);
      toast({
        title: "Error",
        description:
          "Hubo un error al actualizar la reserva. Inténtalo de nuevo.",
        variant: "destructive",
        duration: 2000,
      });
    } else {
      setReservas((prevReservas) =>
        prevReservas.map((reserva) =>
          reserva.canchaId === reservaActualizada.canchaId
            ? reservaActualizada
            : reserva
        )
      );
      console.log("Reservation updated", data);
      toast({
        title: "Éxito",
        description: "La reserva se ha actualizado con éxito.",
        variant: "success",
        duration: 2000,
      });
    }
  }

  const fechaFormateada = fechaSeleccionada
    ? moment(fechaSeleccionada).format("dddd, D [de] MMMM [de] YYYY")
    : "";

  return (
    <>
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="w-full">
          <div className="flex justify-between items-center p-4">
            <div className="ml-10">
              <p className="font-sans text-slate-500 capitalize font-semibold">
                {fechaSeleccionada.format("YYYY-MM-DD")}
              </p>
            </div>

            <div className="flex gap-2 justify-center items-center">
              <p className="font-sans text-slate-500 capitalize font-semibold mr-4">
                {fechaFormateada}
              </p>
              <Button
                variant="outline"
                className="mr-2"
                onClick={handleRevalidate}
              >
                <RotateCcw />
              </Button>
              <NuevaReserva
                fecha={fechaSeleccionada.format("YYYY-MM-DD")}
                handleAddReserva={handleAddReserva}
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handlePrevDay}
                  className="px-2"
                >
                  <ChevronLeft size={20} />
                </Button>

                <Button variant="outline" onClick={setHoy}>
                  Hoy
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNextDay}
                  className="px-2"
                >
                  <ChevronRight size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Grilla
        reservas={reservasFiltradas}
        onAddReserva={handleAddReserva}
        onDeleteReserva={handleDeleteReserva}
        onEditReserva={handleEditReserva}
        fecha={fechaSeleccionada.format("YYYY-MM-DD")}
      />
    </>
  );
}
