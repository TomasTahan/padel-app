import Calendar from "@/components/calendar/Calendar";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const encryptedClubId = cookies().get("clubId")?.value;

  if (!encryptedClubId) {
    return redirect("/login");
  }

  const secretKey = process.env.COOKIE_SECRET_KEY;
  const iv = process.env.COOKIE_IV;

  // Verificar si secretKey e iv están definidos
  if (!secretKey || !iv) {
    throw new Error("Secret key or IV is missing");
  }

  // Convertir secretKey e iv a Buffer
  const secretKeyBuffer = Buffer.from(secretKey, "hex");
  const ivBuffer = Buffer.from(iv, "hex");

  let clubId;

  try {
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      secretKeyBuffer,
      ivBuffer
    );
    let decryptedClubId = decipher.update(encryptedClubId, "base64", "utf8");
    decryptedClubId += decipher.final("utf8");
    clubId = parseInt(decryptedClubId);
  } catch (error) {
    console.error("Error al descifrar el clubId:", error);
    return redirect("/login");
  }

  const { data: reservas } = await supabase
    .from("Canchas")
    .select()
    .eq("clubId", clubId);

  return (
    <>
      <Calendar data={reservas} />
    </>
  );
}
