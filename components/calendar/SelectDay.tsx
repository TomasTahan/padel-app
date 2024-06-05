// "use client";

// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "../ui/button";
// import { addDays, subDays, format, parseISO, isValid } from "date-fns";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function SelectDay() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [fecha, setFecha] = useState(new Date());

//   useEffect(() => {
//     const fechaParam = searchParams.get("fecha");
//     if (fechaParam) {
//       const nuevaFecha = parseISO(fechaParam);
//       if (isValid(nuevaFecha)) {
//         setFecha(nuevaFecha);
//       }
//     } else {
//       const hoy = format(new Date(), "yyyy-MM-dd");
//       router.replace(`/?fecha=${hoy}`);
//     }
//   }, [searchParams]);

//   const avanzarDia = () => {
//     const nuevaFecha = addDays(fecha, 1);
//     setFecha(nuevaFecha);
//     router.replace(`/?fecha=${format(nuevaFecha, "yyyy-MM-dd")}`);
//   };

//   const retrocederDia = () => {
//     const nuevaFecha = subDays(fecha, 1);
//     setFecha(nuevaFecha);
//     router.replace(`/?fecha=${format(nuevaFecha, "yyyy-MM-dd")}`);
//   };

//   const setHoy = () => {
//     const nuevaFecha = new Date();
//     setFecha(nuevaFecha);
//     router.replace(`/?fecha=${format(nuevaFecha, "yyyy-MM-dd")}`);
//   };

//   return (
//     <div className="flex gap-2">
//       <Button variant="outline" onClick={retrocederDia} className="px-2">
//         <ChevronLeft size={20} />
//       </Button>

//       <Button variant="outline" onClick={setHoy}>
//         Hoy
//       </Button>
//       <Button variant="outline" onClick={avanzarDia} className="px-2">
//         <ChevronRight size={20} />
//       </Button>

//       {/* <p>{format(fecha, "dd/MM/yyyy", { locale: es })}</p> */}
//     </div>
//   );
// }
