import { supabase } from "../index";
/**
 * performs API request to select user data
 * @param {Object} p    object with user ID
 * @returns Object    object with user account data
 */
export async function MostrarCuentas(p) {
  try {
    //query
    const { data } = await supabase
      .from("cuenta")
      .select()
      .eq("idusuario", p.idusuario)
      .maybeSingle();
    console.log('mostrar cuentas response:', data);
    if (data) {
      return data;
    }
    //? why another return outside the if
    return data;
  } catch (error) {}
}