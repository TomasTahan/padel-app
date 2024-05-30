// @ts-nocheck

import { createClient } from "@/lib/supabase/server";
import { verify, decode } from "jsonwebtoken";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { jwt: string };
}) {
  const jwt = searchParams.jwt;
  let decodedToken2;
  decodedToken2 = decode(jwt);

  const supabase = createClient();

  const { data: merch } = await supabase
    .from("Pagos")
    .select()
    .eq("merchId", decodedToken2?.merchant_order_id)
    .single();

  const secretKey = merch.sigantureToken;
  let decodedToken;
  try {
    decodedToken = verify(jwt, secretKey);
  } catch (error) {
    console.error("Error al decodificar el JWT:", error);
  }
  if (!decodedToken) {
    return <div>Error al decodificar el JWT</div>;
  }

  // if (decodedToken.payment_status) {
  //   const { data: updatedData, error } = await supabase
  //     .from("Pagos")
  //     .update({
  //       status: "Success",
  //     })
  //     .eq("merchId", decodedToken?.merchant_order_id);

  //   if (error) {
  //     console.error("Error al actualizar el pago:", error);
  //   }

  //   if (updatedData) {
  //     console.log("Pago actualizado:", updatedData);
  //   }
  // } else {
  //   const { data: updatedData, error } = await supabase
  //     .from("Pagos")
  //     .update({
  //       status: "Failed",
  //     })
  //     .eq("merchId", decodedToken?.merchant_order_id);

  //   if (error) {
  //     console.error("Error al actualizar el pago:", error);
  //   }

  //   if (updatedData) {
  //     console.log("Pago actualizado:", updatedData);
  //   }
  // }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-600">
          ¡Pago exitoso!
        </h1>
        <p className="text-lg mb-8">¡Gracias por tu compra!</p>
        <p className="text-lg mb-8 text-gray-500">
          Apriete el boton de continuar dentro de la aplicación.
        </p>
      </div>
    </div>
  );
}
