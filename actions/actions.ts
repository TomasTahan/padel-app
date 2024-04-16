"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation"

export  async function crearAmericano() {
    const supabase = createClient();

    const { data, error } = await supabase
  .from('Americanos')
  .insert([
    {  },
  ])
  .select().single()
    redirect(`/torneos/${data?.americanoId}`)
}

export  async function subirResultado(formData: FormData) {
  const partidoId = formData.get("partidoId")
  const set1 = formData.get("set1")
  const set2 = formData.get("set2") || null;
  const set3 = formData.get("set3") || null;
  
  const supabase = createClient();

  const { data, error } = await supabase
  .from('AmericanoPartidos')
  .update({ set1: set1, set2: set2, set3: set3 })
  .eq('partidosId', partidoId)

  if (error) {
    console.log(error)
  }

  revalidatePath(`/torneos/1`)
}

export  async function realTime() {
  revalidatePath("/")
  revalidateTag("Reservas")
  console.log("revalidando")
}
