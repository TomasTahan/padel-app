// @ts-nocheck

import { ActionButton } from "@/components/ActionButton";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PuntosPage({
  searchParams,
}: {
  searchParams: { resultado: string };
}) {
  const calcular = async (formData: FormData) => {
    "use server";

    const set1 = formData.get("set1") as string;
    const set2 = formData.get("set2") as string;
    const set3 = formData.get("set3") || null;

    const supabase = createClient();

    const { data, error } = await supabase
      .rpc("calcular_puntos", {
        set1,
        set2,
        set3,
      })
      .single();

    if (error) {
      console.log(error);
    } else {
      console.log(data);
      const puntos = data;
      redirect(
        `/puntos?resultado=${puntos.puntos_pareja1}/${puntos.puntos_pareja2}`
      );
    }
  };

  return (
    <div className=" flex flex-col items-center mt-24">
      <p className="font-bold">Calculadora de puntos Liga Las Pircas</p>
      <form action={calcular}>
        <div className="flex gap-8 w-min justify-center items-center mt-12">
          <p className="w-max">Pareja 1</p>
          <div className=" flex gap-2">
            <Input name="set1" className="w-12" />
            <Input name="set2" className="w-12" />
            <Input name="set3" className="w-12" />
          </div>
          <p className="w-max">Pareja 2</p>
        </div>
        <div className="flex gap-2 mt-8">
          <ActionButton>Calcular</ActionButton>
          <Input
            placeholder="Resultado"
            readOnly
            value={searchParams.resultado}
          />
        </div>
      </form>
    </div>
  );
}
