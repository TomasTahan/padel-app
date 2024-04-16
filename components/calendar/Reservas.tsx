import Reserva from "./Reserva";

const bloquesDisponibles = [
  { inicio: "08:00", fin: "09:30" },
  { inicio: "09:30", fin: "11:00" },
  { inicio: "11:00", fin: "12:30" },
  { inicio: "17:30", fin: "19:00" },
  { inicio: "19:00", fin: "20:30" },
  { inicio: "20:30", fin: "22:00" },
  { inicio: "22:00", fin: "23:30" },
];

export default function reservas({ fecha, canchas, reservas: a }: any) {
  const reservas = a.filter((reserva: any) => reserva.fecha === fecha);

  const reservasDisponibles = canchas.flatMap((cancha: any) =>
    bloquesDisponibles.map((bloque) => ({
      cancha,
      inicio: bloque.inicio,
      fin: bloque.fin,
      estado: "Disponible",
      cliente: "Disponible",
    }))
  );

  const reservasDisponiblesActualizadas = reservasDisponibles.filter(
    (disponible: any) => {
      const choque = reservas.some((reserva: any) => {
        return (
          reserva.cancha === disponible.cancha &&
          reserva.inicio < disponible.fin &&
          reserva.fin > disponible.inicio
        );
      });
      return !choque;
    }
  );

  const reservasCombinadas = [
    ...reservasDisponiblesActualizadas,
    ...reservas,
  ].sort((a, b) => {
    const startComparison = a.inicio.localeCompare(b.inicio);
    if (startComparison !== 0) return startComparison;
    return a.cancha - b.cancha;
  });

  const alturaPorIntervalo = 26.5;

  const calcularTop = (horaInicio: any) => {
    const [hora, minuto] = horaInicio.split(":").map(Number);
    const bloquesDeMediaHoraDesdeInicio = (hora - 6) * 2 + minuto / 30;

    return bloquesDeMediaHoraDesdeInicio * alturaPorIntervalo + 40;
  };

  const calcularDuracionEnMinutos = (horaInicio: any, horaFin: any) => {
    const [horaInicioH, minutoInicioM] = horaInicio.split(":").map(Number);
    const [horaFinH, minutoFinM] = horaFin.split(":").map(Number);

    return horaFinH * 60 + minutoFinM - (horaInicioH * 60 + minutoInicioM);
  };

  const calcularAltura = (horaInicio: any, horaFin: any) => {
    const duracionEnMinutos = calcularDuracionEnMinutos(horaInicio, horaFin);
    return (duracionEnMinutos / 30) * alturaPorIntervalo;
  };

  const getColorClass = (estado: any) => {
    switch (estado) {
      case "Reservada":
        return "color-rojo border-[#e2bfc9]";
      case "Disponible":
        return "color-verde border-[#9eda90]";
      case "Tour":
        return "bg-[#bfecfe] border-[#7adbfd]";
      case "Clases":
        return "bg-[#e5e9f0] border-[#c4c7cd]";
      default:
        return "bg-gray-300";
    }
  };
  return (
    <div>
      {reservasCombinadas.map((reserva, index) => (
        <div
          key={index}
          className={`absolute border rounded py-1 px-2 ${getColorClass(
            reserva.estado
          )}`}
          style={{
            top: `${calcularTop(reserva.inicio)}px`,
            height: `${calcularAltura(reserva.inicio, reserva.fin) - 3}px`,
            width: `calc(${100 / canchas.length}% - 3px)`,
            left: `calc(${
              (reserva.cancha - 1) * (100 / canchas.length)
            }% + 2px)`,
            marginTop: "3px",
          }}
        >
          <Reserva reserva={reserva} fecha={fecha} />
        </div>
      ))}
    </div>
  );
}
