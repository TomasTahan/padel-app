import Calendar from "@/components/calendar/Calendar";

export default async function Home() {
  // const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // console.log(user);

  // // if (!user) {
  // //   return redirect("/login");
  // //

  // const { data: reservas } = await supabase.from("Canchas").select();

  // console.log(reservas);

  // const day = new Date();
  // const today = `${String(day.getDate()).padStart(2, "0")}/${String(
  //   day.getMonth() + 1
  // ).padStart(2, "0")}/${day.getFullYear()}`;

  // const reservas = [
  //   {
  //     canchaId: "5e139289-aaca-4421-afbc-4f8fc9756aa2",
  //     fecha: "2024-04-09",
  //     inicio: "18:30",
  //     fin: "20:30",
  //     cancha: 2,
  //     cliente: "Tomy",
  //     estado: "Reservada",
  //   },
  //   {
  //     canchaId: "8e01c076-d557-48c1-a321-1f2f2c3794f3",
  //     fecha: "2024-04-09",
  //     inicio: "09:00",
  //     fin: "10:00",
  //     cancha: 5,
  //     cliente: "Clases",
  //     estado: "Reservada",
  //   },
  //   {
  //     canchaId: "8e01c076-d557-48c1-a321-1f2f2c3794f3",
  //     fecha: "2024-04-09",
  //     inicio: "10:00",
  //     fin: "11:00",
  //     cancha: 5,
  //     cliente: "Clases",
  //     estado: "Reservada",
  //   },
  // ]
  //  ].filter((reserva) => reserva.fecha === today);

  const res = await fetch(
    "https://ttxvolraillgucvjjsen.supabase.co/rest/v1/Canchas?clubId=eq.15&select=*",
    {
      method: "GET",
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0eHZvbHJhaWxsZ3Vjdmpqc2VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0NjUzNTQsImV4cCI6MjAyNzA0MTM1NH0.fq2q6d5b6WGZ8jbQfAckJIjdACMg1gWsiff1sTHMUyk", // Clave de API
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0eHZvbHJhaWxsZ3Vjdmpqc2VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0NjUzNTQsImV4cCI6MjAyNzA0MTM1NH0.fq2q6d5b6WGZ8jbQfAckJIjdACMg1gWsiff1sTHMUyk",
      },
      next: { tags: ["Reservas"], revalidate: 10 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const reservas = await res.json();

  console.log(reservas);
  console.log("1");

  return (
    <>
      <Calendar reservas={reservas} />
      {}
    </>
  );
}
