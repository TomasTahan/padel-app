import { ActionButton } from "@/components/ActionButton";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/server";
import ResultadosForm from "./_components/ResultadosForm";
import Tabla from "./_components/Tabla";

export default async function PuntosPage() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("TestLiga")
    .select()
    .order("puntos", { ascending: false });

  if (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data</div>;
  }

  // console.log(data);

  return (
    <div className="flex flex-col items-center mt-24">
      <p className="text-2xl font-bold mb-6">
        Calculadora de puntos Liga Las Pircas
      </p>
      <div className=" mb-12">
        <p>Anotar resultados</p>
        <ResultadosForm data={data} />
      </div>
      <Tabla data={data} />
    </div>
  );
}
