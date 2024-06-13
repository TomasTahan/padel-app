import Reservas from "./Reservas";

export default function Grilla({
  reservas,
  onAddReserva,
  onDeleteReserva,
  onEditReserva,
  fecha,
}: any) {
  const horas = Array.from({ length: 18 }, (_, i) => 6 + i + ":00");
  const canchas = Array.from({ length: 6 }, (_, i) => i + 1);
  return (
    <div className="relative flex w-full pl-6">
      <div className="flex flex-col mt-[15px]">
        {horas.map((hora, index) => (
          <div
            key={index}
            className="text-right pr-1 flex items-center h-[53px] text-xs font-sans text-slate-500 overflow-auto"
          >
            {hora}
          </div>
        ))}
      </div>
      <div className="relative flex-grow">
        <table className="w-full divide-y  border-l border-r border-t ">
          <thead>
            <tr>
              {canchas.map((cancha) => (
                <th
                  key={cancha}
                  className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider"
                >
                  Cancha {cancha}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-black divide-y ">
            {horas.map((hora, index) => (
              <tr key={index} className="h-[53px] align-top"></tr>
            ))}
          </tbody>
        </table>
        <div>
          <Reservas
            canchas={canchas}
            reservas={reservas}
            onAddReserva={onAddReserva}
            onDeleteReserva={onDeleteReserva}
            onEditReserva={onEditReserva}
            fecha={fecha}
          />
        </div>
      </div>
    </div>
  );
}
