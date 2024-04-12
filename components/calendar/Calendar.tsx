"use client";

import SelectDay from "./SelectDay";
import { useRouter, useSearchParams } from "next/navigation";
import NuevaReserva from "./NuevaReserva";
import Grilla from "./Grilla";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export default function Calendar({ reservas }: any) {
  const searchParams = useSearchParams();
  const fecha = searchParams.get("fecha");
  const router = useRouter();

  const supabase = createClient();

  useEffect(() => {
    const channels = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Canchas" },
        (payload) => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channels);
    };
  }, [supabase, router]);

  const fechaFormateada = fecha
    ? format(parseISO(fecha), "PPPP", { locale: es })
    : "";

  return (
    <>
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="w-full">
          <div className="flex justify-between items-center p-4">
            <div className="ml-10">
              <p className="font-sans text-slate-500 capitalize font-semibold">
                {fecha}
              </p>
            </div>

            <div className="flex gap-2 justify-center items-center">
              <p className="font-sans text-slate-500 capitalize font-semibold mr-4">
                {fechaFormateada}
              </p>
              <NuevaReserva fecha={fecha} />
              <SelectDay />
            </div>
          </div>
        </div>
      </div>

      <div className=" pl-4">
        <Grilla fecha={fecha} reservas={reservas} />
      </div>
    </>
  );
}
