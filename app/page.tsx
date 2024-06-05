import Calendar from "@/components/calendar/Calendar";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient();

  const { data: reservas } = await supabase
    .from("Canchas")
    .select()
    .eq("clubId", 15);

  return (
    <>
      <Calendar data={reservas} />
    </>
  );
}
