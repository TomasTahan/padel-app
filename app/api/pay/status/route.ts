import { NextRequest, NextResponse } from "next/server";
import { JwtPayload, verify } from "jsonwebtoken";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { payment: jwt } = await request.json();

    if (!jwt) {
      return NextResponse.json(
        { error: "JWT no proporcionado" },
        { status: 400 }
      );
    }

    const payloadBase64 = jwt.split(".")[1];
    let decodedPayload: JwtPayload;

    try {
      decodedPayload = JSON.parse(atob(payloadBase64));
    } catch (error) {
      return NextResponse.json(
        { error: "No se pudo decodificar la carga útil del JWT" },
        { status: 400 }
      );
    }

    const supabase = createClient();

    if (decodedPayload.payment_status == "success") {
      const { data: merch, error: merchError } = await supabase
        .from("Pagos")
        .select()
        .eq("merchId", decodedPayload.merchant_order_id)
        .single();

      if (merchError) {
        console.error("Error al obtener el registro de pago:", merchError);
        return NextResponse.json(
          { error: "Error al obtener el registro de pago" },
          { status: 500 }
        );
      }
      if (!merch) {
        return NextResponse.json(
          { error: "Registro de pago no encontrado" },
          { status: 404 }
        );
      }

      try {
        const decodedToken = verify(jwt, merch.sigantureToken) as JwtPayload;
        console.log("JWT decodificado:", decodedToken);
      } catch (error) {
        return NextResponse.json(
          { error: "JWT inválido. Signature incorrecto." },
          { status: 400 }
        );
      }

      const { data: updatedData, error: updateError } = await supabase
        .from("Pagos")
        .update({
          status: "Success",
        })
        .eq("merchId", decodedPayload.merchant_order_id);

      if (updateError) {
        console.error("Error al actualizar el pago:", updateError);
        return NextResponse.json(
          { error: "Error al actualizar el pago" },
          { status: 500 }
        );
      }

      if (updatedData) {
        console.log("Pago actualizado:", updatedData);
      }
    }

    return NextResponse.json({ status: "Success" });
  } catch (error) {
    console.error("Error en el manejo de la solicitud:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
