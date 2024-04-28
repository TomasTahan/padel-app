"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation"

export  async function crearAmericano(formData: FormData) {
  const tipo = formData.get("tipo")
  const num = formData.get("num")
  const cat = formData.get("cat")

  const supabase = createClient();
  const { data, error } = await supabase
  .from('Americanos')
  .insert([
    { categoria: cat, parejas: num},
  ])
  .select().single()
  
  redirect(`/torneos/${data?.americanoId}`)
}

export  async function subirResultado(formData: FormData) {
  const partidoId = formData.get("partidoId") || "partidoId"
  const americanoId = formData.get("americanoId") || "americanoId"
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

  revalidatePath(`/torneos/${americanoId}`)
}

export  async function realTime() {
  revalidatePath("/")
  revalidateTag("Reservas")
  console.log("revalidando")
}

export async function inscribirAmericano(formData: FormData) {
  const americanoId = formData.get("americanoId")
  const jugador1 = formData.get("jugador1")
  const jugador2 = formData.get("jugador2")

  const supabase = createClient();
  await supabase.from('AmericanoParejas').insert([{ americanoId: americanoId, jugador1: jugador1, jugador2: jugador2}])
  
  revalidatePath(`/torneos/${americanoId}`)
}

export async function eliminarPareja(formData: FormData) {
  const parejaId = formData.get("parejaId")
  const americanoId = formData.get("americanoId")

  const supabase = createClient();
  await supabase.from('AmericanoParejas').delete().eq('parejaId', parejaId)
  
  revalidatePath(`/torneos/${americanoId}`)
}

export async function generarGrupos(formData: FormData) {
  const americano_id = formData.get("americanoId")

  const supabase = createClient();
  let { data, error } = await supabase
  .rpc('asignar_grupos', {
    americano_id
  })

  await supabase.from('Americanos').update({ estado: "Grupo" }).eq('americanoId', americano_id)
 
  revalidatePath(`/torneos/${americano_id}`)
}

export async function generarPartidos(formData: FormData) {
  const americano_id = formData.get("americanoId")

  const supabase = createClient();
  await supabase
  .rpc('generar_partidos', {
    americano_id
  })

  revalidatePath(`/torneos/${americano_id}`)
}

export async function generarPuntos(formData: FormData) {
  const p_americano_id = formData.get("americanoId")

  const supabase = createClient();
  await supabase
  .rpc('calcular_puntos_parejas', {
    p_americano_id
  })

  revalidatePath(`/torneos/${p_americano_id}`)
}

export async function generarPayoffs(formData: FormData) {
  const p_americano_id = formData.get("americanoId")

  const supabase = createClient();
  await supabase
  .rpc('generar_partidos_playoffs', {
    p_americano_id
  })

  await supabase.from('Americanos').update({ estado: "Playoffs" }).eq('americanoId', p_americano_id)

  revalidatePath(`/torneos/${p_americano_id}`)
}

export async function refresh() {
  revalidatePath("/")
  console.log("refresh")
}
