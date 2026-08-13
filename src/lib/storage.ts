import { supabase } from "./supabase";

export async function deleteStorageFile(publicUrl: string | null) {
  if (!publicUrl) return;
  const marker = "/storage/v1/object/public/images/";
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return;
  const path = publicUrl.slice(idx + marker.length);
  if (path) await supabase.storage.from("images").remove([path]);
}

export async function enforceMaxRows(table: string, max: number, orderColumn: string, photoColumn?: string) {
  const { data } = await supabase.from(table).select("*").order(orderColumn, { ascending: false });
  if (!data || data.length <= max) return;
  const excess = data.slice(max);
  const ids = excess.map((row: any) => row.id);
  if (photoColumn) await Promise.all(excess.map((row: any) => deleteStorageFile(row[photoColumn])));
  await supabase.from(table).delete().in("id", ids);
}