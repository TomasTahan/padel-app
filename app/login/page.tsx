import Link from "next/link";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const secretKey = process.env.COOKIE_SECRET_KEY;
    const iv = process.env.COOKIE_IV;

    if (!secretKey || !iv) {
      throw new Error("Secret key or IV is missing");
    }

    // Convertir secretKey e iv a Buffer
    const secretKeyBuffer = Buffer.from(secretKey, "hex");
    const ivBuffer = Buffer.from(iv, "hex");

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const { data } = await supabase
      .from("Users")
      .select()
      .eq("email", email)
      .select("*")
      .single();

    if (error) {
      return redirect("/login?message=Correo o contraseña incorrectos");
    }
    if (data?.Rol == "Admin") {
      const cookieStore = cookies();
      const cipher = crypto.createCipheriv(
        "aes-256-cbc",
        secretKeyBuffer,
        ivBuffer
      );
      let encryptedClubId = cipher.update(
        data.clubFavorito.toString(),
        "utf8",
        "base64"
      );
      encryptedClubId += cipher.final("base64");
      cookieStore.set("clubId", encryptedClubId);
      return redirect("/reservas");
    }

    if (data?.Rol !== "Admin") {
      return redirect("/login?message=No tienes permisos para ingresar");
    }
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="correo@ejemplo.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Contraseña
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={signIn}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Iniciando Sesión..."
        >
          Iniciar Sesión
        </SubmitButton>
        {/* <SubmitButton
          formAction={signUp}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton> */}
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
